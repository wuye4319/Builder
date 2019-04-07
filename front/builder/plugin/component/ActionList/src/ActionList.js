/**
 * @author MG Ding (丁文强)
 * @desc 可操作列表
 */
import './ActionList.less'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Icon from '../../Icon'
import {setClass, getDomPosition} from '../../../../source/util'
const { Component, Children, cloneElement } = React

class ActionList extends Component {
  static propTypes = {
    draggable: PropTypes.bool,
    step: PropTypes.number,
    onChange: PropTypes.func,
    dragStart: PropTypes.func,
    dragEnd: PropTypes.func
  }
  static defaultProps = {
    draggable: false,
    step: 61
  }
  static classPrefix = 'bc-actionList'
  state = {
    expandKeys: {},
    dragFrom: -1,
    dragTo: -1
  }
  toggleExpand = (key) => {
    this.setState(state => {
      let {expandKeys} = state
      if (expandKeys[key]) {
        delete expandKeys[key]
      } else {
        expandKeys[key] = 1
      }

      return {expandKeys}
    })
  }
  hideCollapse = () => {
    this.setState({expandKeys: {}})
  }
  dragStart = (_index) => {
    const {dragStart} = this.props
    dragStart && dragStart(_index)
    this.hideCollapse()
  }
  dragEnd = () => {
    const {dragFrom, dragTo} = this.state
    const {dragEnd} = this.props

    dragEnd && dragEnd(dragFrom, dragTo)

    this.setState({
      dragFrom: -1,
      dragTo: -1
    })
  }
  drag = (dragFrom, dragTo) => {
    const {onChange} = this.props
    this.setState({dragFrom, dragTo}, () => {
      onChange && onChange(dragFrom, dragTo)
    })
  }
  render () {
    const {draggable, step, onChange, dragStart, dragEnd, children, offset, ...rest} = this.props
    const {expandKeys, dragFrom, dragTo} = this.state

    return (
      <ul className='bc-actionList' {...rest}>
        {Children.map(children, (child, index) => {
          return child
            ? cloneElement(child, {
              ...child.props,
              draggable: draggable,
              expand: !!expandKeys[child.key],
              toggleExpand: this.toggleExpand,
              dragStart: this.dragStart,
              dragEnd: this.dragEnd,
              drag: this.drag,
              dragFrom,
              dragTo,
              step,
              offset,
              _key: child.key,
              _index: index,
              _length: children.length
            })
            : null
        })}
      </ul>
    )
  }
}

ActionList.Item = class Item extends Component {
  static propTypes = {
    title: PropTypes.any,
    icon: PropTypes.string,
    collapse: PropTypes.bool,
    expand: PropTypes.bool,
    draggable: PropTypes.bool
  }

  static defaultProps = {
    offset: 0
  }

  static classPrefix = 'bc-actionList-item'

  state = {
    isDrag: false
  }
  originIndex = this.props._index
  handleClick = (event) => {
    const { toggleExpand, onClick, collapse, _key } = this.props

    if (event.target !== ReactDOM.findDOMNode(this.dragHandle)) {
      collapse && toggleExpand(_key)
      onClick && onClick(event, _key)
    }
  }

  handleMouseDown = (e) => {
    const {step, offset, drag, _index, _length, dragStart, dragEnd} = this.props
    let disY = e.clientY - this.item.offsetTop
    let wrapperTop = getDomPosition(this.item).top
    this.setState({isDrag: true})
    dragStart(_index)
    this.handleMouseMove = (e) => {
      let t = e.clientY - disY - wrapperTop + offset
      let gap = t > 0 ? step / 2 : -step / 2
      let toIndex = _index + parseInt((t + gap) / step)

      if (toIndex < 0) toIndex = 0
      if (toIndex > _length - 1) toIndex = _length - 1

      if (this.originIndex !== toIndex) {
        this.originIndex = toIndex
        drag(_index, toIndex)
      }
      this.item.style.top = t + 'px'
    }
    this.handleMouseUp = () => {
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
      this.setState({isDrag: false})
      dragEnd()
      this.item && this.item.releaseCapture && this.item.releaseCapture()
      return false
    }
    document.addEventListener('mousemove', this.handleMouseMove, false)
    document.addEventListener('mouseup', this.handleMouseUp, false)
    this.item && this.item.setCapture && this.item.setCapture()
    return false
  }

  handleMouseMove = (disY, wrapperTop, e) => {
    let t = e.clientY - disY - wrapperTop
    this.item.style.top = t + 'px'
  }

  computeTop = () => {
    const {step, _index, dragFrom, dragTo} = this.props
    let res = 0
    if (dragFrom < _index) {
      if (dragTo >= _index) {
        res = -step
      }
    } else if (dragFrom > _index) {
      if (dragTo <= _index) {
        res = step
      }
    }
    return res
  }

  topStyle = () => {
    let res = null

    if (this.item) {
      const {dragFrom} = this.props
      res = {top: this.computeTop()}
      if (dragFrom === -1) {
        this.item.style.top = '0px'
      }
    }

    return res
  }

  getDragHandle = (ref) => { this.dragHandle = ref }

  componentWillUpdate ({dragFrom}) {
    if (dragFrom === -1) {
      this.originIndex = this.props._index
    }
  }

  componentWillUnmount () {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  render () {
    const {classPrefix} = ActionList.Item
    const {title, icon, collapse, expand, draggable, onClick, children} = this.props
    const {isDrag} = this.state

    return (
      <li
        className={`${classPrefix} ` + setClass({isDrag})}
        ref={(ref) => (this.item = ref)}
        style={draggable ? this.topStyle() : null}
      >
        <div
          className={`${classPrefix}-header`}
          onClick={this.handleClick}
          style={{cursor: collapse || onClick ? 'pointer' : 'default'}}
        >
          <div className={`${classPrefix}-left`}>
            {collapse && <Icon type={expand ? 'arrow-down' : 'arrow-right'} className='left-arrow' />}
            {icon && <Icon type={icon} className='left-icon' />}
            <span>{title}</span>
          </div>
          <div className={`${classPrefix}-right`}>
            {draggable && (
              <Icon
                type='move'
                className='move-icon'
                onMouseDown={this.handleMouseDown}
                ref={this.getDragHandle}
              />
            )}
          </div>
        </div>
        {collapse && (
          <div className={`${classPrefix}-collapse ` + setClass({'expend': expand})}>
            {children}
          </div>
        )}
      </li>
    )
  }
}

export default ActionList
