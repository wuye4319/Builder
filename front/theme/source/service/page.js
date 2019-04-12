/**
 * @author nero
 * @date 2018/9/26
 * @desc 数据接口-主题页面
 */

import { fetch } from '../util'
import { APIRoot } from './common'

/** 获取用户数据 **/
export function getUserInfo () {
  return fetch(`${APIRoot}/member`)
}

/** 商品搜索 **/
export function searchProducts (params) {
  const {keywords, pageSize, page, sort} = params
  return fetch(`${APIRoot}/searchpro/${keywords}/${pageSize}/${page}`)
}

/** 获取商品详情 **/
export function productDetail (id) {
  return fetch(`${APIRoot}/products/${id || '91800012857512'}`)
}

/** 加入到购物车 **/
export function add2Cart (params) {
  const {id, spu, sku, count} = params
  return fetch(`${APIRoot}/carts`, {
    method: 'POST',
    credentials: 'include',
    body: {
      'product_id': id,
      'spu_code': spu,
      'sku_code': sku,
      'quantity': count
    }
  })
}

/** 获取购物车数据 **/
export function getCartData () {
  return fetch(`${APIRoot}/carts/list`)
}

/** 选中，取消选中购物车项目 **/
export function selectCartItem ({list, select}) {
  return fetch(`${APIRoot}/carts/select`, {
    method: 'PUT',
    body: {
      'cart_list': list,
      'is_select': select
    }
  })
}

/** 删除，修改购物车项目数量 **/
export function changeCartItem ({id, type, count}) {
  return fetch(`${APIRoot}/carts/change`, {
    method: 'PUT',
    body: {
      'cart_id': id,
      'type': type, // 1:删除,2:更改
      'quantity': count
    }
  })
}

/** order_confirm页面获取购车商品列表 **/
export function getCartList (productIdList) {
  return fetch(`${APIRoot}/carts/list`, {
    method: 'POST',
    body: {cart_list: productIdList}
  })
}

/** 获取购物车商品数量 **/
export function getCartSize () {
  return fetch(`${APIRoot}/carts/size`)
}

/** 生成订单 **/
export function addOrder (params) {
  return fetch(`${APIRoot}/orders`, {
    method: 'POST',
    body: {...params}
  })
}

/** 获取博客列表 **/
export function getBlogs (pageNo, pageSize) {
  return fetch(`${APIRoot}/blog/${pageSize}/${pageNo}`)
}

/** 获取博客列表 **/
export function getBlogDetails (id) {
  return fetch(`${APIRoot}/blog/${id}/`)
}

/** 获取集合列表 **/
export function getCollections ({name = '', id = '', page = 1, pageSize = 10} = {}) {
  return fetch(`${APIRoot}/collections/${pageSize}/${page}/`)
}

/** 获取首页集合模块的集合列表 **/
export function getHomeCollections (collectionIds = []) {
  return fetch(`${APIRoot}/collections/multiple`, {
    method: 'POST',
    body: {collection_ids: collectionIds}
  })
}

/** 获取集合详情 **/
export function fetchTopicsDedails ({id, pageSize, page = 1} = {}) {
  return fetch(`${APIRoot}/collections/${id}/${pageSize}/${page}/`)
}

/** 获取单页数据 **/
export function getSinglePage (id) {
  return fetch(`${APIRoot}/pages/${id}`)
}

// /** 获取页面导航栏数据**/
// export function getMenus (id) {
//     return fetch(`${APIRoot}/menu/${id}`)
// }