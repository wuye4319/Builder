/**
 * @author Nero
 * @desc 产品列表
 */
/* eslint-disable camelcase */
import './ItemsList.less'
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../plugin/component/Link'
import { color, font } from '../../source/util'

export default class ItemsList extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    column: PropTypes.number
  }
  static defaultProps = {
    data: [],
    column: 5
  }
  static classPrefix = 'm-search-itemsList'

  render() {
    const { classPrefix } = ItemsList
    const { data, column } = this.props

    return data && data.length
      ? (
        <ul className={`${classPrefix} column-${column}`}>
          {data.map(({ sell_price, href, couponhref, name, main_img, currency, sales_volume, coupon }, index) => (
            <li key={index}>
              <Link href={couponhref || href} target='_blank'>
                <div style={{ backgroundImage: 'url(' + main_img + '_300x300)' }} />
                <p className={`${color('text')} ${font('secTitle')}`}>{name}</p>
                <p>券：{coupon}</p>
              </Link>
              <p className={`${color('price')} ${font('price')}`}>
                <label>{currency} {sell_price}</label>
                <label className={`${font('secTitle')} fr`}>月销：{sales_volume}</label>
              </p>
            </li>
          ))}
        </ul>
      )
      : null
  }
}