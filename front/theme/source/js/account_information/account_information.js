/**
 * @author Alan (曹昌盛)
 * @desc 用户中心账号信息
 */

import React from 'react'

/** modules **/
import AccountInformation from '../../../module/AccountInformation/AccountInformation'
const module = {AccountInformation}

// const config = require('./config.json')

class UserCenterAccountInformation extends React.Component {
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

window.wrapper(UserCenterAccountInformation)
