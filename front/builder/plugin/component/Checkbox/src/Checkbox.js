/**
 * @author MG Ding (丁文强)
 * @desc Checkbox (多选)
 */
import './Checkbox.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../Icon'
import {setClass} from '../../../../source/util'

export default class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  }
  static classPrefix = 'bc-checkbox'
  state = {
    // checked: undefined
  }
  handleChange = (e) => {
    const {onChange, checked} = this.props
    if (onChange) onChange(e)
    if (checked === undefined) this.setState({checked: e.target.checked})
  }
  render () {
    const {classPrefix} = Checkbox
    const {children, className, style, checked: propsChecked, defaultChecked, disabled, onChange, ...rest} = this.props
    const {checked: stateChecked} = this.state

    const checked =
      propsChecked === undefined
        ? stateChecked === undefined
          ? defaultChecked
          : stateChecked
        : propsChecked

    this.checked = checked

    return (
      <label className={setClass({
        [className]: className,
        [`${classPrefix}-wrapper`]: 1,
        [`${classPrefix}-checked`]: checked,
        [`${classPrefix}-disabled`]: disabled
      })} style={style}>
        <span className={`${classPrefix}`}>
          <span className={`${classPrefix}-inner`}>
            <Icon type={checked ? 'checkbox-checked' : 'checkbox'} className={`${classPrefix}-icon`} />
          </span>
          <input
            type='checkbox'
            className={`${classPrefix}-input`}
            checked={!!checked}
            onChange={this.handleChange}
            disabled={disabled}
            {...rest}
          />
        </span>
        <span className={`${classPrefix}-label`}>{children}</span>
      </label>
    )
  }
}
