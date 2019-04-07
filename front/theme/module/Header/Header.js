/**
 * @author MG Ding (丁文强)
 * @desc 页头模块
 */
import './Header.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../plugin/component/Icon'
import Link from '../../plugin/component/Link'
import Button from '../../plugin/component/Button'
import Input from '../../plugin/component/Input'
import { setClass, color, font, fetchLite } from '../../source/util'
import { logout } from '../../source/service/user'

// import { getMenus } from '../../source/service/page'
const mymenuList = [
  {id: '01', title: '首页', menu_url: '/home'},
  {id: '01', title: '专题', menu_url: '/topics'},
  {id: '01', title: '美图', menu_url: '/blogs'}
]

class Header extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  static classPrefix = 'm-header'

  static getDerivedStateFromProps (nextProps, prevState) {
    const {menuId} = nextProps.config

    if (menuId !== prevState.menuId) {
      return {menuId}
    }
    return null
  }

  constructor (props) {
    super(props)
    this.state = {
      showDropDown: false,
      moveIn: false,
      moveOut: false,
      logged: false,
      isHomePage: /^(\/|\/page\/home\/)$/.test(window.location.pathname),
      showSearch: false,
      menuId: this.props.config.menuId, // 导航ID,用于查询导航栏列表信息
      menuList: mymenuList //导航菜单
    }
  }

  handleToggleDropDown = (cb) => {
    this.setState(({showDropDown, moveIn, moveOut}) => {
      if (moveIn || moveOut) return null
      if (showDropDown) {
        window.document.body.style.overflowY = 'auto'
        window.removeEventListener('touchmove', this.preventTouch, false)
      } else {
        window.document.body.style.overflowY = 'hidden'
        window.addEventListener('touchmove', this.preventTouch, false)
      }
      return {showDropDown: !showDropDown, moveIn: !showDropDown, moveOut: showDropDown}
    }, () => {
      if (typeof cb === 'function') {
        cb()
      }
    })
  }
  handleToggleSearch = () => {
    let action = () => {
      this.setState(({showSearch}) => {
        if (showSearch) {
          window.document.body.style.overflowY = 'auto'
          window.removeEventListener('touchmove', this.preventTouch, false)
        } else {
          window.document.body.style.overflowY = 'hidden'
          window.addEventListener('touchmove', this.preventTouch, false)
        }
        return {showSearch: !showSearch}
      })
    }

    if (this.state.showDropDown) {
      this.handleToggleDropDown(action)
    } else {
      action()
    }
  }
  preventTouch = (e) => {
    if (e.cancelable) {
      if (!e.defaultPrevented) {
        e.preventDefault()
      }
    }
  }
  handleLogin = () => {
    Link.goTo(`/login/?ref=${encodeURIComponent(window.location.href)}`)
  }
  handleLogout = () => {
    fetchLite(logout, {
      done: () => {
        window.location.reload()
      }
    })
  }
  renderName = () => {
    const {userInfo} = this.props
    let res = ''

    if (userInfo && userInfo.login) {
      const {first_name = '', last_name = '', email, phone} = userInfo
      if (first_name || last_name) {
        res = `${first_name} ${last_name}`.trim()
      } else {
        res = email || phone
      }
    }

    return res || ''
  }
  renderPc = (fontColor) => {
    const {classPrefix} = Header
    const {showSearch, menuList} = this.state
    // eslint-disable-next-line no-unused-vars
    const {logo, logoAlign, menuAlign, cartIcon} = this.props.config
    const logged = this.props.userInfo.login

    return (
      <React.Fragment>
        {showSearch
          ? <Search classPrefix={classPrefix} hideSearch={this.handleToggleSearch}/>
          : (
            <div className={`${classPrefix}-main`} style={{justifyContent: 'space-between'}}>
              <h1 className={`${classPrefix}-logo`}>
                <Link className={`${color('title')} ${font('title')}`} href='/home/'>
                  {logo ? <img src={logo}/> : <span>微说说</span>}
                </Link>
              </h1>
              <Nav classPrefix={classPrefix} align={menuAlign} fontColor={fontColor} menuList={menuList}/>
              <div className={`${classPrefix}-toolbar`} style={menuList ? null : {flexGrow: 1}}>
                {!!logged && (
                  <Link className={`${color('icon')} ${font('text')}`} href='/orders/' style={fontColor}> Orders </Link>
                )}
                <a className={`${color('icon')} ${font('text')}`} href='javascript:;' onClick={() => {
                  // Link.goTo('/home/?1=2#asd')
                }} style={fontColor}>
                  <Icon type='search' style={fontColor} onClick={this.handleToggleSearch}/>
                </a>
                {/*<Link*/}
                {/*className={`${color('icon')} ${font('text')}`}*/}
                {/*href='/cart/'*/}
                {/*style={fontColor}*/}
                {/*>*/}
                {/*<Icon type={cartIcon ? 'bag' : 'cart-o'} style={fontColor}/>({this.props.cartInfo.size})*/}
                {/*</Link>*/}
                {/*<a*/}
                {/*className={`${color('icon')} ${font('text')}`}*/}
                {/*href='javascript:;'*/}
                {/*onClick={logged ? this.handleLogout : this.handleLogin}*/}
                {/*style={fontColor}*/}
                {/*>*/}
                {/*<Icon type='user' style={fontColor}/>*/}
                {/*{logged ? 'LOG OUT' : 'LOGIN'}*/}
                {/*</a>*/}
              </div>
            </div>
          )
        }
      </React.Fragment>
    )
  }
  renderMobile = (fontColor, bgColor) => {
    const {classPrefix} = Header
    const {showDropDown, moveIn, moveOut, showSearch, menuList} = this.state
    const {logo, cartIcon} = this.props.config
    const logged = this.props.userInfo.login

    return (
      <div
        className={setClass({
          [`${classPrefix}-mobile`]: 1,
          [`${classPrefix}-mobile-showDropDown`]: showDropDown || moveOut,
          [`${classPrefix}-mobile-logged`]: logged
        })}
      >
        <div className={`${classPrefix}-mobile-top ${color.bg('bg')} ${color.border('hr')}`} style={bgColor}>
          {showSearch
            ? <Search classPrefix={classPrefix} hideSearch={this.handleToggleSearch}/>
            : (
              <React.Fragment>
                <h1 className={`${classPrefix}-mobile-logo ${color('title')} ${font('title')}`}>
                  {logo ? <img src={logo}/> : <span>SHOP NAME</span>}
                </h1>
                <div className={`${classPrefix}-mobile-buttons`}>
                  <Icon
                    type={showDropDown ? 'close' : 'menu'}
                    className={`${classPrefix}-mobile-menuIcon ${color('icon')}`}
                    onClick={this.handleToggleDropDown}
                    style={fontColor}
                  />
                  <span className={`${classPrefix}-mobile-icon ${color('icon')}`}>
                  <Icon type='search' style={fontColor} onClick={this.handleToggleSearch}/>
                    {/*<Link*/}
                    {/*className={`${color('icon')}`}*/}
                    {/*style={fontColor}*/}
                    {/*href='/cart/'*/}
                    {/*>*/}
                    {/*<Icon type={cartIcon ? 'bag' : 'cart-o'} style={fontColor}/>({this.props.cartInfo.size})*/}
                    {/*</Link>*/}
                </span>
                </div>
              </React.Fragment>
            )
          }
        </div>
        <div className={setClass({
          [`${classPrefix}-mobile-bottom`]: 1,
          [`${color.bg('bg')}`]: 1,
          [`${classPrefix}-mobile-moveIn`]: moveIn,
          [`${classPrefix}-mobile-moveOut`]: moveOut
        })}
             ref={this.getDropDown}
        >
          {/*{logged*/}
          {/*? (*/}
          {/*<div className={`avatarBox ${color.border('hr')}`}>*/}
          {/*<Link className='avatar' href='/account_information/'><img*/}
          {/*src='https://wwc.alicdn.com/avatar/getAvatar.do?userId=394673836&width=200&height=200&type=sns' alt='avatar'/></Link>*/}
          {/*<p className={`${color('text')} ${font('subTitle')}`}>{this.renderName()}</p>*/}
          {/*</div>*/}
          {/*)*/}
          {/*: (*/}
          {/*<div className={`avatarBox ${color.border('hr')}`}>*/}
          {/*<div className='avatar-none'>*/}
          {/*<Icon type='user'/>*/}
          {/*</div>*/}
          {/*<Button type='ghost' onClick={this.handleLogin}>LOGIN</Button>*/}
          {/*</div>*/}
          {/*)*/}
          {/*}*/}
          <div className='navBox'>
            <Nav classPrefix={classPrefix} menuList={menuList}/>
          </div>
          <div className='btnWrapper'>{!!logged && <Button type='ghost' onClick={this.handleLogout}>LOG OUT</Button>}</div>
        </div>
      </div>
    )
  }
  getDropDown = (ref) => { this.dropDown = ref }
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
    const animationend = (e) => {
      if (this.dropDown === e.srcElement) {
        this.setState({moveIn: false, moveOut: false})
      }
    }
    document.addEventListener('animationend', animationend, false)
    // 请求页面导航列表
    // this.getClientMenu(this.state.menuId)
  }

  componentDidUpdate (nextProps, prevState) {
    /**
     * 传入的menuId变化时，拉取最新导航信息
     * */
    if (prevState.menuId !== this.state.menuId) {
      if (this.state.menuId) {
        this.setState({menuList: mymenuList})
      } else {
        this.setState({menuList: []})
      }
    }

    /**
     * 清除下拉展开时的影响
     * 解决手机版头部下拉展开状态下直接切换到pc版（没有收起下拉）时，页面不能滚动的问题
     * */
    if (this.props.pageMode === 1 && nextProps.pageMode === 0) {
      window.document.body.style.overflowY = 'auto'
      this.setState({showDropDown: false})
    }
  }

  render () {
    const {classPrefix} = Header
    const {config, pageMode} = this.props
    const {name, key, menuColors, menuFont, menuBg, messageVisible, messageOnlyAtHome, messageCanClose, message, messageLink, messageBg, messageFont} = config
    const fontColor = menuColors ? {color: menuFont} : null
    const bgColor = menuColors ? {backgroundColor: menuBg} : null
    const {isHomePage, showSearch} = this.state

    const renderAnno = () => {
      return messageVisible && (messageOnlyAtHome ? isHomePage : true) && (
        <Announcement
          classPrefix={classPrefix}
          messageCanClose={messageCanClose}
          message={message}
          messageLink={messageLink}
          messageBg={messageBg}
          messageFont={messageFont}
        />
      )
    }

    return (
      <React.Fragment>
        {pageMode === 0 && renderAnno()}
        <div id={`${name}-${key}`}>
          <div
            className={setClass({
              [classPrefix]: 1,
              [color.border('hr')]: 1,
              [color.bg('bg')]: 1,
              [`${classPrefix}-showSearch`]: showSearch
            })} style={bgColor}>
            {pageMode ? this.renderMobile(fontColor, bgColor) : this.renderPc(fontColor)}
          </div>
          {showSearch && <div className={`${classPrefix}-mask`} onClick={this.handleToggleSearch}/>}
        </div>
        {pageMode === 1 && renderAnno()}
      </React.Fragment>
    )
  }
}

const Nav = (props) => {
  const {menuList} = props

  if (!menuList || menuList.length === 0) {
    return null
  }
  const {classPrefix, align, fontColor} = props
  return (
    <div className={`${classPrefix}-nav`} style={{textAlign: align}}>
      {
        menuList.map((item, index) => (
          <Link key={index} style={fontColor} href={item.menu_url} className={`${color('text')} ${font('text')}`}>
            {
              item.title
            }
          </Link>
        ))
      }
    </div>
  )
}

class Announcement extends React.Component {
  state = {
    show: true
  }
  handleClose = () => {
    if (window.editMod) return
    this.setState({show: false})
  }

  render () {
    const {classPrefix, messageCanClose, message, messageLink, messageBg, messageFont} = this.props
    const {show} = this.state
    return show
      ? (
        <div
          className={`${classPrefix}-anno ${setClass({[`${classPrefix}-anno-hasClose`]: messageCanClose})}`}
          style={{backgroundColor: messageBg, color: messageFont}}
        >
          <Link href={messageLink || 'javascript:;'}>{message}</Link>
          {messageCanClose && <Icon type='close' onClick={this.handleClose} style={{color: 'inherit'}}/>}
        </div>
      )
      : null
  }
}

class Search extends React.Component {
  handleSearch = (event) => {
    let value = this.input.value.trim()
    let currKey = event.keyCode || event.which || event.charCode

    if (currKey === 13) {
      Link.goTo(`/search/?keywords=${encodeURIComponent(value)}`)
      event.preventDefault()
    }
  }
  getInput = (ref) => { this.input = ref }

  render () {
    const {classPrefix, hideSearch} = this.props
    return (
      <div className={`${classPrefix}-search l-centerBlock`}>
        <div>
          <Icon type='search' className={`${classPrefix}-search-icon`}/>
          <Input
            getInput={this.getInput}
            onKeyPress={this.handleSearch}
            autoFocus
            clearIcon
          />
        </div>
        <span onClick={hideSearch} className={color('subText')}>cancel</span>
      </div>
    )
  }
}

export default Header
