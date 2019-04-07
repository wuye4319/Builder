/**
 * @author MG Ding (丁文强)
 * @desc Quantity (数量)
 */
import './Quantity.less'
import React from 'react'
import PropTypes from 'prop-types'
const {setClass, color, font} = window.supervar.util

export default class Quantity extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }
  static defaultProps = {
    defaultValue: 1,
    min: 1,
    max: Infinity
  }
  static classPrefix = 'bc-quantity'
  state = {
    value: this.props.defaultValue
  }
  cache = this.props.defaultValue

  handleChange = (e) => {
    let value = e.target.value.trim()

    if (value) {
      value = parseInt(value.replace(/\D|\./g, ''))
    }

    if (!value) {
      value = 0
    }

    if (value !== this.value) this.updateValue(value)
  }

  handleBlur = () => {
    let {value} = this
    let {min, max, onBlur} = this.props
    if (value > max || value < min) {
      this.updateValue(this.cache)
    }
    onBlur && onBlur()
  }

  handleFocus = () => {
    let {onFocus} = this.props
    this.cache = this.value
    onFocus && onFocus()
  }

  handleMore = () => {
    this.updateValue(this.value + 1)
  }
  handleLess = () => {
    this.updateValue(this.value - 1)
  }

  updateValue = (value) => {
    let {value: propsValue, onChange} = this.props
    if (propsValue === undefined) this.setState({value})
    onChange && onChange(value)
  }

  render () {
    const {classPrefix} = Quantity
    let {className, style, min, max, disabled, value: propsValue, onChange, defaultValue, ...rest} = this.props
    let {value: stateValue} = this.state
    let value = propsValue === undefined ? stateValue : propsValue
    this.value = value

    return (
      <span
        className={setClass({
          [className]: className,
          [classPrefix]: 1,
          [font('text')]: 1
        })}
        style={style}
      >
        <button
          className={`${classPrefix}-btn ${color.border('border')}`}
          disabled={disabled || value <= min}
          onClick={this.handleLess}
          type='button'
        >
          -
        </button>
        <label className={`${classPrefix}-input ${color.border('border')}`}>
          <input
            {...rest}
            value={value || ''}
            disabled={disabled}
            className={font('text')}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            type='text'
          />
        </label>
        <button
          className={`${classPrefix}-btn ${color.border('border')}`}
          disabled={disabled || value >= max}
          onClick={this.handleMore}
          type='button'
        >
          +
        </button>
      </span>
    )
  }
}
