/**
 * @author Alan (曹昌盛)
 * @desc Radio (单选)
 */
import './Radio.less'
import {setClass} from '../../../../source/util'
import React from 'react'

export default class Radio extends React.Component {
  static propTypes = {}
  static defaultProps = {}
  static classPrefix = 'bc-radio'
  state = {
    defaultValue: null
  }
  handleChange = (e) => {
    const {onChange} = this.props
    if (onChange) {
      onChange(e)
    }
    this.setState({
      defaultValue: e.target.value
    })
  }

  render () {
    const {classPrefix} = Radio
    const {name = 'defaultName', className, disabled, value, children, defaultValue} = this.props
    const checkedValue = defaultValue || this.state.defaultValue
    const checked = checkedValue === value

    return (
      <label className={
        setClass({
          [className]: className,
          [`${classPrefix}-wrapper`]: 1,
          [`${classPrefix}-checked`]: checked,
          [`${classPrefix}-disabled`]: disabled
        })}
      >
        <span className={`${classPrefix} ${className}`}>
          <input
            type='radio'
            name={name}
            value={value}
            disabled={disabled}
            className={`${classPrefix}-input`}
            onChange={this.handleChange}
            checked={checked}
         />
          <i className={
           setClass({
             [`${classPrefix}-icon`]: 1,
             'checked': checked,
             'disabled': disabled
           })} />
        </span>
        <span className={`${classPrefix}-label`}>{children}</span>
      </label>
    )
  }
}
