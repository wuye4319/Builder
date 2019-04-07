/**
 * @author Alan (曹昌盛)
 * @desc Blogs博客控制器
 */
import React from 'react'
import PropTypes from 'prop-types'
import './Homeblog.less'
import CheckBox from '../../../../builder/plugin/component/Checkbox'
import Input from '../../../../builder/plugin/component/Input'
import Text from '../../../../builder/plugin/component/Text'
import Select from '../../../../builder/plugin/component/Selection'
import Button from '../../../../builder/plugin/component/Button'
import ActionList from '../../../../builder/plugin/component/ActionList'
import ItemCard from '../../../../builder/plugin/component/ItemCard'
import BlogAssembleList from './BlogAssembleList'
import SlipPanel from '../../../../builder/plugin/component/SlipPanel'

const BlogAssemble = (props) => {
  return (
    <div className='coll-item'>
      <img src='//gw2.alicdn.com/bao/uploaded/i6/TB1rMkPhY9YBuNjy0FgYXIxcXXa_M2.SS2_210x210.jpg' />
      <span className='blog-item-title'>BlogItem</span>
    </div>
  )
}

class HomeBlogCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    changeConfig: PropTypes.func.isRequired
  }
  static defaultProps = {
    changeConfig: () => {
    }
  }
  state = {
    blogList: [],
    showBlogAssemble: true,
    selectButton: true
  }
  handleChangeValue = (key, e) => {
    let {config} = this.props
    config[key] = e.target.value
    this.props.changeConfig(config)
  }
  handleChangeCheck = (key, e) => {
    let {config} = this.props
    config[key] = e.target.checked
    this.props.changeConfig(config)
  }
  handleChangeText = (value) => {
    let {config} = this.props
    config['blogDesValue'] = value
    this.props.changeConfig(config)
  }
  handleChangeRow = (e) => {
    let value = e.target.value - 0 || 1
    let {config} = this.props
    config.rows = value
    this.props.changeConfig(config)
  }
  handleChangeCol = (e) => {
    let value = e.target.value - 0 || 2
    let {config} = this.props
    config.cols = value
    this.props.changeConfig(config)
  }
  // 切换博客集合编辑器
  toggleBlogAssembleCtrl = () => {
    this.Slip.toggle()
  }
  // 移除博客集合
  toggleBlogAssemble = () => {
    this.setState(pre => (
      {showBlogAssemble: !pre.showBlogAssemble}
    ))
  }
  // 切换选择按钮样式
  toggleSelectButton = (status) => {
    this.setState(() => ({
      selectButton: status
    }))
  }

  render () {
    const {config} = this.props
    const {name, key, blogStyle, rows, cols, title, blogDesValue, showLine, showBlogDes, showAuthor, showDate, showImg, showLabels, showReadMore} = config
    const {showBlogAssemble, selectButton} = this.state
    console.log(selectButton)
    return (
      <div
        id={`${name}Ctrl-${key}`}
        className='m-home-blog-ctrl-wrap'
      >
        <h2 className='setting'>Settings Bar</h2>
        <div className='blog-ctrl-top'>
          <h3>Title</h3>

          <Input onChange={this.handleChangeValue.bind(this, 'title')} value={title} />
          <div className='blog-des'>
            <CheckBox checked={showBlogDes} onChange={this.handleChangeCheck.bind(this, 'showBlogDes')}>Blog
              description</CheckBox>
          </div>
          <Text value={blogDesValue} onChange={this.handleChangeText} />

          <div className='show-line'>
            <CheckBox checked={showLine} onChange={this.handleChangeCheck.bind(this, 'showLine')}>Use split
              lines</CheckBox>
          </div>
        </div>
        <div className='blog-ctrl-split' />
        <h2 className='list-title'>Blog</h2>
        <div className='blog-list'>
          {
            !!showBlogAssemble && <ActionList>
              <ActionList.Item title={<BlogAssemble data='blogItem' />} key={'blogAssemble'} collapse>
                <ItemCard fn1={this.toggleBlogAssembleCtrl} fn2={this.toggleBlogAssemble} />
              </ActionList.Item>
            </ActionList>
          }

        </div>
        <div className='blog-ctrl-center'>
          {
            !showBlogAssemble && <div className='blog-select'>
              <Button onClick={this.toggleBlogAssembleCtrl}>Select Blog</Button>
            </div>
          }

          <h2>Blog Style</h2>
          <Select style={{width: '100%'}} name='homeBlogStyle' id='HomeBlogStyle' value={blogStyle}
            onChange={this.handleChangeValue.bind(this, 'blogStyle')}>
            <option value='Small'>Small</option>
            <option value='Medium'>Medium</option>
            <option value='Large'>Large</option>
          </Select>
          <h3>Rows</h3>
          <div className='rows'>
            <input
              style={{width: 170, cursor: 'pointer'}}
              type='range'
              min='1'
              max='3'
              value={rows}
              onChange={this.handleChangeRow}
            />
            <span>{rows}</span>
          </div>
          <h3>Cols</h3>
          <div className='cols'>
            <input
              style={{width: 170, cursor: 'pointer'}}
              type='range'
              min='1'
              max='3'
              value={cols}
              onChange={this.handleChangeCol}
            />
            <span>{cols}</span>
          </div>
        </div>
        <div className='blog-ctrl-split' />
        <div className='blog-ctrl-bottom'>
          <div className='checkbox-item'>
            <CheckBox checked={showAuthor} onChange={this.handleChangeCheck.bind(this, 'showAuthor')}>Show
              author</CheckBox>
          </div>
          <div className='checkbox-item'>
            <CheckBox checked={showDate} onChange={this.handleChangeCheck.bind(this, 'showDate')}>Display
              date</CheckBox>
          </div>
          <div className='checkbox-item'>
            <CheckBox checked={showImg} onChange={this.handleChangeCheck.bind(this, 'showImg')}>Display cover page
              image</CheckBox>
          </div>
          <div className='checkbox-item'>
            <CheckBox checked={showLabels} onChange={this.handleChangeCheck.bind(this, 'showLabels')}>Display
              labels</CheckBox>
          </div>
          <div className='checkbox-item'>
            <CheckBox checked={showReadMore} onChange={this.handleChangeCheck.bind(this, 'showReadMore')}>Show "View
              All" button</CheckBox>
          </div>
        </div>
        <div className='blog-ctrl-split' />
        {/* 删除此项---暂时没有功能 */}
        {/* <div className='remove'> */}
        {/* <Icon type='delete' /> */}
        {/* <span>Remove section</span> */}
        {/* </div> */}
        <SlipPanel
          title='Select Blog'
          ref={el => { this.Slip = el }}
          disabled={selectButton}
        >
          <BlogAssembleList toggleSelectButton={this.toggleSelectButton} />
        </SlipPanel>

        {/* { */}
        {/* ReactDOM.createPortal( */}
        {/* <BlogAssembleList */}
        {/* {...this.props} */}
        {/* showBlogAssembleCtrl={showBlogAssembleCtrl} */}
        {/* toggleBlogAssembleCtrl={this.toggleBlogAssembleCtrl} */}
        {/* />, container) */}
        {/* } */}
      </div>
    )
  }
}

export default HomeBlogCtrl
