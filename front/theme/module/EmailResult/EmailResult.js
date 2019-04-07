/**
 * @author Alan (曹昌盛)
 * @desc 邮件发送结果
 */
import './EmailResult.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
import Icon from './../../plugin/component/Icon'
import { color, font } from '../../source/util'
import Message from './../../plugin/component/Message'

class EmailResult extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  sendAgain = () => {
    Message.success('再发一次邮件')
  }

  render () {
    return (
      <div className={`m-email-result-wrap  l-centerBlock2`}>
        <div className='email-result-box'>
          <Icon type='yes-filling' />
          <h2 className={`${font('title')} ${color('title')}`}>Email sent successfully</h2>
          <p className={`desc ${font('text')} ${color('text')}`}>Your request to reset your password has been received
            We will shortly email you the details on how to reset your password
            Please follow the instructions on this email</p>
          <p className={`tips ${font('text')} ${color('text')}`}>Didn't receive email?</p>
          <Button onClick={this.sendAgain}>SEND AGAIN</Button>
          <div className='toLogin'>
            <Link href='/login'>
              <span className={`${color('title')} ${font('secTitle')}`}>Login</span>
              <Icon type='forward' />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default EmailResult
