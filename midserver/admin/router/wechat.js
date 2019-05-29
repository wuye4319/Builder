/**
 * Created by nero on 2017/6/2.
 */
const koa = require('../../koa/index')

let globparam = '/web/v1/'
// init
koa.addrouter('/', async (ctx) => {
  ctx.response.body = '<h1>welcome to nodejs</h1>'
  console.log(ctx.request.host, ctx.request.hostname)
})
koa.addrouter(globparam + 'prizeticket', async (ctx) => {
  // let body = ctx.request.body
  console.log('prizeticket')
  ctx.response.body = 'sucessful'
})
