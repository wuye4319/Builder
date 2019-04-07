/**
 * @author MG Ding (丁文强)
 * @desc Modal (对话框)
 */
import './confirm.less'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Modal from './Modal'
import Button from '../../Button'

class Confirm extends React.Component {
  static propTypes = {
    cancelText: PropTypes.string, // ok 取消按钮文案
    okText: PropTypes.string, // ok 确定按钮文案
    okType: PropTypes.oneOf(['primary', 'sub']), // ok 确定按钮类型
    title: PropTypes.string, // ok 标题
    zIndex: PropTypes.number, // ok z-index
    onCancel: PropTypes.func, // ok 取消回调
    onOk: PropTypes.func, // ok 确定回调
    width: PropTypes.number, // ok 对话框宽度
    style: PropTypes.object, // ok 自定义style
    className: PropTypes.string, // ok 自定义className
    content: PropTypes.any,
    confirmLoading: PropTypes.bool
  }
  static defaultProps = {
    width: 400,
    cancelText: 'Cancel',
    okText: 'OK',
    okType: 'primary',
    zIndex: 1100,
    title: 'Notice',
    confirmLoading: false
  }
  static classPrefix = 'bc-confirmModal' // 样式前缀
  state = {
    visible: true
  }
  onCancel = (e) => {
    this.setState({visible: false})
    const {onCancel} = this.props
    onCancel && onCancel(e)
  }
  onOk = (e) => {
    this.setState({visible: false})
    const {onOk} = this.props
    onOk && onOk(e)
  }
  afterClose = () => {
    this.props.destroy()
  }
  render () {
    const {visible} = this.state
    const {cancelText, okText, okType, title, content, className, confirmLoading, ...rest} = this.props
    const {classPrefix} = Confirm

    return (
      <Modal
        title=''
        visible={visible}
        footer={null}
        closable={false}
        onCancel={this.onCancel}
        destroyOnClose
        maskClosable={false}
        afterClose={this.afterClose}
        className={(className ? `${className} ` : '') + classPrefix}
        {...rest}
      >
        <div className={`${classPrefix}-body`}>
          <h4 className={`${classPrefix}-title`}>{title}</h4>
          <div className={`${classPrefix}-content`}>{content}</div>
          <div className={`${classPrefix}-footer`}>
            <Button type='sub' onClick={this.onCancel}>{cancelText}</Button>
            <Button type={okType} onClick={this.onOk} loading={confirmLoading}>{okText}</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

export function confirm (config) {
  let node = document.createElement('div')
  document.body.appendChild(node)
  const destroy = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(node)
    if (unmountResult && node.parentNode) {
      node.parentNode.removeChild(node)
      confirm = null
    }
  }
  let confirm = ReactDOM.render(<Confirm {...config} destroy={destroy} />, node)
  const close = () => {
    confirm && confirm.onCancel()
  }
  return {close}
}
