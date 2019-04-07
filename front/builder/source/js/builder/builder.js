/* eslint-disable no-unused-vars */
/**
 * @author MG Ding (丁文强)
 * @desc builder入口
 */

/**@routerMap: builder路由配置
 * title:builder中下拉选择的页面标题
 * name: 页面模块名
 * path: 页面路径
 * sort: 页面的排序,数值越小越靠前，-1表示在builder中不显示
 * */

import './src/builder.less'
import React from 'react'
import ReactDOM from 'react-dom'
import myreflux from '../../../plugin/reactcommon/myreflux'
import BuilderBody from './src/BuilderBody'
import BuilderAside from './src/BuilderAside'
import Message from '../../../plugin/component/Message'
import { getPageConfig, updatePageConfig } from '../../service/koa'
import { getDefaultId } from '../../service/api'
import { copyJson, getConstructorName, setClass, fetchLite } from '../../../source/util'

const routerMap = require('../../../pageRouter.json')
window.myreflux = myreflux
window.shopBuilder = true

const shopName = 'default'

class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      title: 'Home page',
      pagePath: '/home/',
      pageHref: '/home/',
      pageName: 'home',
      pageOrigin: '',
      pageConfig: null,
      pageMode: 0, // 0 桌面版 1 移动版 2 全屏
      pageState: 0, // 0 加载中 1 加载完成 -1 页面错误
      isModuleDragged: false,
      defaultId: {}
    }
  }

  /** 获取builderBridge内的方法 **/
  getBuilderBridge = (fnName) => {
    try {
      const {builderBridge} = this.pageContext.contentWindow
      return builderBridge[fnName] || (() => {
      })
    } catch (err) {
      console.error('未嵌入正确页面。')
      return () => {
      }
    }
  }

  /** config更新 **/
  configChange = (pageConfig, addCache) => {
    pageConfig = pageConfig || this.state.pageConfig
    this.emmitConfig2Page(pageConfig)
    addCache && this.builderAside.addConfigCache(pageConfig)
    this.setState({pageConfig: copyJson(pageConfig)})
  }

  /** 把config推到页面 **/
  emmitConfig2Page = (pageConfig = this.state.pageConfig) => {
    let {pageState} = this.state
    if (pageState === 1 && pageConfig) this.getBuilderBridge('updateConfig')(pageConfig)
  }

  /** pushThemeConfig **/
  // pushThemeConfig = (pageConfig, addCache) => {
  //   this.getBuilderBridge('updateThemeColor')(pageConfig.theme.colors)
  //   addCache && this.builderAside.addConfigCache(pageConfig)
  //   this.setState({pageConfig: copyJson(pageConfig)})
  // }

  /** 预览页加载成功回调 **/
  handlePageLoad = () => {
    try {
      const pageWindow = this.pageContext.contentWindow
      if (pageWindow && pageWindow.builderBridge) {
        this.setState({pageState: 1}, this.emmitConfig2Page)
        pageWindow.onunload = this.handlePageUnload
      } else {
        this.setState({pageState: -1})
      }
    } catch (e) {
      this.setState({pageState: -1})
    }
  }

  /** 预览页卸载回调 **/
  handlePageUnload = () => {
    this.setState({pageState: 0})
  }

  /** 预览页加载失败回调 **/
  handlePageError = () => {
    this.setState({pageState: -1})
  }

  /** 预览页滚动至目标元素 **/
  scrollToModule = (id) => {
    this.getBuilderBridge('scrollToModule')(id)
  }

  /** 获取页面配置 **/
  getPageConfig = () => {
    getPageConfig(shopName).then(data => {
      this.setState(() => {
        return {pageConfig: data}
      }, this.configChange)
    })
  }

  // getPageConfig = () => {
  //   const {pageConfig} = this.state
  //
  //   if (pageConfig) {
  //     this.configChange(pageConfig)
  //   } else {
  //     this.configChange(initConfig, true)
  //   }
  // }

  /** 保存 **/
  savePageConfig = () => {
    updatePageConfig(shopName, this.state.pageConfig).then(data => {
      Message.success('Save success')
    }).catch(() => {
      Message.error('Save failed')
    })
  }

  /** 更新预览模式 **/
  handleChangePageMode = (m) => {
    const {pageMode} = this.state
    if (pageMode !== m) {
      this.setState({pageMode: m})
    }
  }

  /** 切换页面 **/
  handleChangePage = (value) => {
    for (const item of routerMap) {
      const {name, path, href, title} = item
      if (title === value) {
        this.closeCtrlDec()
        this.setState({
          title,
          pagePath: path || `/${name}/`,
          pageName: name,
          pageHref: href || path || `/${name}/`
        })
        break
      }
    }
  }

  changePageByHref = (href) => {
    let a = document.createElement('a')
    a.href = href
    let flag = false

    for (const item of routerMap) {
      const {path, name, title} = item
      if (path.match(/[^/](.*)[^/]/g)[0] === a.pathname.match(/[^/](.*)[^/]/g)[0]) {
        flag = true
        this.closeCtrlDec()
        this.setState({
          title,
          pagePath: path,
          pageName: name,
          pageHref: `${path}${a.search}`
        })
        break
      }
    }
    return flag
  }

  /** 获取预览页ref **/
  getPageContext = (ref) => {
    this.pageContext = ref
  }

  /** 获取控制器ref **/
  getCtrlDec = (ref) => {
    this.ctrlDec = ref
  }

  /** 获取边栏ref **/
  getBuilderAside = (ref) => {
    this.builderAside = ref
  }

  /** 隐藏展开的控制器 **/
  closeCtrlDec = () => {
    try {
      this.ctrlDec.props.activeCtrlKey && this.ctrlDec.closePanel()
    } catch (e) {
      console.error(e)
    }
  }

  /** 修改状态,提供给子组件 **/
  changeBuilderState = (name, value) => {
    if (typeof name === 'string') {
      this.setState({[name]: value})
    } else if (getConstructorName(name) === 'Object') {
      this.setState(name)
    }
  }
  getDefaultId = () => {
    getDefaultId().then((data) => {
      console.log(data)
    })
  }

  componentDidMount () {
    /** 监听config修改 **/
    myreflux.on('configChange', this.configChange)
    this.getPageConfig()
    // this.getDefaultId()

  }

  render () {
    const {pageState, pageConfig, pageMode, pagePath, title, pageHref, pageName, pageOrigin, theme, cacheIndex, isModuleDragged} = this.state

    return (
      <div className={setClass({
        'builder': 1,
        'mobileLayout': pageMode === 1,
        'fullScreenLayout': pageMode === 2
      })}>
        <BuilderAside
          ref={this.getBuilderAside}
          pageState={pageState}
          pageMode={pageMode}
          pageConfig={pageConfig}
          pageName={pageName}
          theme={theme}
          cacheIndex={cacheIndex}
          configChange={this.configChange}
          getBuilderBridge={this.getBuilderBridge}
          getCtrlDec={this.getCtrlDec}
          changeBuilderState={this.changeBuilderState}
        />
        <BuilderBody
          pageState={pageState}
          pageMode={pageMode}
          pagePath={pagePath}
          pageHref={pageHref}
          pageName={pageName}
          title={title}
          pageOrigin={pageOrigin}
          routerMap={routerMap}
          isModuleDragged={isModuleDragged}
          handlePageLoad={this.handlePageLoad}
          handlePageError={this.handlePageError}
          handleChangePageMode={this.handleChangePageMode}
          handleChangePage={this.handleChangePage}
          getPageContext={this.getPageContext}
          savePageConfig={this.savePageConfig}
        />
      </div>
    )
  }
}

window.builderBridge = (instance => ({
  changePage: (href) => {
    return instance.changePageByHref(href)
  },
  iFrameClick: (e) => {
    window.myreflux.trigger('iFrameClick', e)
  }
}))(ReactDOM.render(<Content/>, document.getElementById('container')))
