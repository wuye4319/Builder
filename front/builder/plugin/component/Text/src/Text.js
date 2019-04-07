/**
 * @author Alan (曹昌盛)
 * @desc Text (文本域)
 */
import './Text.less'
import React from 'react'
import { setClass } from '../../../../source/util'

export default class Text extends React.Component {
  static propTypes = {}
  static defaultProps = {}
  static classPrefix = 'bc-text'
  state = {
    value: this.props.defaultValue || ''
  }
  handleChange = (e) => {
    const {onChange} = this.props
    this.value = e.target.value
    if (onChange) {
      onChange(e.target.value)
    }
    this.setState({
      value: e.target.value
    })
  }

  render () {
    const {className, value = this.state.value, defaultValue, ...rest} = this.props
    const {classPrefix} = Text
    return (
      <div className={setClass({
        [className]: className,
        [`${classPrefix}-wrapper`]: 1
      })}>
        <textarea {...rest} value={value} onChange={this.handleChange} />
      </div>
    )
  }
}
