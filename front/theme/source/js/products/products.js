/**
 * @author MG Ding (丁文强)
 * @desc 商品详情页
 */

import React from 'react'
/** modules **/
import Products from '../../../module/Products/Products'
const module = {Products}
/** modules **/
// const config = require('./config.json')

class productsPage extends React.Component {
  render () {
    const {config} = this.props
    return config.module.map((moduleConfig) => {
      const {name, key} = moduleConfig
      const id = `${name}-${key}`

      return (
        <div id={id} key={id}>
          {React.createElement(
            module[name],
            {...this.props, config: moduleConfig}
          )}
        </div>
      )
    })
  }
}

window.wrapper(productsPage)
