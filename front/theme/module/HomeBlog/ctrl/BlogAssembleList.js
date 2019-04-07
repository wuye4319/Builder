/**
 * @author Alan (曹昌盛)
 * @desc 首页博客模块控制器选择博客集合
 */
import React from 'react'
import Icon from '../../../../builder/plugin/component/Icon'
import Button from '../../../../builder/plugin/component/Button'
import Input from '../../../../builder/plugin/component/Input'

const blogAssembleList = [
  {
    imgSrc: '/source/img/001.png'
  },
  {
    imgSrc: '/source/img/002.png'
  },
  {
    imgSrc: '/source/img/003.png'
  },
  {
    imgSrc: '/source/img/004.png'
  }
]

class BlogAssembleList extends React.Component {
  state = {
    activeIndex: null,
    blogAssembleList: blogAssembleList
  }
  closeBlogAssembleCtrl = () => {
    this.props.toggleBlogAssembleCtrl()
    this.setState(() => ({
      activeIndex: null
    }))
  }
  saveSelectBlog = () => {
    this.props.toggleBlogAssembleCtrl()
  }
  selectBlogAssemble = (key) => {
    this.setState(() => ({
      activeIndex: key
    }))
    this.props.toggleSelectButton(false)
  }
  loadMore = () => {
    this.setState((preState) => ({
      blogAssembleList: [...preState.blogAssembleList, ...blogAssembleList]
    }))
  }
  render () {
    const {blogAssembleList, activeIndex} = this.state
    return (
      <div className='BlogAssembleList-select-collection'>
        <div className='header'>
          <h2>Blog Collection</h2>
          <div className='blog-assemble-search'>
            <Input search placeholder='Search' />
          </div>
          {/* 跳转至后台管理系统 */}
          <a href='https://www.baidu.com/' target='blank' className='edit'>
            <Icon type='add1' />
            <span>Create Blog</span>
            <Icon type='edit' />
          </a>
        </div>
        <div className='coll-list' ref={(e) => { this.collList = e }}>
          <ul ref={(e) => { this.collUl = e }}>
            {
              blogAssembleList.map((item, key) =>
                <li key={`${key}`} className={activeIndex === key ? 'selected' : ''}
                  onClick={this.selectBlogAssemble.bind(this, key)}>
                  <img src={item.imgSrc} />
                  <p>
                    <span>Blog Assemble Item {key + 1}</span>
                    <Icon className={activeIndex === key ? 'selected' : ''} type='yes-filling' />
                  </p>
                </li>
              )
            }
          </ul>
        </div>
        <div className='load-more'>
          <Button type='sub' onClick={this.loadMore}>Load More</Button>
        </div>
      </div>
    )
  }
}
export default BlogAssembleList
