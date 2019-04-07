import './SlipPanel.less'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Icon from '../../Icon/src/Icon'
import Button from '../../Button/src/Button'

class ContainerCtrl extends React.Component {
  render () {
    let {children, title, showPanel, disabled, bottomBtn, btnFn} = this.props
    return (
      <div className={`bc-slip-panel ${showPanel ? 'show' : ''}`}>
        <div className='bc-slip-panel-nav'>
          <h2>{title}</h2>
          <span onClick={() => { this.props.toggle('close') }}><Icon type='close' /></span>
        </div>
        <div className='bc-slip-panel-content'>
          {children}
        </div>
        {
          bottomBtn && <div className='bc-slip-panel-bottom'>
            <Button disabled={disabled} onClick={btnFn}>Select</Button>
          </div>
        }
      </div>
    )
  }
}

class SlipPanel extends React.Component {
  static defaultProps = {
    disabled: true,
    bottomBtn: true,
    portalNode: 'builder-aside'
  }
  state = {
    showPanel: false
  }
  toggle = (ele) => {
    this.setState(pre => {
      return {showPanel: !pre.showPanel}
    }, () => {
      if (ele !== 'close') {
        return
      }
      let cb = this.props.callback
      if (cb && typeof cb === 'function') {
        cb()
      }
    })
  }
  clickSelectBtn = () => {
    let btnFn = this.props.btnFn
    if (!btnFn && typeof btnFn !== 'function') {
      return
    }
    btnFn()
    this.toggle()
  }
  render () {
    let {portalNode} = this.props
    let container = document.getElementsByClassName(portalNode)[0]
    const props = {
      title: this.props.title,
      disabled: this.props.disabled,
      bottomBtn: this.props.bottomBtn,
      children: this.props.children,
      showPanel: this.state.showPanel,
      toggle: this.toggle,
      btnFn: this.clickSelectBtn
    }
    return (
        ReactDOM.createPortal(<ContainerCtrl {...props} />, container)
    )
  }
}

SlipPanel.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.element.isRequired
}

export default SlipPanel
