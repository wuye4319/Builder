/**
 * @author MG Ding (丁文强)
 * @desc 搜索结果页
 */

import React from 'react'
/** modules **/
import Single from '../../../module/Single/Single'
const module = {Single}
/** modules **/
// const config = require('./config.json')

class Index extends React.Component {
  render () {
    const {config} = this.props
    return config.module.map((moduleConfig) => {
      const {name, key} = moduleConfig
      const id = `${name}-${key}`

      return (
        <div id={id} key={id}>
          {React.createElement(
            module[name],
            {...this.props, config: moduleConfig}
          )}
        </div>
      )
    })
  }
}

window.wrapper(Index)
