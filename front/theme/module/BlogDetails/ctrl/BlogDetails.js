/**
 * @author Alan (曹昌盛)
 * @desc 博客详情页面控制器
 */
import React from 'react'
import PropTypes from 'prop-types'
import './BlogDetails.less'

// const {util} = window.supervar

class BlogDetailsCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    changeConfig: PropTypes.func.isRequired
  }
  static defaultProps = {
    changeConfig: () => {
    }
  }

  render () {
    const {config} = this.props
    const {name, key} = config
    return (
      <div
        id={`${name}Ctrl-${key}`}
        className='m-BlogDetails-ctrl-wrap'
      >
        此页面不可编辑
      </div>
    )
  }
}

export default BlogDetailsCtrl
