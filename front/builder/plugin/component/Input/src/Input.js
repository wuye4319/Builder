/**
 * @author Alan (曹昌盛)
 * @desc Input (文本框)
 */
import './input.less'
import React from 'react'
import Icon from '../../Icon'

import {setClass} from '../../../../source/util'

export default class Input extends React.Component {
  static propTypes = {}
  static defaultProps = {}
  static classPrefix = 'bc-input'
  state = {
    value: ''
  }
  handleChange = (e) => {
    const {onChange} = this.props
    this.value = e.target.value
    if (onChange) {
      onChange(e)
    }
    this.setState({
      value: e.target.value
    })
  }

  render () {
    const {placeholder, search, className, ...rest} = this.props
    const {value} = this.props || this.state
    const {classPrefix} = Input
    return (
      <div className={setClass({
        [className]: className,
        'search': search,
        [`${classPrefix}-wrapper`]: 1
      })}>
        {!!search && <Icon type='search' />}
        <input
          {...rest}
          className={`${classPrefix}-input`}
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange} />
      </div>
    )
  }
}
