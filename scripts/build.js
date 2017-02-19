import fs from 'fs-extra'
import klaw from 'klaw-sync'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import AWS from 'aws-sdk'
import Rsync from 'rsync'
import async from 'async'
import Site from '../src/site'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.prod.js'
import critical from 'critical'

const s3Root = 'http://s3.amazonaws.com/shauni-ruetz/'
const deployDir = path.join(__dirname, '..', 'deploy')
const deployHMDir = path.join(deployDir, 'hm')
const deployS3Dir = path.join(deployDir, 'assets')
const srcDir = path.join(__dirname, '..')

const justDeploy = false
if (justDeploy) {
  deploy(() => {
    console.log('done')
  })
} else {
  console.log(`Ensuring deploy exists...`)
  fs.ensureDirSync(deployHMDir)
  fs.ensureDirSync(deployS3Dir)
  console.log(`Emptying deploy directory...`)
  fs.emptyDirSync(deployHMDir)
  fs.emptyDirSync(deployS3Dir)

  console.log(`Copying fonts and images...`)
  fs.copySync(path.join(srcDir, 'assets'), deployS3Dir)
  fs.copySync(path.join(srcDir, '.htaccess'), path.join(deployHMDir, '.htaccess'))

  console.log(`Building webpack...`)
  buildWebpack(({ hash }) => {
    const builtJsPath = path.join(deployDir, 'assets', `site_${hash}.js`)
    const builtCssPath = path.join(deployDir, 'assets', `site_${hash}.css`)

    console.log(`Updating asset urls...`)
    updateAssetUrls(builtJsPath, builtCssPath)
    console.log(`Getting server-side rendering...`)
    const ssr = getSsrSite()
    console.log(`Copying index.html...`)
    copyIndexFile(ssr, builtJsPath, builtCssPath)
    console.log(`Optimizing...`)
    optimize(path.join(deployHMDir, 'index.html'), builtCssPath, err => {
      if (err) throw err
      console.log(`Deploying...`)
      deploy(() => {
        console.log('Done!')
      })
    })
  })
}

function buildWebpack(cb) {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    cb(stats);
  })
}

function getSsrSite() {
  return renderToString(<Site/>)
}

function optimize(htmlPath, css, cb) {
  critical.generate({
    inline: true,
    base: deployDir,
    src: htmlPath,
    css: css,
    dest: 'hm/index.html',
    minify: true,
    extract: true,
    width: 1300,
    height: 900,
    ignore: ['font-face']
  }, cb)
}

function updateAssetUrls(builtJsPath, builtCssPath) {
  let js = fs.readFileSync(builtJsPath).toString()
  let css = fs.readFileSync(builtCssPath).toString()

  js = js.replace(/\/assets/g, s3Root + 'assets')
  css = css.replace(/\/assets/g, s3Root + 'assets')

  fs.outputFileSync(builtJsPath, js)
  fs.outputFileSync(builtCssPath, css)
}

function copyIndexFile(ssr, builtJsPath, builtCssPath) {
  let indexFile = fs.readFileSync(path.join(srcDir, 'index.html')).toString()
  indexFile = indexFile
    .replace(
      '<div id="root"></div>',
      `
      <div id="root">
        ${ssr}
      </div>
      `
    )
    .replace(
      'dist/bundle.js',
      s3Root + builtJsPath.substring(builtJsPath.indexOf('assets/'))
    )
    .replace(
      'dist/bundle.css',
      s3Root + builtCssPath.substring(builtCssPath.indexOf('assets/'))
    )
  fs.outputFileSync(path.join(deployHMDir, 'index.html'), indexFile)
}

function deploy(cb) {
  deployToHM(err => {
    if (err) throw err
    deployToS3(cb)
  });
}

function deployToHM(cb) {
  console.log(`Deploying to HM...`)

  const source = deployHMDir + '/.'
  const cmd = new Rsync()
    .shell('ssh')
    .flags('rzltv')
    .source(source)
    .destination('croberso@ftp.croberson.net:/home2/croberso/public_html/shauni-stage/')
    // .destination('croberso@ftp.croberson.net:/home2/croberso/public_html/shauniruetz/')
    .execute((err, code, cmd) => {
      if (err) throw err
      console.log(`Done deploying to HM...`)
      cb()
    })
}

function deployToS3(cb) {
  console.log(`Deploying to S3...`)
  const s3 = new AWS.S3({apiVersion: '2006-03-01'})

  const files = klaw(deployS3Dir, { nodir: true })
    .map(file => {
      return {
        filePath: file.path,
        s3Path: path.join('assets', path.relative(deployS3Dir, file.path))
      }
    })
    .filter(file => file.filePath.indexOf('.DS_Store') === -1)

  async.eachSeries(
    files,
    ({ filePath, s3Path }, callback) => {
      const contents = fs.readFileSync(filePath)
      const params = {
        Bucket: 'shauni-ruetz',
        Key: s3Path,
      }

      s3.headObject(params, (err, data) => {
        if (!err && data.ContentLength == contents.length) {
          console.log(`Skipping ${s3Path}...`)
          return callback()
        }

        params.Body = contents
        if (s3Path.indexOf('index.html') > -1) {
          params.ContentType = 'text/html'
        } else if (s3Path.indexOf('.js') > -1) {
          params.ContentType = 'text/javascript'
        } else if (s3Path.indexOf('.css') > -1) {
          params.ContentType = 'text/css'
        }

        console.log(`Uploading ${s3Path}...`)
        s3.putObject(params, (err, data) => {
          if (err) throw err
          console.log(`Successfully uploaded ${s3Path}`)
          callback()
        })
      })
    },
    (err) => {
      if (err) throw err
      console.log('Done deploying to S3...')
      console.log(`Updating CORS...`)
      const cors = {
        Bucket: 'shauni-ruetz',
        CORSConfiguration: {
          CORSRules: [
            {
              AllowedMethods: ['GET'],
              AllowedOrigins: [
                'http://shauni-stage.croberson.net',
                'http://www.shauniruetz.com',
                'http://shauniruetz.com'
              ]
            }
          ]
        }
      }

      s3.putBucketCors(cors, (err, data) => {
        if (err) throw err
        console.log('Successfully updated CORS...')
        cb()
      })
    }
  )
}
