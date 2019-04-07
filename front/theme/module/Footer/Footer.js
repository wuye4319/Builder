/**
 * @author MG Ding (丁文强)
 * @desc 页底模块
 */
import './Footer.less'
import React from 'react'
import PropTypes from 'prop-types'
import { setClass, color, font, updateColor } from '../../source/util'
// import { getMenus } from '../../source/service/page'

export default class Footer extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  static classPrefix = 'm-footer'
  static defaultBgColor = '#FBFAFA'
  static defaultFontColor = '#302E2F'

  static getDerivedStateFromProps (nextProps, prevState) {
    const {menuId} = nextProps.config

    if (menuId !== prevState.menuId) {
      return {menuId}
    }
    return null
  }

  state = {
    menuList: [], //导航菜单
    menuId: this.props.config.menuId
  }
  // getClientMenu = (id) => {
  //   if (!id) {
  //     this.setState({menuList: []})
  //     return
  //   }
  //   getMenus(id).then(res => {
  //     if (res.state !== 0) {
  //       return
  //     }
  //     this.setState({menuList: [...(res.data || [])]})
  //   })
  // }

  componentDidMount () {
    // this.getClientMenu(this.state.menuId)
  }

  componentDidUpdate (nextProps, prevState) {
    /**
     * 传入的menuId变化时，拉取最新导航信息
     * */
    if (prevState.menuId !== this.state.menuId) {

      // this.getClientMenu(this.state.menuId)
    }
  }

  render () {
    const {classPrefix, defaultBgColor, defaultFontColor} = Footer
    const {config, pageMode} = this.props
    let {name, key, showInfo, infoTitle, infoContent, infoWidth, infoAlign, infoFontSize, colors, bgColor, fontColor} = config

    if (pageMode !== 0) {
      infoWidth = 0
      infoAlign = 'center'
    }
    const {menuList} = this.state
    updateColor({
      'footerBg': {value: colors ? bgColor : defaultBgColor},
      'footer': {value: colors ? fontColor : defaultFontColor}
    }, 'footer-style')

    return (
      <div id={`${name}-${key}`} className={`${classPrefix} ${color.bg('footerBg')} ${color.border('hr')}`}>
        <div className={`${classPrefix}-top ${color.border('hr')} clearfix ${setClass({
          [classPrefix + '-width-' + infoWidth]: infoWidth,
          [classPrefix + '-top-width']: infoWidth
        })}`}>
          <div className={setClass({'l-centerBlock': infoWidth})}>
            {(menuList && menuList.length > 0) && (
              <div className={`${classPrefix}-nav ${color.border('hr')}`}>
                <ul className={setClass({'l-centerBlock': !infoWidth})}>
                  {menuList.map(({menu_url, id, title}) => (
                    <li key={id}>
                      <a
                        className={`${color('footer')} ${font('text')}`}
                        href={menu_url}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showInfo && (
              <div className={`${classPrefix}-message ${classPrefix}-message-${infoFontSize} ${color.border('hr')}`} style={{textAlign: infoAlign}}>
                <div className={setClass({'l-centerBlock': !infoWidth})}>
                  <h3 className={`${color('footer')}`}>{infoTitle}</h3>
                  <p className={`${color('footer')}`}>{infoContent}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={`${classPrefix}-copyright`}>
          <div className={`${classPrefix}-main`}>
            <p className={`${color('footer')} ${font('text')}`}>© 2018 - 2019 copy right is wssso.com</p>
          </div>
        </div>
      </div>
    )
  }
}
