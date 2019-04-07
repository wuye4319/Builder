/**
 * @author MG Ding (丁文强)
 * @desc 用户中心边栏
 */
import './UserAside.less'
import React from 'react'
import PropTypes from 'prop-types'
// import Icon from '../../plugin/component/Icon'
import Link from '../../plugin/component/Link'
import {setClass, color, font} from '../../source/util'

class UserAside extends React.Component {
  static propTypes = {
    // config: PropTypes.object.isRequired
  }
  static classPrefix = 'm-userAside'
  static pageMap = [
    {name: 'Order History', key: 'orders', href: '/orders/'},
    {name: 'Account information', key: 'account', href: '/account_information/'},
    {name: 'Recipient address', key: 'address', href: '/address/'}
  ]
  state = {

  }

  render () {
    const {classPrefix, pageMap} = UserAside
    const {type, children} = this.props
    return (
      <React.Fragment>
        <div className={`${classPrefix}-header`}>
          <h2 className={`${font('title')}`}>Hello, User</h2>
        </div>
        <div className={`${classPrefix}-body l-centerBlock2`}>
          <div className={`${classPrefix}-aside`}>
            <div className={`${color.border('border')}`}>
              {pageMap.map(({name, key, href}) => (
                <Link
                  key={key}
                  href={href}
                  className={`${setClass({active: type === key})} ${color.border('border')} ${color('text')}`}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
          <div className={`${classPrefix}-main`}>
            {children}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default UserAside
