/**
 * @author Alan (曹昌盛)
 * @desc 重置密码
 */

import React from 'react'
/** modules **/
import ResetPassword from '../../../module/ResetPassword/ResetPassword'

const module = {ResetPassword}
/** modules **/
// const config = require('./config.json')

class Reset_password extends React.Component {
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

window.wrapper(Reset_password)
