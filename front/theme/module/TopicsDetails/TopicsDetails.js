/**
 * @author：Nero
 * @desc：专题集合页面
 * @date：2018.4.11
 **/

/**
 组件state中关键字段说明:
 product_list: [
 {
   currency: "USD",
   currency_symbol: "US $",
   main_img: "",
   market_price: 49.8,
   platform: 9,
   platform_name: "SELF",
   product_id: "g9jP2e",
   product_name: "",
   sell_price: 11.95,
   source_url: "",
   spu_code: "91800012857512",
 },
 ...
 ]
 collectionInfo：{
  id: "",
  handle: "",
  created_at: "",
  description: "",
  collect_type: "",
 }

 组件中props说明：
 config: {
    bgImg: "" //Banner背景图
    checkbox: {
      showTagCtrl: true, //是否显示Banner
      showSortCtrl: false,  //是否显示价格筛选器
      showCategoryCtrl: false // 是否显示分类筛选器
    }
    cols: 3 //需要显示的商品列数
    key: 1 //(暂无用)
    name: "TopicsDetails" //模块名（暂无用）
  }

 **/

import './TopicsDetails.less'
import '../Search/ItemsList.less'

import React from 'react'
import ItemsList from '../Search/ItemsList'
import Select from '../../plugin/component/Select'

import Message from '../../plugin/component/Message'
import Pagination from '../../plugin/component/Pagination'
import SubNavigation from '../../plugin/component/SubNavigation'

import { query2Obj } from '../../source/util'
import { fetchTopicsDedails } from '../../source/service/page'

const route = [
  {name: '专题', href: '/topics/'},
  {name: '详情', href: ''}
]

class TopicsDetails extends React.Component {
  static classPrefix = 'm-topicsDetails'

  constructor (props) {
    super(props)
    this.state = {
      page: 1, // 当前页码
      totalPage: 1, //总页数
      product_list: null, //商品列表数据
      collectionInfo: null, //集合信息
      id: query2Obj()['id'] //专题ID
    }
  }

  componentDidMount () {
    this.getProductList()
  }

  getProductList = (n) => {
    const {config} = this.props
    let {cols} = config
    return (
      fetchTopicsDedails({page: n, id: this.state.id, pageSize: cols * 8}).then(res => { // 请求集合详情信息
        if (res.state !== 0) {
          Message.error(res.msg)
          return
        }

        if (!res.data || !res.data.product_list) {
          return
        }

        this.setState({
          product_list: res.data.product_list,
          page: res.current_page,
          totalPage: res.total_page,
          collectionInfo: res.data.collection
        })
      })
    )
  }

  render () {
    const {product_list} = this.state

    if (!product_list || product_list.length === 0) {
      return <span style={{color: '#ccc', display: 'block', margin: '80px auto', textAlign: 'center'}}>no data~</span>
    }

    const {classPrefix} = TopicsDetails
    const {pageMode, config} = this.props
    const {page, totalPage, collectionInfo} = this.state

    let {checkbox, bgImg, cols} = config
    let isModile = (pageMode === 1)

    if (isModile) {
      cols = 2
    }

    return (
      <React.Fragment>
        <div className='l-centerBlock'>
          <SubNavigation route={route}/>
        </div>
        {
          checkbox['showTagCtrl'] &&
          <div className={`${classPrefix}-banner`}
               style={{backgroundImage: `url(${collectionInfo.main_img || '/source/img/default.png'})`}}>
            <div className='banner-text'>
              <h2>{collectionInfo.title}</h2>
            </div>
          </div>
        }
        <div className={`${classPrefix}-centerBlock l-centerBlock`}>
          <div className={`${classPrefix}-container`}>
            <div className='topics-header'>
              <h2 dangerouslySetInnerHTML={{__html: collectionInfo.description}}></h2>
              <div className='topics-ctrl'>
                {
                  checkbox['showCategoryCtrl'] && <div className='ctrl-item'>
                    <span>Category:</span>
                    <Select>
                      <option value={0}>Small fresh style1</option>
                      <option value={1}>Small fresh style2</option>
                      <option value={2}>Small fresh style3</option>
                      <option value={3}>Small fresh style4</option>
                    </Select>
                  </div>
                }
                {
                  checkbox['showSortCtrl'] && <div className='ctrl-item'>
                    <span>Sorting:</span>
                    <Select>
                      <option value={0}>Small fresh style1</option>
                      <option value={1}>Small fresh style2</option>
                      <option value={2}>Small fresh style3</option>
                      <option value={3}>Small fresh style4</option>
                    </Select>
                  </div>
                }
              </div>
            </div>
            <div className='products-list'>
              <ItemsList data={product_list} column={cols}/>
              <Pagination
                pageNo={page}
                totalPage={totalPage}
                scrollLoad={isModile}
                handleChangePage={this.getProductList}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default TopicsDetails
