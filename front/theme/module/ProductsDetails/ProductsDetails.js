/**
 * @author：Nero
 * @desc：专题集合页面
 * @date：2018.4.11
 **/

import './ProductsDetails.less'
import React from 'react'
import ItemsList from '../Search/ItemsList'
import Message from '../../plugin/component/Message'
import SubNavigation from '../../plugin/component/SubNavigation'
import { query2Obj } from '../../source/util'
import { fetchProductsDedails } from '../../source/service/page'

const route = [
  { name: '专题', href: '/topics/' },
  { name: '详情', href: '' }
]

class TopicsDetails extends React.Component {
  static classPrefix = 'm-topicsDetails'

  constructor(props) {
    super(props)
    this.state = {
      page: 1, // 当前页码
      id: query2Obj()['id'] //专题ID
    }
  }

  componentDidMount() {
    this.getProductList()
  }

  getProductList = (n) => {
    const { pageMode } = this.props
    return (
      fetchProductsDedails({ id: this.state.id, }).then(res => { // 请求集合详情信息
        if (res.state !== 0) {
          Message.error(res.msg)
          return
        }

        if (!res.data || !res.data.product_list) {
          return
        }

        let allproductlist
        if (pageMode === 1 && this.state.product_list) {
          allproductlist = this.state.product_list.concat(res.data.product_list)
        }

        this.setState({
          product_list: allproductlist || res.data.product_list
        })
      })
    )
  }

  render() {
    const { product_list } = this.state

    if (!product_list || product_list.length === 0) {
      return <span style={{ color: '#ccc', display: 'block', margin: '80px auto', textAlign: 'center' }}>no data~</span>
    }

    const { classPrefix } = TopicsDetails
    const { pageMode, config } = this.props
    const { collectionInfo } = this.state

    let { cols } = config
    let isModile = (pageMode === 1)
    if (isModile) { cols = 2 }

    return (
      <React.Fragment>
        <div className='l-centerBlock'>
          <SubNavigation route={route} />
        </div>
        <div className={`${classPrefix}-banner`}
          style={{ backgroundImage: `url(${product_list.main_img || '/source/img/default.png'})` }}>
          <div className='banner-text'>
            <h2>{product_list.name}</h2>
          </div>
        </div>
        <div class="procontext">
          商品详情
        </div>
        <div className={`${classPrefix}-centerBlock l-centerBlock`}>
          <div className={`${classPrefix}-container`}>
            <div className='products-list'>
              <ItemsList data={product_list} column={cols} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default TopicsDetails
