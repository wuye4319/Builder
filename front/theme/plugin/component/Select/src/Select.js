/**
 * @author MG Ding (丁文强)
 * @desc Select (下拉选择器)
 */
import './Select.less'
import React from 'react'
const {setClass, color, font} = window.supervar.util
const classPrefix = 'bc-select'

const Select = (props) => {
  let {className, children, ...rest} = props

  return (
    <select
      className={setClass({
        [className]: className,
        [classPrefix]: 1,
        [color.border('border')]: 1,
        [color('text')]: 1,
        [font('text')]: 1
      })}
      {...rest}
      >
      {children}
    </select>
  )
}

export default Select
