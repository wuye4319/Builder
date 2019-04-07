/**
 * @author MG Ding (丁文强)
 * @desc Icon (图标)
 */
import './Icon.less'
import React from 'react'
import PropTypes from 'prop-types'
import setClass from '../../util/setClass'
import color from '../../util/color'
// const {setClass, color} = window.supervar.util

export default class Icon extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    color: PropTypes.string
  }
  static defaultProps = {
    color: 'icon'
  }
  static classPrefix = 'bc-icon'
  render () {
    const {classPrefix} = Icon
    const {type, className, color: colorClass, ...rest} = this.props

    return (
      <i
        className={setClass({
          [className]: className,
          [classPrefix]: 1,
          [`${classPrefix}-${type}`]: type,
          [color(colorClass)]: colorClass
        })}
        {...rest}
      />
    )
  }
}
