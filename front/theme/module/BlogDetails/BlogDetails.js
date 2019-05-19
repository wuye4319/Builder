/**
 * @author Nero
 * @desc 博客详情模块
 */
import './BlogDetails.less'
import React from 'react'
import PropTypes from 'prop-types'
import Message from '../../plugin/component/Message'
import ItemsList from '../Search/ItemsList'
import { getBlogDetails, fetchRecommendTopic } from '../../source/service/page'
import SubNavigation from '../../plugin/component/SubNavigation'

const { font, color, fetchLite, query2Obj } = window.supervar.util

const route = [
  { name: '美图区', href: '/blogs/' },
  { name: '详情', href: '' }
]

class BlogDetails extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      id: query2Obj()['id'],//专题ID
      labelList: [
        {
          label: 'Simple'
        }
      ],
      data: '',
      productList: null
    }
  }

  componentDidMount() {
    this.handleBlogDetails()
  }

  fetchProductList = (kind) => {
    fetchLite(fetchRecommendTopic.bind(null, {
      kind: kind
    }), {
        done: (res) => {
          let data = (res.data && res.data.product_list) || null
          if (!data || data.length === 0) {
            return
          }

          this.setState({
            productList: data
          })
        }
      })
  }

  handleBlogDetails = () => {
    return (
      getBlogDetails(this.state.id).then(res => {
        if (res.state !== 0) {
          Message.error(res.msg)
        } else {
          if (!res.data) {
            return
          }

          // 获取关联专题
          this.fetchProductList(res.data.kind)
          this.setState({
            data: res.data
          })
        }
      })
    )
  }

  render() {
    // const { pageMode } = this.props
    const { labelList, data, productList } = this.state
    return (
      <div className={`m-BlogDetails-wrap l-BlogDetails-wrap l-centerBlock`}>
        <SubNavigation route={route} />
        <h2 className={`blog-title ${color('title')} ${font('title')}`}>{data.title}</h2>
        <div className={`blog-info ${color('subText')} ${font('text')}`}>
          <span className='date'>{data.edit_date}</span>
        </div>
        {/*<div className='blog-label'>*/}
        {/*{*/}
        {/*labelList.map((item, key) =>*/}
        {/*<span className={` ${color('subText')} ${font('subText')} ${color.border('hr')}`}*/}
        {/*key={key}>{item.label}</span>*/}
        {/*)*/}
        {/*}*/}
        {/*</div>*/}
        <div className='blog-content' dangerouslySetInnerHTML={{ __html: data.context }} />
        {/* {
          !pageMode && <div className='blog-bottom'>
            <div className={`previous-box ${color('text')} ${font('text')}`}>
              <span>Previous: </span>
              <a href='javascript:void(0);' className={`disable ${color('text')} ${font('text')}`}>No More</a>
            </div>
            <div className={`next-box ${color('text')} ${font('text')}`}>
              <span>Next:</span>
              <a href='javascript:void(0);' className={`${color('text')} ${font('text')}`}>Spring blossoms facing the sea</a>
            </div>
          </div>
        } */}
        <ItemsList data={productList} column={2} />
      </div>
    )
  }
}

export default BlogDetails
