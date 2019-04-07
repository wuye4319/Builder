/**
 * @author MG Ding (丁文强)
 * @desc Tabs.Pane (标签页内容容器)
 */
import './Tabs-Pane.less'
import React from 'react'
import PropTypes from 'prop-types'
import {setClass} from '../../../../source/util'

export default class Pane extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    // key: PropTypes.string.isRequired,
    forceRender: PropTypes.bool,
    tab: PropTypes.string.isRequired
  }
  static defaultProps = {
    forceRender: false
  }
  static classPrefix = 'bc-tabsPane'
  // shouldComponentUpdate (preProps) {
  //   return this.props.active !== preProps.active
  // }
  render () {
    const {className, children, active, forceRender, tab, ...rest} = this.props
    const {classPrefix} = Pane
    return (
      <div
        {...rest}
        className={setClass({
          [className]: className,
          [classPrefix]: 1,
          active
        })}
      >{children}</div>
    )
  }
}
