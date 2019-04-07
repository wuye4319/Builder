/**
 * @author Alan (曹昌盛)
 * @desc 支付结果页
 */

import React from 'react'
// import './home.less'
/** modules **/
import PayResult from '../../../module/PayResult/PayResult'

const module = {PayResult}
/** modules **/
// const config = require('./config.json')

class PayResultPage extends React.Component {
  render () {
    const {config} = this.props
    return (
      <div>
        {config.module.map((moduleConfig) => {
          const {name, key} = moduleConfig
          const id = `${name}-${key}`
          return (
            <div id={id} key={id}>
              {React.createElement(
                module[name],
                {
                  ...this.props,
                  config: moduleConfig
                }
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

window.wrapper(PayResultPage)
