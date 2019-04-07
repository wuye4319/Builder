/**
 * Created by nero on 2017/6/2.
 */
const koa = require('../../koa/index')
const fs = require('fs')
const Writefile = require('keeper-core/lib/writefile')
let writefile = new Writefile()
const Product = require('../service/product')
let product = new Product()
const Util = require('../util')
let util = new Util()

let globparam = '/web/v1/'

koa.addrouter(globparam + 'searchpro/:key/:pagesize/:page', async (ctx) => {
  let key = ctx.params.key
  let page = parseInt(ctx.params.page)
  let size = parseInt(ctx.params.pagesize)
  let total = await product.getProCount(key)
  let result = util.result(0, total.total, page, size)

  let sqlpage = (page - 1) * size
  let tempPro = await product.getProListByKey(sqlpage, size, key)
  if (tempPro) {
    result.data.product_list = tempPro
  }
  ctx.response.body = result
})
// http://builder.test.com:8080/web/v1/products/30/
koa.addrouter(globparam + 'products/:id', async (ctx) => {
  let id = ctx.params.id
  let result = await product.getPro(id)
  ctx.response.body = result
})
