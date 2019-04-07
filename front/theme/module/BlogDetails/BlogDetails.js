/**
 * @author Alan (曹昌盛)
 * @desc 博客详情模块
 */
import './BlogDetails.less'
import React from 'react'
import PropTypes from 'prop-types'
import { color, font, query2Obj } from '../../source/util'
import Message from '../../plugin/component/Message'
import { getBlogDetails, getCollections } from '../../source/service/page'
import SubNavigation from '../../plugin/component/SubNavigation'

const route = [
  {name: '美图区', href: '/blogs/'},
  {name: '详情', href: ''}
]

class BlogDetails extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      id: query2Obj()['id'],//专题ID
      labelList: [
        {
          label: 'Simple'
        }
      ],
      data: ''
    }
  }

  componentDidMount () {
    this.handleBlogDetails()
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

          this.setState({
            data: res.data
          })
        }
      })
    )
  }

  render () {
    const {pageMode} = this.props
    const {labelList, data} = this.state
    return (
      <div className={`m-BlogDetails-wrap l-BlogDetails-wrap l-centerBlock`}>
        <SubNavigation route={route}/>
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
        <div className='blog-content'>
          {data.context}
        </div>
        {
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
        }
      </div>
    )
  }
}

export default BlogDetails
