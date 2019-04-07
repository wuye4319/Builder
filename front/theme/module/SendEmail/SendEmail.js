/**
 * @author Alan (曹昌盛)
 * @desc 注册模块
 */
import './SendEmail.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
import { color, font } from '../../source/util'
import Input from './../../plugin/component/Input'

class SendEmail extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  state = {
    eMail: '',
    checkEmail: true,
    waringInfo: ''
  }
  clearValue = () => {
    this.setState(() => ({
      eMail: ''
    }))
  }
  changeValue = (e) => {
    const value = e.target.value
    this.setState(() => ({
      eMail: value
    }))
  }
  sendMail = () => {
    const {eMail, checkEmail} = this.state
    if (!eMail) {
      this.setState(() => ({
        waringInfo: '请输入邮箱',
        checkEmail: false
      }))
    } else if (!checkEmail) {
      this.setState(() => ({
        waringInfo: '请输入正确的邮箱格式'
      }))
    } else {
      Link.goTo('/email_result')
    }
  }
  // 校验邮箱
  handleCheckEmail = () => {
    const {eMail} = this.state
    if (!eMail) {
      this.setState(() => ({
        checkEmail: false,
        waringInfo: '请输入邮箱'
      }))
      return false
    }
    const emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g
    const result = emailReg.test(eMail)
    if (!result) {
      this.setState(() => ({
        checkEmail: false,
        waringInfo: '请输入正确的邮箱格式'
      }))
    } else {
      this.setState(() => ({
        checkEmail: true,
        waringInfo: ''
      }))
    }
  }

  render () {
    const {eMail, waringInfo, checkEmail} = this.state
    return (
      <div className={`m-send-email-wrap  l-centerBlock`}>
        <div className='send-email-box'>
          <h2 className={`title ${font('title')} ${color('title')}`}>RESET YOUR PASSWORD</h2>
          <p className={` ${font('text')} ${color('text')}`}>We will send you an email to reset your password.</p>
          <div className={`warn-info ${font('f-secTitle')} ${color('title')}`}>{waringInfo}</div>
          <h3 className={`${font('secTitle')} ${color('title')}`}>EMAIL ADDRESS</h3>
          <Input
            type='text'
            placeholder='EMAIL ADDRESS'
            className={checkEmail ? '' : 'warning'}
            value={eMail}
            onClear={this.clearValue}
            onChange={this.changeValue}
            onBlur={this.handleCheckEmail}
          />
          <Button onClick={this.sendMail}>SUBMIT</Button>
          <span className='or'>OR</span>
          <div className='cancel'>
            <Link href='/login' className={`${font('text')} ${color('subText')}`}>Cancel</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default SendEmail
