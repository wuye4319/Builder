/**
 * @author MG Ding (丁文强)
 * @desc Button (按钮)
 */
import './Button.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../Icon'
import Link from '../../Link'
const {setClass, color, font} = window.supervar.util

export default class Button extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'ghost']),
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
      type,
      className,
      disabled,
      loading,
      icon,
      ...rest
    } = this.props

    const _className = setClass({
      'f-button': 1,
      [className]: className,
      [classPrefix]: 1,
      [`${classPrefix}-${type}`]: type,
      [`${classPrefix}-loading`]: loading,
      disabled: disabled || loading,
      [color.bg('brand')]: type === 'primary',
      [color.border('brand')]: 1,
      [color('brand')]: type !== 'primary',
      [color('button')]: type === 'primary'
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
        ? <Link {...props} href={href}>{content}</Link>
        : <button type='button' {...props} disabled={disabled} >{content}</button>
    }

    return wrapper(
      <React.Fragment>
        <span className={font('button')}>
          {icon && (
            <Icon
              type={icon}
              color='inherit'
              className={setClass({
                [`${classPrefix}-icon`]: 1,
                [`${classPrefix}-icon-noChild`]: !children
              })} />
          )}
          {children}
        </span>
      </React.Fragment>
    )
  }
}
