/**
 * @author MG Ding (丁文强)
 * @desc 页底编辑器
 */
import React from 'react'
// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// import Select from '../../../../builder/plugin/component/Select'
import Checkbox from '../../../../builder/plugin/component/Checkbox'
import Input from '../../../../builder/plugin/component/Input'
import Message from '../../../../builder/plugin/component/Message'
import ColorPicker from '../../../../builder/plugin/component/ColorPicker'
import Selection from '../../../../builder/plugin/component/Selection'
import Text from '../../../../builder/plugin/component/Text'
import './Footer.less'
// const {util} = window.supervar

// import { getNavigation } from '../../../../builder/source/service/api'

class FooterCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    changeConfig: PropTypes.func.isRequired
  }
  static defaultProps = {
    changeConfig: () => {}
  }
  static infoWidthMap = [
    {name: '50%', value: 1},
    {name: '66%', value: 2},
    {name: '75%', value: 3},
    {name: '100%', value: 0}
  ]
  static infoAlignMap = [
    {name: 'Left', value: 'left'},
    {name: 'Center', value: 'center'},
    {name: 'Right', value: 'right'}
  ]
  static infoFontSizeMap = [
    {name: 'Small', value: 'small'},
    {name: 'Medium', value: 'medium'},
    {name: 'Large', value: 'large'}
  ]
  static classPrefix = 'ctrl-footer'
  state = {
    container: null,
    menuMap: [] //导航菜单
  }
  updateConfig = (key, value, cache) => {
    let {config} = this.props
    config[key] = value
    this.props.changeConfig(config, cache)
  }
  handleChangeMenu = (e) => {
    this.updateConfig('menuId', e.target.value, true)
  }
  handleChangeShowInfo = (e) => {
    this.updateConfig('showInfo', e.target.checked, true)
  }
  handleChangeInfoTitle = (e) => {
    let value = e.target.value
    const max = 200

    if (value.length > max) {
      Message.warning(`Up to ${max} characters`)
      value = value.substring(0, max)
    }

    this.updateConfig('infoTitle', value)
  }
  handleChangeInfoContent = (e) => {
    // let value = e.target.value
    let value = e
    const max = 600

    if (value.length > max) {
      Message.warning(`Up to ${max} characters`)
      value = value.substring(0, max)
    }

    this.updateConfig('infoContent', value)
  }
  handleChangeInfoWidth = (e) => {
    this.updateConfig('infoWidth', e.target.value - 0, true)
  }

  handleChangeInfoAlign = (e) => {
    this.updateConfig('infoAlign', e.target.value, true)
  }

  handleChangeInfoFontSize = (e) => {
    this.updateConfig('infoFontSize', e.target.value, true)
  }

  handleChangeColors = (e) => {
    this.updateConfig('colors', e.target.value - 0, true)
  }

  handleChangeBgColor = ({hex}) => {
    this.updateConfig('bgColor', hex, true)
  }

  handleChangeFontColor = ({hex}) => {
    this.updateConfig('fontColor', hex, true)
  }

  // handleVisibleChange = (visible) => {
  //   !visible && window.myreflux.trigger('configChange', null, true)
  // }

  // getContainer = (ref) => ReactDOM.findDOMNode(this.container)
  // getContainer = (ref) => this.container.getDOMNode()
  getContainer = () => {
    return this.state.container
  }

  componentDidMount () {
    this.setState({
      container: document.getElementById('footer-ctrl-container')
    })
    // getNavigation().then(res => {
    //   if (res.state !== 0) {
    //     return
    //   }
    //
    //   if (!res.data || !res.data.data || res.data.data.length === 0) {
    //     return
    //   }
    //
    //   // 二期自建店暂时只处理一级菜单
    //   this.setState({
    //     menuMap: [...res.data.data.map(item => ({value: item.id, name: item.title})), {value: '', name: 'None'}]
    //   })
    // })
  }

  render () {
    const {classPrefix, infoWidthMap, infoAlignMap, infoFontSizeMap} = FooterCtrl
    const {config, cacheConfig} = this.props
    const {menuId, showInfo, infoTitle, infoContent, infoWidth, infoAlign, infoFontSize, colors, bgColor, fontColor} = config
    const {container, menuMap} = this.state

    return (
      <div className={classPrefix} id='footer-ctrl-container'>
        <h2 className='ctrl-card-header'>SETTINGS BAR</h2>
        <div className='ctrl-card'>
          <p>菜单设置</p>
          <Selection value={menuId} onChange={this.handleChangeMenu}>
            {menuMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>
        </div>

        <div className='ctrl-card'>
          <Checkbox checked={showInfo} onChange={this.handleChangeShowInfo}>启用信息展示</Checkbox>
          {showInfo && (
            <React.Fragment>
              <p>标题</p>
              <Input
                value={infoTitle}
                onChange={this.handleChangeInfoTitle}
                onBlur={(e) => {
                  if (this._infoTitle !== e.target.value) cacheConfig()
                }}
                onFocus={() => {
                  this._infoTitle = infoTitle
                }}
              />
              <p>文本</p>
              <Text
                value={infoContent}
                onChange={this.handleChangeInfoContent}
                onBlur={(e) => {
                  if (this._infoContent !== e.target.value) cacheConfig()
                }}
                onFocus={() => {
                  this._infoContent = infoContent
                }}
              />
              <p>容器大小设置</p>
              <Selection value={infoWidth} onChange={this.handleChangeInfoWidth}>
                {infoWidthMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
              </Selection>
              <p>文本对齐</p>
              <Selection value={infoAlign} onChange={this.handleChangeInfoAlign}>
                {infoAlignMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
              </Selection>
              <p>文本大小</p>
              <Selection value={infoFontSize} onChange={this.handleChangeInfoFontSize}>
                {infoFontSizeMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
              </Selection>
            </React.Fragment>
          )}
        </div>

        <div className='ctrl-card'>
          <p>配色</p>
          <Selection value={colors} onChange={this.handleChangeColors}>
            <option value={0}>Theme</option>
            <option value={1}>Custom</option>
          </Selection>
          {!!colors && !!container && (
            <div>
              <ColorPicker
                color={bgColor}
                placement='topLeft'
                onChangeComplete={this.handleChangeBgColor}
                label='Background Color'
                // onVisibleChange={(visible) => {
                //   if (visible) {
                //     this._bgColor = bgColor
                //   } else if (bgColor !== this._bgColor) {
                //     cacheConfig()
                //   }
                // }}
                getContainer={this.getContainer}
              />
              <ColorPicker
                color={fontColor}
                placement='topLeft'
                onChangeComplete={this.handleChangeFontColor}
                label='Font Color'
                // onVisibleChange={(visible) => {
                //   if (visible) {
                //     this._fontColor = fontColor
                //   } else if (fontColor !== this._fontColor) {
                //     cacheConfig()
                //   }
                // }}
                getContainer={this.getContainer}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default FooterCtrl
