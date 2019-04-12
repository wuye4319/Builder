/**
 * @author nero
 * @date 2018/9/26
 * @desc 数据接口-购买流程
 */

import {fetch} from '../util'
import {APIRoot} from './common'

/** 收银台 **/
export function getTrade (tradeNo) {
  return fetch(`${APIRoot}/payment/trade/${tradeNo}`)
}

/** 一期模拟支付 **/
export function payment (tradeNo) {
  return fetch(`${APIRoot}/payment/test/${tradeNo}`, {
    method: 'PUT'
  })
}
