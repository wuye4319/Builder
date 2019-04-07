/* eslint-disable camelcase */
/**
 * @author Alan (曹昌盛)
 * @desc Cart模块
 */
import './Cart.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../plugin/component/Icon'
import Quantity from '../../plugin/component/Quantity'
import Button from '../../plugin/component/Button'
import Link from './../../plugin/component/Link'
import { color, font } from '../../source/util'
import Message from '../../plugin/component/Message'
import {getCartData, selectCartItem, changeCartItem} from '../../source/service/page'

let initialConfig = require('./config.json')

export default class Cart extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  static classPrefix = 'm-cart'
  state = {
    initBefore: true,
    isEmpty: true,
    checkedAll: true,
    noteValue: '',
    subTotal: 0,
    cartList: []
  }
  // 防止连续多次点击
  flag = true
  // 请求接口获取数据
  getCartData = () => {
    getCartData().then((res) => {
      if (res.state === 0) {
        this.handleResData(res.data)
      }
      this.flag = true
    }).catch(() => {
      this.flag = true
      this.setState({
        initBefore: false
      })
    })
  }
  // 处理接口数据
  handleResData = (data) => {
    // 购物车列表和商品信息
    const {cart_list, price_info} = data
    // 购物车不为空
    if (cart_list.length > 0) {
      // 判断是否全部选中
      const tempList = cart_list.filter(item => item.is_select)
      const selectAll = tempList.length === cart_list.length
      this.setState(() => ({
        cartList: cart_list,
        subTotal: price_info[0].value,
        checkedAll: selectAll,
        initBefore: false,
        isEmpty: false
      }))
    } else {
      this.setState({
        initBefore: false
      })
    }
  }
  // 全选和反选操作
  checkedAll = () => {
    if (this.flag) {
      this.flag = false
      const {checkedAll, cartList} = this.state
      const tempList = cartList.map(item => item.cart_id)
      this.postSelect(tempList, !checkedAll).then(status => {
        if (status) {
          cartList.map(item => {
            item.is_select = checkedAll ? 0 : 1
            return item
          })
          this.setState({
            checkedAll: !checkedAll,
            cartList: cartList
          })
        }
      })
    }
  }
  // 取消和选中操作
  toggleSelect = (key) => {
    if (this.flag) {
      this.flag = false
      const cartList = [...this.state.cartList]
      const {cart_id, is_select} = cartList[key]
      this.postSelect([cart_id], !is_select).then(status => {
        if (status) {
          cartList[key].is_select = !is_select ? 1 : 0
          const tempList = cartList.filter(item => item.is_select)
          const selectAll = tempList.length === cartList.length
          this.setState({
            checkedAll: selectAll,
            cartList: cartList
          })
        }
      })
    }
  }
  // 选择商品数据提交
  postSelect = (list, select) => {
    // return fetch('/carts/select', {
    //   method: 'post',
    //   body: {
    //     'cart_list': list,
    //     'is_select': select ? 1 : 0
    //   }
    // }).then((res) => {
    return selectCartItem({list, select: select ? 1 : 0}).then((res) => {
      this.flag = true
      if (res.state === 0) {
        return true
      } else {
        return false
      }
    }).catch((err) => {
      this.flag = true
      console.log(err)
    })
  }
  // 删除商品
  deleteGoods = (key) => {
    if (this.flag) {
      this.flag = false
      const cartList = [...this.state.cartList]
      const {cart_id} = cartList[key]
      this.postGoodsCount(cart_id).then(status => {
        if (status) {
          cartList.splice(key, 1)
          this.setState({
            cartList: cartList,
            isEmpty: !cartList.length
          })
          this.props.reloadCartInfo()
        }
      })
    }
  }
  // 改变商品数量
  handleCount = (key, count) => {
    if (this.flag) {
      this.flag = false
      const cartList = [...this.state.cartList]
      const {cart_id} = cartList[key]
      this.postGoodsCount(cart_id, 2, count).then(status => {
        if (status) {
          cartList[key].quantity = count
          this.setState({
            cartList: cartList
          })
        }
      })
    }
  }
  // 删除或改变商品数量数据提交
  postGoodsCount = (id, type = 1, count = 0) => {
    // changeCartItem
    // return fetch('/carts/change', {
    //   method: 'post',
    //   body: {
    //     'cart_id': id,
    //     'type': type, // 1:删除,2:更改
    //     'quantity': count
    //   }
    // }).then((res) => {
    return changeCartItem({id, type, count}).then((res) => {
      this.flag = true
      if (res.state === 0) {
        return true
      } else {
        return false
      }
    }).catch((err) => {
      this.flag = true
      console.log(err)
    })
  }
  // 商品备注
  changeNote = (e) => {
    this.setState({
      noteValue: e.target.value
    })
  }
  // 求总价格
  sumPrice = () => {
    const cartList = [...this.state.cartList]
    let sum = 0
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].is_select) {
        sum += Number((cartList[i].quantity * cartList[i].sell_price))
      }
    }
    return sum.toFixed(2)
  }
  // 处理商品属性数组为字符串
  prdProps2string = (arr) => {
    let prdProps
    if (arr) {
      prdProps = arr.map(item =>
        item.valueName
      ).join('/')
    }
    return prdProps
  }
  // 跳转至订单确认
  submitOrder = () => {
    const {cartList} = this.state
    let list = []
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].is_select) {
        list.push(cartList[i].cart_id)
      }
    }
    if (list.length > 0) {
      window.sessionStorage.setItem('cart_list', JSON.stringify(list))
      window.sessionStorage.setItem('remarks', this.state.noteValue)
      Link.goTo('/order_confirm/')
    } else {
      Message.error('请选择相关商品')
    }
  }
  // 跳转至商品详情
  goToDetails = (id) => {
    Link.goTo('/products/?id=' + id)
  }
  componentDidMount = () => {
    this.getCartData()
  }

  render () {
    const {classPrefix} = Cart
    const {config = initialConfig, pageMode} = this.props
    const {isEmpty, checkedAll, cartList, noteValue, initBefore} = this.state
    const {selectAll, orderNote} = config
    const sumPrice = this.sumPrice()

    return (
      <div className={`${classPrefix}-wrap l-centerBlock`}>
        <h2 className={`cart-title l-mobile-cart-title ${color('text')} ${font('title')}`}>SHOPPING CART</h2>
        {
          initBefore ? '' : (isEmpty ? <div className='cart-empty'>
            <i className='circle' />
            <p className={`${color('text')} ${font('subTitle')}`}>YOUR CART IS EMPTY</p>
            <Button type='ghost'
              className={`${color('brand')} ${font('button')} ${color.border('brand')}`}
              onClick={() => {
                Link.goTo('/home/')
              }}
            >
              Continue Shopping
            </Button>
          </div>
            : <div className='cart-list'>
              <div className={`cart-sub-title ${!selectAll && !!pageMode ? 'no-title' : ''}`}>
                <div className='select-all'>
                  <label>
                    {
                      selectAll && <React.Fragment>
                        <input type='checkbox' onChange={this.checkedAll} checked={checkedAll} />
                        <span className={`${color('text')} ${font('text')}`}>Select all</span>
                      </React.Fragment>
                    }
                  </label>
                  {
                    !pageMode && <span className='product-span'>Product</span>
                  }
                </div>
                {
                  !pageMode &&
                  <React.Fragment>
                    <span className='price'>Price</span>
                    <span className='quantity'>Quantity</span>
                    <span className='total'>Total</span>
                  </React.Fragment>
                }
              </div>
              <div className='lists-wrap'>
                {
                  cartList.map((item, key) => (
                    <div className='list-item' key={key}>
                      <div className='check-goods'>
                        {
                          selectAll ? <input type='checkbox' onChange={this.toggleSelect.bind(this, key)}
                            checked={!!item.is_select} /> : <span className='instead' />
                        }
                        <div className='goods-desc' onClick={this.goToDetails.bind(this, item.spu_code)}>
                          <img src={item.main_img} alt={item.product_name} />
                          {
                            !pageMode && <div className='details'>
                              <h3 className={`${color('text')} ${font('text')}`}>{item.product_name}</h3>
                              {
                                !!item.productProps && item.productProps.map((val, index) =>
                                  <p key={index}>{val.propName}: {val.valueName}</p>
                                )
                              }
                            </div>
                          }
                        </div>
                      </div>
                      {
                        !pageMode ? <React.Fragment>
                          <span className='price'>${item.sell_price}</span>
                          <div className='quantity'>
                            <Quantity value={item.quantity} onChange={this.handleCount.bind(this, key)} />
                          </div>
                          <p className='total'>
                            <span>${(item.sell_price * item.quantity).toFixed(2)}</span>
                            <Icon type='no-filling' onClick={this.deleteGoods.bind(this, key)} />
                          </p>
                        </React.Fragment>
                          : <div className='l-mobile-goods-info'>
                            <div className='info-top'>
                              <p className={`${color('text')} ${font('text')}`}
                                onClick={this.goToDetails.bind(this, item.spu_code)}>{item.product_name}</p>
                              <Icon type='no-filling' onClick={this.deleteGoods.bind(this, key)} />
                            </div>
                            <div className='color-size'>
                              {this.prdProps2string(item.productProps)}
                            </div>
                            <div className='price'>
                              <span>Price</span>
                              <span>${item.sell_price}</span>
                            </div>
                            <div className='l-mobile-quantity'>
                              <span className='l-q-title'>Quantity</span>
                              <Quantity value={item.quantity} onChange={this.handleCount.bind(this, key)} />
                            </div>
                            <div className='l-mobile-total'>
                              <span>Total</span>
                              <span>${(item.sell_price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                      }
                    </div>
                  ))
                }

              </div>
              <div className={`l-mobile-list-bottom list-bottom ${!orderNote && !pageMode ? 'no-note' : ''}`}>
                {
                  orderNote && <div className='order-note'>
                    <h4>Add order note</h4>
                    <div className={`note ${color.border('border')}`}>
                      <textarea
                        className={`${color('prompt')} ${color('text')} ${font('text')}`}
                        placeholder='Text here…'
                        name='note'
                        value={noteValue}
                        onChange={this.changeNote}
                      />
                    </div>
                  </div>
                }
                <div className='order-operate'>
                  <div className='total-price'>
                    <span className='left'>Subtotal</span>
                    <span className={`num ${color('price')} ${font('price')}`}>${sumPrice}</span>
                  </div>
                  <p className={`${color('text')} ${font('secTitle')}`}>Shipping & taxes calculated at checkout</p>
                  <div className='o-btm'>
                    <Link href='/home/'>
                      <span className={`${color('text')} ${font('secTitle')}`}>To Home page</span>
                      <Icon type='forward' />
                    </Link>
                    <Button onClick={this.submitOrder}>Check Out</Button>
                  </div>
                </div>
              </div>
            </div>)
        }

      </div>
    )
  }
}
