import './HomeTopicsModule.less'
import React from 'react'

import Icon from '../../../../builder/plugin/component/Icon'
import Input from '../../../../builder/plugin/component/Input'
import Select from '../../../../builder/plugin/component/Selection'

import Checkbox from '../../../../builder/plugin/component/Checkbox'
import Message from '../../../../builder/plugin/component/Message'
import ActionList from '../../../../builder/plugin/component/ActionList'

import SlipPanel from '../../../../builder/plugin/component/SlipPanel'
import ItemCard from '../../../../builder/plugin/component/ItemCard'
import { CollItemList, CollItem } from './component'

import { fetchLite } from '../../../../builder/source/util'
import { getCtrlCollection } from '../../../../builder/source/service/api'

const SubTitle = (props) => (
  <div className='item-title'>
    <h2>{props.title}</h2>
  </div>
)
export default class Collectionlist extends React.Component {
  state = {
    page: 1, // 当前页面
    pageSize: 10, //一页的数据量
    showDes: true, // 是否显示集合描述
    showLine: true, // 是否显示分隔线
    showMore: true, //是否显示more viewer按钮
    operateCode: 0, // 0:添加,1：替换操作、2删除操作
    showMinPrice: true, //是否显示最低价格
    collectionList: null, //所有上架的集合列表数据
    footerBtnDisable: true, // builder底部按钮是否禁止
    selectedCollection: [], // 被添加的集合列表
    unselectedCollection: [], //未被添加的集合列表
    cacheCollection: [], //用于存放被操作的集合项的数组
    selectedIndex: -1, //选中替换的collection
    replacedIndex: -1 //被替换的collection
  }

  componentWillMount () {
    // 获取模块下所有上架了的集合列表
    this.fetchCollection()
    // 获取配置文件初始值
    const {showMore, showLine, showMinPrice, collectionIds, collectSize, title, showDes, desTopics} = this.props.config
    this.setState({showMore, showLine, showMinPrice, collectionIds, collectSize, title, showDes, desTopics})
  }

  updateState = (params) => {
    if (!params || typeof params !== 'object') {
      return
    }
    this.setState({...params}, () => {
      if ('selectedCollection' in params) {
        let collectionIds = this.state.selectedCollection.map(item => item.collection_id)
        this.updateConfig('collectionIds', collectionIds, false)
      }
    })
  }
  inputTitle = (e) => {
    this.updateConfig('title', e.target.value, false)
  }
  inputCollectionIds = (e) => {
    this.updateConfig('collectionIds', e.target.value, false)
  }
  inputDes = (e) => {
    this.updateConfig('desTopics', e.target.value, false)
  }
  toggleDisplay = (e) => {
    this.setState({showDes: e.target.checked})
    this.updateConfig('showDes', e.target.checked, false)
  }
  updateConfig = (key, value, cache) => {
    let {config} = this.props
    config[key] = value
    this.props.changeConfig(config, cache)
  }
  showLine = (e) => {
    this.setState({showLine: e.target.checked})
    this.updateConfig('showLine', e.target.checked, false)
  }
  selectCollectSize = (e) => {
    this.updateConfig('collectSize', e.target.value)
  }
  showMore = (e) => {
    this.setState({showMore: e.target.checked})
    this.updateConfig('showMore', e.target.checked)
  }
  showMinPrice = (e) => {
    this.setState({showMinPrice: e.target.checked})
    this.updateConfig('showMinPrice', e.target.checked)
  }
  toggleCollectPanel = () => {
    this.Slip.toggle()
  }
  fetchCollection = () => {
    // fetchLite(getCtrlCollection, {
    //   done: (res) => {
    //     this.initData(res)
    //   }
    // })
  }
  initData = (res) => {
    // 初始化集合数据，把数据分为已选中、未选中数据
    if (!res.data || !res.data.data || res.data.data.length === 0) {
      return
    }

    let {collectionIds} = this.props.config
    if (!collectionIds || collectionIds.length === 0) {
      this.setState({
        unselectedCollection: res.data.data.map(e => {
          e.selected = 0
          return e
        })
      })
      return
    }

    let selectedCollection = []
    let unselectedCollection = res.data.data.map(e => {
      e.selected = 0
      return e
    })

    for (let i = 0; collectionIds[i]; i++) {
      for (let j = 0; unselectedCollection[j]; j++) {
        if (collectionIds[i] === unselectedCollection[j]['collection_id']) {
          selectedCollection.push(unselectedCollection[j])
          unselectedCollection.splice(j, 1)
          break
        }
      }
    }
    this.setState({
      selectedCollection,
      unselectedCollection
    })
  }
  handleClickConfirm = () => {
    let {operateCode} = this.state

    if (operateCode === 0) {
      this.addCollection()
    } else if (operateCode === 1) {
      this.replaceCollection()
    }
  }
  addCollection = () => {
    //添加集合
    let cacheCollection = this.state.cacheCollection.slice()
    let selectedCollection = this.state.selectedCollection.slice()
    let unselectedCollection = this.state.unselectedCollection.slice()

    if ((selectedCollection.length + cacheCollection.length) > 8) {
      Message.error('最多只能选中8个集合!')
      return
    }
    selectedCollection = selectedCollection.concat(cacheCollection)

    for (let i = 0; cacheCollection[i]; i++) {
      for (let j = 0; unselectedCollection[j]; j++) {
        if (cacheCollection[i]['id'] === unselectedCollection[j]['id']) {
          unselectedCollection.splice(j, 1)
          break
        }
      }
    }
    this.updateState({
      selectedCollection,
      cacheCollection: [],
      unselectedCollection,
      footerBtnDisable: true
    })
  }
  replaceCollection = () => {
    //替换选中集合
    const {replacedIndex, selectedIndex} = this.state
    if (replacedIndex === -1 || selectedIndex === -1) {
      return
    }

    let selectedCollection = this.state.selectedCollection.slice()
    let unselectedCollection = this.state.unselectedCollection.slice()

    let selectedItem = unselectedCollection[selectedIndex]
    let replacedItem = selectedCollection.splice(replacedIndex, 1, selectedItem)[0]

    replacedItem.selected = 0
    unselectedCollection.splice(selectedIndex, 1, replacedItem)

    this.updateState({
      operateCode: 0,
      selectedIndex: -1,
      replacedIndex: -1,
      selectedCollection,
      unselectedCollection,
      footerBtnDisable: true
    })
  }
  changeCollection = (index) => {
    this.Slip.toggle()
    this.setState({operateCode: 1, replacedIndex: index})
  }
  removeCollection = (index) => {
    //移除选中集合
    let selectedCollection = this.state.selectedCollection.slice()
    let unselectedCollection = this.state.unselectedCollection.slice()

    let deleteItem = selectedCollection.splice(index, 1)[0]
    deleteItem.selected = 0
    unselectedCollection.unshift(deleteItem)

    this.updateState({
      selectedCollection,
      unselectedCollection,
      operateCode: 0
    })
  }
  resetSelect = () => {
    this.setState({
      selectedIndex: -1,
      replacedIndex: -1,
      cacheCollection: [],
      unselectedCollection: this.state.unselectedCollection.map(e => {
        e.selected = 0
        return e
      })
    })
  }

  render () {
    let {
      showDes, showLine, showMore, showMinPrice, showCollCtrl, title, desTopics, collectionIds,
      unselectedCollection, selectedCollection, operateCode, disabled,
      footerBtnDisable, cacheCollection, selectedIndex
    } = this.state

    return (
      <div className='m-homeTopicsModule-ctrl'>
        <SubTitle title='SETTINGS'/>
        <div className='m-homeTopicsModule-ctrl-panel'>
          <div className='set-title'>
            <div className='set-title-txt'>
              <span>Title</span>
              <Input placeholder='Recommended topics' defaultValue={title} onChange={this.inputTitle}/>
            </div>
            <div className='set-title-info'>
              <Checkbox checked={showDes} onChange={this.toggleDisplay}>Add information display</Checkbox>
              <div className={`ctrl-area ${showDes ? 'show' : ''}`}>
                <span>Text</span>
                <textarea
                  onChange={this.inputDes}
                  defaultValue={desTopics}
                  placeholder='brand. Select imagery and text that relates to your style and story.'
                />
                <Checkbox checked={showLine} onChange={this.showLine}>Use split lines</Checkbox>
              </div>
            </div>
          </div>
          <div className='select'>
            <span>Section height</span>
            <Select onChange={this.selectCollectSize}>
              <option value='small'>Small</option>
              <option value='middle'>Medium</option>
              <option value='large'>Large</option>
            </Select>
          </div>
          <div className='checkbox'>
            <Checkbox checked={showMore} onChange={this.showMore}>Show overlay</Checkbox>
            <Checkbox checked={showMinPrice} onChange={this.showMinPrice}>White space on both sides</Checkbox>
          </div>
        </div>
        <SubTitle title='CONTENT'/>
        <div className='set-title-txt'>
          <span>Collection ID</span>
          <Input placeholder='Collection ID' defaultValue={collectionIds} onChange={this.inputCollectionIds}/>
        </div>
        <div className='topics-ctrl-collection'>
          {selectedCollection && <ActionList ref={ref => { this.actList = ref }}>
            {
              selectedCollection.map((item, i) => (
                <ActionList.Item title={<CollItem data={item}/>} key={item.collection_id} collapse>
                  <ItemCard
                    fn1={() => this.changeCollection(i)}
                    fn2={() => this.removeCollection(i)}/>
                </ActionList.Item>
              ))
            }
          </ActionList>
          }
          {
            (!selectedCollection || selectedCollection.length < 8) &&
            <a href='javascript:void(0)' className='add-collection-btn' onClick={this.toggleCollectPanel}>
              <span><Icon type='add'/></span>
              <span>Add Collection</span>
            </a>
          }
        </div>
        <SlipPanel
          title='Select Collection'
          disabled={footerBtnDisable}
          ref={el => { this.Slip = el }}
          callback={this.resetSelect}
          btnFn={this.handleClickConfirm}>
          <CollItemList
            operateCode={operateCode}
            config={this.props.config}
            selectedIndex={selectedIndex}
            cacheCollection={cacheCollection}
            selectedCollection={selectedCollection}
            unselectedCollection={unselectedCollection}
            updateState={this.updateState}/>
        </SlipPanel>
      </div>
    )
  }
}
