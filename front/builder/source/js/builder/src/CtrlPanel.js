/* eslint-disable no-unused-vars */
/**
 * @author MG Ding (丁文强)
 * @desc 控制器面板
 */
import React from 'react'
import { createPortal } from 'react-dom'
import CtrlDecorator from './CtrlDecorator'
import ActionList from '../../../../plugin/component/ActionList'
import Header from '../../../../../theme/module/Header/ctrl/Header'
import Footer from '../../../../../theme/module/Footer/ctrl/Footer'
import SlideShow from '../../../../../theme/module/SlideShow/ctrl/SlideShow'
import ImageWithText from '../../../../../theme/module/ImageWithText/ctrl/ImageWithText'
import TopicsDetails from '../../../../../theme/module/TopicsDetails/ctrl/TopicsDetails'
import Products from '../../../../../theme/module/Products/ctrl/Products'
import Cart from '../../../../../theme/module/Cart/ctrl/Cart'
import Topics from '../../../../../theme/module/Topics/ctrl/Topics'
import Blogs from '../../../../../theme/module/Blogs/ctrl/Blogs'
import HomeBlog from '../../../../../theme/module/HomeBlog/ctrl/HomeBlog'
import HomeTopicsModule from '../../../../../theme/module/HomeTopicsModule/ctrl/HomeTopicsModule'
import BlogDetails from '../../../../../theme/module/BlogDetails/ctrl/BlogDetails'
import ErrorPage from '../../../../../theme/module/ErrorPage/ctrl/ErrorPage'
import Search from '../../../../../theme/module/Search/ctrl/Search'
import FeaturedCollection from '../../../../../theme/module/FeaturedCollection/ctrl/FeaturedCollection'
import { moveArrayItem } from '../../../util'
import Section from '../../../../plugin/component/Section'

const ctrl = {
  SlideShow,
  ImageWithText,
  Products,
  Cart,
  Blogs,
  Topics,
  TopicsDetails,
  HomeBlog,
  BlogDetails,
  ErrorPage,
  HomeTopicsModule,
  Search,
  FeaturedCollection
}

export default class CtrlPanel extends React.PureComponent {
  state = {
    activeCtrlKey: ''
  }
  handleActiveCtrlKey = (event, key) => {
    this.setState({activeCtrlKey: key})
  }
  handleHiddenCtrl = () => {
    this.setState({activeCtrlKey: ''})
  }

  renderLayoutModule = (moduleNames) => {
    let moduleArr = []
    moduleNames.forEach(module => {
      let {name, key} = this.props.pageConfig.layout[module]
      moduleArr.push({name, key, icon: module})
    })

    return (
      <ActionList>
        {
          moduleArr.map(ele => (
            <ActionList.Item
              icon={ele.icon}
              title={ele.name}
              key={`${ele.name}-${ele.key}`}
              onClick={this.handleActiveCtrlKey}
            />
          ))
        }
      </ActionList>
    )
  }

  moduleDragStart = () => {
    this.props.changeBuilderState('isModuleDragged', true)
  }

  moduleDrag = (from, to) => {
    const {pageConfig, pageName} = this.props
    const {name, key} = pageConfig.pages[pageName].module[from]
    this.props.getBuilderBridge('dragModule')(from, to, `${name}-${key}`)
  }

  moduleDragEnd = (from, to) => {
    const {pageConfig, pageName} = this.props
    let {module} = pageConfig.pages[pageName]

    if (from >= 0) {
      const {name, key} = module[from]
      module = moveArrayItem(module, from, to)
      if (from !== to) {
        window.myreflux.trigger('configChange', pageConfig, true)
      }

      this.props.getBuilderBridge('dragModule')(-1, -1, `${name}-${key}`)
    }

    this.props.changeBuilderState('isModuleDragged', false)
  }

  render () {
    const {pageConfig, pageName, asideNode, getCtrlDec} = this.props
    const {activeCtrlKey} = this.state

    const homeConfig = pageConfig ? this.cachePageConfig ? this.cachePageConfig.pages[pageName] : pageConfig.pages[pageName] : null
    const ctrls = homeConfig && homeConfig.module ? homeConfig.module.filter(({name}) => !!ctrl[name]) : []

    return (
      <React.Fragment>
        <div className='ctrl-tab'>
          <Section title='General'>
            {
              this.renderLayoutModule(['header', 'footer'])
            }
          </Section>
          <Section title='This page'>
            {
              homeConfig && ctrls.length
                ? (
                  <ActionList
                    draggable
                    dragStart={this.moduleDragStart}
                    dragEnd={this.moduleDragEnd}
                    onChange={this.moduleDrag}
                  >
                    {homeConfig.module.map((moduleConfig) => {
                      const {name, key} = moduleConfig
                      // console.log('moduleConfig',moduleConfig)
                      let targetCtrl = ctrl[name]
                      return targetCtrl
                        ? (
                          <ActionList.Item
                            title={`${name}`}
                            key={`${name}-${key}`}
                            onClick={this.handleActiveCtrlKey}
                            icon='list'
                          />
                        )
                        : null
                    })}
                  </ActionList>
                )
                : <p style={{textAlign: 'center', color: '#999999'}}>The page doesn't have sections to be edited.</p>
            }
          </Section>
        </div>
        {!!asideNode && createPortal(
          <CtrlDecorator
            ref={getCtrlDec}
            pageConfig={pageConfig}
            activeCtrlKey={activeCtrlKey}
            handleHiddenCtrl={this.handleHiddenCtrl}
          >
            <Header target='layout.header' config={pageConfig.layout.header}/>
            {homeConfig
              ? (
                homeConfig.module.map((moduleConfig) => {
                  const {name, key} = moduleConfig
                  let targetCtrl = ctrl[name]
                  return targetCtrl
                    ? React.createElement(
                      targetCtrl, {
                        ...this.props,
                        config: moduleConfig,
                        target: `pages.${pageName}.module`,
                        key: `${name}-${key}`
                      }
                    )
                    : null
                })
              )
              : <div style={{fontSize: 18, textAlign: 'center', padding: '40px 0'}}>Loading...</div>
            }
            <Footer target='layout.footer' config={pageConfig.layout.footer}/>
          </CtrlDecorator>,
          asideNode
        )}

      </React.Fragment>

    )
  }
}
