/**
 * @author MG Ding (丁文强)
 * @desc 订单列表
 */
// eslint-disable-next-line no-unused-vars
import './OrderDetails.less'
import React from 'react'
import PropTypes from 'prop-types'
// import Button from '../../plugin/component/Button'
import Icon from '../../plugin/component/Icon'
import Link from '../../plugin/component/Link'
import {setClass, color, font, query2Obj, formatPrice, fetchLite} from '../../source/util'
import {orderDetails} from '../../source/service/user'

const statusMap = ['Unpaid', 'Authorized', 'Paid', 'Processing', 'Dispatched', 'Receipted', 'Reviewed', 'Completed', 'Closed']

export default class OrderDetails extends React.Component {
  static propTypes = {
    config: PropTypes.object
  }
  static classPrefix = 'm-orderDetails'
  state = {
    data: null
  }

  getData = (id) => {
    fetchLite(orderDetails.bind(null, id), {
      done: (data) => {
        this.setState({data: data.data})
      },
      authority: true
    })
  }

  componentWillMount () {
    this.getData(query2Obj().id)
  }

  render () {
    const {classPrefix} = OrderDetails
    const {pageMode} = this.props
    const {data} = this.state

    console.log(data)

    if (data) {
      const {
        order_number: orderNumber,
        shipping_address: shippingAddress,
        processed_at: time,
        delivery_id: deliveryId,
        delivery_name: deliveryName,
        currency_symbol: currency,
        subtotal,
        shipping: shippingPrice,
        total_price: totalPrice,
        total_tax: tax,
        payment_info: payment,
        status
      } = data

      const {
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        address,
        suite,
        city,
        province_name: province,
        country_name: country
      } = shippingAddress

      const items = (() => {
        let item1 = data.unfulfilled ? (data.unfulfilled.order_items || []) : []
        let item2 = data.fulfilled ? data.fulfilled[0].order_items : []
        item1.map(item => {
          item._quantity = item.unfulfill_quantity
          return item
        })

        item2.map(item => {
          item._quantity = item.fulfillable_quantity
          return item
        })
        return item1.concat(item2)
      })()

      return (
        <div className={`${classPrefix} l-centerBlock`}>

          {/** 面包屑导航 **/}
          <div className={`${classPrefix}-crumbs ${font('text')}`}>
            <Link href='/orders/' className={`${color('text')}`}>My Orders</Link>
            <Icon type='forward' color='subText' />
            <span className={`${color('subText')}`}>Order Details</span>
          </div>

          {/** 手机版订单状态 **/}
          <div className={`${classPrefix}-status ${color.border('border')} l-centerBlock2 mobile-item`}>
            <p>Order Status</p>
            <h2 className={`${classPrefix}-status-title ${color('title')} ${font('title')}`}>
              <span>{(statusMap[status] || '').toUpperCase()}</span>
            </h2>
            <span className={`${color('subText')}`}>Expired payment, system has automatically canceled the order for you.</span>
          </div>

          {/** 手机版订单操作 **/}
          {/* <div className={`${classPrefix}-bottom ${color.border('hr')} ${color.bg('bg')} mobile-item`}>
            <Button type='ghost'>DELETE ORDER</Button>
            <Button>BUY AGAIN</Button>
          </div> */}

          <div className={`${classPrefix}-infoBlock ${color.border('border')}`}>

            {/** 订单基本信息 **/}
            <div className={`${classPrefix}-info ${color.bg('subBg')}`}>
              <h3 className={`${color('title')} ${font('subTitle')} pc-item`}>Order number {orderNumber}</h3>
              <dl>
                <dt className={`${color('subText')}`}>Shipping address</dt>
                <dd>
                  <p>
                    <strong>{firstName} {lastName} </strong>
                    <strong>{phone}</strong>
                  </p>
                  <p className={`${color('subText')}`} style={{marginTop: pageMode ? 5 : 15}}>
                    {[address, suite, city, province, country].filter((item) => item).join(', ')}
                  </p>
                </dd>
              </dl>
              <dl>
                <dt className={`${color('subText')}`}>Order time</dt>
                <dd>{time}</dd>
              </dl>
              {!!payment && (
                <dl>
                  <dt className={`${color('subText')}`}>Payment method</dt>
                  <dd className={`${classPrefix}-info-payment`}>
                    {/* <img src='/source/img/paymentMethod.png' /> */}
                    <strong>{payment.pay_channel} &nbsp;&nbsp;</strong>
                    <strong>{!!payment.payer_account && `****${payment.payer_account.slice(-3)}`}</strong>
                  </dd>
                </dl>
              )}
            </div>

            {/** pc版订单状态以及操作 **/}
            <div className={`${classPrefix}-status ${color.border('border')} pc-item`}>
              <p>Order Status</p>
              <h2 className={`${classPrefix}-status-title ${color('title')} ${font('title')}`}>
                <span>{(statusMap[status] || '').toUpperCase()}</span>
              </h2>
              <span className={`${color('subText')}`}>Expired payment, system has automatically canceled the order for you.</span>
              {/* <p style={{marginTop: 30}}>Your Can</p>
              <div className={`${classPrefix}-status-button`}>
                <Button type='ghost'>DELETE ORDER</Button>
                <Button>BUY AGAIN</Button>
              </div> */}
            </div>
          </div>
          {/* <h2 className={`${classPrefix}-title ${color('title')} ${font('subTitle')} pc-item`}>Delivery Information</h2>
          <i className={`${classPrefix}-delivery-hr ${color.border('hr')} mobile-item`} /> */}

          {/** 物流信息 **/}
          {/* <div className={`${classPrefix}-delivery ${color.border('border')} ${setClass({[color.bg('subBg')]: pageMode})}`}>
            <dl>
              <dt className={`${color('subText')}`}>Freight order number</dt>
              <dd>
                <p>{deliveryId}</p>
              </dd>
            </dl>
            <dl>
              <dt className={`${color('subText')}`}>Delivery method</dt>
              <dd>
                <p>{deliveryName}</p>
              </dd>
            </dl>
            <dl>
              <dt className={`${color('subText')}`}>Shipping fee</dt>
              <dd>
                <p>{currency}{shippingPrice}</p>
              </dd>
            </dl>
            <dl className={`${classPrefix}-logistics`}>
              <dt className={`${color('subText')}`}>Logistics information</dt>
              <dd>
                <div>
                  <i className='top-dot' />
                  <i className='bottom-dot' />
                </div>
                <ul>
                  <li className={`${color.border('hr')}`}>
                    <p>[Shenzhen] Your order has arrived [Shenzhen Peace Station]</p>
                    <span className={`${color('subText')}`}>2018-03-16 14:58:31</span>
                  </li>
                  <li className={`${color.border('hr')}`}>
                    <p>[Shenzhen] Your order has arrived [Shenzhen Peace Station]</p>
                    <span className={`${color('subText')}`}>2018-03-16 14:58:31</span>
                  </li>
                  <li className={`${color.border('hr')}`}>
                    <p>[Shenzhen] Your order has arrived [Shenzhen Peace Station]</p>
                    <span className={`${color('subText')}`}>2018-03-16 14:58:31</span>
                  </li>
                </ul>
              </dd>
            </dl>
          </div> */}

          {/** 商品信息 **/}
          <h2 className={`${classPrefix}-title ${color('title')} ${font('subTitle')} pc-item`}>Product Information</h2>
          <div className={`${classPrefix}-products ${color.border('border')}`}>
            <div className={`${classPrefix}-products-title ${color.border('hr')} ${font('secTitle')} pc-item`}>
              <p>PRODUCT</p>
              <p>PRICE</p>
              <p>QUANTITY</p>
              <p>TOTAL</p>
            </div>
            <ul>
              {!!(items && items.length) &&
                items.map(({
                  product_id: id,
                  product_img: img,
                  title,
                  _quantity,
                  sku_code: sku,
                  spu_code: spu,
                  price,
                  currency_symbol: currency,
                  item_remark: remark
                }, index) => {
                  return (
                    <li className={`${color.border('hr')}`} key={index}>
                      <div>
                        <Link href={`/products/?id=${spu}`}>
                          <img src={img} />
                        </Link>
                        <div className='item-desc'>
                          <p>{title}</p>
                          <p className={`${color('subText')}`}>{remark}</p>
                        </div>
                      </div>
                      <div>
                        {currency}{price}
                      </div>
                      <div className='pc-item'>
                        ×{_quantity}
                      </div>
                      <div className='pc-item'>
                        {currency}{formatPrice(price * _quantity, true)}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>

          {/** 订单价格 **/}
          <div className={`${classPrefix}-total ${color.bg('subBg')} clearfix`}>
            <div>
              <dl>
                <dt>Subtotal</dt>
                <dd>{currency}{subtotal}</dd>
              </dl>
              <dl>
                <dt>Shipping</dt>
                <dd>{currency}{shippingPrice}</dd>
              </dl>
              <dl>
                <dt>Tax</dt>
                <dd>{currency}{tax}</dd>
              </dl>
              <dl className={`${color.border('hr')}`}>
                <dt className={`${font('subTitle')}`}>Total</dt>
                <dd>
                  <span className={`${color('subText')}`}>{currency}</span>
                  <strong className={`${font('title')}`}>{totalPrice}</strong>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}
