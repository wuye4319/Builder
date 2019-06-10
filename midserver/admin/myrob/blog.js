/**
 * author:nero
 * version:v1.0
 * robot will help me to control all things
 */
'use strict'
const Blog = require('../../../../midserver/admin/service/blog')
let blog = new Blog()
const Basemysql = require('../../../../midserver/admin/base/mysql')
let basemysql = new Basemysql()
let crypto = require('crypto')
const inquirer = require('inquirer');

// constructor
class Robot {
  constructor() {
    this.options = {
      kind: ['女性', '男性', '大众'],
      type: ['纯图片', '图文']
    }
  }

  async add() {
    console.log('robot is running!')
    let data = await this.boot()
    this.mysql(data)
  }

  boot() {
    return new Promise(resolve => {
      const promptList = [{
        type: 'input',
        message: '博文的标题:',
        name: 'title',
      }, {
        type: 'input',
        message: '博文的主图地址:',
        name: 'img',
      }, {
        type: 'input',
        message: '博文的内容:',
        name: 'cont',
      }, {
        type: 'list',
        message: '博文的类型:',
        name: 'type',
        choices: this.options.type
      }, {
        type: 'list',
        message: '用户类型:',
        name: 'kind',
        choices: this.options.kind
      }];

      inquirer.prompt(promptList).then(data => {
        data.type = this.options.type.indexOf(data.type) + 1
        data.kind = this.options.kind.indexOf(data.kind) + 1
        resolve(data)
      })
    })
  }

  async mysql(datalist) {
    let proid = await blog.getBlogLastId()
    proid = proid.id + 1
    let md5 = crypto.createHash('md5')
    let codeid = md5.update(proid.toString()).digest('hex')
    codeid = codeid.substr(22)

    let data = {
      title: datalist.title,
      code: codeid,
      main_img: datalist.img,
      context: datalist.cont,
      type: datalist.type,
      kind: datalist.kind
    }

    console.log(data)
    // add product and get infor after insert.
    // await blog.addBlog(data)
    basemysql.endconn()
  }
}

module.exports = Robot
