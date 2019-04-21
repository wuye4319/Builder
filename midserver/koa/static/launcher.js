/**
 * Created by nero on 2017/5/22.
 */
const sslify = require('koa-sslify').default;
const Koa = require('koa')
const app = new Koa()
var fs = require('fs');
var https = require('https');
const router = require('koa-router')()
const Logger = require('keeper-core')
let logger = new Logger()

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
  // ctx.response.set('Access-Control-Allow-Origin', 'http://www.dev.com:8011')
  // ctx.response.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
  // ctx.response.set('Access-Control-Max-Age', '0')
  // ctx.response.set('Access-Control-Allow-Headers', 'X-Requested-With,X_Requested_With')
  // ctx.response.set('Access-Control-Allow-Credentials', 'true')
})

app.use(router.routes())

// error
app.on('error', function (err, ctx) {
  console.log('server error', err, ctx)
})

var lis = https.createServer(options, app.callback()).listen(80)
console.log('Launcher is started!!!')

var server = {
  addrouter: (url, fn) => {
    router.get(url, fn).post(url, fn)
  },
  close: () => {
    lis.close()
  },
  redirect: (i, o) => {
    router.redirect(i, o);
  }
}

module.exports = server
