/**
 * @author MG Ding (丁文强)
 * @desc ActionList DEMO
 */
import '../../builder/src/builder.less'
import './actionlist.less'
import React from 'react'
import ReactDOM from 'react-dom'
import ActionList from '../../../../plugin/component/ActionList'
import Icon from '../../../../plugin/component/Icon'
import {moveArrayItem} from '../../../util'
const list1 = [
  {title: 'title1', icon: 'header'},
  {title: 'title2', icon: 'footer'},
  {title: 'title3', icon: 'page'},
  {title: 'title4', icon: 'product'}
]

const list2 = [
  {title: 'title1'},
  {title: 'title2'},
  {title: 'title3'},
  {title: 'title4'}
]
class Content extends React.Component {
  state = {
    list3: [
      {title: 'title1'},
      {title: 'title2'},
      {title: 'title3'},
      {title: 'title4'}
    ],
    list4: [
      {title: 'title1'},
      {title: 'title2'},
      {title: 'title3'},
      {title: 'title4'}
    ]
  }
  render () {
    return (
      <div className='bc-demo'>
        <h1>ActionList 可操作列表</h1>
        <Icon type='cart' />

        <div className='list-wrapper'>
          <p>有图标</p>
          <ActionList>
            {list1.map(({title, icon}) => <ActionList.Item key={title} title={title} icon={icon} />)}
          </ActionList>
        </div>

        <div className='list-wrapper'>
          <p>有扩展内容</p>
          <ActionList>
            {list2.map(({title, collapse}) => (
              <ActionList.Item key={title} title={title} collapse>
                {title}-内容
              </ActionList.Item>
            ))}
          </ActionList>
        </div>

        <div className='list-wrapper'>
          <p>可拖拽</p>
          <ActionList
            draggable
            dragStart={() => {
              /** 拖拽开始 **/
              console.log('dragStart')
            }}
            dragEnd={(dragFrom, dragTo) => {
              /** 拖拽结束触发 **/
              console.log('dragEnd', dragFrom, dragTo)
              dragFrom !== dragTo && this.setState(({list3}) => ({list3: moveArrayItem(list3, dragFrom, dragTo)}))
            }}
            onChange={(dragFrom, dragTo) => {
              /** 有元素交换位置时触发 **/
              console.log('onChange', dragFrom, dragTo)
            }}
          >
            {this.state.list3.map(({title, collapse}) => (
              <ActionList.Item key={title} title={title} />
            ))}
          </ActionList>
        </div>

        <div className='list-wrapper'>
          <p>全部都有！！！</p>
          <ActionList
            draggable
            dragEnd={(dragFrom, dragTo) => {
              /** 拖拽结束触发 **/
              console.log('dragEnd', dragFrom, dragTo)
              dragFrom !== dragTo && this.setState(({list4}) => ({list4: moveArrayItem(list4, dragFrom, dragTo)}))
            }}
          >
            {this.state.list4.map(({title, collapse}) => (
              <ActionList.Item key={title} title={title} icon='header' collapse>
                {title}-内容
              </ActionList.Item>
            ))}
          </ActionList>
        </div>

      </div>
    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
