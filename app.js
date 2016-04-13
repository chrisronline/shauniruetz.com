import Koa from 'koa'
import KoaRouter from 'koa-router'
import ReactDOMServer from 'react-dom/server'
import HomeComponent from './components/home'

const app = new Koa()
const router = KoaRouter()

router.get('/', async (ctx, next) => {
  ctx.response.header['Content-Type'] = 'text/html'

  const html = ReactDOMServer.renderToStaticMarkup(HomeComponent())
  ctx.body = html
})

app
  // Logger
  .use(async (ctx, next) => {
    const start = +new Date()
    await next()
    const ms = (+new Date()) - start
    console.log('%s %s - %sms', ctx.method, ctx.url, ms)
  })
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)