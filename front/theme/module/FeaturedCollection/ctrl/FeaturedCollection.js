/**
 * @author MG Ding (丁文强)
 * @desc FeaturedCollection编辑器
 */
import './FeaturedCollection.less'
import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../../../builder/plugin/component/Input'
import Checkbox from '../../../../builder/plugin/component/Checkbox'
import SlipPanel from '../../../../builder/plugin/component/SlipPanel'
import Text from '../../../../builder/plugin/component/Text'
import { getCollections } from '../../../../builder/source/service/api'
import { CollectionCard, ProductsCollection } from './component'
import { fetchLite } from '../../../../builder/source/util'

class FeaturedCollectionCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object, // 配置信息
    changeConfig: PropTypes.func, // 更新配置 (param1: 配置，param2: 缓存配置，默认不缓存)
    cacheConfig: PropTypes.func  // 缓存配置
  }
  static classPrefix = 'ctrl-featuredCollection'
  static heightMap = [
    {name: 'Low', value: 'low'},
    {name: 'Medium', value: 'medium'},
    {name: 'High', value: 'high'}
  ]
  state = {
    disabled: true,
    showDisplay: true,
    selectedIndex: null,
    selectedCollection: null,
    productCollection: null
  }

  componentDidMount () {
    // fetchLite(getCollections, {
    //   done: (res) => {
    //     let data = (res.data && res.data.data) || null
    //     if (res.state !== 0) {
    //       return
    //     }
    //
    //     if (!data) {
    //       return
    //     }
    //
    //     let selectedCollection = null
    //     let {collectId} = this.props.config
    //     let _data = data.filter(item => {
    //       item.selected = 0
    //       item.className = ''
    //       if (item.id === collectId) {
    //         selectedCollection = Object.assign({}, item)
    //       }
    //       return item.id !== collectId
    //     })
    //
    //     this.setState({productCollection: _data, selectedCollection})
    //   }
    // })
  }

  updateConfig = (key, value, cache) => {
    let {config} = this.props
    config[key] = value
    this.props.changeConfig(config, cache)
  }
  inputCollectId = (e) => {
    this.updateConfig('collectId', e.target.value, false)
  }
  inputTitle = (e) => {
    this.updateConfig('title', e.target.value, false)
  }
  handleTextArea = (value) => {
    this.updateConfig('desProducts', (value || 'Relates your story'))
  }
  toggleDisplay = (e) => {
    this.setState((pre) => {
      this.updateConfig('showDes', !pre.showDisplay, false)
      return {showDisplay: !pre.showDisplay}
    })
  }
  toggleSplitLine = (e) => {
    this.updateConfig('showLine', e.target.checked, false)
  }
  handleRange = (e) => {
    let key = e.target.name
    let value = parseFloat(e.target.value)
    console.log('key', key, 'value', value)
    this.updateConfig(key, value, false)
    this.setState({[key]: value})
  }
  handleCols = (e) => {
    let cols = e.target.value - 0 || 1
    this.updateConfig('cols', cols, false)
  }
  handleRows = (e) => {
    let rows = e.target.value - 0 || 3
    this.updateConfig('rows', rows, false)
  }
  showMore = (e) => {
    this.updateConfig('showMore', e.target.checked)
  }
  openCollect = () => {
    this.Slip.toggle()
  }
  upDateState = (params) => {
    if (!params || typeof params !== 'object') {
      return
    }
    this.setState({...params})
  }
  remove = () => {
    let {selectedCollection, productCollection} = this.state
    productCollection.unshift(selectedCollection)
    this.setState({
      disabled: true,
      selectedIndex: null,
      selectedCollection: null,
      productCollection: [...productCollection]
    })
    this.updateConfig('collectId', null, false)
  }
  confirmSelected = () => {
    const {disabled, selectedIndex} = this.state
    if (disabled) {
      return
    }
    if (selectedIndex !== null || selectedIndex !== undefined) {
      let replaceCollection
      let _selectedCollection = this.state.selectedCollection
      let _productCollection = this.state.productCollection.map(item => {
        item.selected = 0
        item.className = ''
        return item
      })

      if (_selectedCollection) {
        // 替换已有的产品集合
        replaceCollection = _productCollection.splice(selectedIndex, 1, _selectedCollection)
      } else {
        // 选择产品集合
        replaceCollection = _productCollection.splice(selectedIndex, 1)
      }
      this.setState({
        selectedCollection: replaceCollection[0],
        productCollection: _productCollection
      })
      this.updateConfig('collectId', replaceCollection[0]['id'], true)
    }
  }
  closeCallBack = () => {
    // console.log('closeCallBack')
    let _productCollection = this.state.productCollection.map(item => {
      item.selected = 0
      item.className = ''
      return item
    })
    this.setState({disabled: true, productCollection: _productCollection})
  }

  render () {
    const {showLine, showMore, cols, rows, title, desProducts, collectId} = this.props.config
    const {classPrefix} = FeaturedCollectionCtrl
    const {showDisplay, disabled, selectedCollection} = this.state
    const props = {
      selectedCollection,
      data: this.state.productCollection,
      upDateState: this.upDateState
    }
    // console.log(this.props.config)
    // console.log('selectedCollection', selectedCollection)
    return (
      <div className={classPrefix}>
        <h2 className='ctrl-card-header'>SETTINGS BAR</h2>
        <div className='ctrl-card'>
          <div className='set-title-txt'>
            <span>Title</span>
            <Input placeholder='Get in touch' onChange={this.inputTitle} value={title}/>
          </div>
          <div className='set-title-info'>
            <Checkbox checked={showDisplay} onChange={this.toggleDisplay}>Add information display</Checkbox>
            <div className={`ctrl-area ${showDisplay ? 'show' : ''}`}>
              <span>Text</span>
              <Text
                onChange={this.handleTextArea}
                placeholder='brand. Select imagery and text that relates to your style and story.'
                value={desProducts}
              />
              <Checkbox checked={showMore} onChange={this.showMore}>Show overlay</Checkbox>
              <Checkbox checked={showLine} onClick={this.toggleSplitLine}>Use split lines</Checkbox>
            </div>
          </div>
        </div>
        <h2 className='ctrl-card-header'>CONTENT</h2>
        <div className='select-collection'>
          {/*<CollectionCard*/}
          {/*remove={this.remove}*/}
          {/*open={this.openCollect}*/}
          {/*collection={selectedCollection}/>*/}
          <div className='set-title-txt'>
            <span>Collection ID</span>
            <Input placeholder='1' value={collectId} onChange={this.inputCollectId}/>
          </div>
          <div className='range-item'>
            <span>Cols</span>
            <div>
              <input type='range' min='3' max='4' value={cols} name='cols' onChange={this.handleCols}/>
              <span>{cols}</span>
            </div>
          </div>
          <div className='range-item'>
            <span>Rows</span>
            <div>
              <input type='range' min='1' max='4' value={rows} name='rows' onChange={this.handleRows}/>
              <span>{rows}</span>
            </div>
          </div>
        </div>
        <SlipPanel title='Select Products' disabled={disabled} btnFn={this.confirmSelected} callback={this.closeCallBack}
                   ref={el => { this.Slip = el }}>
          <ProductsCollection {...props} />
        </SlipPanel>
      </div>
    )
  }
}

export default FeaturedCollectionCtrl
