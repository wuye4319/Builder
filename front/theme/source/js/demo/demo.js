/**
 * @author MG Ding (丁文强)
 * @desc Builder组件DEMO
 */
// import '../builder/src/builder.less'
import './demo.less'
import React from 'react'
import ReactDOM from 'react-dom'
import ActionList from '../../../plugin/reactcommon/ActionList'
// const ButtonGroup = Button.Group

const demoList = [
  {
    title: 'Button 按钮',
    path: './button'
  },
  {
    title: 'Quantity 数量',
    path: './quantity'
  },
  {
    title: 'Select 下拉选择',
    path: './select'
  },
  {
    title: 'Input 文本框',
    path: './input'
  },
  {
    title: 'Icon 图标',
    path: './icon'
  },
  {
    title: 'Message 全局提示',
    path: './message'
  },
  {
    title: 'Modal 模态框',
    path: './modal'
  }
]

class Content extends React.Component {
  state = {
    active: (() => {
      let res = 0
      const hash = window.location.hash.replace('#', '')
      for (let i = 0; i < demoList.length; i++) {
        if (demoList[i].path.replace(/\.\//, '') === hash) {
          res = i
          break
        }
      }

      return res
    })()
  }
  handleChangePage = (active) => {
    this.setState({active})
    window.location.hash = demoList[active].path.replace(/\.\//, '')
  }
  render () {
    const {active} = this.state
    return (
      <div className='bc-demo'>
        <aside>
          <ActionList>
            {demoList.map((item, i) => {
              return <ActionList.Item title={item.title} key={item.title} onClick={this.handleChangePage.bind(this, i)} />
            })}
          </ActionList>
        </aside>

        <iframe src={demoList[active].path} frameBorder='0' />
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
