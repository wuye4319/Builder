/**
 * @author Alan (曹昌盛)
 * @desc RadioGroup (单选组合)
 */
import React from 'react'
import {setClass} from "../../../../source/util";
import Radio from './Radio'

export default class RadioGroup extends React.Component {
  static propTypes = {}
  static defaultProps = {}
  static classPrefix = 'bc-radio-group'
  state = {
    defaultValue: null
  }
  handleChange = (e) => {
    const {onChange} = this.props
    this.value = e.target.value
    if (onChange) {
      onChange(e)
    }
    this.setState({
      defaultValue: e.target.value
    })
  }
  createChild = (child, key) => {
    const {value} = this.props
    const defaultValue = value ? value : this.state.defaultValue
    const {name = 'defaultName'} = this.props
    return (
      <React.Fragment>
        {React.createElement(Radio,
          {
            ...child.props,
            name: name,
            onChange: this.handleChange,
            defaultValue: defaultValue,
            key: `${name}-${key}`
          })
        }
      </React.Fragment>
    )
  }

  render() {
    const {classPrefix} = RadioGroup
    const {children, className} = this.props
    return (
      <div className={setClass({
        [className]: className,
        [`${classPrefix}-wrapper`]: 1
      })}>
        {React.Children.map(children, this.createChild)}
      </div>
    )
  }
}