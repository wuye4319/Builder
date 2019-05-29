/**
 * Created by nero on 2017/5/22.
 */
const Koa = require('koa')
const app = new Koa()
const http = require('http');
const router = require('koa-router')()
const koaBody = require('koa-body')
const Logger = require('keeper-core')
let logger = new Logger()

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  let myurl = ctx.url.substr(0, ctx.url.indexOf('http'))
  logger.myconsole(`${ctx.method} ${myurl || ctx.url} - ${ms}ms`)
  let alloworigin = [
    'https://www.wssso.com:8081',
    'https://www.test.com:8081'
  ]
  for (let i in alloworigin) {
    if (alloworigin[i] === ctx.request.header.origin) {
      ctx.response.set('Access-Control-Allow-Origin', alloworigin[i])
    }
  }

  ctx.response.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
  ctx.response.set('Access-Control-Max-Age', '0')
  ctx.response.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Access-Token,Origin-Host')
  ctx.response.set('Access-Control-Allow-Credentials', 'true')
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  }
})

app.use(router.routes()).use(router.allowedMethods())

// error
app.on('error', function (err, ctx) {
  console.log('server error', err, ctx)
})

let lis = http.createServer(app.callback()).listen(8081);
// var lis = https.createServer(options, app.callback()).listen(443)
console.log('http is started!!!')

var server = {
  addrouter: (url, fn) => {
    router.get(url, fn).post(url, koaBody(), fn)
  },
  close: () => {
    lis.close()
  },
  redirect: (i, o) => {
    router.redirect(i, o);
  }
}

module.exports = server
