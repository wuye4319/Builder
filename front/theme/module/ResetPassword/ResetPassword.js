/**
 * @author Alan (曹昌盛)
 * @desc 重置密码
 */
import './ResetPassword.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
import Input from './../../plugin/component/Input'
import Message from './../../plugin/component/Message'
import { color, font } from '../../source/util'
class ResetPassword extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  state = {
    firstPassword: '',
    confirmPassword: '',
    waringInfo: '',
    checkFirstPassword: true,
    checkConfirmPassword: true
  }
  clearValue = (key) => {
    this.setState(() => ({
      [key]: ''
    }))
  }
  changeValue = (key, e) => {
    const value = e.target.value
    this.setState(() => ({
      [key]: value
    }))
  }
  // 校验密码
  handleCheckFirstPassword = () => {
    const {firstPassword} = this.state
    if (!firstPassword) {
      this.setState(() => ({
        checkFirstPassword: false,
        waringInfo: '密码不能为空'
      }))
      return false
    }
    const passwordReg = /^[0-9a-zA-Z]{6,20}$/g
    const result = passwordReg.test(firstPassword)
    if (!result) {
      this.setState(() => ({
        checkFirstPassword: false,
        waringInfo: '6-20个字符，字母和数字组合'
      }))
    } else {
      this.setState(() => ({
        checkFirstPassword: true,
        waringInfo: ''
      }))
    }
  }
  // 校验确认密码
  handleCheckConfirmPassword = () => {
    const {firstPassword, confirmPassword} = this.state
    if (!confirmPassword) {
      this.setState(() => ({
        checkConfirmPassword: false,
        waringInfo: '确认密码不能为空'
      }))
      return false
    }
    if (firstPassword !== confirmPassword) {
      this.setState(() => ({
        checkConfirmPassword: false,
        waringInfo: '两次输入的密码不一致'
      }))
    } else {
      this.setState(() => ({
        checkConfirmPassword: true,
        waringInfo: ''
      }))
    }
  }
  // 重置
  reset = () => {
    const {firstPassword, checkFirstPassword, confirmPassword, checkConfirmPassword} = this.state
    if (!firstPassword) {
      this.setState(() => ({
        waringInfo: '密码不能为空',
        checkFirstPassword: false
      }))
    } else if (!checkFirstPassword) {
      this.setState(() => ({
        waringInfo: '请输入正确的密码格式'
      }))
    } else if (!confirmPassword) {
      this.setState(() => ({
        waringInfo: '确认密码不能为空',
        checkFirstPassword: false
      }))
    } else if (!checkConfirmPassword) {
      this.setState(() => ({
        waringInfo: '两次输入的密码不一致'
      }))
    } else {
      Message.success('密码修改成功,跳转至个人中心')
      // window.alert('注册成功后跳转至个人中心')
    }
  }

  render () {
    const {firstPassword, confirmPassword, waringInfo, checkFirstPassword, checkConfirmPassword} = this.state
    return (
      <div className={`m-reset-password-wrap  l-centerBlock`}>
        <div className='reset-password-box'>
          <h2 className={`title ${font('title')} ${color('title')}`}>RESET YOUR PASSWORD</h2>
          <div className={`warn-info ${font('f-secTitle')} ${color('title')}`}>{waringInfo}</div>
          <h3 className={`${font('f-secTitle')} ${color('title')}`}>SET PASSWORD</h3>
          <Input
            type='password'
            placeholder='SET PASSWORD'
            className={checkFirstPassword ? '' : 'warning'}
            value={firstPassword}
            onClear={this.clearValue.bind(this, 'firstPassword')}
            onChange={this.changeValue.bind(this, 'firstPassword')}
            onBlur={this.handleCheckFirstPassword}
          />
          <h3 className={`${font('f-secTitle')} ${color('title')}`}>CONFIRM PASSWORD</h3>
          <Input
            type='password'
            placeholder='CONFIRM PASSWORD'
            className={checkConfirmPassword ? '' : 'warning'}
            value={confirmPassword}
            onClear={this.clearValue.bind(this, 'confirmPassword')}
            onChange={this.changeValue.bind(this, 'confirmPassword')}
            onBlur={this.handleCheckConfirmPassword}
          />
          <Button onClick={this.reset}>SUBMIT</Button>
        </div>
      </div>
    )
  }
}

export default ResetPassword
