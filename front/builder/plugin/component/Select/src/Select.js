/**
 * @author Gavin Yang (杨伟伟)
 * @desc Selection (下拉选择器)
 *
 * value:传入的select 初始值,默认值取option的第一个
 * value: Option的value 必传
 * key:等同于React的key
 * size: small、default, large (default默认值)
 * disabled: 禁用select / select 的子选项
 * pos: top、bottom (select下拉弹框位置，暂时支持top、bottom默认值)
 * onChange: 值变化事件,接口两个参数value, index
 *
 */

import './Select.less'
import Icon from '../../Icon/'
import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import ReactDOM, {createPortal} from 'react-dom'
import {setClass, getDomPosition} from '../../../../source/util'
class Select extends React.Component {
  static classPrefix = 'bc-select'
  static container = window.document.body // 默认挂载点
  static bodyClick = (e) => {
    for (let name in Select.selectCollection) {
      let _Select = Select.selectCollection[name]
      _Select.handleOutClick(e)
    }
  }
  static defaultProps = {
    pos: 'bottom'
  }
  static selectCollection = {}
  constructor (props) {
    super(props)
    this.state = {
      opSelect: false,
      selectedValue: this.getDefaultValue(),
      _position: {},
      prePos: {left: 0, top: 0}
    }
    this.id = Math.random().toString()
    this.setPosition = this.setPosition.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.getSelectValue = this.getSelectValue.bind(this)
  }
  componentDidMount () {
    this.setPosition()
    Select.selectCollection[this.id] = this
  }
  componentWillUnmount () {
    delete Select.selectCollection[this.id]
  }
  componentWillUpdate () {
    let _selectBtn = ReactDOM.findDOMNode(this.selectBtn)
    let prePos = this.state.prePos
    let curPos = getDomPosition(_selectBtn)
    if ((prePos.left !== curPos.left) || (prePos.top !== curPos.top)) {
      this.setPosition()
    }
  }
  setPosition () {
    let _selectBtn = ReactDOM.findDOMNode(this.selectBtn)
    let _selectList = ReactDOM.findDOMNode(this.select)

    let {left, top} = getDomPosition(_selectBtn)

    let offWidth = _selectBtn.offsetWidth
    let offHeight = _selectBtn.offsetHeight

    let offSelectW = _selectList.offsetWidth
    let offSelectH = _selectList.offsetHeight

    let pos = this.props.pos || 'bottom'
    let _position = {left: 0, top: 0, minWidth: offWidth + 'px'}

    if (pos === 'top') {
      _position.top = top - offSelectH - 18 + 'px'
      _position.left = left + 'px'
      this.setState({_position, prePos: {left, top}})
      return
    }

    if (pos === 'bottom') {
      _position.top = top + offHeight + 18 + 'px'
      _position.left = left + 'px'
      this.setState({_position, prePos: {left, top}})
    }
  }
  handleSelect () {
    if (this.props.disabled) {
      return
    }
    this.setState((preState) => {
      return {opSelect: !preState.opSelect}
    })
  }
  getDefaultValue () {
    let {children, value} = this.props
    if (!children) {
      return null
    }
    if (Array.isArray(children)) {
      if (value) {
        let defInValues = children.some(ele => {
          return ele.props.value === value
        })
        return defInValues && value
      }
      return children[0]['props']['value']
    }
        // 只有一个子元素时children是对象
    return children.props.value
  }
  getSelectValue () {
    let {selectedValue} = this.state
    let {value, children} = this.props

    if (!value) {
      return selectedValue
    }

    if (Array.isArray(children)) {
      let defInValues = children.some(ele => {
        return ele.props.value === value
      })
      return (defInValues && value) || null
    }

    return (children.props.value === value && value) || null
  }
  selectItems (item, index) {
    let {value, onChange} = this.props

    if (item.props.disabled) {
      return
    }
        // 受控组件
    if (value || typeof onChange === 'function') {
      this.setState({opSelect: false}, () => {
        if (item.props.value !== this.props.value) {
          onChange(item.props.value, index)
        }
      })
      return
    }
        // 不受控组件
    if (!value && typeof onChange !== 'function') {
      this.value = item.props.value
      this.setState({selectedValue: item.props.value, opSelect: false})
    }
  }
  handleOutClick (e) {
    if (!this.state.opSelect) {
      return
    }
    let srcElement = e.srcElement
    let child = ReactDOM.findDOMNode(this.selectBtn)
    let select = ReactDOM.findDOMNode(this.select)

    let force = false
    while (srcElement && !force) {
      if (srcElement === child || srcElement === select) force = true
      srcElement = srcElement.parentNode
    }

    if (!force) {
      this.setState({opSelect: false})
    }
  }
  render () {
    let {classPrefix, container} = Select
    let {children, pos, size, disabled} = this.props
    let {opSelect, _position} = this.state
    let value = this.getSelectValue()
    return (
      <Fragment>
        <div className={setClass({
          [classPrefix]: 1,
          focus: opSelect ? 'focus' : '',
          [pos]: pos || '',
          [size]: size || ''
        })}
          onClick={this.handleSelect}
          ref={(node) => { this.selectBtn = node }}
           >
          <button className={setClass(
            {
              [`${classPrefix}-btn`]: 1,
              'bc-select-disabled': disabled ? 'bc-select-disabled' : ''
            })}>{value}</button>
          <Icon type='arrow-down' className={`${classPrefix}-arr`} />
        </div>
        {
                    createPortal(
                      <div className='bc-select-wrap'>
                        <div className={setClass({
                          [pos]: 1,
                          [`${classPrefix}-option`]: 1,
                          'bc-select-show': opSelect ? 'bc-select-show' : ''
                        })}
                          ref={(select) => { this.select = select }}
                          style={_position}
                            >
                          <ul className={`${classPrefix}-option-ul`}>
                            {
                                        React.Children.map(children, (item, i) => {
                                          return (
                                            <li className={`${classPrefix}-option-item`}
                                              key={`${(item.key || i).toString()}-item`}
                                              onClick={() => this.selectItems(item, i)}
                                                >{item}</li>
                                          )
                                        })
                                    }
                          </ul>
                          <i className={`${classPrefix}-option-arr`} />
                        </div>
                      </div>,
                        container
                    )
                }
      </Fragment>
    )
  }
}

Select.propTypes = {
  disabled: PropTypes.bool,
  size: PropTypes.string
}
document.addEventListener('click', Select.bodyClick, false)
setTimeout(() => {
  if (window.myreflux) {
    window.myreflux.on('iFrameClick', Select.bodyClick)
  }
})
export default Select
