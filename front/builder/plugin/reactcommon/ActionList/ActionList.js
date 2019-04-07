/**
 * @author MG Ding (丁文强)
 * @desc
 */

import React from 'react'
// import PropTypes from 'prop-types';
import {setClass} from '../../../source/util'
const { Component, PureComponent, Children, cloneElement } = React

class ActionList extends Component {
  // static propTypes = {
  //   children: PropTypes.element
  // }
  state = {
    expandKeys: {}
  }
  toggleExpand = (key) => {
    this.setState(state => {
      let {expandKeys} = state
      if (expandKeys[key]) {
        delete expandKeys[key]
      } else {
        expandKeys[key] = 1
      }

      return {expandKeys}
    })
  }
  dragSort = (offset, index) => {
    const length = this.props.children.length
    const targetIndex = index + offset
    if (targetIndex < length && targetIndex >= 0) {
      // console.log(offset, index, targetIndex)
      this.props.dragSort(targetIndex, index)
    }
  }
  dragStart = () => {
    // this.props.dragStart()
  }
  render () {
    const { draggable } = this.props
    const { expandKeys } = this.state
    // console.log(this.props.children)
    // console.log(PropTypes)
    // console.log(this.props.children)



    return (
      <ul className='rc-actionList'>
        {Children.map(this.props.children, (child, index) => {
          return child
            ? cloneElement(child, {
              ...child.props,
              draggable: draggable,
              expand: !!expandKeys[child.key],
              toggleExpand: this.toggleExpand,
              dragSort: this.dragSort,
              dragStart: this.dragStart,
              _key: child.key,
              _index: index
            })
            : ''
        })}
      </ul>
    )
  }
}

ActionList.Item = class Item extends PureComponent {
  state = {
    isDrag: false
  }

  handleClick = (event) => {
    const { toggleExpand, onClick, collapse, _key } = this.props

    if (collapse) toggleExpand(_key)
    if (onClick) onClick(event, _key)
  }

  startY = 0
  cacheY = 0
  catchOffset = ''

  render () {
    const { title, children, collapse, expand, draggable, dragSort } = this.props
    const { isDrag } = this.state

    /* Children.map(this.props.children, item => {
      return item
    }) */

    return (
      <li className={setClass({isDrag})}>
        <a
          href='javascript:;'
          onClick={this.handleClick}
          draggable={draggable}
          onDragStart={(e) => {
            this.startY = e.clientY
            this.setState({isDrag: true})
            this.props.dragStart()
          }}
          onDrag={(e) => {
            e.preventDefault()
            // if (this.cacheY !== e.clientY) {
            //   let offset = parseInt((e.clientY - this.startY) / 62)
            //   if (offset && this.catchOffset !== offset) {
            //     dragSort(offset, this.props._index)
            //     this.catchOffset = offset
            //   }
            //   this.cacheY = e.clientY
            // }
          }}
          onDragEnd={(e) => {
            e.preventDefault()
            let offset = parseInt((e.clientY - this.startY) / 62)
            if (offset) {
              dragSort(offset, this.props._index)
            }
            this.startY = 0
            this.setState({isDrag: false})
          }}
        >
          {title}
        </a>
        {collapse &&
          <div
            className={setClass({'rc-actionList-collapse': 1, 'expend': expand})}
          >
            {children}
          </div>
        }
      </li>
    )
  }
}

export default ActionList
