/**
 * @author Alan (曹昌盛)
 * @desc 支付页
 */

import React from 'react'
/** modules **/
import Payment from '../../../module/Payment/Payment'

const module = {Payment}
/** modules **/
// const config = require('./config.json')
class PaymentPage extends React.Component {
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

window.wrapper(PaymentPage)
