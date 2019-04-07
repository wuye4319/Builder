/**
 * @author MG Ding (丁文强)
 * @desc SlideShow 首页幻灯片
 */
/* eslint-disable standard/computed-property-even-spacing */
import './SlideShow.less'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../plugin/component/Icon'
import Link from '../../plugin/component/Link'

const {setClass, font} = window.supervar.util

class SlideShow extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  static classPrefix = 'm-slideShow'
  state = {
    active: 0,
    lastActive: 0,
    slideTo: '' // 'next':滑到下一页 'prev':滑到上一页 '':不滑动
  }
  loopTimer = null
  isAnni = false
  changeActive = (n, slideTo) => {
    let {active} = this.state
    let {interval} = this.props.config
    if (active !== n && !this.isAnni) {
      this.isAnni = true
      clearTimeout(this.loopTimer)
      this.setState(({active}) => ({
        lastActive: active,
        active: n,
        slideTo: slideTo || (n > active ? 'next' : 'prev')
      }), () => {
        setTimeout(() => {
          this.isAnni = false
          this.setState({slideTo: ''})
        }, 1020)
        interval && this.loop()
      })
    }
  }
  handleActiveNav = (n) => {
    this.changeActive(n)
  }
  handlePrev = () => {
    let {active} = this.state
    let {data} = this.props.config
    let max = data.length - 1
    let target = active - 1
    if (target < 0) {
      this.changeActive(max, 'prev')
    } else {
      this.changeActive(target, 'prev')
    }
  }
  handleNext = () => {
    let {active} = this.state
    let {data} = this.props.config
    let max = data.length - 1
    let target = active + 1
    if (target > max) {
      this.changeActive(0, 'next')
    } else {
      this.changeActive(target, 'next')
    }
  }
  loop = (start) => {
    const {interval, data} = this.props.config
    if ((interval || start) && data && data.length > 1) {
      clearTimeout(this.loopTimer)
      this.loopTimer = setTimeout(() => {
        this.handleNext()
        this.loop()
      }, interval * 1000)
    }
  }
  componentWillUpdate = ({config: nextConfig}) => {
    const {config} = this.props

    if (config.interval && !nextConfig.interval) {
      clearTimeout(this.loopTimer)
    } else if (!config.interval && nextConfig.interval) {
      this.loop(true)
    }
  }

  componentDidMount () {
    this.props.config.interval && this.loop()
  }

  render () {
    const {classPrefix} = SlideShow
    const {lastActive, active, slideTo} = this.state
    const {config} = this.props
    const {data, height, slideType, arrowStyle, navStyle, fontSize, maskOpacity, padding} = config

    if (!data || !data.length) return null

    return (
      <div
        className={`${classPrefix} ${setClass({
          [`${classPrefix}-height-${height}`]: height === 'low' || height === 'high',
          [`${classPrefix}-arrowStyle-${arrowStyle}`]: arrowStyle,
          [`${classPrefix}-navStyle-${navStyle}`]: navStyle,
          [`${classPrefix}-fontSize-${fontSize}`]: fontSize === 'large' || fontSize === 'small',
          'l-centerBlock': padding
        })}`}
      >
        <div
          className={`${classPrefix}-listWrapper ${setClass({
            [`${classPrefix}-slideType-${slideType}`]: slideType
          })}`}
        >
          <div
            className={`${classPrefix}-list ${setClass({
              [`${classPrefix}-list-slideTo-${slideTo}`]: slideTo
            })}`}
          >
            {data.map(({img, title, content, link, imgAlt}, index) => (
              active === index || lastActive === index
                ? (
                  <Link
                    href={link || 'javascript:;'}
                    key={index}
                    className={setClass({
                      [`${classPrefix}-item`]: 1,
                      lastActive: lastActive === index && active !== index,
                      active: active === index
                    })}
                    style={{cursor: link ? 'pointer' : 'default'}}
                    title={imgAlt}
                  >
                    <div className={`${classPrefix}-imgContainer`} style={{backgroundImage: `url('${img}')`}}/>
                    <div className={`${classPrefix}-mask`} style={{opacity: maskOpacity}}/>
                    <div className={`${classPrefix}-overlay`}>
                      <div>
                        {title && <h2 className={font('title')}><span>{title}</span></h2>}
                        {content &&
                        <p className={font('text')}><span>A kind of feeling that I can never give up.A kind of feeling that I can never give up.</span>
                        </p>}
                      </div>
                    </div>
                  </Link>
                )
                : null
            ))}
          </div>
        </div>

        {data.length > 1 && (
          [
            <ol className={`${classPrefix}-nav`} key='0'>
              {data.map((_, index) => (
                <li
                  key={index}
                  className={setClass({'active': active === index})}
                  onClick={this.handleActiveNav.bind(this, index)}
                />
              ))}
            </ol>,
            <button
              key='1'
              className={`${classPrefix}-btn ${classPrefix}-prev`}
              onClick={this.handlePrev}
            >
              <Icon type='back'/>
            </button>,
            <button
              key='2'
              className={`${classPrefix}-btn ${classPrefix}-next`}
              onClick={this.handleNext}
            >
              <Icon type='forward'/>
            </button>
          ]
        )}
      </div>
    )
  }
}

export default SlideShow
