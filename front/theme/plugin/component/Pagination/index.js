/**
 * Pagination分页组件
 * author: Alan
 * props:
 *   style            : <object> 应用到Pagination组件的样式(默认{marginTop:"30px"})
 *   language         : <string> 英文版:en;中文版:cn(默认)
 *   totalPage        : <number> 总页数
 *   totalRow         : <number> 总条数
 *   pageNo           : <Number> 当前页
 *   size             : <number> 尺寸，传入'sm'显示小尺寸，默认大尺寸
 *   handleChangePage : <function> 分页时调用,传入目标页码(number)
 *   onEndReached     : <Number> 滚动到距离最底部距离开始加载
 * 注意:
 *   传入的handleChangePage函数必须返回一个Promise对象,
 *   调用handleChangePage时,分页组件会被禁用,当promise触发resolve或reject时解除禁用,
 *   如果分页成功(resolve),可给resolve传入一个数字,滚动条会滚动到数字位置(scrollTop)
 *   例如:
 *   handleChangePage(n){
 *       return new Promise((resolve,reject) => {
 *           util.fetch('url',{page:n}).then(data=>{
 *               if(data.state === 0){
 *                   resolve(0);
 *               }else{
 *                   reject();
 *               }
 *           }).catch(err=>{
 *               reject();
 *           });
 *       });
 *   }
 */
import React from 'react'
import './src/Pagination.less'
import Icon from '../../component/Icon'
const { color, font } = window.supervar.util

// const {util} = window.supervar

let modelCN = {
  prev: '上一页',
  next: '下一页',
  page: ['共', '页，到第', '页'],
  confirm: '确认'
}

let modelEN = {
  prev: 'Previous',
  next: 'Next',
  page: ['Total ', ' page, to page ', ''],
  confirm: 'Go'
}

class Pagination extends React.Component {
  loadMore = true
  direction = 'down'
  beforeScrollTop = 0

  constructor () {
    super()
    this.state = {
      loading: false // 调用handleChangePage时被设置为true(组件被禁用),handleChangePage返回的Promise返回结果时被设置为false(组件解除禁用)
    }
  }

  /** 设置loading, 并且当loading成功时inputPage被设置为''(清空页码输入框)**/
  setLoading (b) {
    this.setState((state) => ({
      loading: b
    }))
  }

  /** 分页动作,参数n代表跳转到第几页(pageNo) **/
  handleChangePage (n) {
    if (n !== this.props.pageNo && n !== '' && n >= 1 && n <= this.props.totalPage) {
      let loading = this.props.handleChangePage(n)
      this.setLoading(true)

      loading.then(data => {
        // if (util.getConstructorName(data) === 'Number') {
        //   util.setScrollTop(data) // 设置滚动条高度
        // }
        this.setLoading(false)
      }).catch(() => {
        this.setLoading(false)
      })
    }
  }

  /** 格式化页码按钮组(参考京东分页逻辑) **/
  formatButtonGroup () {
    let buttonGroup = [] // 得到的结果是类似[1,2,null,6,7,8,9,10,null]这样的数组,数字表示页码,null表示省略号
    let totalPage = this.props.totalPage
    let pageNo = this.props.pageNo

    /** 总页数小于等于5, 把所有页码都渲染出来 **/
    if (totalPage <= 5) {
      for (var i = 0; i < totalPage; i++) {
        buttonGroup.push(i + 1)
      }

      /**
       * 总页数大于5页, 只渲染部分页码:
       *   1.当前页大于等于5页,始终渲染1,2,3页,当前页(pageNo)及左右各2页:
       *      最右的页码小于总页码数,在右边添加省略号
       *      左侧的页码大于4,在左边添加省略号
       *   2.当前页小于5页,渲染前5页,右侧添加省略号
       * **/
    } else {
      buttonGroup = [1, 2, 3]
      if (pageNo - 3 >= 4) buttonGroup.push(null)

      for (let i = 0; i < 5; i++) {
        let cachePage = pageNo - 2 + i
        if (cachePage <= totalPage && cachePage > 3) buttonGroup.push(cachePage)
      }
      if (pageNo == 1) {
        buttonGroup = buttonGroup.concat([4, 5])
      }
      if (pageNo == 2) {
        buttonGroup.push(5)
      }
      if (buttonGroup[buttonGroup.length - 1] < totalPage) buttonGroup.push(null)
    }
    return buttonGroup
  }

  pullMore = () => {
    // 文档高度
    const sHeight = document.documentElement.scrollHeight
    //  可视区域高度
    const cHeight = document.documentElement.clientHeight
    // 滚动条下拉高度 移动端和PC获取方式不一致
    const sTop = document.body.scrollTop || document.documentElement.scrollTop
    // footer高度
    const fHeight = document.getElementById('Footer-1').offsetHeight
    const {onEndReached = fHeight} = this.props
    const disY = sHeight - cHeight - sTop - onEndReached
    let delta = sTop - this.beforeScrollTop
    this.getDirection(delta > 0 ? 'down' : 'up')
    this.beforeScrollTop = sTop
    if (disY <= 20 && this.direction === 'down') {
      const {pageNo} = this.props
      const n = pageNo + 1
      if (n >= 1 && n <= this.props.totalPage && this.loadMore) {
        this.loadMore = false
        let loading = this.props.handleChangePage(n)
        loading.then(data => {
          this.loadMore = true
        }).catch(() => {
          this.loadMore = true
        })
      }
    }
  }
  getDirection = (direction) => {
    this.direction = direction
  }
  bindScroll = () => {
    this.beforeScrollTop = document.documentElement.scrollTop
    window.onscroll = this.pullMore
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.scrollLoad) {
      this.bindScroll()
    } else {
      window.onscroll = null
    }
  }

  componentWillMount () {
    // this.model = this.props.language === 'en' ? modelEN : modelCN
    this.model = modelEN
    if (this.props.scrollLoad) {
      this.bindScroll()
    }
  }

  componentWillUnmount () {
    window.onscroll = null
  }

  render () {
    let buttonGroup = this.formatButtonGroup()
    let pageNo = this.props.pageNo
    let totalPage = this.props.totalPage
    // let totalRow = this.props.totalRow
    return (
      <React.Fragment>
        {
          !this.props.scrollLoad && <div
            className={(this.state.loading ? 'm-pagination-loading' : '') + (this.props.size === 'sm' ? ' m-pagination-sm' : '') + ' m-pagination'}
            style={this.props.style}>
            <div className='m-pagination-mask' />
            <button
              className={`button-prev ${color('text')} ${color.border('border')} ${color.bg('button')} ${font('text')} `}
              disabled={pageNo <= 1}
              onClick={this.handleChangePage.bind(this, pageNo - 1)}>
              <Icon
                type='back'
                className={`${font('subText')}`}
                color=''
              />
              {this.model.prev}
            </button>
            <ul className='button-group'>
              {buttonGroup.map((page, index) => (
                page
                  ? (
                    <li key={index}>
                      <button
                        className={`${color('text')} ${color.border('border')} ${color.bg('button')} ${font('text')} ${page == pageNo ? 'active' : ''}`}
                        onClick={this.handleChangePage.bind(this, page)}>{page}</button>
                    </li>
                  )
                  : <li key={index}><span className={`${color('text')}`}>...</span></li>
              ))}
            </ul>
            <button
              className={`button-next ${color('text')} ${color.border('border')} ${color.bg('button')} ${font('text')}`}
              disabled={pageNo >= totalPage}
              onClick={this.handleChangePage.bind(this, pageNo + 1)}>
              {this.model.next}
              <Icon
                className={`${font('subText')}`}
                type='forward'
                color=''
              />
            </button>
          </div>
        }
        {this.props.scrollLoad && pageNo >= totalPage && <p className={`m-pagination-noMore ${color('subText')} ${font('text')}`}>No More</p>}
      </React.Fragment>
    )
  }
}

Pagination.defaultProps = {
  style: {marginTop: '30px', marginBottom: '30px'},
  language: 'cn',
  totalPage: 0,
  pageNo: 0,
  scrollLoad: false,
  handleChangePage () {
    return new Promise((resolve, reject) => {
      reject()
    })
  }
}

export default Pagination
