/**
 * @author：Gavin Yang (杨伟伟)
 * @desc：专题集合页面
 * @date：2018.4.11
 * @paramDesc: 组件HomeTopicsModule中config说明
 * config = {
 *  title：'集合标题',
 *  desTopics: '集合描述'，
 *  showLine: false, //是否显示集合标题下的分隔线
 *  showDes：false, // 是否显示集合描述
 *  collectSize:small // 集合显示尺寸，共small、medium、large 尺寸值
 *  collectionIds:[集合ID1,...] // 被选中添加的集合ID
 *  showMinPrice:false, // 是否显示最低价格（暂时去掉了该功能）
 *  showMore: false, //是否显示more viewer按钮
 *  name:'"HomeTopicsModule"'//模块名（暂无用）
 *  key:1 (暂无用)
 * }
 * 组建HomeTopicsModule中state的数据说明
 * collectionList = [
 *  {
 *    collection_id:'g9jP2e', //集合Id
 *    cover_images: '', //集合图片地址
 *    description:'', //集合描述信息
 *    title:'' //集合标题
 *  }
 *  ...
 * ]
 *
 **/

import React from 'react'
import './HomeTopicsModule.less'
import Link from '../../plugin/component/Link/index'
import { getHomeCollections } from '../../source/service/page'

const { color, fetchLite } = window.supervar.util

class HomeTopicsModule extends React.Component {
  static classPrefix = 'm-homeTopicsModule'

  // static getDerivedStateFromProps (nextProps, prevState) {
  //   let stateIdsStr = prevState.collectionIds.join('-')
  //   let propsIdsStr = nextProps.config.collectionIds.join('-')
  //
  //   if (propsIdsStr !== stateIdsStr) {
  //     return {collectionIds: nextProps.config.collectionIds}
  //   }
  //   return null
  // }

  constructor(props) {
    super(props)
    this.state = {
      collectionIds: [], //查询集合数据的集合ID数组
      collectionList: [], //集合数据列表
      initTitle: 'Recommended topics', // 集合标题初始值
      initDesTopics: 'brand. Select imagery and text that relates to your style and story.' //集合描述初始值
    }
  }

  componentDidMount() {
    this.getData(this.props.config.collectionIds)
  }

  componentDidUpdate(prevProps, prevState) {
    let preStateIdsStr = prevState.collectionIds.join('-')
    let curStateIdsStr = this.state.collectionIds.join('-')

    if (preStateIdsStr !== curStateIdsStr) {
      this.getData(this.state.collectionIds)
    }
  }

  getData = (collectionIds) => {
    /**
     * 有collectionId更新时，请求接口获取集合列表数据
     */
    if (!collectionIds || collectionIds.length === 0) {
      return
    }
    fetchLite(getHomeCollections.bind(null, collectionIds), {
      done: (res) => {
        this.setState({ collectionList: res.data })
      }
    })
  }

  render() {
    const { collectionList } = this.state
    if (!collectionList || collectionList.length === 0) {
      return null
    }

    const { classPrefix } = HomeTopicsModule
    const { initTitle, initDesTopics } = this.state
    const { showMore, collectSize, showLine, title, desTopics, showDes } = this.props.config

    return (
      <div className={`${classPrefix} ${color.bg('subBg')}`}>
        <div className='l-centerBlock'>
          <div className={`${classPrefix}-header`}>
            <div className={`${classPrefix}-header-title`}>
              <h2>{title || initTitle}</h2>
              {
                showLine && <span className='line' />
              }
              {
                showDes && <p>{desTopics || initDesTopics}</p>
              }
            </div>
          </div>
          <div className={`${classPrefix}-main`}>
            <ul className={`${classPrefix}-main-topicsList`}>
              {
                collectionList.map((item, index) => (
                  <li key={index}>
                    <Link href={`/topics_details/?id=${item.id}`}>
                      <div className={`topics-img ${collectSize}`}
                        style={item.cover_img ? { 'backgroundImage': `url(${item.main_img})` } : null} />
                      <div className='topics-des'>
                        <p>{item.title}</p>
                      </div>
                    </Link>
                  </li>
                ))
              }
            </ul>
            {
              showMore && <Link href='/topics/' className='views-more'>Views More</Link>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default HomeTopicsModule
