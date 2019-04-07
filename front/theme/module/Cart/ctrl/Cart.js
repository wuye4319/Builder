/**
 * @author Alan (曹昌盛)
 * @desc Cart购物车控制器
 */
import React from 'react'
import PropTypes from 'prop-types'
import './Cart.less'
import CheckBox from '../../../../builder/plugin/component/Checkbox'
class CartCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    changeConfig: PropTypes.func.isRequired
  }
  static defaultProps = {
    changeConfig: () => {
    }
  }
  handleChangeValue = (key, e) => {
    const checked = e.target.checked
    let {config} = this.props
    config[key] = checked
    this.props.changeConfig(config)
  }

  render () {
    const {config} = this.props
    const {name, key, selectAll, orderNote} = config
    return (
      <div
        id={`${name}Ctrl-${key}`}
        className='m-cart-ctrl-wrap'
      >
        <h3>Setting</h3>
        <div className='checkBox-wrap'>
          <CheckBox checked={selectAll} onChange={this.handleChangeValue.bind(this, 'selectAll')}>Show Select
            All</CheckBox>
        </div>
        <div className='checkBox-wrap'>
          <CheckBox checked={orderNote} onChange={this.handleChangeValue.bind(this, 'orderNote')}>Show Order Remark</CheckBox>
        </div>
      </div>
    )
  }
}

export default CartCtrl
