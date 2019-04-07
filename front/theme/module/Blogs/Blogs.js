/**
 * @author Alan (曹昌盛)
 * @desc 博客列表模块
 */
import './Blogs.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from './../../plugin/component/Icon'
import Link from './../../plugin/component/Link'
import Pagination from './../../plugin/component/Pagination'
// import fetch from '../../plugin/component/util/fetch'
import { setClass, color, font } from '../../source/util'
import { getBlogs } from '../../source/service/page'
import SubNavigation from '../../plugin/component/SubNavigation'

const route = [
  {name: 'Home', href: '/home/'},
  {name: '美图区', href: ''}
]

const itemObj = {
  title: 'Closed month and shame flower Haha',
  labelList: ['Simple', 'Atmosphere', 'Kind'],
  imgUrl: '/source/img/photo_12.png'
}

class Blogs extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  state = {
    pageNo: 1,
    pageSize: 0,
    scrollLoad: true,
    blogList: [],
    total: 0,
    totalPage: 0
  }
  // 将数据转换为二维数组实现多列
  change2MultipleArr = (list, tempCols, rows) => {
    const {pageMode} = this.props
    let arr = []
    const cols = !pageMode ? tempCols : 1
    if (list.length > 0) {
      /**
       * 第一个循环为列数，第二个循环为总数据
       * 单个元素的索引对总列数求模结果为相应的第几列
       * 第一列[0]  第二列[1]  第三列[2]
       *   0          1          2
       *   3          4          5
       *   6          7          8
       */
      for (let i = 0; i < cols; i++) {
        const temp = list.filter((item, key) =>
          key % cols === i
        )
        arr.push(temp)
      }
    }
    return arr
  }
  // 分页回调
  handleChangePage = (page) => {
    const {pageMode} = this.props
    const {pageSize} = this.state
    return this.getBlogData(page, pageSize).then((res) => {
      if (res.state === 0) {
        const {data, total, total_page} = res
        this.setState(() => ({
          pageNo: page,
          blogList: data,
          total: total,
          totalPage: total_page
        }))
      }
    }).catch(() => {})
  }
  createData = (cols, rows, pageMode) => {
    const len = !pageMode ? cols * rows : rows * 1
    let list = []
    for (let i = 0; i < len; i++) {
      list.push(itemObj)
    }
    return list
  }
  goDetails = (id) => {
    Link.goTo('/blog_details/?id=' + id, 'blank')
  }
  // 请求接口
  getBlogData = (pageNo, pageSize) => {
    return getBlogs(pageNo, pageSize)
  }
  // 初始化数据
  initData = (cols, rows) => {
    const pageSize = cols * rows
    this.getBlogData(1, pageSize).then((res) => {
      if (res.state === 0) {
        const {data, total, total_page} = res
        this.setState(() => ({
          pageNo: 1,
          pageSize: pageSize,
          blogList: data,
          total: total,
          totalPage: total_page
        }))
      }
    }).catch(() => {})
  }

  componentDidMount () {
    const {config, pageMode} = this.props
    const {rows, cols} = config
    this.initData(cols, rows, pageMode)
  }

  // componentWillReceiveProps (nextProps) {
  //   const {config, pageMode} = nextProps
  //   const {rows, cols} = config
  //   this.initData(cols, rows, pageMode)
  // }

  render () {
    const {config, pageMode} = this.props
    const {cols, blogStyle} = config
    const {pageNo, blogList, totalPage, pageSize} = this.state
    const lists = this.change2MultipleArr(blogList, cols)
    return (
      <div className={`m-blogs-box`}>
        <div className={`m-blogs-wrap l-mobile-blogs-wrap l-centerBlock`}>
          <SubNavigation route={route}/>
          <h2 className={`blog-title ${color('title')} ${font('title')}`}>美图区</h2>
          {!pageMode && <div className={`line ${color.bg('hr')}`}/>}
          {!pageMode && <div className={`blog-note ${color('subText')} ${font('text')}`}>
            <p>热门美图</p>
          </div>}
          <div className='blog-list-wrap'>
            <div className='blog-list'>
              {
                !!lists.length && lists.map((item, key) =>
                  <div className={setClass({
                    'blog-cols': true,
                    'single': !pageMode && cols === 1,
                    'double': !pageMode && cols === 2,
                    'three': !pageMode && cols === 3,
                    'mobile-cols': !!pageMode
                  })} key={key}>
                    {
                      item.map((val, index) =>
                        <div className='blog-rows' key={index} onClick={this.goDetails.bind(this, val.id)}>
                          <div className={`blog-img ${blogStyle}`}
                               style={{backgroundImage: 'url(' + val['main_img'] + '_400x400)'}}/>
                          <div className='content-wrap'>
                            <div className='blog-content'>
                              <div className={`date-author ${font('subText')} ${color('subText')}`}>
                                <span className='date'>{val['edit_date']}</span>
                                {/*<span className='author'>{val['author_name']}</span>*/}
                              </div>
                              <h2 className={`${color('subTitle')} ${font('subTitle')}`}>{val.title}</h2>
                              {/*<p className={`${color('subText')} ${font('text')}`}>{val['excerpt']}</p>*/}
                              {/*{*/}
                              {/*!!val['tag_lists'].length &&*/}
                              {/*<div className={`blog-label ${color('subText')} ${font('subText')}`}>*/}
                              {/*{*/}
                              {/*val['tag_lists'].map((item, key) =>*/}
                              {/*<span key={key} className={`${color.border('hr')}`}>{item}</span>*/}
                              {/*)*/}
                              {/*}*/}
                              {/*</div>*/}
                              {/*}*/}
                              {/*<div className='read-more'>*/}
                              {/*<a href='javascript:;' className={`${color('text')} ${font('text')}`}>*/}
                              {/*<span>Read more</span>*/}
                              {/*<Icon type='forward'/>*/}
                              {/*</a>*/}
                              {/*</div>*/}
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
          {
            (totalPage > pageSize) || <Pagination
              onEndReached={0}
              scrollLoad={pageMode === 1}
              totalPage={totalPage} pageNo={pageNo}
              handleChangePage={this.handleChangePage}/>
          }
        </div>
      </div>
    )
  }
}

export default Blogs
