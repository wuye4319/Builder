/**
 * @author Alan (曹昌盛)
 * @desc 博客列表
 */

import React from 'react'
/** modules **/
import Blogs from '../../../module/Blogs/Blogs'

const module = {Blogs}
/** modules **/
// const config = require('./config.json')

class Blog extends React.Component {
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

window.wrapper(Blog)
