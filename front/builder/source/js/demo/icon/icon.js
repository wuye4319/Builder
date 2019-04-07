/**
 * @author MG Ding (丁文强)
 * @desc Icon DEMO
 */
import '../../builder/src/builder.less'
import './icon.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Icon from '../../../../plugin/component/Icon'

class Content extends React.Component {
  render () {
    return (
      <div className='bc-demo'>
        <h1>Icon 图标</h1>
        <a href='http://iconfont.cn/manage/index?manage_type=myprojects&projectId=580300&keyword=' target='_blank'>查看图标库</a>
        <br />
        <img src='/builder/source/img/builder/icon.png' />
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
