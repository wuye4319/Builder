/**
 * Created by nero on 2017/5/22.
 */
const Koa = require('koa')
const app = new Koa()
var fs = require('fs');
const sslify = require('koa-sslify').default;
var https = require('https');
const router = require('koa-router')()
const koaBody = require('koa-body')
// let staticFiles = require('./static')
const Logger = require('keeper-core')
let logger = new Logger()
// const Wanswer = require('./wanswer')
// let wanswer = new Wanswer()

// test api
// var WechatAPI = require('wechat-api');
// var api = new WechatAPI('wx4ed5bcdb64111500', 'e89f298c7da7674816b320f6e642d703');
// api.getMenu(function (err, result) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(result)
//   }
// });

// wechat
// const wechat = require('co-wechat');
// const config = {
//   token: 'jxyhd11',
//   appid: 'wx4ed5bcdb64111500',
//   encodingAESKey: '6fGlKb8qKLnQ5a2k4xR8FldhtXejEQUW75GbQJF2HJT'
// };

// SSL options
const options = {
  key: fs.readFileSync('./static/ssl/2090025_wssso.com.key'),  //ssl文件路径
  cert: fs.readFileSync('./static/ssl/2090025_wssso.com.pem')  //ssl文件路径
};

// https
app.use(sslify());

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  let myurl = ctx.url.substr(0, ctx.url.indexOf('http'))
  logger.myconsole(`${ctx.method} ${myurl || ctx.url} - ${ms}ms`)
  let alloworigin = [
    'https://www.wssso.com',
    'https://www.test.com',
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

// app.use(wechat(config).middleware(async (message, ctx) => {
//   return wanswer.answer(message)
// }))

app.use(router.routes()).use(router.allowedMethods())
// app.use(staticFiles('/static/', './static'))

// error
app.on('error', function (err, ctx) {
  console.log('server error', err, ctx)
})

var lis = https.createServer(options, app.callback()).listen(443);
console.log('The server is started!!!')

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
