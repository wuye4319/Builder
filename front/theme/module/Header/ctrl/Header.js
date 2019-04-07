/**
 * @author MG Ding (丁文强)
 * @desc 页头编辑器
 */
import React from 'react'
import PropTypes from 'prop-types'
// const {util} = window.supervar

import Input from '../../../../builder/plugin/component/Input'
import Radio from '../../../../builder/plugin/component/Radio'
import Checkbox from '../../../../builder/plugin/component/Checkbox'
import ColorPicker from '../../../../builder/plugin/component/ColorPicker'
import Message from '../../../../builder/plugin/component/Message'
import Selection from '../../../../builder/plugin/component/Selection'

import './Header.less'
import { getNavigation } from '../../../../builder/source/service/api'

const logoImage = '/source/img/logo.png'

class HeaderCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object, // 配置信息
    changeConfig: PropTypes.func, // 更新配置 (param1: 配置，param2: 缓存配置，默认不缓存)
    cacheConfig: PropTypes.func  // 缓存配置
  }
  static classPrefix = 'ctrl-header'
  static logoAlignMap = [
    {name: 'Left', value: 'left'},
    {name: 'Center', value: 'center'}
  ]
  static menuAlignMap = [
    {name: 'Left', value: 'left'},
    {name: 'Center', value: 'center'}
  ]
  static menuColorsMap = [
    {name: 'Theme', value: 0},
    {name: 'Custom', value: 1}
  ]
  state = {
    container: null,
    menuMap: [
      {
        name: 'Main', value: '01'
      }, {
        name: 'None', value: ''
      }
    ] // 导航菜单
  }
  getContainer = () => {
    return this.state.container
  }
  updateConfig = (key, value, cache) => {
    let {config} = this.props
    config[key] = value
    this.props.changeConfig(config, cache)
  }
  handleLogoAlign = (e) => {
    this.updateConfig('logoAlign', e.target.value, true)
  }
  handleChangeMenu = (e) => {
    this.updateConfig('menuId', e.target.value, true)
  }
  handleChangeMenuAlign = (e) => {
    this.updateConfig('menuAlign', e.target.value, true)
  }
  handleChangeMenuColors = (e) => {
    this.updateConfig('menuColors', e.target.value - 0, true)
  }
  handleChangeMenuBg = ({hex}) => {
    this.updateConfig('menuBg', hex, true)
  }
  handleChangeMenuFont = ({hex}) => {
    this.updateConfig('menuFont', hex, true)
  }
  handleChangeCartIcon = (e) => {
    this.updateConfig('cartIcon', e.target.value - 0)
  }
  handleChangeMessageVisible = (e) => {
    this.updateConfig('messageVisible', e.target.checked, true)
  }
  handleChangeMessageOnlyAtHome = (e) => {
    this.updateConfig('messageOnlyAtHome', e.target.checked, true)
  }
  handleChangeMessageCanClose = (e) => {
    this.updateConfig('messageCanClose', e.target.checked, true)
  }
  handleChangeMessage = (e) => {
    let value = e.target.value
    const max = 400

    if (value.length > max) {
      Message.warning(`Up to ${max} characters`)
      value = value.substring(0, max)
    }
    this.updateConfig('message', value)
  }
  handleChangeMessageLink = (e) => {
    let value = e.target.value
    const max = 400

    if (value.length > max) {
      Message.warning(`Up to ${max} characters`)
      value = value.substring(0, max)
    }
    this.updateConfig('messageLink', value)
  }
  handleChangeMessageBg = ({hex}) => {
    this.updateConfig('messageBg', hex, true)
  }
  handleChangeMessageFont = ({hex}) => {
    this.updateConfig('messageFont', hex, true)
  }

  componentDidMount () {
    this.setState({
      container: document.getElementById('header-ctrl-container')
    })
  }

  render () {
    const {classPrefix, logoAlignMap, menuAlignMap, menuColorsMap} = HeaderCtrl
    const {config, cacheConfig} = this.props
    const {
      logo,
      menuId,
      menuBg,
      message,
      menuFont,
      cartIcon,
      logoAlign,
      menuAlign,
      messageBg,
      menuColors,
      messageFont,
      messageLink,
      messageVisible,
      messageCanClose,
      messageOnlyAtHome
    } = config

    let {container, menuMap} = this.state

    return (
      <div className={classPrefix} id='header-ctrl-container'>
        <h2 className='ctrl-card-header'>SETTINGS BAR</h2>
        <div className='ctrl-card'>
          <p>网站LOGO（全站有效）</p>
          <div>
            <Checkbox onChange={(e) => {
              this.updateConfig('logo', e.target.checked ? logoImage : '', true)
            }} checked={!!logo}>图片Logo</Checkbox>
            {!!logo && (
              <img src={logo} style={{maxWidth: 240, maxHeight: 40, marginTop: 10}}/>
            )}
          </div>

          {/* <p>LOGO位置</p>
          <select value={logoAlign} onChange={this.handleLogoAlign}>
            {logoAlignMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </select> */}
        </div>

        <div className='ctrl-card'>
          <p>设置菜单</p>
          <Selection value={menuId} onChange={this.handleChangeMenu}>
            {menuMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>

          <p>菜单位置</p>
          <Selection value={menuAlign} onChange={this.handleChangeMenuAlign}>
            {menuAlignMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>

          <p>导航配色</p>
          <Selection value={menuColors} onChange={this.handleChangeMenuColors}>
            {menuColorsMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>
          {!!menuColors && !!container && (
            <div>
              <ColorPicker
                color={menuBg}
                placement='topLeft'
                label='Background Color'
                onChangeComplete={this.handleChangeMenuBg}
                getContainer={this.getContainer}
                // onVisibleChange={(visible) => {
                //   this.colorPickVisibleChange(visible, 'menuBg', menuBg)
                // }}
              />
              <ColorPicker
                color={menuFont}
                placement='topLeft'
                label='Text Color'
                onChangeComplete={this.handleChangeMenuFont}
                getContainer={this.getContainer}
                // onVisibleChange={(visible) => {
                //   this.colorPickVisibleChange(visible, 'menuFont', menuFont)
                // }}
              />
            </div>
          )}
          <p>购物车图标</p>
          <Radio.Group value={cartIcon + ''} onChange={this.handleChangeCartIcon}>
            <Radio value='0'>购物车</Radio>
            <Radio value='1'>购物袋</Radio>
          </Radio.Group>
        </div>

        <div className='ctrl-card'>
          <p>公告栏</p>
          <div>
            <Checkbox checked={messageVisible} onChange={this.handleChangeMessageVisible}>显示公告栏</Checkbox>
          </div>
          {messageVisible && (
            <React.Fragment>
              <Checkbox checked={messageOnlyAtHome} onChange={this.handleChangeMessageOnlyAtHome}>仅限主页</Checkbox>
              <Checkbox checked={messageCanClose} onChange={this.handleChangeMessageCanClose}>启用关闭</Checkbox>
              <p>公告文本</p>
              <Input
                value={message}
                onChange={this.handleChangeMessage}
                onBlur={(e) => {
                  if (this._message !== e.target.value) cacheConfig()
                }}
                onFocus={() => {
                  this._message = message
                }}
              />
              <p>公告链接</p>
              <Input
                value={messageLink}
                onChange={this.handleChangeMessageLink}
                onBlur={(e) => {
                  if (this._messageLink !== e.target.value) cacheConfig()
                }}
                onFocus={() => {
                  this._messageLink = messageLink
                }}
              />
              <p>颜色设置</p>
              {!!container && (
                <React.Fragment>
                  <ColorPicker
                    color={messageBg}
                    placement='topLeft'
                    label='Background Color'
                    onChangeComplete={this.handleChangeMessageBg}
                    getContainer={this.getContainer}
                    // onVisibleChange={(visible) => {
                    //   this.colorPickVisibleChange(visible, 'messageBg', messageBg)
                    // }}
                  />
                  <ColorPicker
                    color={messageFont}
                    placement='topLeft'
                    label='Text Color'
                    onChangeComplete={this.handleChangeMessageFont}
                    getContainer={this.getContainer}
                    // onVisibleChange={(visible) => {
                    //   this.colorPickVisibleChange(visible, 'messageFont', messageFont)
                    // }}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default HeaderCtrl
