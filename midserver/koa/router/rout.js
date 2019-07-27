/**
 * Created by nero on 2017/6/2.
 */
const koa = require('../index')
// const Ctrl = require('./ctrl')
// let ctrl = new Ctrl()
const StaticFiles = require('../static/static')
let staticFiles = new StaticFiles()
const Basemysql = require('../../admin/base/mysql')
let basemysql = new Basemysql()
// require('../../admin/base/rout')

class rout {
  closeall() {
    koa.close()
    launcher.close()
    basemysql.endconn()
  }
}

// static
koa.addrouter(/^\/builder(?:\/|$)/, async (ctx) => {
  await staticFiles.getfile(ctx, '', './static/')
})
// static
koa.addrouter(/^\/(\w+)(?:\/|$)/, async (ctx) => {
  await staticFiles.getfile(ctx, '', './static/theme')
})
koa.redirect('/', '/home')

module.exports = rout