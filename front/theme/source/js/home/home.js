/**
 * @author MG Ding (丁文强)
 * @desc 首页
 */

import React from 'react'
/** modules **/
import SlideShow from '../../../module/SlideShow/SlideShow'
import HomeBlog from '../../../module/HomeBlog/HomeBlog'
import ImageWithText from '../../../module/ImageWithText/ImageWithText'
import HomeTopicsModule from '../../../module/HomeTopicsModule/HomeTopicsModule'
import FeaturedCollection from '../../../module/FeaturedCollection/FeaturedCollection'
const module = {SlideShow, ImageWithText, HomeTopicsModule, HomeBlog, FeaturedCollection}
/** modules **/
// const config = require('./config.json')

class Home extends React.Component {
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

window.wrapper(Home)
