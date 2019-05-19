/**
 * @author：Nero
 * @desc：商品详情页
 * @paramsDesc: 传入Topics的props说明
 *  config: C端页面对应的builder配置文件
 *  pageMode: C端页面模式 0 桌面版 1 移动版
 *  userInfo: 用户信息
 * @date：2018.4.11
 */

import React from 'react'
import ProductsDetails from '../../../module/ProductsDetails/ProductsDetails'

class Page extends React.Component {
  render() {
    const moduleConfig = this.props.config.module[0]
    const { userInfo, pageMode } = this.props
    return (
      <ProductsDetails
        userInfo={userInfo}
        pageMode={pageMode}
        config={moduleConfig}
      />
    )
  }
}

window.wrapper(Page)
