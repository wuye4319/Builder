/**
 * @author: Gavin Yang (杨伟伟)
 * @des: 下拉菜单
 * @date: 208.4.12
 */

import './Select.less'
import React from 'react'
import {setClass} from '../../../../source/util'
const classPrefix = 'bc-selection'

const Select = (props) => {
  let {className, children, ...rest} = props

  return (
    <select
      className={setClass({
        [className]: className,
        [classPrefix]: 1
      })}
      {...rest}
      >
      {children}
    </select>
  )
}

export default Select
