/**
 * author:nero
 * version:v1.0
 * robot will help me to control all things
 */
'use strict'
const Topic = require('../../../../midserver/admin/service/topic')
let topic = new Topic()
const Basemysql = require('../../../../midserver/admin/base/mysql')
let basemysql = new Basemysql()
let crypto = require('crypto')
const inquirer = require('inquirer');

// constructor
class Robot {
  constructor() {
    this.options = {
      kind: ['女性', '男性', '大众']
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
        message: '专题的标题:',
        name: 'title',
      }, {
        type: 'input',
        message: '专题的主图地址:',
        name: 'img',
      }, {
        type: 'input',
        message: '专题的描述（选填）:',
        name: 'desc',
      }, {
        type: 'list',
        message: '用户类型:',
        name: 'kind',
        choices: this.options.kind
      }];

      inquirer.prompt(promptList).then(data => {
        data.kind = this.options.kind.indexOf(data.kind) + 1
        resolve(data)
      })
    })
  }

  newone(datalist) {
    let self = this
    return new Promise(resolve => {
      const promptList = [{
        type: 'Confirm',
        message: '没有该专题，是否新建一个？[y/n]',
        name: 'boot',
        default: 'y'
      }];

      inquirer.prompt(promptList).then(data => {
        if (data.boot) {
          const promptList = [{
            type: 'input',
            message: '专题的标题:',
            name: 'title',
            default: datalist.filename
          }, {
            type: 'list',
            message: '用户类型:',
            name: 'kind',
            choices: this.options.kind
          }];

          inquirer.prompt(promptList).then(da1 => {
            let temp = {}
            temp.title = da1.title
            temp.img = datalist.excel[0].C
            temp.desc = da1.title
            temp.kind = this.options.kind.indexOf(da1.kind) + 1
            self.mysql(temp)
            resolve()
          })
        } else {
          resolve()
          basemysql.endconn()
        }
      })
    })
  }

  async mysql(datalist) {
    let proid = await topic.getTopicLastId()
    proid = proid.id + 1
    let md5 = crypto.createHash('md5')
    let codeid = md5.update(proid.toString()).digest('hex')
    codeid = codeid.substr(22)

    let data = {
      title: datalist.title,
      code: codeid,
      main_img: datalist.img,
      description: datalist.desc,
      kind: datalist.kind
    }

    // add product and get infor after insert.
    await topic.addTopic(data)
  }
}

module.exports = Robot
