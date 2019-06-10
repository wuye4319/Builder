/**
 * author:nero
 * version:v1.0
 * robot will help me to control all things
 */
'use strict'
const Product = require('../../../../midserver/admin/service/product')
let product = new Product()
const Topic = require('../../../../midserver/admin/service/topic')
let topic = new Topic()
const Basemysql = require('../../../../midserver/admin/base/mysql')
let basemysql = new Basemysql()

const addTopic = require('./topic')
let addtopic = new addTopic()
const Excel = require('./excel')
let excel = new Excel()

// constructor
class Robot {
  constructor() {
    this.options = {
      stream: process.stdout
    }
  }

  async check() {
    let filelist = await excel.getfile()
    let newexcelbox = []
    let topiclist = await topic.getTopicList()
    for (let i in filelist) {
      let filename = filelist[i].split('-')[0]
      let temp = JSON.stringify(topiclist).indexOf(filename)
      if (temp === -1) {
        newexcelbox.push(filelist[i])
      }
    }
    // new excel files
    if (newexcelbox.length) {
      let datalist = await excel.boot(newexcelbox)
      this.addtopic(datalist)
    } else {
      console.log('No new excel!')
      basemysql.endconn()
    }
  }

  async robot() {
    console.log('robot is running!')
    let datalist = await this.excel()
    let topicID = await topic.getTopicIdByName(datalist.filename)
    this.addtopic(datalist, topicID)
  }

  async addtopic(datalist, topicID) {
    // console.log(topicID, datalist.filename)
    if (!topicID) {
      console.log('topic id is empty!'.red)
      // basemysql.endconn()
      await addtopic.newone(datalist)
      topicID = await topic.getTopicIdByName(datalist.filename)
    }
    this.proxycontrol(datalist.excel, topicID)
  }

  async excel() { // transfrom excel data to json
    let filelist = excel.getfile()
    let datalist = await excel.boot(filelist)
    // console.log(datalist)
    console.log('excel data is read complete! proxy will working at 2 seconds later!')
    return datalist
  }

  // init the plugin 'phantom'
  async mysql(datalist, topicID) {
    return new Promise(async (resolve) => {
      /** A proid
       *  B proname
       *  C mainimg
       *  F price
       *  L prohref
       *  rowkey: ['A', 'B', 'C', 'F', 'G', 'L', 'M', 'P', 'S']
       */
      let data = {
        pro_id: datalist.A,  // 商品ID
        name: datalist.B,  // 商品名称
        // code: codeid,  // 商品代码
        main_img: datalist.C,  // 主图
        sell_price: datalist.F,  // 售价
        sales_volume: datalist.G,  // 月销售量
        href: datalist.L,  // 购买链接
        taoword: datalist.M,  // 淘口令
        coupon: datalist.P,  // 优惠券
        couponhref: datalist.S, // 优惠券链接
        // pro_kind: datalist.W, // mysort
        topic_id: topicID.id  // 专题ID
      }
      // add product and get infor after insert.
      let haspro = await product.hasPro(data.pro_id)
      if (haspro) {
        await product.updatePro(data)
      } else {
        await product.addPro(data)
      }
      resolve()
    })
  }

  async proxycontrol(datalist, topicID) { // control of proxy and mysql
    let count
    for (let i in datalist) {
      await this.mysql(datalist[i], topicID)
      count = parseInt(i) + 1
    }
    console.log('count : ' + count)
    console.log('all mission is finished!')
    basemysql.endconn()
  }
}

module.exports = Robot
