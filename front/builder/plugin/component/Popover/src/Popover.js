/**
 * @author MG Ding (丁文强)
 * @desc Popover (气泡卡片)
 */
import './Popover.less'
import React, {Fragment, cloneElement} from 'react'
import ReactDOM, {createPortal} from 'react-dom'
import {setClass, getDomPosition} from '../../../../source/util'
import PropTypes from 'prop-types'

/**
 * placement:
 * popover相对于内部元素的位置
 * [x轴, y轴]
 * x轴(1左侧 2与左边对齐 3居中 4与右边对齐 5右侧)
 * y轴(1上方 2与上边对齐 3居中 4与下边对齐 5下方)
 * **/
const placement = {
  'top': [3, 1],
  'left': [1, 3],
  'right': [5, 3],
  'bottom': [3, 5],
  'topLeft': [2, 1],
  'topRight': [4, 1],
  'bottomLeft': [2, 5],
  'bottomRight': [4, 5],
  'leftTop': [1, 2],
  'leftBottom': [1, 4],
  'rightTop': [5, 2],
  'rightBottom': [5, 4]
}

class Popover extends React.Component {
  static propTypes = {
    defaultVisible: PropTypes.bool, // 默认显示
    mouseEnterDelay: PropTypes.number, // 显示延迟
    mouseLeaveDelay: PropTypes.number, // 隐藏延迟
    placement: PropTypes.oneOf(Object.keys(placement)), // 出现位置
    trigger: PropTypes.oneOf(['hover', 'focus', 'click']), // 触发方式
    visible: PropTypes.bool, // 受控制的显示
    onVisibleChange: PropTypes.func, // 回调
    afterClose: PropTypes.func,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element
    ]), // 标题
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element
    ]).isRequired, // 内容
    children: PropTypes.element.isRequired, // 单个子元素
    getContainer: PropTypes.func,
    fadeIn: PropTypes.bool // 是否有淡入淡出动画
  }
  static defaultProps = {
    defaultVisible: false,
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    placement: 'top',
    trigger: 'hover',
    fadeIn: true,
    onVisibleChange: () => {},
    getContainer: () => window.document.body
  }
  static classPrefix = 'bc-popover'
  static bodyClick = ((e) => {
    for (let name in Popover.popoverCollection) {
      let popover = Popover.popoverCollection[name]
      popover.props.trigger === 'click' && popover.handleOutClick(e)
    }
  })
  static popoverCollection = {}
  state = {
    n: 0,
    visible: false
  }
  left = -1000
  top = 0
  timer = null
  id = Math.random()
  fadeIn = false
  fadeOut = false
  timerFadeIn = null // 入场动画timer
  timerFadeOut = null // 出场动画timer
  removeFadeIn = () => {
    this.fadeIn = false
    this.myRender()
  }
  removeFadeOut = () => {
    this.fadeOut = false
    this.myRender()
    this.props.afterClose && this.props.afterClose()
  }
  myRender = () => {
    this.setState({n: Date.now()})
  }
  getChildNode = () => {
    return ReactDOM.findDOMNode(this.child)
  }
  getPopoverNode = () => {
    return ReactDOM.findDOMNode(this.popover)
  }
  getPosition = () => {
    const child = this.getChildNode()
    const popover = this.getPopoverNode()
    const [x, y] = placement[this.props.placement]

    const childPos = getDomPosition(child, this.props.getContainer())
    const childWidth = child.offsetWidth
    const childHeight = child.offsetHeight

    const popoverWidth = popover.offsetWidth
    const popoverHeight = popover.offsetHeight

    return {
      left: do {
        let offset = 0
        switch (x) {
          case 1:
            offset = -popoverWidth
            break
          case 2:
            offset = 0
            break
          case 3:
            offset = (childWidth - popoverWidth) / 2
            break
          case 4:
            offset = childWidth - popoverWidth
            break
          case 5:
            offset = childWidth
            break
        }
        parseInt(childPos.left + offset)
      },
      top: do {
        let offset = 0
        switch (y) {
          case 1:
            offset = -popoverHeight
            break
          case 2:
            offset = 0
            break
          case 3:
            offset = (childHeight - popoverHeight) / 2
            break
          case 4:
            offset = childHeight - popoverHeight
            break
          case 5:
            offset = childHeight
            break
        }
        parseInt(childPos.top + offset)
      }
    }
  }
  setPosition = () => {
    const {left, top} = this.getPosition()
    this.left = left
    this.top = top
  }
  toggle = (v) => {
    this.setState(({visible}) => {
      if (this.props.fadeIn) {
        if (v && !visible) {
          this.fadeIn = true
          this.props.onVisibleChange(true)
          clearTimeout(this.timerFadeIn)
          this.timerFadeIn = setTimeout(this.removeFadeIn, 300)
        } else if (!v && visible) {
          this.fadeOut = true
          this.props.onVisibleChange(false)
          clearTimeout(this.timerFadeOut)
          this.timerFadeOut = setTimeout(this.removeFadeOut, 300)
        }
      } else {
        this.props.onVisibleChange(v && !visible)
      }
      return visible === v ? null : {visible: v}
    })
  }
  delayAction = (action, delay) => {
    return setTimeout(action, this.props[delay] * 1000)
  }
  eventFromChild = (e) => {
    const child = this.getChildNode()
    let {srcElement} = e.nativeEvent
    let fromChild = false

    while (srcElement && !fromChild) {
      if (srcElement === child) fromChild = true
      srcElement = srcElement.parentNode
    }

    return fromChild
  }
  handleMouseEnter = (e) => {
    e.persist()
    const action = () => {
      const {onMouseEnter} = this.props.children.props
      onMouseEnter && this.eventFromChild(e) && onMouseEnter(e)
      const {onMouseEnter: _onMouseEnter} = this.props
      _onMouseEnter && _onMouseEnter()
      this.toggle(true)
    }
    clearTimeout(this.timer)
    this.timer = this.delayAction(action, 'mouseEnterDelay')
  }
  handleMouseLeave = (e) => {
    e.persist()
    const action = () => {
      const {onMouseLeave} = this.props.children.props
      onMouseLeave && this.eventFromChild(e) && onMouseLeave(e)
      const {onMouseLeave: _onMouseLeave} = this.props
      _onMouseLeave && _onMouseLeave()
      this.toggle(false)
    }
    clearTimeout(this.timer)
    this.timer = this.delayAction(action, 'mouseLeaveDelay')
  }
  handleFocus = (e) => {
    e.persist()
    const action = () => {
      const {onFocus} = this.props.children.props
      onFocus && this.eventFromChild(e) && onFocus(e)
      const {onFocus: _onFocus} = this.props
      _onFocus && _onFocus()
      this.toggle(true)
    }
    clearTimeout(this.timer)
    this.timer = this.delayAction(action, 'mouseEnterDelay')
  }
  handleBlur = (e) => {
    e.persist()
    const action = () => {
      const {onBlur} = this.props.children.props
      onBlur && this.eventFromChild(e) && onBlur(e)
      const {onBlur: _onBlur} = this.props
      _onBlur && _onBlur()
      this.toggle(false)
    }
    clearTimeout(this.timer)
    this.timer = this.delayAction(action, 'mouseLeaveDelay')
  }
  handleClick = (e) => {
    e.persist()
    const action = () => {
      const {onClick} = this.props.children.props
      onClick && this.eventFromChild(e) && onClick(e)
      const {onClick: _onClick} = this.props
      _onClick && _onClick()
      this.toggle(true)
    }
    clearTimeout(this.timer)
    this.timer = this.delayAction(action, 'mouseEnterDelay')
  }
  handleOutClick = (e) => {
    const {visible: stateVisible} = this.state

    if (stateVisible) {
      let {srcElement} = e
      const child = this.getChildNode()
      const popover = this.getPopoverNode()

      let force = false

      while (srcElement && !force) {
        if (srcElement === child || srcElement === popover) force = true
        srcElement = srcElement.parentNode
      }

      if (!force) {
        const action = () => {
          this.toggle(false)
        }
        clearTimeout(this.timer)
        this.timer = this.delayAction(action, 'mouseLeaveDelay')
      }
    }
  }
  triggerHandler = () => {
    const {trigger} = this.props
    if (trigger === 'hover') {
      return {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }
    } else if (trigger === 'focus') {
      return {
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }
    } else if (trigger === 'click') {
      return {
        onClick: this.handleClick
      }
    }
  }
  getPopover = (ref) => { this.popover = ref }
  getChild = (child) => { this.child = child }
  // shouldComponentUpdate (nextProps, nextState) {
  //   const {props, state} = this
  //   return !!(props.visible || nextProps.visible) || state.visible !== nextState.visible || state.n !== nextState.n
  // }
  componentWillUpdate (nextProps) {
    const {props} = this
    if (nextProps.visible !== undefined) {
      if (nextProps.visible && !props.visible) {
        clearTimeout(this.timerFadeIn)
        this.fadeIn = true
        this.timerFadeIn = setTimeout(this.removeFadeIn, 300)
      } else if (!nextProps.visible && props.visible) {
        clearTimeout(this.timerFadeOut)
        this.fadeOut = true
        this.timerFadeOut = setTimeout(this.removeFadeOut, 300)
      }
    }

    try {
      this.setPosition()
    } catch (e) {}
  }
  componentDidMount () {
    Popover.popoverCollection[this.id] = this
    const {defaultVisible, visible} = this.props
    if (defaultVisible || visible) {
      this.setState({visible: true})
    }
  }

  componentWillUnmount () {
    delete Popover.popoverCollection[this.id]
  }
  render () {
    const {classPrefix} = Popover
    const {left, top, fadeIn, fadeOut} = this
    const {children, title, content, className, placement, style, visible: propsVisible, getContainer, defaultVisible, mouseEnterDelay, mouseLeaveDelay, onVisibleChange, fadeIn: _fadeIn, ...rest} = this.props
    const {visible: stateVisible} = this.state
    const popoverStyle = {left, top, ...style}
    const triggerHandler = propsVisible === undefined ? this.triggerHandler() : null
    const visible = propsVisible === undefined ? stateVisible : propsVisible
    const noAnimation = !fadeIn && !fadeOut

    return (
      <Fragment>
        {createPortal(
          <div className={setClass({
            [`${classPrefix}-wrapper`]: 1,
            [`${classPrefix}-fadeIn`]: fadeIn,
            [`${classPrefix}-fadeOut`]: fadeOut,
            [`${classPrefix}-hidden`]: !visible && noAnimation
          })}>
            <div
              {...rest}
              {...triggerHandler}
              className={setClass({
                [className]: className,
                [classPrefix]: 1,
                [`${classPrefix}-placement-${placement}`]: 1
              })}
              style={popoverStyle}
              ref={this.getPopover}
            >
              <div className={`${classPrefix}-inner`}>
                {!!content && <div className={`${classPrefix}-title`}>{title}</div>}
                <div className={`${classPrefix}-content`}>{content}</div>
              </div>
              <i className={`${classPrefix}-arrow`} />
            </div>
          </div>,
          getContainer()
          )}
        {cloneElement(children, {
          ...triggerHandler,
          ref: this.getChild
        })}
      </Fragment>
    )
  }
}
document.body.addEventListener('click', Popover.bodyClick, false)

setTimeout(() => {
  if (window.myreflux) {
    window.myreflux.on('iFrameClick', Popover.bodyClick)
  }
})

export default Popover
