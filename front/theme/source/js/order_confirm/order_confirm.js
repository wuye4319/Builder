/**
 * @author：Gavin Yang (Y杨伟伟)
 * @desc：订单确认页
 * @date：2018.3.26
 */

import React from 'react'
import OrderConfirm from '../../../module/OrderConfirm/OrderConfirm'

// const config = require('./config.json')

class Page extends React.Component {
  render () {
    return <OrderConfirm {...this.props} />
  }
}

window.wrapper(Page)
