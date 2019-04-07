/**
 * @author MG Ding (丁文强)
 * @desc Icon (图标)
 */
import './Icon.less'
import React from 'react'
import PropTypes from 'prop-types'
import {setClass} from '../../../../source/util'

export default class Icon extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string
  }
  static classPrefix = 'bc-icon'
  render () {
    const {classPrefix} = Icon
    const {type, className, ...rest} = this.props

    return (
      <i
        className={setClass({
          [className]: className,
          [classPrefix]: 1,
          [`${classPrefix}-${type}`]: type
        })}
        {...rest}
      />
    )
  }
}
