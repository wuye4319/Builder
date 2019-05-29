/**
 * Created by nero on 2017/6/2.
 */
const koa = require('../../koa/http')
const Blog = require('../service/blog')
let blog = new Blog()
const Util = require('../util')
let util = new Util()

let globparam = '/web/v1/'

// blog list
// type = ?
koa.addrouter(globparam + 'blog/:type/:pagesize/:page', async (ctx) => {
  let type = ctx.params.type
  let page = parseInt(ctx.params.page)
  let size = parseInt(ctx.params.pagesize)
  let total = await blog.getBlogCount(type)
  let result = util.result(0, total.total, page, size)

  let sqlpage = (page - 1) * size
  let tempPro = await blog.getBlogList(type, sqlpage, size)
  if (tempPro) {
    result.data = tempPro
  }
  ctx.response.body = result
})
// blog details
koa.addrouter(globparam + 'blog/:id', async (ctx) => {
  let id = ctx.params.id
  let result = util.result(0)
  let tempPro = await blog.getBlog(id)
  if (tempPro) {
    result.data = tempPro
  }
  ctx.response.body = result
})
