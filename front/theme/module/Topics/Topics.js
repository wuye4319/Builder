/**
 * @author：Gavin Yang (杨伟伟)
 * @desc：专题集合页面
 * @date：2018.4.11
 * @paramDesc: 传入Topics的配置数据config结构
 * config = {
 *  showMinPrice: false //是否显示最低价格
 *  collectSize： 'small' //集合元素的背景图尺寸，有三个尺寸small、 medium、large
 *  name: 'Topics' //(暂无用)
 *  key: 1 //(暂无用)
 * }
 *
 **/

import './Topics.less'
import React from 'react'
import Message from '../../plugin/component/Message'
import Pagination from '../../plugin/component/Pagination'
import SubNavigation from '../../plugin/component/SubNavigation'

import Link from '../../plugin/component/Link/index'
import { getCollections } from '../../source/service/page'

const route = [
  {name: 'Home', href: '/home/'},
  {name: '推荐专题', href: ''}
]

class Topics extends React.Component {
  static classPrefix = 'm-topics'
  state = {
    page: 1, // 当前页码
    totalPage: 1, // 总页数
    collectionList: null //集合列表数据
  }

  componentDidMount () {
    this.handleCollectionList()
  }

  handleCollectionList = (n) => {
    return (
      getCollections({page: n}).then(res => {
        if (res.state !== 0) {
          Message.error(res.msg)
        } else {
          if (!res.data) {
            return
          }

          this.setState({
            page: res.current_page,
            totalPage: res.total_page,
            collectionList: res.data.collection
          })
        }
      })
    )
  }
  goDetails = (id) => {
    Link.goTo('/topics_details/?id=' + id, 'blank')
  }

  render () {
    const {collectionList} = this.state
    if (!collectionList || collectionList.length === 0) {
      return null
    }

    const {classPrefix} = Topics
    const {config, pageMode} = this.props
    const {collectSize} = config

    const {page, totalPage} = this.state
    const isModile = pageMode === 1

    return (
      <React.Fragment>
        <div className={`${classPrefix}-centerBlock l-centerBlock`}>
          <SubNavigation route={route}/>
          <div className='m-topics-header'>
            <div className='m-topics-header-title'>
              <h2>推荐专题</h2>
              <p>热门专题推荐</p>
            </div>
          </div>
          <div className={`${classPrefix}-main`}>
            {
              <ul className={`${classPrefix}-main-topicsList`}>
                {
                  collectionList.map((item, index) => (
                    <li key={index}>
                      <div className='item-box' onClick={this.goDetails.bind(this, item.id)}>
                        <div className={`topics-img ${collectSize}`}
                             style={{backgroundImage: `url(${item.cover_img || '/source/img/default.png'})`}}>
                        </div>
                        <div className='topics-des'>
                          <p>{item.title}</p>
                          {/* <div className={`topics-price ${showMinPrice ? 'show-price' : ''}`}>
                            <div className='price'>
                              <span>From</span>
                              <span>{`$ ${item.price}`}</span>
                            </div>
                            <span><Icon type='view' /></span>
                          </div> */}
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            }
            <Pagination pageNo={page} totalPage={totalPage} scrollLoad={isModile}
                        handleChangePage={this.handleCollectionList}/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Topics
