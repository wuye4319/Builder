/**
 * @author MG Ding (丁文强)
 * @desc 页面wrapper
 * @PageContent 页面内容
 * @initialConfig config初始值
 */

import React from 'react'
import ReactDOM from 'react-dom'
import '../source/theme.less'
import Layout from '../source/Layout'
import builderBridge from '../source/builderBrideg'
// import { copyJson, moveArrayItem, getDomPosition, fetchLite } from '../util'
import { getUserInfo, getCartSize } from '../source/service/page'

const {copyJson, moveArrayItem, getDomPosition, fetchLite} = window.supervar.util

/**
 * userInfo: {
        "login":1
        "member_id": "81E6Em"
        "account_id": "",
        "name": "river",
        "avatar": "",
        "first_name": "river",
        "last_name": "",
        "gender": "0",
        "email": "346001@qq.com",
        "phone": "",
        "note": "",
        "status": 1,
        "is_tax_exempt": 0,
        "is_reg": 1,
        "is_verify": 0,
        "is_subscribe": 0,
        "reg_ip": "192.168.99.1",
        "reg_at": "2018-09-20 03:16:49 (GMT+8)",
        "created_at": "2018-09-20 03:16:49 (GMT+8)",
        "updated_at": "2018-09-20 03:16:49 (GMT+8)"fO
      }
 *
 */

window.editMod = !!window.parent.builderBridge

window.wrapper = (PageContent, initialConfig) => {
  class Wrapper extends React.Component {
    constructor () {
      super()
      this.state = {
        pageMode: this.getPageMode(), // 0 桌面版 1 移动版
        dragFrom: -1,
        dragTo: -1,
        config: window.editMod
          ? null
          : initialConfig || window.staticinitdata,
        userInfo: {
          login: 0 // 0表示未登录，1表示已登录
        },
        cartInfo: {
          size: 0
        }
      }
    }

    updateConfig (pageConfig) {
      let {pages, ...rest} = copyJson(pageConfig)
      this.setState({
        config: {
          page: pages[window.location.pathname.match(/[^/](.*)[^/]/g)[0]] || null,
          ...rest
        }
      })
    }

    onWindowResize = (e) => {
      const currentMode = this.getPageMode(e)
      const {pageMode} = this.state
      if (currentMode !== pageMode) {
        this.setState({pageMode: currentMode})
      }
    }

    getPageMode = (e) => {
      const {clientWidth} = e ? e.target.document.body : window.document.body
      return clientWidth > 749 ? 0 : 1
    }

    dragModule = (dragFrom, dragTo, id) => {
      this.setState({dragFrom, dragTo}, () => {
        let ele = document.getElementById(id)
        if (ele) {
          let top = getDomPosition(ele).top - (dragFrom === -1 ? 0 : 260)
          window.scroll(0, top)
        }
      })
    }

    getUserInfo = () => {
      fetchLite(getUserInfo, {
        done: (res) => {
          this.setState({userInfo: {login: 1, ...res.data}})
        },
        fail: false,
        error: false
      })
    }

    getCartInfo = () => {
      fetchLite(getCartSize, {
        done: (res) => {
          this.setState({cartInfo: {size: res.data.cart_size || 0}})
        },
        fail: false,
        error: false
      })
    }

    componentDidMount () {
      window.addEventListener('resize', this.onWindowResize, false)
      // this.getUserInfo()
      // this.getCartInfo()
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.onWindowResize)
    }

    render () {
      const {config, pageMode, dragFrom, dragTo, userInfo, cartInfo} = this.state

      const renderPage = () => {
        const {page, layout} = config

        let _page = null

        if (dragFrom !== dragTo) {
          _page = copyJson(page)
          _page.module = moveArrayItem(_page.module, dragFrom, dragTo)
        }
        return (
          <Layout
            config={layout}
            pageMode={pageMode}
            userCenter={page.userCenter}
            userInfo={userInfo}
            cartInfo={cartInfo}
          >
            <PageContent
              {...this.props}
              userInfo={userInfo}
              cartInfo={cartInfo}
              config={dragFrom !== dragTo ? _page : page}
              pageMode={pageMode}
              reloadCartInfo={this.getCartInfo}
            />
          </Layout>
        )
      }

      const renderLoading = () => {
        // return <div>Loading...</div>
        return null
      }

      return config ? renderPage() : renderLoading()
    }
  }

  let pageInstant = ReactDOM.render(
    <Wrapper/>,
    document.getElementById('container')
  )

  if (window.editMod) {
    window.builderBridge = builderBridge(pageInstant)

    // 解决builder获取不到iFame触发点击的问题
    document.body.addEventListener('click', (e) => {
      try {
        window.parent.builderBridge.iFrameClick(e)
      } catch (e) { }
    }, false)
  } else {
    let res = initialConfig || window.staticinitdata.page
    let title = res.title || res.name

    if (title) {
      document.title = title
    }
  }
}
