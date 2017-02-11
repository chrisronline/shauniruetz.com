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

const deployDir = path.join(__dirname, '..', 'deploy')
const srcDir = path.join(__dirname, '..')

const justDeploy = false
if (justDeploy) {
  deploy(() => {
    console.log('done')
  })
} else {
  console.log(`Ensuring deploy exists...`)
  fs.ensureDirSync(deployDir)
  console.log(`Emptying deploy directory...`)
  fs.emptyDirSync(deployDir)
  console.log(`Setting up deploy directory...`)
  fs.ensureDirSync(path.join(deployDir, 'assets'))

  console.log(`Copying fonts and images...`)
  fs.copySync(path.join(srcDir, 'assets'), path.join(deployDir, 'assets'))
  fs.copySync(path.join(srcDir, '.htaccess'), path.join(deployDir, '.htaccess'))

  console.log(`Building webpack...`)
  buildWebpack(({ hash }) => {
    const builtJsPath = path.join(deployDir, 'assets', `site_${hash}.js`)
    const builtCssPath = path.join(deployDir, 'assets', `site_${hash}.css`)

    console.log(`Getting server-side rendering...`)
    const ssr = getSsrSite()
    console.log(`Copying index.html...`)
    copyIndexFile(ssr, builtJsPath, builtCssPath)
    console.log(`Optimizing...`)
    optimize(path.join(deployDir, 'index.html'), builtCssPath, err => {
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
    dest: 'index.html',
    minify: true,
    extract: true,
    width: 1300,
    height: 900,
    ignore: ['font-face']
  }, cb)
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
      builtJsPath.substring(builtJsPath.indexOf('assets/'))
    )
    .replace(
      'dist/bundle.css',
      builtCssPath.substring(builtCssPath.indexOf('assets/'))
    )
  fs.outputFileSync(path.join(deployDir, 'index.html'), indexFile)
}

function deploy(cb) {
  var toS3 = false
  if (toS3) {
    deployToS3(cb)
  } else {
    deployToHM(cb)
  }
}

function deployToHM(cb) {
  console.log(`Deploying to HM...`)

  const source = deployDir + '/.'
  const cmd = new Rsync()
    .shell('ssh')
    .flags('rzltv')
    .source(source)
    .destination('croberso@ftp.croberson.net:/home2/croberso/public_html/shauni-stage/')
    // .destination('croberso@ftp.croberson.net:/home2/croberso/public_html/shauniruetz/')
    .execute((err, code, cmd) => {
      if (err) throw err
      cb()
    })
}

function deployToS3(cb) {
  const s3 = new AWS.S3({apiVersion: '2006-03-01'})

  const files = klaw(deployDir, { nodir: true })
    .map(file => {
      return {
        filePath: file.path,
        s3Path: path.relative(deployDir, file.path)
      }
    })
    .filter(file => file.filePath.indexOf('.DS_Store') === -1)

  async.each(
    files,
    ({ filePath, s3Path }, callback) => {
      const params = {
        Bucket: 'shauni-ruetz',
        Key: s3Path,
        Body: fs.readFileSync(filePath),
      }

      if (s3Path.indexOf('index.html') > -1) {
        params.ContentType = 'text/html'
      } else if (s3Path.indexOf('.js') > -1) {
        params.ContentType = 'text/javascript'
      } else if (s3Path.indexOf('.css') > -1) {
        params.ContentType = 'text/css'
      }

      s3.putObject(params, (err, data) => {
        if (err) throw err
        console.log(`Successfully deployed ${s3Path}`)
        callback()
      })
    },
    (err) => {
      if (err) throw err
      console.log('Done')
    }
  )
}
