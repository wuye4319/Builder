/**
 * @author MG Ding (丁文强)
 * @desc Modal (对话框)
 */
import './Modal.less'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from '../../Button'
const {setClass, font} = window.supervar.util

export default class Modal extends React.Component {
  static propTypes = {
    afterClose: PropTypes.func, // ok 关闭后回调
    cancelText: PropTypes.string, // ok 取消按钮文案
    closable: PropTypes.bool, // ok 右上角关闭按钮
    confirmLoading: PropTypes.bool, // 确认按钮loading状态
    destroyOnClose: PropTypes.bool, // ok 关闭时销毁
    footer: PropTypes.element, // ok 底部
    getContainer: PropTypes.func, // ok 自定义挂载点
    mask: PropTypes.bool, // ok 显示遮罩层
    maskClosable: PropTypes.bool, // ok 遮罩层可关闭对话框
    okText: PropTypes.string, // ok 确定按钮文案
    okType: PropTypes.oneOf(['primary', 'sub']), // ok 确定按钮类型
    // title: PropTypes.string, // ok 标题
    visible: PropTypes.bool, // ok 可视
    zIndex: PropTypes.number, // ok z-index
    onCancel: PropTypes.func, // ok 取消回调
    onOk: PropTypes.func, // ok 确定回调
    width: PropTypes.number, // ok 对话框宽度
    style: PropTypes.object, // ok 自定义style
    className: PropTypes.string // ok 自定义className

  }
  static defaultProps = {
    closable: true,
    width: 520,
    cancelText: 'Cancel',
    okText: 'OK',
    maskClosable: true,
    destroyOnClose: false,
    mask: true,
    okType: 'primary',
    zIndex: 1000
  }
  static classPrefix = 'bc-modal' // 样式前缀
  static container = window.document.body // 默认挂载点
  static visibleCount = 0 // 打开的对话框个数
  isNeverShow = !this.props.visible // 对话框是否未显示过
  fadeIn = this.props.visible // 入场动画
  fadeOut = false // 出场动画
  timerFadeIn = null // 入场动画timer
  timerFadeOut = null // 出场动画timer
  state = {
    n: 0 // 修改n用于触发render()
  }
  addScrollingEffect = () => {
    Modal.visibleCount++
    // console.log(Modal.visibleCount, '+')
    if (Modal.visibleCount !== 1) {
      return
    }
    document.body.style.overflow = 'hidden'
  }
  removeScrollingEffect = () => {
    Modal.visibleCount--
    // console.log(Modal.visibleCount, '-')
    if (Modal.visibleCount !== 0) {
      return
    }
    document.body.style.overflow = ''
  }

  removeFadeIn = () => {
    this.fadeIn = false
    this.myRender()
  }
  removeFadeOut = () => {
    this.fadeOut = false
    this.myRender()
    this.props.afterClose && this.props.afterClose()
  }
  myRender = () => {
    this.setState({n: Date.now()})
  }
  shouldComponentUpdate ({ visible }, { n }) {
    return !!(this.props.visible || visible) || (this.state.n !== n)
  }
  componentWillUpdate (nextProps) {
    const {props} = this
    if (nextProps.visible && !props.visible) {
      clearTimeout(this.timerFadeIn)
      this.fadeIn = true
      this.timerFadeIn = setTimeout(this.removeFadeIn, 300)
    } else if (!nextProps.visible && props.visible) {
      clearTimeout(this.timerFadeOut)
      this.fadeOut = true
      this.timerFadeOut = setTimeout(this.removeFadeOut, 300)
    }
  }
  componentDidUpdate (prevProps) {
    const {props} = this
    if (props.visible) {
      if (!prevProps.visible) {
        this.addScrollingEffect()
      }
    } else if (!this.isNeverShow && !this.fadeIn && !this.fadeOut) {
      this.removeScrollingEffect()
    }
  }
  componentWillMount () {
    if (this.fadeIn) {
      this.timerFadeIn = setTimeout(this.removeFadeIn, 300)
    }
    if (this.props.visible) {
      this.addScrollingEffect()
    }
  }
  componentWillUnmount () {
    if (this.props.visible) {
      this.removeScrollingEffect()
    }
    clearTimeout(this.timerFadeIn)
    clearTimeout(this.timerFadeOut)
  }

  render () {
    const {classPrefix, container} = Modal
    const {isNeverShow, fadeIn, fadeOut} = this
    const {title, children, getContainer, visible, onCancel, onOk, width, style, className, footer, cancelText, okText, maskClosable, destroyOnClose, closable, mask, okType, zIndex, confirmLoading} = this.props

    this.isNeverShow = !isNeverShow && !visible ? false : !visible

    let _style = {
      width,
      left: -parseInt(width / 2),
      ...style
    }

    const noAnimation = !fadeIn && !fadeOut

    return (
      destroyOnClose && !visible && noAnimation
        ? null
        : isNeverShow && !visible
          ? null
          : ReactDOM.createPortal(
            <div
              className={setClass({
                [`${classPrefix}-wrapper`]: 1,
                [`${classPrefix}-fadeIn`]: fadeIn,
                [`${classPrefix}-fadeOut`]: fadeOut,
                [`${classPrefix}-hidden`]: !visible && noAnimation,
                [font('text')]: 1
              })}
              style={zIndex !== 1000 ? {zIndex} : null}
            >
              {mask && (
                <div className={`${classPrefix}-mask`} />
              )}
              <div className={`${classPrefix}-inner`}>
                <div className={`${classPrefix}-fill`} onClick={maskClosable ? onCancel : null} />
                <div className={(className ? `${className} ` : '') + `${classPrefix}`} style={_style}>
                  {closable && (
                    <div className={`${classPrefix}-close`} onClick={onCancel}>×</div>
                  )}
                  {title && (
                    <div className={`${classPrefix}-header`}>
                      <h3>{title}</h3>
                    </div>
                  )}
                  <div className={`${classPrefix}-body`}>
                    {children}
                  </div>
                  {footer === null ? null : (
                    <div className={`${classPrefix}-footer`}>
                      {footer || [
                        <Button key='2' type={okType} onClick={onOk} loading={confirmLoading}>{okText}</Button>,
                        <Button key='1' type='ghost' onClick={onCancel}>{cancelText}</Button>
                      ]}
                    </div>
                  )}
                </div>
              </div>
            </div>,
            getContainer ? getContainer() : container
          )
    )
  }
}
