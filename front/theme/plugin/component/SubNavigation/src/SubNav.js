import './SubNav.less'
import React from 'react'
import Icon from '../../Icon'
import Link from '../../Link/index'

const classPrefix = 'bc-subnav'
class SubNavigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    // console.log(window.location)
  }
  render () {
    const {route} = this.props
    return (
      <div className={`${classPrefix}-container`}>
        <Link href={route[0].href}>{route[0].name}</Link>
        <Link href='' className='arr' >
          <Icon type='forward' />
        </Link>
        <Link href={route[1].href}>{route[1].name}</Link>
      </div>
    )
  }
}

export default SubNavigation
