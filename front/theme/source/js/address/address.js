/**
 * @author：Gavin Yang (Y杨伟伟)
 * @desc：地址管理页
 * @date：2018.4.26
 */
import React from 'react'
import Address from '../../../module/Address/Address'

// const config = require('./config.json')

class Page extends React.Component {
  render () {
    const props = {
      pageMode: this.props.pageMode,
      config: this.props.config.module[0]
    }
    return <Address {...this.props} {...props} />
  }
}

window.wrapper(Page)
