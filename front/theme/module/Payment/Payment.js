/**
 * @author Alan (曹昌盛)
 * @desc Payment模块
 */
import './Payment.less'
import React from 'react'
import PropTypes from 'prop-types'
import Radio from './../../../builder/plugin/component/Radio'
import Icon from './../../plugin/component/Icon'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
// import fetch from '../../plugin/component/util/fetch'
import { color, font, query2Obj, fetchLite } from '../../source/util'
import { getTrade, payment } from '../../source/service/purchase'
import { orderDetails } from '../../source/service/user'

const RadioGroup = Radio.Group

class Payment extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  state = {
    orderInfo: {
      address: '',
      cancel_reason: '',
      cancelled_at: null,
      city: '',
      company: '',
      country_name: '',
      currency: '',
      delivery_id: 0,
      delivery_name: '',
      financial_status: 0,
      first_name: '',
      fulfillment_status: 0,
      item_list: null,
      last_name: '',
      order_id: '',
      phone_number: '',
      processed_at: '',
      province_name: '',
      remarks: '',
      shipping_price: 0,
      status: 0,
      suite: '',
      tags: '',
      total_discounts: 0,
      total_items_price: 0,
      total_price: 0,
      total_quantity: 0,
      total_tax: 0,
      total_weight: 0,
      zip_code: 0
    },
    paymentList: [],
    defaultMethod: {
      name: ''
    },
    priceInfo: [],
    showOrder: false,
    modal: false,
    subTotal: 0
  }
  orderId = query2Obj()['order_id']
  tradeNo = query2Obj()['trade_no']
  // 隐藏显示订单
  toggleOrder = () => {
    const {showOrder} = this.state
    if (showOrder) {
      this.summaryWrap.style.height = '0px'
    } else {
      const oHeight = this.orderSummary.offsetHeight
      this.summaryWrap.style.height = oHeight + 'px'
    }
    this.setState({showOrder: !showOrder})
  }
  // 关闭弹框
  closeModal = (e) => {
    e.preventDefault()
    this.setState({modal: false})
    document.body.style.overflow = ''
    window.removeEventListener('touchmove', this.preventTouch, false)
  }
  // 阻止触摸事件
  preventTouch = (e) => {
    e.preventDefault()
  }
  // 显示弹框
  openModal = (e) => {
    this.setState({modal: true})
    document.body.style.overflow = 'hidden'
    window.addEventListener('touchmove', this.preventTouch, false)
  }
  selectMethod = (e) => {
    const id = e.target.value
  }
  // 获取订单列表处理订单列表数据
  getOrderInfo = () => {
    // fetch('/orders/' + this.orderId).then((res) => {
    //   if (res.state === 0) {
    //     this.setState({
    //       orderInfo: res.data
    //     })
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })

    fetchLite(orderDetails.bind(null, this.orderId), {
      done: (res) => {
        this.setState({
          orderInfo: res.data
        })
      },
      authority: true
    })
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
  // 收银台
  getTradeInfo = () => {
    // fetch('/payment/trade/' + this.tradeNo).then((res) => {
    //   if (res.state === 0) {
    //     const data = res.data
    //     this.setState({
    //       paymentList: data.paymentList,
    //       defaultMethod: data.paymentList[0],
    //       priceInfo: data['price_info']
    //     })
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })

    fetchLite(getTrade.bind(null, this.tradeNo), {
      done: (res) => {
        const data = res.data
        this.setState({
          paymentList: data['payment_list'],
          defaultMethod: data['payment_list'][0],
          priceInfo: data['price_info']
        })
      },
      authority: true
    })
  }
  // 跳到支付结果页面
  goPayResult = () => {
    Link.goTo('/pay_result')
  }
  payment = () => {
    fetchLite(payment.bind(null, this.tradeNo), {
      done: () => {
        this.goPayResult()
      }
    })
  }
  componentDidMount = () => {
    this.getOrderInfo()
    this.getTradeInfo()
  }

  render () {
    const {pageMode} = this.props
    const {showOrder, modal, orderInfo, paymentList, defaultMethod, priceInfo} = this.state
    return (
      <div className={`m-payment-wrap l-centerBlock`}>
        {/* PC内容 */}
        <div className='payment-content l-mobile-payment-content'>
          <div className='content-summary'>
            {
              !pageMode && <div className='payment-header'>
                <ul className='progress-bar'>
                  <li><p><a href='javascript:;'>Customer information</a><Icon type='forward' /></p></li>
                  <li><p className='active'><a href='javascript:;'>Payment method</a><Icon type='forward' /></p></li>
                  <li><p><a href='javascript:;'>Payment successful</a><Icon type='forward' /></p></li>
                </ul>
              </div>
            }
            {/* PC内容订单显示隐藏 */}
            {
              !pageMode && <div className='method-order'>
                <h3>Payment method</h3>
                <p className='toggle-order' onClick={this.toggleOrder}>
                  <button>Hide order summary</button>
                  <Icon type='unfold' className={showOrder ? 'i-up' : 'i-down'} />
                </p>
              </div>
            }
            {/* 移动订单显示隐藏 */}
            {
              !!pageMode &&
              <div className='l-mobile-method-order'>
                <div className='toggle-order' onClick={this.toggleOrder}>
                  <Icon type='menu' />
                  <span>Order details</span>
                  <Icon type='unfold' className={showOrder ? 'i-up' : 'i-down'} />
                </div>
                <span className='all-price'>${!priceInfo.length ? 0.00 : priceInfo[priceInfo.length - 1].value}</span>
              </div>
            }

            <div className='summary-wrap' ref={(e) => { this.summaryWrap = e }}>
              <div className='order-summary' ref={(e) => { this.orderSummary = e }}>
                <div className='item-info'>
                  {!pageMode && <span className={`item ${color('subText')} ${font('text')}`}>Recipient</span>}
                  <div className='desc'>
                    <span className='uname'>{orderInfo.first_name}&nbsp;{orderInfo.last_name}</span>
                    <span className='phone'>{orderInfo.phone_number}</span>
                  </div>
                </div>
                <div className='item-info'>
                  {!pageMode && <span className={`item ${color('subText')} ${font('text')}`}>Recipient Address</span>}
                  <div className={`desc ${color('text')} ${font('text')}`}>
                    {orderInfo.country_name}{orderInfo.province_name}{orderInfo.city}{orderInfo.address}{orderInfo.suite}
                  </div>
                </div>
                <div className='item-info'>
                  <span className={`item ${!pageMode ? color('subText') : color('text')} ${font('text')}`}>Delivery Method</span>
                  <div className={`desc ${color('text')} ${font('text')}`}>{orderInfo.delivery_name}</div>
                </div>
                <div className='item-info l-mobile-order-details'>
                  <span className={`item ${color('subText')} ${font('text')}`}>Order details</span>
                  <div className='lists-wrap'>
                    {
                      !!orderInfo.item_list && orderInfo.item_list.map((item, key) =>
                        <div className='order-details' key={key}>
                          <img src={item['product_img']} alt={item['product_name']} />
                          <div className='details-list'>
                            <a href='javascript:;'>
                              <span className='brand'>{item['product_name']}</span>
                              <span className='count'>X{item.quantity}</span>
                            </a>
                            <a href='javascript:;'>
                              <span className='size'>{this.prdProps2string(item['product_props'])}</span>
                              <span className='price'>${item['unit_price']}</span>
                            </a>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className={`select-methods ${!pageMode && showOrder ? 'up' : ''}`}>
              {!!pageMode && <h3>Payment method</h3>}
              {
                !!paymentList.length && <RadioGroup
                  name='payment-method'
                  value={defaultMethod.name}
                  onChange={this.selectMethod}>
                  {
                    paymentList.map((item, key) =>
                      <Radio value={item.name} className='first' key={key}>
                        <section className='address-info'>
                          <div className='logo-sprite'>
                            <div className='logo'>
                              <img src='/source/img/paymentMethod.png' alt='' />
                            </div>
                            <div className='img-icon'>
                              <img src='/source/img/icon_pay_mastercard.png' alt='' />
                              <img src='/source/img/icon_pay_visa.png' alt='' />
                              <img src='/source/img/icon_pay_amex.png' alt='' />
                            </div>
                          </div>
                          <p className={`${color('text')} ${font('text')}`}>{item.name}</p>
                        </section>
                      </Radio>
                    )
                  }
                </RadioGroup>
              }

            </div>
            <div className='payment-confirm'>
              <Link className='back' href='/order_confirm'>
                <Icon type='back' />
                <span className={`${color('text')} ${font('subTitle')}`}>Modify information</span>
              </Link>
              {/*<Button className='confirm' onClick={this.openModal}>PAY</Button>*/}
              <Button className='confirm' onClick={this.payment}>PAY</Button>
              {modal &&
              <React.Fragment>
                <div onClick={this.closeModal} className='peyment-modal-mask' />
                <div className='l-mobile-payment-modal payment-modal'>
                  <div className='modal-top'>
                    <Icon type='close' onClick={this.closeModal} />
                  </div>
                  <div className='warn-icon'>
                    <Icon type='info-filling' />
                  </div>
                  <p className={`${color('text')} ${font('subTitle')}`}>Please complete the payment on the third-party
                    payment page. Do not close this window until the payment is completed.</p>
                  <div className='paid'>
                    <Button onClick={this.goPayResult}>I have paid successfully</Button>
                  </div>
                  <div className='problem'>
                    <Button type='ghost' onClick={this.closeModal}>Pay for the problem and pay again</Button>
                  </div>
                </div>
              </React.Fragment>
              }
            </div>
          </div>

          {/* PC结算金额 */}
          {
            !pageMode && <div className='content-total'>
              {
                priceInfo.map((item, key) => {
                  return key !== priceInfo.length ? <p key={key}>
                    <span>{item.name}</span>
                    <span>${item.value}</span>
                  </p> : ''
                })
              }
              <div className='total-price'>
                <span className='total'>Total</span>
                <span className='kind'>USD</span>
                <span
                  className='all'>${!priceInfo.length ? 0.00 : priceInfo[priceInfo.length - 1].value}</span>
              </div>
            </div>
          }
        </div>
        {/* 移动内容 */}
      </div>
    )
  }
}

export default Payment
