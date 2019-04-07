import React from 'react'
import './TopicsDetails.less'
import Checkbox from '../../../../builder/plugin/component/Checkbox'
// import ImagePanel from '../../../../builder/plugin/component/ImagePanel'


class TopicsDetailsCtrl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checkbox: {
        showTagCtrl: true, // 是否显示页面Banner图片模块
        showSortCtrl: false,//是否显示价格排序控制器
        showCategoryCtrl: false //是否显示分类筛选器
      }
    }
  }

  handleCheckbox = (props, e) => {
    let checkbox = Object.assign({}, this.state.checkbox)
    checkbox[props] = e.target.checked
    this.setState({ checkbox }, () => {
      this.updateConfig('checkbox', checkbox, false)
    })
  }
  updateConfig = (key, value, cache) => {
    let { config } = this.props
    config[key] = value
    this.props.changeConfig(config, cache)
  }
  handleChange = (e) => {
    this.updateConfig('cols', e.target.value - 0, true)
  }
  // selectImage = (images='') => {
  //   this.updateConfig('bgImg', images, false)
  // }
  render() {
    const { checkbox } = this.state
    const { cols, bgImg } = this.props.config

    return (
      <div className='topics-details-ctrl'>
        <h2>SETTINGS BAR</h2>
        <div className='topics-details-ctrl-panel'>
          <div className='range-item'>
            <span>Columns</span>
            <div className='range'>
              <input type='range' min='2' max='5' value={cols} onChange={this.handleChange} />
              <span>{cols}</span>
            </div>
          </div>
          <div className='checkbox-group'>
            <Checkbox
              checked={checkbox.showTagCtrl}
              onChange={(e) => this.handleCheckbox('showTagCtrl', e)}>
              Enable activity tag
            </Checkbox>
            <Checkbox
              disabled
              checked={checkbox.showCategoryCtrl}
              onChange={(e) => this.handleCheckbox('showCategoryCtrl', e)}>
              Enable classification
            </Checkbox>
            <Checkbox
              disabled
              checked={checkbox.showSortCtrl}
              onChange={(e) => this.handleCheckbox('showSortCtrl', e)}>
              Enable sorting
            </Checkbox>
          </div>
          {/*<ImagePanel*/}
            {/*imgUrl={bgImg}*/}
            {/*selectImage={this.selectImage}*/}
          {/*/>*/}
        </div>
      </div>
    )
  }
}
export default TopicsDetailsCtrl
