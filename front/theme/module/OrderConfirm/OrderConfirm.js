/**
 * @author：Gavin Yang (杨伟伟)
 * @desc：订单确认页
 * @date：2018.3.26
 */

import './OrderConfirm.less'
import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../../plugin/component/Icon'
import Link from '../../plugin/component/Link'
import Button from '../../plugin/component/Button'

import { addOrder,getCartList } from '../../source/service/page'
import { color, font, formatPrice, fetchLite } from '../../source/util'
import myreflux from '../../plugin/reactcommon/myreflux'

import Address from './Address'
import Products from './Products'
import Delivery from './Delivery'


// pageMode:0 表示PC，1表示移动端

class OrderConfirm extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  static classPrefix = 'm-orderConfirm'
  constructor(props) {
    super(props)
    this.state = {
      symbol: 'US $', //当前货币
      productsTotal: 0, //商品价格总计
      shippingPrice: 0, // 运费
      address_id: null, //选中的地址id
      shipping_id: null, //选中的物流id，
      products: null, // 购物车商品数据
      costList: null, // 费用结算清单
      totalCost: 0, // 费用总计
    }
    myreflux.on('updateTopState', (data) => {
      if (data && typeof data === 'object') {
        this.setState({ ...data })
      }
    })
  }
  componentDidMount () {
    // 拉起商品信息
    let productIdList = JSON.parse(sessionStorage.getItem('cart_list')) || []

    fetchLite(getCartList.bind(null, productIdList), {
      authority: true,
      done: (res) => { this.initCartData(res) }
    })
  }
  initCartData = (res) => {
    if (!res.data || !res.data.cart_list) {
      return
    }

    let products = []
    res.data.cart_list.forEach(v => {
      let props = ''
      if (v.properties && v.properties.length > 0) {
        props = v.properties.map(item => (item.value)).join('/')
      }
      products.push({
        props,
        cart_id: v.cart_id,
        imgSrc: v.main_img,
        count: 'x' + v.quantity,
        product_id: v.product_id,
        goodsName: v.product_name,
        price: `${v.currency_symbol}${formatPrice(v.sell_price, true)}`,
      })
    })

    let totalCost = 0
    let costList = res.data.price_info.map(item => {
      totalCost += item.value
      return item
    })
    // 运费暂时写死成0，后期迭代再计算运费
    costList.push({
        value: 0,
        key:'Shipping',
        name: 'Shipping',
        currency: costList[0]['currency'],
        currency_symbol: costList[0]['currency_symbol']
      }
    )
    this.setState({
      products, 
      totalCost,
      costList,
      productsTotal: totalCost,
      symbol: res.data.cart_list[0]['currency_symbol']
    })
  }
  fetchAddOrder = () => {
    //创建订单
    const { shipping_id, address_id } = this.state
    const remarks = sessionStorage.getItem('remarks') || ''
    const cart_list = JSON.parse(sessionStorage.getItem('cart_list')) || []

    //沒有地址
    if (!address_id) {
      return
    }

    if (this.lockPay) {
      return
    }
    this.lockPay = true

    fetchLite(addOrder.bind(null, { cart_list, shipping_id, address_id, remarks }), {
      done: (res) => {
        Link.goTo(`/payment/?order_id=${res.data.order_id}&trade_no=${res.data.trade_no}`)
      },
      complete: ()=>{
        this.lockPay = false
      }
    })

  }
  slideToggleTrans = (element) => {
    if (!element) {
      return
    }

    let nodeHeight = this[element + 'Height']
    let dom = document.getElementById(element)
    let moreTip = document.getElementsByClassName('moreTips')

    if (element === 'goods') {
      let goodsHeight = dom.offsetHeight

      if (!nodeHeight) {
        let _childNode = document.getElementsByClassName('animate-container')[0]
        this['goodsHeight'] = _childNode.offsetHeight
        nodeHeight = this['goodsHeight']
      }

      if (goodsHeight > 0) {
        moreTip[0].setAttribute('class', 'moreTips up')
        dom.style.cssText = 'height:0px;'
      } else {
        moreTip[0].setAttribute('class', 'moreTips')
        dom.style.cssText = 'height:' + nodeHeight + 'px;'
      }
      return null
    }
  }
  render() {
    let { classPrefix } = OrderConfirm
    let {
      symbol,
      address_id,
      productsTotal,
      shippingPrice, products, costList, totalCost
    } = this.state

    return (
      <div className={`${classPrefix}-centerBlock l-centerBlock`}>
        <div className='order-summary-toggle'>
          <a href='javascript:void (0)' onClick={() => this.slideToggleTrans('goods')}>
            <span>Hide order summary</span>
            <span className='moreTips up'>
              <Icon type='unfold' />
            </span>
          </a>
          <span>
            {`${symbol} ${formatPrice((productsTotal + shippingPrice), true)}`}
          </span>
        </div>
        <div className='payment-header'>
          <ul className='progress-bar'>
            <li><p className='active'><a href='javascript:;'>Customer information</a><Icon type='forward' /></p></li>
            <li><p><a href='javascript:;'>Payment method</a><Icon type='forward' /></p></li>
            <li><p><a href='javascript:;'>Payment successful</a><Icon type='forward' /></p></li>
          </ul>
        </div>
        <div className='content'>
          <Products
            products={products}
            costList={costList}
            totalCost={totalCost}
            classPrefix={classPrefix}
            shippingPrice={shippingPrice}
          />
          <div className={`${classPrefix}-form`}>
            <Address />
            <Delivery classPrefix={classPrefix} address_id={address_id} />
            <div className={`${classPrefix}-botton`}>
              <div className='backToCart'>
                <Link href='/cart/'>
                  <Icon type='back' />
                  <span className={`${color('text')} ${font('subTitle')}`}>Return to cart</span>
                </Link>
              </div>
              <Button className='submit' onClick={this.fetchAddOrder}>Continue to payment method</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default OrderConfirm