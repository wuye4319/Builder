/**
 * @author MG Ding (丁文强)
 * @desc Button (按钮)
 */
import './Button.less'
import React from 'react'
import PropTypes from 'prop-types'
import Spin from '../../Spin'
import Icon from '../../Icon'
import {setClass} from '../../../../source/util'

export default class Button extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    size: PropTypes.oneOf(['default', 'small', 'large']),
    type: PropTypes.oneOf(['primary', 'sub']),
    icon: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    type: 'primary',
    disabled: false
  }
  static classPrefix = 'bc-button'
  render () {
    const {classPrefix} = Button

    let {
      children,
      href,
      size,
      type,
      className,
      disabled,
      loading,
      icon,
      ...rest
    } = this.props

    const _className = (className ? `${className} ` : '') + setClass({
      [classPrefix]: 1,
      [`${classPrefix}-${type}`]: type,
      [`${classPrefix}-${size}`]: size,
      [`${classPrefix}-loading`]: loading,
      disabled: disabled || loading
    })

    if (disabled || loading) {
      delete rest.onClick
      if (href) href = 'javascript:;'
    }

    const wrapper = (content) => {
      const props = {
        ...rest,
        className: _className
      }
      return href
        ? <a {...props} href={href}>{content}</a>
        : <button {...props} disabled={disabled}>{content}</button>
    }

    let spin = null
    if (loading) {
      spin = {
        size: size,
        type: type === 'primary' ? 'light' : 'dark',
        className: `${classPrefix}-loading-spin`
      }
    }

    return wrapper(
      <React.Fragment>
        <span>
          {icon && <Icon type={icon} className={setClass({
            [`${classPrefix}-icon`]: 1,
            [`${classPrefix}-icon-noChild`]: !children
          })} />}
          {children}
        </span>
        {spin && <Spin {...spin} />}
      </React.Fragment>
    )
  }
}
