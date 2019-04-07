/**
 * @author MG Ding (丁文强)
 * @desc Spin (加载)
 */
import './Spin.less'
import React from 'react'
import {setClass} from '../../../../source/util'
import PropTypes from 'prop-types'

export default class Button extends React.Component {
  static propTypes = {
    size: PropTypes.oneOf(['default', 'small', 'large']),
    type: PropTypes.oneOf(['dark', 'light'])
  }
  static defaultProps = {
    size: 'default',
    type: 'dark'
  }
  static classPrefix = 'bc-spin'
  render () {
    const {classPrefix} = Button

    let {size, type, className, ...rest} = this.props

    return (
      <div
        className={setClass({
          [classPrefix]: 1,
          [`${classPrefix}-${size}`]: size !== 'default',
          [`${classPrefix}-${type}`]: type !== 'dark',
          [className]: className
        })}
        {...rest}
      ><i /></div>
    )
  }
}
