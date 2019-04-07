/**
 * @author Alan (曹昌盛)
 * @desc PayResult模块
 */
import './PayResult.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from './../../plugin/component/Icon'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
import Message from './../../plugin/component/Message'
import { color, font } from '../../source/util'

class PayResult extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  state = {
    isSuccess: true,
    orderList: [
      {
        count: 3,
        price: 20.00
      },
      {
        count: 5,
        price: 40.00
      }
    ],
    priceInfo: [
      {
        'key': 'total_item',
        'name': 'Subtotal',
        'value': '432.14'
      },
      {
        'key': 'total_tax',
        'name': 'Tax',
        'value': '0.00'
      },
      {
        'key': 'total_shipping',
        'name': 'Shipping',
        'value': '63.31'
      },
      {
        'key': 'total_discount',
        'name': 'Discount',
        'value': '0.00'
      },
      {
        'key': 'total',
        'name': 'Total',
        'value': '432.14'
      }
    ]
  }
  // 支付成功跳转个人中心查看订单
  goUserCenter = () => {
    Link.goTo('/orders')
  }
  // 支付失败，再次发起支付
  payOrder = () => {
    Message.warning('再次支付没有接口')
  }

  render () {
    const {pageMode} = this.props
    const {isSuccess, orderList, priceInfo} = this.state
    return (
      <div className={`m-payresult-wrap l-centerBlock`}>
        <div className='pay-result'>
          <div className='result-top'>
            <div className='success-icon'>
              <Icon type={isSuccess ? 'yes-filling' : 'info-filling'} />
            </div>
            <div className='success-info'>
              <h3 className={`${color('text')} ${font('title')}`}>{isSuccess ? 'Pay Successful' : 'Pay Failed'}</h3>
              <p className={`${color('text')} ${font('text')}`}>We will arrange the shipment as soon as possible, please
                keep the communication intact or check your email in time</p>
              <div className='operate'>
                {
                  isSuccess
                    ? <React.Fragment>
                      <Button
                        className={`l-mobile-check ${color('button')} ${font('button')} ${color.bg('brand')}`}
                        onClick={this.goUserCenter}
                      >CHECK ORDER</Button>
                      <Link href='/home' className={`${color('text')} ${font('subTitle')}`}>
                        <span> Return to Home page</span>
                        <Icon type='forward' />
                      </Link>
                    </React.Fragment>
                    : <React.Fragment>
                      <Button
                        className={`l-mobile-check ${color('button')} ${font('button')} ${color.bg('brand')}`}
                        onClick={this.payOrder}
                      >Pay Again</Button>
                      <Link href='/orders' className={`${color('text')} ${font('subTitle')}`}>
                        <span>Check order details</span>
                        <Icon type='forward' />
                      </Link>
                    </React.Fragment>
                }
              </div>
            </div>
          </div>
          {/* <div className='result-main'>
            <div className='content-summary'>
              <div className='order-summary'>
                <div className='item-info'>
                  {
                    !pageMode && <span className={`item ${color('subText')} ${font('text')}`}>Recipient</span>
                  }
                  <div className='desc'>
                    <span className='uname'>Oldox Liao</span>
                    <span className='phone'>13766668888</span>
                  </div>
                </div>
                <div className='item-info'>
                  {
                    !pageMode && <span className={`item ${color('subText')} ${font('text')}`}>Recipient Address</span>
                  }
                  <div className={`desc ${color('text')} ${font('text')}`}>
                    NO. 5B 5F Tianzhan Buliding,Tianan Digital City, Futian Shenzhen,518000 Guangdong China
                  </div>
                </div>
                <div className='item-info'>
                  <span className={`item ${!pageMode ? color('subText') : color('text')} ${font('text')}`}>Delivery Method</span>
                  <div className={`desc ${color('text')} ${font('text')}`}>EMS</div>
                </div>
                <div className='item-info l-mobile-order-details'>
                  <span className={`item ${color('subText')} ${font('text')}`}>Order details</span>
                  <div className='lists-wrap'>
                    {
                      orderList.map((item, key) =>
                        <div className='order-details' key={key}>
                          <img src='http://gd3.alicdn.com/imgextra/i3/2/TB1wiPyjFuWBuNjSspnXXX1NVXa_!!2-item_pic.png'
                            alt='' />
                          <div className='details-list'>
                            <a href='javascript:;'>
                              <span className='brand'>Aimé Leon Dore Logo Yellow…</span>
                              <span className='count'>X{item.count}</span>
                            </a>
                            <a href='javascript:;'>
                              <span className='size'>Blue / XL</span>
                              <span className='price'>${item.price}</span>
                            </a>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className='content-total'>
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
                <span className='all'>${!priceInfo.length ? 0.00 : priceInfo[priceInfo.length - 1].value}</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

export default PayResult
