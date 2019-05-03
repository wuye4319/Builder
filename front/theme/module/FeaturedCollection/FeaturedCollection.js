/**
 * @author Nero
 * @desc FeaturedCollection 特色商品推荐
 */
/* eslint-disable standard/computed-property-even-spacing */
import './FeaturedCollection.less'
import React from 'react'
import PropTypes from 'prop-types'
import ItemsList from '../Search/ItemsList'
import Link from '../../plugin/component/Link'
import { fetchTopicsDedails } from '../../source/service/page'

const {font, color, fetchLite} = window.supervar.util

class FeaturedCollection extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  static classPrefix = 'm-featuredCollection'

  static getDerivedStateFromProps (nextProps, prevState) {
    let {collectId, cols, rows} = nextProps.config
    if (collectId !== prevState.collectId) {
      return {collectId}
    }

    if ((cols !== prevState.cols) || (rows !== prevState.rows)) {
      console.log('sub1', cols, rows, prevState.cols, prevState.rows)
      return {cols, rows}
    }

    return null
  }

  constructor (props) {
    super(props)
    this.state = {
      productList: null,
      allProductList: null,
      ...props.config
    }
  }

  componentDidMount () {
    this.fetchProductList(this.state.collectId)
  }

  componentDidUpdate (prevProps, prevState) {
    let {cols, rows, collectId} = this.state
    if (collectId !== prevState.collectId) {
      this.fetchProductList(this.state.collectId)
    }

    if ((cols !== prevState.cols) || (rows !== prevState.rows)) {
      this.setState({productList: this.matchData(this.state.allProductList)})
    }
  }

  fetchProductList = (collectId) => {
    // 集合ID下对应的商品列表
    // fetch(`/collections/${collectId}`,{
    //   query:{per_pagesize:16, page:1}
    // }).then(res => {
    //   if (res.state !== 0) {
    //     return
    //   }
    //   let data = res.data && res.data.product_list || null
    //   if (!data || data.length === 0) {
    //     return
    //   }
    //   this.setState({
    //     collectId,
    //     allProductList: data,
    //     productList: this.matchData(data)
    //   })
    // })
    let {cols, rows} = this.state
    fetchLite(fetchTopicsDedails.bind(null, {
      id: collectId,
      pageSize: cols * rows,
      page: 1
    }), {
      done: (res) => {
        let data = (res.data && res.data.product_list) || null
        if (!data || data.length === 0) {
          return
        }

        this.setState({
          collectId,
          allProductList: data,
          productList: this.matchData(data)
        })
      }
    })
  }
  matchData = (data) => {
    let len = data.length || 0
    let {cols, rows} = this.props.config

    // 根据config中设置的cols、rows值显示商品个数
    if (len < cols) {
      let count = cols - len
      while (count > 0) {
        count--
        data.push({
          currency: 'USD',
          currency_symbol: 'US $',
          main_img: '//gd3.alicdn.com/imgextra/i3/12549196/TB29xTQqpXXXXX1XpXXXXXXXXXX_!!12549196.jpg',
          market_price: 11.38,
          platform_name: 'TB',
          product_id: '5qvK97',
          product_name: '我是占位符，我占位符数据，对C端用户看不到的',
          sell_price: 11.38,
          source_url: 'https://item.taobao.com/item.htm?id=533752095898',
          spu_code: '533752095898'
        })
      }
      return [...data]
    }

    if (len > cols * rows) {
      return data.slice(0, cols * rows)
    }
    return [...data]
  }

  render () {
    const {classPrefix} = FeaturedCollection
    const {productList} = this.state
    const {title, showMore, showLine, showDes, desProducts, cols} = this.props.config

    return (
      <div className={`${classPrefix} l-centerBlock2`}>
        <div className={`${classPrefix}-title`}>
          <h2 className={`${color('title')} ${font('title')}`}>{title}</h2>
          {showLine && showDes && <i className={`${classPrefix}-title-hr ${color.border('title')}`}/>}
          {showDes && <p className={`${color('subText')} ${font('text')}`}>{desProducts}</p>}
        </div>
        <ItemsList data={productList} column={Number(cols)}/>
        {
          showMore && <Link href='/topics/' className='views-more'>Views More</Link>
        }
      </div>
    )
  }
}

export default FeaturedCollection
