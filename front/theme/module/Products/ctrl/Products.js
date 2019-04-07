/**
 * @author MG Ding (丁文强)
 * @desc 商详页控制器
 */
import React from 'react'
import PropTypes from 'prop-types'
import CheckBox from '../../../../builder/plugin/component/Checkbox'
import './Products.less'
// const {util} = window.supervar

class ProductsCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    changeConfig: PropTypes.func,
    cacheConfig: PropTypes.func
  }
  static classPrefix = 'ctrl-products'
  handleChangeMarketPrice = (e) => {
    let {config} = this.props
    config.marketPrice = e.target.checked
    this.props.changeConfig(config, true)
  }
  handleChangeBuyNow = (e) => {
    let {config} = this.props
    config.buyNow = e.target.checked
    this.props.changeConfig(config, true)
  }
  render () {
    const {classPrefix} = ProductsCtrl
    const { marketPrice, buyNow } = this.props.config

    return (
      <div className={`${classPrefix}`}>
        <h2 className='ctrl-card-header'>SETTINGS BAR</h2>
        <div className='ctrl-card'>
          <CheckBox
            checked={marketPrice}
            onChange={this.handleChangeMarketPrice}
          >
            show market price
          </CheckBox>
          <CheckBox
            checked={buyNow}
            onChange={this.handleChangeBuyNow}
          >
            show 'BUY NOW' button
          </CheckBox>
        </div>
      </div>
    )
  }
}

export default ProductsCtrl
