/**
 * @author Nero
 * @desc 博客详情
 */

import React from 'react'
/** modules **/
import BlogDetails from '../../../module/BlogDetails/BlogDetails'
const module = {BlogDetails}
/** modules **/
// const config = require('./config.json')

class Blogdetails extends React.Component {
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

window.wrapper(Blogdetails)
