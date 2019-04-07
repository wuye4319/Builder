/**
 * @author Alan (曹昌盛)
 * @desc 404页面控制器
 */
import React from 'react'
import PropTypes from 'prop-types'
import './ErrorPage.less'

// const {util} = window.supervar

class ErrorPageCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    changeConfig: PropTypes.func.isRequired
  }
  static defaultProps = {
    changeConfig: () => {
    }
  }

  render () {
    const {config} = this.props
    const {name, key} = config
    return (
      <div
        id={`${name}Ctrl-${key}`}
        className='m-error-ctrl-wrap'
      >
        此页面不可编辑
      </div>
    )
  }
}

export default ErrorPageCtrl
