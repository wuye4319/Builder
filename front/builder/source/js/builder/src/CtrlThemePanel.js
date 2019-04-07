/* eslint-disable no-unused-vars */
/**
 * @author MG Ding (丁文强)
 * @desc 控制器面板
 */
import React from 'react'
import { createPortal } from 'react-dom'
import CtrlDecorator from './CtrlDecorator'
import ActionList from '../../../../plugin/component/ActionList'

import ColorCtrl from '../../../../../theme/module/ThemeCtrl/Colors'
import FaviconCtrl from '../../../../../theme/module/ThemeCtrl/Favicon'
import { moveArrayItem } from '../../../util'

const ctrl = {
  Colors: ColorCtrl,
  Favicon: FaviconCtrl
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
    const {activeCtrlKey} = this.state
    const {pageConfig, asideNode, getCtrlDec} = this.props
    const ctrlModules = Object.values(pageConfig.theme)

    return (
      <React.Fragment>
        <div className='ctrl-tab'>
          {
            (ctrlModules.length > 0) &&
            <ActionList
              draggable
              dragStart={this.moduleDragStart}
              dragEnd={this.moduleDragEnd}
              onChange={this.moduleDrag}
            >
              {
                ctrlModules.map(({name, key}) => (
                  <ActionList.Item
                    icon='list'
                    title={name}
                    key={`${name}-${key}`}
                    onClick={this.handleActiveCtrlKey}
                  />
                ))
              }
            </ActionList>
          }
          <div className='theme-version-info'>
            <p>
              <span>{`【${pageConfig.name}】`}</span>
              <span>{`【${pageConfig.version}】`}</span>
            </p>
            <p>{`Design and support by ${pageConfig.author}`}</p>
          </div>
        </div>
        {!!asideNode && createPortal(
          <CtrlDecorator
            ref={getCtrlDec}
            pageConfig={pageConfig}
            activeCtrlKey={activeCtrlKey}
            handleHiddenCtrl={this.handleHiddenCtrl}
          >
            {
              ctrlModules.map(({name, key, data}) => {
                return (
                  React.createElement(
                    ctrl[name],
                    {
                      ...this.props,
                      config: {key, name, data},
                      target: `theme.${name}`,
                      key
                    }
                  )
                )
              })
            }
          </CtrlDecorator>,
          asideNode
        )}
      </React.Fragment>

    )
  }
}
