/**
 * @author MG Ding (丁文强)
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
          {data.map(({ sell_price, href, name, main_img, currency }, index) => (
            <li key={index}>
              <Link href={href} target='_blank'>
                <div style={{ backgroundImage: 'url(' + main_img + '_300x300)' }} />
                <p className={`${color('text')} ${font('secTitle')}`}>{name}</p>
                <p className={`${color('price')} ${font('price')}`}>{currency} {sell_price}</p>
              </Link>
            </li>
          ))}
        </ul>
      )
      : null
  }
}