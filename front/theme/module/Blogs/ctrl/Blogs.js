/**
 * @author Alan (曹昌盛)
 * @desc Blogs博客控制器
 */
import React from 'react'
import PropTypes from 'prop-types'
import './Blogs.less'
import Select from '../../../../builder/plugin/component/Selection'
// import CheckBox from '../../../../builder/plugin/component/Checkbox'
// import Input from '../../../../builder/plugin/component/Input'
// import Text from '../../../../builder/plugin/component/Text'

// const {util} = window.supervar

class BlogsCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    changeConfig: PropTypes.func.isRequired
  }
  static defaultProps = {
    changeConfig: () => {
    }
  }
  handleChangeValue = (e) => {
    let {config} = this.props
    config['blogStyle'] = e.target.value
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

  render () {
    const {config} = this.props
    const {name, key, blogStyle, rows, cols} = config
    return (
      <div
        id={`${name}Ctrl-${key}`}
        className='m-blogs-ctrl-wrap'
      >
        <h3>Blog Style</h3>
        <Select name='blogStyle' id='blogStyle' value={blogStyle} onChange={this.handleChangeValue}>
          <option value='Small'>Small</option>
          <option value='Medium'>Medium</option>
          <option value='Large'>Large</option>
        </Select>
        <h3>Rows</h3>
        <div className='rows'>
          <input
            style={{width: 200, cursor: 'pointer'}}
            type='range'
            min='2'
            max='12'
            value={rows}
            onChange={this.handleChangeRow}
          />
          <span>{rows}</span>
        </div>
        <h3>Cols</h3>
        <div className='cols'>
          <input
            style={{width: 200, cursor: 'pointer'}}
            type='range'
            min='1'
            max='3'
            value={cols}
            onChange={this.handleChangeCol}
          />
          <span>{cols}</span>
        </div>
        {/* <h3>Title</h3> */}
        {/* <Input onChange={this.handleChangeValue} value={title}/> */}
        {/* <div className='blog-des'> */}
        {/* <CheckBox checked={showBlogDes}>Blog description</CheckBox> */}
        {/* </div> */}
        {/* <Text value={blogDesValue} onChange={this.handleChangeValue}/> */}
        {/* <div className='show-line'> */}
        {/* <CheckBox checked={splitLine}>Use split lines</CheckBox> */}
        {/* </div> */}
        {/* <div className='checkbox-item'> */}
        {/* <CheckBox checked={showAuthor}>Show author</CheckBox> */}
        {/* </div> */}
        {/* <div className='checkbox-item'> */}
        {/* <CheckBox checked={showDate}>Display date</CheckBox> */}
        {/* </div> */}
        {/* <div className='checkbox-item'> */}
        {/* <CheckBox checked={showImg}>Display cover page image</CheckBox> */}
        {/* </div> */}
        {/* <div className='checkbox-item'> */}
        {/* <CheckBox checked={showLabels}>Display labels</CheckBox> */}
        {/* </div> */}
        {/* <div className='checkbox-item'> */}
        {/* <CheckBox checked={showReadMore}>Show "View All" button</CheckBox> */}
        {/* </div> */}
      </div>
    )
  }
}

export default BlogsCtrl
