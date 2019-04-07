/**
 * @author MG Ding (丁文强)
 * @desc 控制器装饰器
 */
import React from 'react'
import Icon from '../../../../plugin/component/Icon'
import { copyJson, getConstructorName, setClass } from '../../../../source/util'

/**
 * 对比配置：
 * 两个配置的name值相同，key值相同，其他属性数量和属性名相同时 返回true
 * 其他情况返回false
 * **/
const compareConfig = (originConfig, resultConfig) => {
  const {name: oName, key: oKey, ...oRest} = originConfig
  const {name: rName, key: rKey, ...rRest} = resultConfig
  const keys2string = (obj) => Object.keys(obj).sort((n, m) => n - m).join('.')
  return oName === rName && oKey === rKey && keys2string(oRest) === keys2string(rRest)
}

/**
 * 控制器错误边界
 * **/
class CtrlErrorBoundary extends React.Component {
  state = {hasError: false}

  componentDidCatch () {
    this.setState({hasError: true})
  }

  renderWrapper = (content) => {
    const {ctrlName, closePanel} = this.props

    return (
      <React.Fragment>
        <div className='ctrl-panel-header'>
          <Icon type='back' onClick={closePanel}/>
          <span>{ctrlName}</span>
        </div>
        {content}
      </React.Fragment>
    )
  }

  render () {
    const {ctrlName, children} = this.props
    return this.renderWrapper(this.state.hasError
      ? <div style={{background: '#fce4ea', padding: 10}}>{`Ctrl [${ctrlName}] error.`}</div>
      : children
    )
  }
}

export default class CtrlDecorator extends React.Component {
  fadeIn = false
  fadeOut = false
  // timerFadeIn = null // 入场动画timer
  timerFadeOut = null // 出场动画timer
  state = {
    n: 0
  }

  targetConfig (target, config) {
    let res = this.props.pageConfig
    let cachePropsName = ''
    for (let item of target.split('.')) {
      cachePropsName = item
      res = res[item]
    }
    if (cachePropsName === 'module' && getConstructorName(res) === 'Array') {
      let {name, key} = config
      for (let item of res) {
        if (name === item.name && key === item.key) {
          res = item
          break
        }
      }
    }
    return res
  }

  changePageConfig (target, originConfig, resultConfig, addCache) {
    try {
      if (compareConfig(originConfig, resultConfig)) {
        let {pageConfig} = this.props
        // eslint-disable-next-line no-unused-vars
        let targetConfig = this.targetConfig(target, originConfig)
        targetConfig = resultConfig
        window.myreflux.trigger('configChange', pageConfig, addCache)
      }
    } catch (err) {
      console.error(err)
    }
  }

  cacheConfig = () => {
    window.myreflux.trigger('configChange', null, true)
  }

  createChild = (child) => {
    if (child && child.props.config) {
      const {target, config} = child.props
      const originConfig = copyJson(config)
      const changeConfig = (resultConfig, addCache) => {
        this.changePageConfig(target, originConfig, resultConfig, addCache)
      }
      return `${config.name}-${config.key}` === this.props.activeCtrlKey
        ? (
          <CtrlErrorBoundary
            ctrlName={config.name}
            closePanel={this.closePanel}
          >
            <div className='ctrl-panel-body'>
              {React.cloneElement(child, {...child.props, changeConfig, cacheConfig: this.cacheConfig})}
            </div>
          </CtrlErrorBoundary>
        )
        : null
    } else {
      return child
    }
  }

  removeFadeIn = () => {
    this.fadeIn = false
    this.myRender()
  }
  removeFadeOut = () => {
    this.fadeOut = false
    this.myRender()
    this.props.handleHiddenCtrl && this.props.handleHiddenCtrl()
  }
  closePanel = () => {
    this.fadeOut = true
    this.removeFadeIn()
    clearTimeout(this.timerFadeOut)
    this.timerFadeOut = setTimeout(this.removeFadeOut, 200)
  }
  myRender = () => {
    this.setState({n: Date.now()})
  }

  componentWillUpdate (nextProps) {
    const {props} = this
    if (nextProps.activeCtrlKey && !props.activeCtrlKey) {
      this.fadeIn = true
    }
  }

  render () {
    const {fadeIn, fadeOut} = this
    return (
      <div className={setClass({
        'ctrl-panel': 1,
        'ctrl-panel-fadeIn': fadeIn,
        'ctrl-panel-fadeOut': fadeOut
      })}>
        {React.Children.map(this.props.children, this.createChild)}
      </div>
    )
  }
}
