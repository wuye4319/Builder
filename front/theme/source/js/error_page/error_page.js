/**
 * @author Alan (曹昌盛)
 * @desc 404页面
 */

import React from 'react'
/** modules **/
import ErrorPage from '../../../module/ErrorPage/ErrorPage'

const module = {ErrorPage}
/** modules **/
// const config = require('./config.json')

class Error_page extends React.Component {
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

window.wrapper(Error_page)
