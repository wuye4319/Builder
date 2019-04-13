/**
 * @author Gavin Yang
 * @desc builder控制器的接口
 */

import {fetch} from '../../source/util'
const APIRoot = 'http://www.test.com/supersell/rest/php/bs/admin/'

/** 获取全部的上架集合**/
export function getCtrlCollection ({ page = 1, pageSize = 1000 } = {}) {
  return fetch(`${APIRoot}section/collection`, {
    query: {
      page,
      per_pagesize: pageSize,
      section_id: '0qk627'
    }
  })
}

/** 获取所有集合 **/
export function getCollections () {
  return fetch(`${APIRoot}collections`)
}

/** 获取页面默认id **/
export function getDefaultId () {
  return fetch(`${APIRoot}settings/pages`)
}

/** 获取一级导航栏 **/
export function getNavigation () {
  return fetch(`${APIRoot}menus`)
}

/** 获取图片图数据**/
export function getImages ({pageSize=10, current=1}={}) {
  return fetch(`${APIRoot}images/index`,{
    method: 'GET',
    query:{
      page: current,
      per_pagesize: pageSize
    }
  })
}