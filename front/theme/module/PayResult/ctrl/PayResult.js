/**
 * @author Alan (曹昌盛)
 * @desc PayResult支付结果控制器
 */
import React from 'react'
import PropTypes from 'prop-types'
import './PayResult.less'

// const {util} = window.supervar

class PayResultCtrl extends React.Component {
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
        className='m-pay-result-ctrl-wrap'
      >
        PayResultCtrl
      </div>
    )
  }
}

export default PayResultCtrl
