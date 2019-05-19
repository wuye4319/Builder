/**
 * Created by nero on 2017/6/2.
 */
const koa = require('../index')
// const launcher = require('../static/launcher')
// const myhttp = require('../static/http')
const Ctrl = require('./ctrl')
let ctrl = new Ctrl()
const StaticFiles = require('../static/static')
let staticFiles = new StaticFiles()
const Basemysql = require('../../admin/base/mysql')
let basemysql = new Basemysql()
require('../../admin/base/rout')

class rout {
  closeall() {
    koa.close()
    launcher.close()
    basemysql.endconn()
  }
}

// buy
// koa.addrouter(/^\/builder(?:\/|$)/, async (ctx) => {
//   await ctrl.filter(ctx, 'builder', true)
// })
// koa.addrouter('/wrapper/', async (ctx) => {
//   await ctrl.wrap()
// })
// koa.addrouter('/createshop/:user', async (ctx) => {
//   let user = ctx.params.user
//   await ctrl.filter(ctx, 'createshop', user)
// })

// static
koa.addrouter(/^\/builder(?:\/|$)/, async (ctx) => {
  await staticFiles.getfile(ctx, '', './static/')
})
// static
koa.addrouter(/^\/(\w+)(?:\/|$)/, async (ctx) => {
  await staticFiles.getfile(ctx, '', './static/theme')
})
koa.redirect('/', '/home')

// http
// myhttp.addrouter(/^\/(\w*)/, async (ctx) => {
//   let data = await staticFiles.runphp(ctx, './static/http')
//   ctx.response.type = 'text/html'
//   ctx.response.body = data
// })
// myhttp.redirect('/', '/index.php')

module.exports = rout