/**
 * @author Alan (曹昌盛)
 * @desc 邮件发送结果
 */

import React from 'react'
/** modules **/
import EmailResult from '../../../module/EmailResult/EmailResult'

const module = {EmailResult}
/** modules **/
// const config = require('./config.json')

class Email_result extends React.Component {
  render () {
    const {config} = this.props
    // return <Cart {...this.props} />
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

window.wrapper(Email_result)
