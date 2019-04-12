/**
 * @author nero
 * @date 2018/9/26
 * @desc 数据接口-用户中心
 */

import {fetch} from '../util'
import {APIRoot} from './common'

/** 登录 **/
export function login ({eMail, passWord}) {
    return fetch(`${APIRoot}/member/login`, {
        method: 'POST',
        body: {
            'email': eMail,
            'password': passWord
        }
    })
}

/** 注册 **/
export function register ({firstName, lastName, eMail, firstPassword, confirmPassword}) {
    return fetch(`${APIRoot}/member/register`, {
        method: 'POST',
        body: {
            'first_name': firstName,
            'last_name': lastName,
            'email': eMail,
            'password': firstPassword,
            'password_confirmation': confirmPassword
        }
    })
}

/** 登出 **/
export function logout () {
    return fetch(`${APIRoot}/member/logout`)
}

/** 获取地址 **/
export function getAddress () {
    return fetch(`${APIRoot}/address`)
}

/** 获取国家 **/
export function getCountry () {
    return fetch(`${APIRoot}/geo/country`)
}

/** 获取省 **/
export function getState (countryId) {
    return fetch(`${APIRoot}/geo/state`, {
        query: { 'country_id': countryId }
    })
}

/** 操作地址 **/
export function addressAction (params) {
    return fetch(`${APIRoot}/address/${params.id}/${params.type}`, {
        method: 'PUT'
    })
}

/** 新增地址 **/
export function addAddress (params) {
    return fetch(`${APIRoot}/address`, {
        method: 'POST',
        body: params
    })
}

/** 修改地址 **/
export function updateAddress (id, params) {
    return fetch(`${APIRoot}/address/${id}`, {
        method: 'PUT',
        body: params
    })
}

/** 获取邮线列表 **/
export function getDelivery (address_id, cart_list) {
    return fetch(`${APIRoot}/checkouts/shippings`, {
        method: 'POST',
        body: {address_id, cart_list}
    })
}
/** 获取订单列表 **/
export function getOrders (pageSize, page) {
    return fetch(`${APIRoot}/orders/`, {
        query: {
            'per_pagesize': pageSize,
            'page': page
        }
    })
}

/** 订单详情 **/
export function orderDetails (id) {
    return fetch(`${APIRoot}/orders/${id}`)
}

/** 修改用户信息 **/
export function updateUserInfo (params) {
    return fetch(`${APIRoot}/member/`, {
        method: 'POST',
        body: params
    })
}

/** 修改密码 **/
export function updatePassword (params) {
    return fetch(`${APIRoot}/member/pwd`, {
        method: 'POST',
        body: params
    })
}
