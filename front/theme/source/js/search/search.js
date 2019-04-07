/**
 * @author MG Ding (丁文强)
 * @desc 搜索结果页
 */

import React from 'react'
/** modules **/
import Search from '../../../module/Search/Search'
const module = {Search}
/** modules **/
// const config = require('./config.json')

class SearchPage extends React.Component {
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

window.wrapper(SearchPage)
