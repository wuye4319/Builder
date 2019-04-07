/**
 * @author MG Ding (丁文强)
 * @desc Button.Group (按钮组)
 */
import './Button-Group.less'
import React from 'react'

export default class Group extends React.Component {
  static classPrefix = 'bc-buttonGroup'
  render () {
    const {className, children} = this.props
    const {classPrefix} = Group
    const _className = (className ? `${className} ` : '') + classPrefix

    return <div {...this.props} className={_className}>{children}</div>
  }
}
