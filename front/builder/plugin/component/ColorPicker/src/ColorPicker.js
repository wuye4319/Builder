/**
 * @author MG Ding (丁文强)
 * @desc ColorPicker (颜色选择器)
 * react-color API: http://casesandberg.github.io/react-color/
 */
import './ColorPicker.less'
import React from 'react'
import PropTypes from 'prop-types'
import {setClass} from '../../../../source/util'
import {ChromePicker} from 'react-color'
import Popover from '../../Popover'

export default class ColorPicker extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element
    ]),
    onChangeComplete: PropTypes.func,
    afterClose: PropTypes.func,
    onVisibleChange: PropTypes.func,
    getContainer: PropTypes.func
  }
  static defaultProps = {
    placement: 'bottomLeft'
  }
  static classPrefix = 'bc-colorPicker'
  render () {
    const {classPrefix} = ColorPicker
    const {color, label, className, style, afterClose, getContainer, onVisibleChange, placement, ...rest} = this.props

    return (
      <div className={setClass({
        [className]: className,
        [classPrefix]: 1
      })} style={style}>
        <div className={`${classPrefix}-preview-real`}>
          <div style={{backgroundColor: color}} className={`${classPrefix}-preview`} />
        </div>
        <Popover
          content={<ChromePicker disableAlpha color={color} {...rest} />}
          placement={placement}
          trigger='click'
          className={`${classPrefix}-popover`}
          // afterClose={afterClose}
          onVisibleChange={onVisibleChange}
          getContainer={getContainer}
          fadeIn={false}
        >
          <div className={`${classPrefix}-inner`}>
            <div className={`${classPrefix}-preview`} />
            {!!label && <span className={`${classPrefix}-label`}>{label}</span>}
          </div>
        </Popover>
      </div>
    )
  }
}
