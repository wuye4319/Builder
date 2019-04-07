/**
 * @Author: Gavin Yang (杨伟伟)
 * @desc: Option (下拉选项)
 * @date: 2018-3-16
 */

import {setClass} from '../../../../source/util'
export default class Option extends React.Component {
  render () {
    const {className, children, disabled} = this.props
    return (
      <a href='javascript:void(0)' {...this.props} className={setClass({
        [className]: className || '',
        'disabled': disabled ? 'disabled' : ''
      })}>
        {children}
      </a>
    )
  }
}
