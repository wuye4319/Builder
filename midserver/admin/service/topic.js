/**
 * author:nero
 * version:v1.0
 * plugin:init js
 */
'use strict'
const Basemysql = require('../base/mysql')
let basemysql = new Basemysql()
const Util = require('../util')
let util = new Util()

class mysql {
  addBlog(data) {
    let { main_img, title, context, label } = data
    return new Promise((resolve) => {
      basemysql.myquery(`insert into blogs set main_img=?,title=?,context=?,label=?`,
        [main_img, title, context, label],
        function (results) {
          if (results.insertId) {
            console.log('data insert success! insertid is : '.green + results.insertId)
            resolve(results.insertId)
          } else {
            console.log('data insert failed!'.red + results)
            resolve(false)
          }
        })
    })
  }

  getBlogCount() {
    // 获取博客数量
    return new Promise((resolve) => {
      basemysql.myquery('SELECT COUNT(*) AS total FROM blogs WHERE is_pub=1', '', function (results) {
        let data = util.getarrt(results, ['total'], 1)
        resolve(data)
      })
    })
  }

  getBlogList(page, size) {
    // 获取博客列表信息
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM blogs WHERE is_pub=1 LIMIT ?,?', [page, size], function (results) {
        let data = util.getarrt(results, [
          'id', 'title', 'main_img', 'edit_date'
        ])
        resolve(data)
      })
    })
  }

  getBlog(id) {
    // 获取博客详情
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM blogs WHERE id=? and is_pub=1', id, function (results) {
        let data = util.getarrt(results, [
          'context', 'title', 'edit_date'
        ], 1)
        resolve(data)
      })
    })
  }

  getProCountByTopic(id) {
    // 获取专题商品总数
    return new Promise((resolve) => {
      basemysql.myquery('SELECT COUNT(*) AS total FROM product WHERE topic_id=? AND is_pub=1', id, function (results) {
        let data = util.getarrt(results, ['total'], 1)
        resolve(data)
      })
    })
  }

  getProListByTopic(id, page, size) {
    // 获取专题的商品
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM product WHERE topic_id=? AND is_pub=1 ORDER BY edit_date DESC LIMIT ?,?', [
        id, page, size
      ], function (results) {
        let data = util.getarrt(results, [
          'main_img', 'name', 'href', 'sell_price', 'currency', 'sales_volume', 'taoword', 'coupon', 'couponhref'
        ])
        resolve(data)
      })
    })
  }

  getTopicById(id) {
    // 获取专题信息
    return new Promise((resolve) => {
      basemysql.myquery('SELECT * FROM topics WHERE id=?', id, function (results) {
        let data = util.getarrt(results, [
          'id', 'title', 'cover_img', 'main_img', 'description'
        ], 1)
        resolve(data)
      })
    })
  }

  getTopicIdByName(title) {
    // 获取专题信息
    return new Promise((resolve) => {
      basemysql.myquery('SELECT id FROM topics WHERE title=?', title, function (results) {
        let data = util.getarrt(results, [
          'id',
        ], 1)
        resolve(data)
      })
    })
  }

  getTopicCount() {
    // 获取博客数量
    return new Promise((resolve) => {
      basemysql.myquery('SELECT COUNT(*) AS total FROM topics WHERE is_pub=1', '', function (results) {
        let data = util.getarrt(results, ['total'], 1)
        resolve(data)
      })
    })
  }

  getTopicListByKind(page, size) {
    // 获取分类下的专题信息
    return new Promise((resolve) => {
      // SELECT * FROM topics WHERE kind_id=?
      basemysql.myquery('SELECT * FROM topics WHERE is_pub=1 ORDER BY edit_date DESC LIMIT ?,?', [
        page, size
      ], function (results) {
        let data = util.getarrt(results, [
          'id', 'title', 'cover_img', 'main_img', 'description'
        ])
        resolve(data)
      })
    })
  }
}

module.exports = mysql
