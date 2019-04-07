/**
 * @author Alan (曹昌盛)
 * @desc 登录
 */

import React from 'react'
/** modules **/
import Login from '../../../module/Login/Login'

const module = {Login}
/** modules **/
// const config = require('./config.json')

class LoginPage extends React.Component {
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

window.wrapper(LoginPage)
