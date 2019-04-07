/**
 * @author Alan (曹昌盛)
 * @desc 404模块
 */
import './ErrorPage.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
import { color, font } from '../../source/util'
class ErrorPage extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  goHome = () => {
    Link.goTo('/home')
  }
  render () {
    return (
      <div className={`m-error-wrap l-error-wrap l-centerBlock`}>
        <i className='circle' />
        <h2 className={`${font('title')} ${color('title')}`}>Page Not Found</h2>
        <p className={`${font('subTitle')} ${color('text')}`}>The page you are looking for does not exist.</p>
        <Button type='ghost' onClick={this.goHome}>Back to HomePage</Button>
      </div>
    )
  }
}
export default ErrorPage
