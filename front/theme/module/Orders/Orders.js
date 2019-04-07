/* eslint-disable camelcase */
/**
 * @author MG Ding (丁文强)
 * @desc 订单列表
 */
// eslint-disable-next-line no-unused-vars
import './Orders.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../plugin/component/Button'
import Pagination from '../../plugin/component/Pagination'
import Icon from '../../plugin/component/Icon'
import Link from '../../plugin/component/Link'
import {setClass, color, font} from '../../source/util'
import {getOrders} from '../../source/service/user'

const statusMap = ['Unpaid', 'Authorized', 'Paid', 'Processing', 'Dispatched', 'Receipted', 'Reviewed', 'Completed', 'Closed']

export default class Orders extends React.Component {
  static propTypes = {
    config: PropTypes.object
  }
  static classPrefix = 'm-orders'
  state = {
    data: [],
    pageSize: 10,
    page: 1,
    total: 0,
    totalPage: 1
  }
  getData = (n) => {
    const {pageSize, page} = this.state
    // return fetch('/orders', {
    //   body: {
    //     'per_pagesize': pageSize,
    //     'page': n || page
    //   }
    // }).then((data) => {
    return getOrders(pageSize, n || page).then((data) => {
      if (data.state === 0) {
        let _data = data.data
        let list = _data.data || []
        // const {pageMode} = this.props
        this.setState({
          // data: pageMode === 1 ? (this.state.data || []).concat(list) : list,
          data: list,
          total: _data.total || 0,
          totalPage: _data['total_page'] || 1,
          page: _data['current_page'] || 1
        })
      } else if (data.state === 10008) {
        Link.goTo(`/login/?ref=${encodeURIComponent(window.location.href)}`)
      }
    })
  }
  handleChangePage = (n) => {
    return this.getData(n)
  }

  componentWillMount () {
    this.getData()
  }
  render () {
    const {classPrefix} = Orders
    const {pageMode} = this.props
    const {data, total, totalPage, page, pageSize} = this.state

    console.log(data)

    return (
      <div className={`${classPrefix}`}>
        {data && data.length
          ? (
            <React.Fragment>
              {pageMode
                ? ''
                : (
                  <div className={`${classPrefix}-header ${color.border('hr')} ${color('text')}  ${font('subTitle')}`}>
                    <p>PRODUCT INFORMATION</p>
                    <p>PRICE</p>
                    <p>OPERATING</p>
                  </div>
                )
              }
              <ul className={`${classPrefix}-list`}>
                {pageMode
                  ? data.map(item => <OrderItemMobile data={item} key={item.id} />)
                  : data.map(item => <OrderItem data={item} key={item.id} />)
                }
              </ul>
              <Pagination
                totalPage={totalPage}
                totalRow={total}
                pageNo={page}
                size={pageSize}
                handleChangePage={this.handleChangePage}
                scrollLoad={pageMode === 1}
              />
            </React.Fragment>
          )
          : (
            <div className={`${classPrefix}-none`}>
              <i />
              <p className={`${color('title')} ${font('subTitle')}`}>You haven't placed any orders yet.</p>
              <Button href='/home/' type='ghost'>Continue Shopping</Button>
            </div>
          )
        }
      </div>
    )
  }
}

/** 订单项 **/
const OrderItem = (props) => {
  const classPrefix = 'm-orders-item'
  const {order_number, id, processed_at: time, total_price: price, item_list: items, show_delete: showDelete, status, currency_symbol: currency} = props.data

  return (
    <li className={`${classPrefix} ${color.border('hr')} ${color('text')} ${font('text')}`}>
      <div className='item-header'>
        <strong className={`${color('text')} ${font('subTitle')}`}>
          Order number: {order_number}
        </strong>
        <span className={`${color('subText')} ${font('secTitle')}`}>
          {time}
        </span>
        {!!showDelete && <Icon type='delete' />}
      </div>
      <div className='item-body'>
        {/*<Items items={items} />*/}
        <div>&nbsp;</div>
        <div>
          <p style={{color: '#FFBD2F'}}>{statusMap[status]}</p>
        </div>
        <div>
          <p>{currency}{price}</p>
        </div>
        <div>
          <Link className={`${color('brand')}`} href={`/order_details/?id=${id}`}>Order Details</Link>
        </div>
      </div>
    </li>
  )
}

/** 订单项-手机版 **/
const OrderItemMobile = (props) => {
  const classPrefix = 'm-orders-itemMobile'
  const {order_number, id, processed_at: time, total_price: price, item_list: items, show_delete: showDelete, status, currency_symbol: currency} = props.data

  return (
    <li className={`${classPrefix} ${color.border('hr')} ${color('text')} ${font('text')}`}>
      <div className='item-header'>
        <strong className={`${color('text')} ${font('secTitle')}`}>
          Order number: {order_number}
        </strong>
        <span className={`${color('subText')} ${font('text')}`}>
          {time}
        </span>
        {!!showDelete && <Icon type='delete' />}
      </div>
      <div className='item-body'>
        {/*<Items items={items} />*/}
        <div>&nbsp;</div>
        <div>
          <p style={{color: '#FFBD2F'}}>{statusMap[status]}</p>
          <p>{currency}{price}</p>
        </div>
      </div>
      <div className='item-footer'>
        <Button type='ghost' href={`/order_details/?id=${id}`}>Order Details</Button>
      </div>
    </li>
  )
}

/** 订单项中的商品 **/
const Items = (props) => {
  const {items} = props
  let res = null

  if (items && items.length) {
    let length = items.length

    if (length === 1) {
      let {product_img: img, product_id: id, product_name: name, item_remark: remark, quantity} = items[0]
      res = (
        <div>
          <Link href={`/products/?id=${id}`} className='item-photo'>
            <img src={img} />
          </Link>
          <div className='item-desc'>
            <p>{name}</p>
            <span className={`${color('subText')}`}>{remark}</span>
            <p className={`${font('secTitle')}`}>×{quantity}</p>
          </div>
        </div>
      )
    } else {
      res = (
        <div>
          {items.slice(0, 2).map(({product_img: img, product_id: id, spu_code: spu, sku_code: sku}) => (
            <Link href={`/products/?id=${id}`} className='item-photo' key={id + spu + sku}>
              <img src={img} />
            </Link>
          ))}
          {length > 2 && (
            <div className='item-more'>
              <p>Total:</p>
              <p>{length} products</p>
            </div>
          )}
        </div>
      )
    }
  }

  return res
}
