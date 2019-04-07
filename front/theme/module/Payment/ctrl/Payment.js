/**
 * @author Alan (曹昌盛)
 * @desc Payment支付页控制器
 */
import React from 'react'
import PropTypes from 'prop-types'
import './Payment.less'

// const {util} = window.supervar

class PaymentCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    changeConfig: PropTypes.func.isRequired
  }
  static defaultProps = {
    changeConfig: () => {
    }
  }

  render () {
    const {config} = this.props
    const {name, key} = config
    return (
      <div
        id={`${name}Ctrl-${key}`}
        className='m-payment-ctrl-wrap'
      >
        PaymentCtrl
      </div>
    )
  }
}

export default PaymentCtrl
