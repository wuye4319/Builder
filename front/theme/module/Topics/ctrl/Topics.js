/**
 * @author Gavin Yang (杨伟伟)
 * @desc 专题页控制器
 */

import './Topics.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Icon from '../../../../builder/plugin/component/Icon'
import Radio from '../../../../builder/plugin/component/Radio'
import Select from '../../../../builder/plugin/component/Selection'
import Checkbox from '../../../../builder/plugin/component/Checkbox'
import ActionList from '../../../../builder/plugin/component/ActionList'
import { CollPanel, CollItemList, CollItem } from './component'
import { collection } from '../TEST_DATA'

class TopicsCtrl extends React.Component {
  state = {
    showColType: '1', // 0:all,1:selected
    showCollCtrl: false,
    collectList: null,
  }
  componentWillMount = () => {
    let data = this.filterCollect()
    this.setState({collectList: data.collectList})
    this.updateConfig('collectId', data.collectId, false)
  }
  filterCollect = () => {
    let collectId = []
    let collectList = []
    for (let i = 0, len = collection.length; i < len; i++) {
      if (!collection[i]['title']) {
        collection[i]['title'] = <CollItem data={collection[i]}/>
      }
      if (collection[i]['selected'] === 1) {
        collectList.push(collection[i])
        collectId.push(collection[i]['id'])
      }
    }
    return {collectList, collectId}
  }

  updateConfig = (key, value, cache) => {
    let {config} = this.props
    config[key] = value
    this.props.changeConfig(config, cache)
  }

  toggleCollectPanel = () => {
    this.setState(pre => {
      return {showCollCtrl: !pre.showCollCtrl}
    })
  }

  // selectCollectType =(e) => {
  //   if (e.target.value === '0') {
  //     this.setState({collectList: null, showColType: '0'}, () => {
  //       let collectId = collection.map(item => (item.id))
  //       this.updateConfig('collectId', collectId, false)
  //     })
  //     return
  //   }
  //
  //   if (e.target.value === '1') {
  //     let data = this.filterCollect()
  //     this.setState({collectList: data.collectList, showColType: '1'})
  //     this.updateConfig('collectId', data.collectId, false)
  //   }
  // }
  setSortRule = (e) => {
    this.updateConfig('showMinPrice', e.target.checked, false)
  }
  setImageSize = (e) => {
    // console.log(e.target.value)
    // this.setState({imgSize: e.target.value})
    this.updateConfig('collectSize', e.target.value, false)
  }

  render () {
    const container = document.getElementsByClassName('builder-aside')[0]
    // const {showCollCtrl, showColType, collectList, imgSize} = this.state
    const {config} = this.props
    const {collectSize} = config
    return (
      <React.Fragment>
        <div className='topics-ctrl'>
          <header>
            <h2>SELECT COLLECTIONS TO SHOW</h2>
            <p>All of your collections are listed by default.
              To customize your list, choose 'Selected' and add collections.</p>
          </header>
          <div className='topics-ctrl-panel'>
            {/*<Radio.Group name='collection-type' value={showColType} onChange={this.selectCollectType}>*/}
            {/*<Radio value='0'>All</Radio>*/}
            {/*<Radio value='1'>Selected</Radio>*/}
            {/*</Radio.Group>*/}
            <div className='select-height'>
              <span>Section Height</span>
              <Select value={collectSize} onChange={this.setImageSize}>
                <option value='small'>Small</option>
                <option value='middle'>Medium</option>
                <option value='large'>Large</option>
              </Select>
            </div>
            {/* <Checkbox onChange={this.setSortRule}>Display the lowest price of a collection</Checkbox> */}
          </div>
        </div>
        {/*<h2 className='topics-ctrl-content'>CONTENT</h2>*/}
        {/*<div className='topics-ctrl-collection'>*/}
        {/*{collectList && <ActionList>*/}
        {/*{*/}
        {/*collectList.map((item, i) => (*/}
        {/*<ActionList.Item title={item.title} key={item.id} collapse={item.id !== '06'}>*/}
        {/*{*/}
        {/*item.id !== '06' && <CollPanel />*/}
        {/*}*/}
        {/*</ActionList.Item>*/}
        {/*))*/}
        {/*}*/}
        {/*</ActionList>*/}
        {/*}*/}
        {/*<a href='javascript:void(0)' className='add-collection-btn' onClick={this.toggleCollectPanel}>*/}
        {/*<span><Icon type='add' /></span>*/}
        {/*<span>Add Collection</span>*/}
        {/*</a>*/}
        {/*</div>*/}
      </React.Fragment>
    )
  }
}

export default TopicsCtrl
