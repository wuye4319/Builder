/**
 * @author Alan (曹昌盛)
 * @desc 注册
 */

import React from 'react'
/** modules **/
import Register from '../../../module/Register/Register'

const module = {Register}
/** modules **/
// const config = require('./config.json')

class RegisterPage extends React.Component {
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

window.wrapper(RegisterPage)
