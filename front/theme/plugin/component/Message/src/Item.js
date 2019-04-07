/**
 * @author MG Ding (丁文强)
 * @desc Message (全局提示)
 */
import './Item.less'
import React from 'react'
import PropTypes from 'prop-types'
// import Spin from '../../Spin'
import Icon from '../../Icon'
import setClass from '../../util/setClass'

export default class Item extends React.Component {
  static propTypes = {
    duration: PropTypes.number
  }
  static defaultProps = {
    duration: 3
  }
  static classPrefix = 'bc-messageItem'
  timer = null
  fadeOutTimer = null
  state = {
    fadeIn: true,
    fadeOut: false
  }
  fadeOut = () => {
    clearTimeout(this.timer)
    this.setState({
      fadeIn: false,
      fadeOut: true
    })
    this.fadeOutTimer = setTimeout(this.remove, 300)
  }
  remove = () => {
    const {id, remove} = this.props
    remove(id)
  }
  componentDidMount = () => {
    this.timer = setTimeout(this.fadeOut, this.props.duration * 1000)
  }
  componentWillUnmount () {
    this.timer = null
    this.fadeOutTimer = null
  }
  icon = () => {
    const {type} = this.props
    const {classPrefix} = Item
    let res = null

    switch (type) {
      // case 'loading':
      //   res = <Spin type='light' className={`${classPrefix}-icon`} />
      //   break
      case 'info':
        res = <span className={`${classPrefix}-icon ${classPrefix}-icon-${type}`}><Icon type='info' /></span>
        break
      case 'success':
        res = <span className={`${classPrefix}-icon ${classPrefix}-icon-${type}`}><Icon type='yes' /></span>
        break
      case 'error':
        res = <span className={`${classPrefix}-icon ${classPrefix}-icon-${type}`}><Icon type='info' /></span>
        break
      case 'warning':
        res = <span className={`${classPrefix}-icon ${classPrefix}-icon-${type}`}><Icon type='info' /></span>
        break
    }

    return res
  }
  render () {
    const {classPrefix} = Item
    const {content} = this.props
    const {fadeIn, fadeOut} = this.state

    return (
      <li className={setClass({
        [classPrefix]: 1,
        [`${classPrefix}-fadeIn`]: fadeIn,
        [`${classPrefix}-fadeOut`]: fadeOut
      })}>
        <div>
          {this.icon()}
          <span>{content}</span>
        </div>
      </li>
    )
  }
}
