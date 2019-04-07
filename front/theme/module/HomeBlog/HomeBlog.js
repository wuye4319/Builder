/**
 * @author Alan (曹昌盛)
 * @desc 首页博客模块
 */
import './HomeBlog.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from './../../plugin/component/Icon'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
// import Pagination from './../../plugin/component/Pagination'
const { setClass, color, font } = window.supervar.util

const itemObj = {
  title: 'Closed month and shame flower Haha',
  labelList: ['Simple', 'Atmosphere', 'Kind'],
  imgUrl: '/source/img/photo_12.png'
}

const addItemObj = {
  title: 'Default Blog',
  labelList: ['One', 'Two', 'Three'],
  imgUrl: '/source/img/photo_13.png'
}

class HomeBlog extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  state = {
    blogList: [],
    initBlogList: []
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
  handleData = (rows, cols, pageMode) => {
    const len = !pageMode ? cols * rows : 1 * rows
    // console.log(len)
    const {initBlogList} = this.state
    if (len > initBlogList.length) {
      const disLen = len - initBlogList.length
      let tempArr = []
      for (let i = 0; i < disLen; i++) {
        tempArr.push(addItemObj)
      }
      this.setState({
        blogList: [...initBlogList, ...tempArr]
      })
    } else if (len < initBlogList.length) {
      const tempArr = initBlogList.slice(0, len)
      this.setState({
        blogList: [...tempArr]
      })
    } else {
      this.setState({
        blogList: [...initBlogList]
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const {config, pageMode} = nextProps
    const {rows, cols} = config
    this.handleData(rows, cols, pageMode)
  }

  initData = () => {
    const {config, pageMode} = this.props
    const {rows, cols} = config
    const len = !pageMode ? cols * rows : rows * 1
    let list = []
    for (let i = 0; i < len; i++) {
      list.push(itemObj)
    }
    this.setState({
      blogList: list,
      initBlogList: list
    })
  }
  goDetails = () => {
    Link.goTo('/blog_details')
  }
  goBlogs = () => {
    Link.goTo('/blogs')
  }

  componentDidMount () {
    this.initData()
  }

  render () {
    const {config, pageMode} = this.props
    const {cols, title, showBlogDes, blogDesValue, showAuthor, showDate, showImg, showLabels, showReadMore, showLine, blogStyle} = config
    const {blogList} = this.state
    const lists = this.change2MultipleArr(blogList, cols)
    return (
      <div className={`m-home-blog-box-wrap ${color.bg('subBg')}`}>
        <div
          className={`m-home-blog-box l-centerBlock l-mobile-blog`}>
          <div className='blog-title'>
            <h2
              className={`${color('title')} ${font('title')} ${color.border('hr')} ${showLine ? '' : 'line'}`}>{title}</h2>
          </div>
          {
            !!showBlogDes && <p className={`blog-des ${font('text')} ${color('subText')}`}>{blogDesValue}</p>
          }
          <div className='home-blog-list-wrap'>
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
                        <div className='blog-rows' key={index} onClick={this.goDetails}>
                          {
                            !!showImg && <div className={`blog-img ${blogStyle}`}
                              style={{background: 'url(' + val.imgUrl + ') center no-repeat'}} />
                          }
                          <div className='content-wrap'>
                            <div className='blog-content'>
                              <div className={`date-author ${font('subText')} ${color('subText')}`}>
                                {
                                  !!showDate && <span className='date'>May 18,2018</span>
                                }
                                {
                                  !!showAuthor && <span className='author'>By Oldox</span>
                                }
                              </div>
                              <h2
                                className={`${color('subTitle')} ${font('subTitle')}`}>{val.title}</h2>
                              <p className={`${color('subText')} ${font('text')}`}>The simple atmosphere of logs is a kind
                               of feeling that I can never give up. It is like
                               the embrace of Mother Nature. It seems that as long as they.</p>
                              {
                                !!showLabels && !!val.labelList.length &&
                                <div className={`blog-label ${color('subText')} ${font('subText')}`}>
                                  {
                                    val.labelList.map((item, key) =>
                                      <span key={key} className={`${color.border('hr')}`}>{item}</span>
                                    )
                                  }
                                </div>
                              }
                              {
                                !!showReadMore && <div className='read-more'>
                                  <a href='javascript:;' className={`${color('text')} ${font('text')}`}>
                                    <span>Read more</span>
                                    <Icon type='forward' />
                                  </a>
                                </div>
                              }
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
          <div className='view-more'><Button onClick={this.goBlogs}>View More</Button></div>
        </div>
      </div>
    )
  }
}

export default HomeBlog
