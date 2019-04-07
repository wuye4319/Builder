/**
 * @author MG Ding (丁文强)
 * @desc Input (文本输入框)
 */
import './Input.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../Icon'
const {setClass, color, font} = window.supervar.util
const classPrefix = 'bc-input'

class Input extends React.Component {
  static propTypes = {
    getInput: PropTypes.func,
    onClear: PropTypes.func,
    clearIcon: PropTypes.bool,
    autoFocus: PropTypes.bool
  }
  state = {
    value: this.props.defaultValue || this.props.value || ''
  }
  getInput = (ref) => {
    this.input = ref
    this.props.getInput && this.props.getInput(ref)
  }
  handleClear = () => {
    if (this.props.value === undefined) {
      this.input.value = ''
      this.setState({value: ''})
    }
    this.props.onClear && this.props.onClear()
    this.input.focus()
  }
  handleChange = (e) => {
    if (this.props.value === undefined) {
      this.setState({value: this.input.value})
    }
    this.props.onChange && this.props.onChange(e)
  }
  notEmpty = () => {
    let {value: propsValue} = this.props
    let {value} = this.state

    if (propsValue !== undefined) {
      value = propsValue
    }

    return value !== ''
  }
  componentDidMount () {
    if (this.props.autoFocus) {
      this.input.focus()
    }
  }
  render () {
    let {className, disabled, clearIcon, onChange, onClear, getInput, autoFocus, ...rest} = this.props

    return (
      <React.Fragment>
        <input
          className={setClass({
            [className]: className,
            [classPrefix]: 1,
            [`${classPrefix}-hasClear`]: clearIcon,
            [color.border('border')]: 1,
            [font('text')]: 1
          })}
          ref={this.getInput}
          onChange={this.handleChange}
          disabled={disabled}
          {...rest}
        />
        {clearIcon && !disabled && this.notEmpty() && (
          <Icon
            type='no-filling'
            className={`${classPrefix}-clear ${color('icon')}`}
            onClick={this.handleClear}
          />
        )}
      </React.Fragment>
    )
  }
}

export default Input
