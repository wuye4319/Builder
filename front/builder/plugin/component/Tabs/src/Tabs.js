/**
 * @author MG Ding (丁文强)
 * @desc Tabs (标签页)
 */
import './Tabs.less'
import React from 'react'
import {setClass} from '../../../../source/util'
import PropTypes from 'prop-types'

export default class Tabs extends React.Component {
  static propTypes = {
    activeKey: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onChange: PropTypes.func,
    // style: PropTypes.object,
    className: PropTypes.string
  }
  static defaultProps = {
    onChange: () => {}
  }
  static classPrefix = 'bc-tabs'
  state = {
    activeKey: this.props.defaultActiveKey
  }
  handleChange = (key) => {
    const {onChange, activeKey} = this.props

    if (activeKey) {
      onChange(key)
    } else if (onChange(key) !== false) {
      this.setState({activeKey: key})
    }
  }
  // shouldComponentUpdate (preProps, preState) {
  //   return this.props.activeKey !== preProps.activeKey || this.state.activeKey !== preState.activeKey
  // }
  renderPanes = (child) => {
    const {key, props} = child
    const {forceRender} = props
    return forceRender || key === this.activeKey
      ? React.cloneElement(child, {...props, active: key === this.activeKey})
      : null
  }
  renderTabs = (child) => {
    const {key, props} = child
    const {tab} = props
    const active = key === this.activeKey
    return (
      <li
        className={active ? 'active' : null}
        key={key}
        onClick={active ? null : this.handleChange.bind(this, key)}
      >
        {tab}
      </li>
    )
  }
  render () {
    const {classPrefix} = Tabs
    const {children, activeKey, className, defaultActiveKey, ...rest} = this.props
    const stateActiveKey = this.state.activeKey
    let _activeKey = activeKey || stateActiveKey

    if (_activeKey === undefined) {
      React.Children.forEach(children, (child) => {
        if (!_activeKey) _activeKey = child.key
      })
    }

    this.activeKey = _activeKey

    return (
      <div {...rest} className={setClass({[className]: className, [classPrefix]: 1})}>
        <ol className={`${classPrefix}-tabs`}>
          {React.Children.map(children, this.renderTabs)}
        </ol>
        <div className={`${classPrefix}-panes`}>
          {React.Children.map(children, this.renderPanes)}
        </div>
      </div>
    )
  }
}
