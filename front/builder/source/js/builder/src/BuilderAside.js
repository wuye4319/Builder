/**
 * @author MG Ding (丁文强)
 * @desc builder右侧
 */

import './BuilderAside.less'
import React from 'react'
import CtrlPanel from './CtrlPanel'
import CtrlThemePanel from './CtrlThemePanel'
import Button from '../../../../plugin/component/Button'
import Tabs from '../../../../plugin/component/Tabs'

let cachePageConfig = []
let cacheIndex = 0

class BuilderAside extends React.Component {
  configRollback = (rollback) => {
    let pageConfig = null

    if (rollback === 1) {
      pageConfig = cachePageConfig[cacheIndex + 1]
    } else if (rollback === -1) {
      pageConfig = cachePageConfig[cacheIndex - 1]
    }

    this.props.configChange(pageConfig)
    this.addConfigCache(pageConfig, rollback)
  }

  addConfigCache = (pageConfig, rollback) => {
    if (rollback === 1) {
      cacheIndex += 1
    } else if (rollback === -1) {
      cacheIndex -= 1
    } else {
      if (cacheIndex !== 0) {
        cachePageConfig = cachePageConfig.slice(cacheIndex)
        cacheIndex = 0
      }
      cachePageConfig.unshift(pageConfig)
      cachePageConfig.splice(11)
    }
  }

  getAsideNode = (el) => {
    this.asideNode = el
  }

  handleChangeComplete = (color, target) => {
    const {pageConfig} = this.props
    pageConfig.theme.colors[target].value = color
    window.myreflux.trigger('configChange', pageConfig, true)
  }

  confirmLeave = () => {
    let bool = window.confirm('Unsaved data will be lost. Do you want to leave?')
    if (bool) {
      window.location.href = 'http://buckydrop.test.com/en/admin/online_store/store/themes/'
    }
  }

  render () {
    const {pageConfig, pageState, pageName, getCtrlDec, changeBuilderState, getBuilderBridge} = this.props

    return (
      <aside className='builder-aside'>
        <div className='builder-aside-inner'>
          <div className='aside-main' ref={this.getAsideNode}>
            <header>
              <a href='javascript:void(0)' className='logo' onClick={this.confirmLeave}/>
              <div className='shopName'>Simple</div>
            </header>
            {pageConfig && pageState !== -1 && (
              <Tabs defaultActiveKey='1'>
                <Tabs.Pane key='1' tab='Sections'>
                  <CtrlPanel
                    getCtrlDec={getCtrlDec}
                    pageConfig={pageConfig}
                    pageName={pageName}
                    asideNode={this.asideNode}
                    changeBuilderState={changeBuilderState}
                    getBuilderBridge={getBuilderBridge}
                  />
                </Tabs.Pane>
                <Tabs.Pane key='2' tab='Theme settings'>
                  <CtrlThemePanel
                    pageConfig={pageConfig}
                    getCtrlDec={getCtrlDec}
                    asideNode={this.asideNode}
                    getBuilderBridge={getBuilderBridge}
                    changeBuilderState={changeBuilderState}
                  />
                </Tabs.Pane>
              </Tabs>
            )}
          </div>

          <div className='aside-bottom'>

            <Button.Group className='aside-bottom-rollback'>
              <Button
                type='sub'
                icon='return'
                onClick={this.configRollback.bind(this, 1)}
                disabled={cacheIndex >= cachePageConfig.length - 1 || cachePageConfig.length <= 1}
                title='return'
              />

              <Button
                type='sub'
                icon='forward'
                onClick={this.configRollback.bind(this, -1)}
                disabled={cacheIndex < 1}
                title='forward'
              />
            </Button.Group>

            {/*
          <button onClick={() => {
              this.scrollToModule('header-1')
            }}>
              滚动到头部
            </button>
            <button onClick={() => {
              this.scrollToModule('productsList-1')
            }}>
              productList
            </button>
            <button onClick={() => {
              this.scrollToModule('footer-1')
            }}>
              滚动到底部
            </button> */}
          </div>
        </div>
      </aside>
    )
  }
}

export default BuilderAside
