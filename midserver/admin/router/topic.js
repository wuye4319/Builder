/**
 * Created by nero on 2017/6/2.
 */
const koa = require('../../koa/index')
const fs = require('fs')
const Writefile = require('keeper-core/lib/writefile')
let writefile = new Writefile()
const Topic = require('../service/topic')
let topic = new Topic()
const Util = require('../util')
let util = new Util()

let globparam = '/web/v1/'

// collection
koa.addrouter(globparam + 'collections/:pagesize/:page', async (ctx) => {
  let page = parseInt(ctx.params.page)
  let size = parseInt(ctx.params.pagesize)
  let total = await topic.getTopicCount()
  let result = util.result(0, total.total, page, size)

  let sqlpage = (page - 1) * size
  let temptopic = await topic.getTopicListByKind(sqlpage, size)
  if (temptopic) {
    result.data.collection = temptopic
  }
  ctx.response.body = result
})
koa.addrouter(globparam + 'collections/multiple', async (ctx) => {
  let body = ctx.request.body
  let ids = body.collection_ids.split(',')
  let result = util.result(0)

  result.data = []
  for (let i in ids) {
    let tempPro = await topic.getTopicById(ids[i])
    if (tempPro) {
      result.data.push(tempPro)
    }
  }

  ctx.response.body = result
})
koa.addrouter(globparam + 'collections/:id/:pagesize/:page/', async (ctx) => {
  let id = ctx.params.id
  let page = parseInt(ctx.params.page)
  let size = parseInt(ctx.params.pagesize)
  let total = await topic.getProCountByTopic(id)
  let result = util.result(0, total.total, page, size)

  let sqlpage = (page - 1) * size
  let tempPro = await topic.getProListByTopic(id, sqlpage, size)
  let temptopic = await topic.getTopicById(id)
  if (temptopic && tempPro) {
    result.data.collection = temptopic
    result.data.product_list = tempPro
  }
  ctx.response.body = result
})

koa.addrouter(globparam + 'blog/:pagesize/:page', async (ctx) => {
  let id = ctx.params.id
  let page = parseInt(ctx.params.page)
  let size = parseInt(ctx.params.pagesize)
  let total = await topic.getBlogCount()
  let result = util.result(0, total.total, page, size)

  let sqlpage = (page - 1) * size
  let tempPro = await topic.getBlogList(sqlpage, size)
  if (tempPro) {
    result.data = tempPro
  }
  ctx.response.body = result
})
koa.addrouter(globparam + 'blog/:id', async (ctx) => {
  let id = ctx.params.id
  let result = util.result(0)
  let tempPro = await topic.getBlog(id)
  if (tempPro) {
    result.data = tempPro
  }
  ctx.response.body = result
})
