/**
 * @author Alan (曹昌盛)
 * @desc 注册模块
 */
import './Register.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
import Input from './../../plugin/component/Input'
// import Message from './../../plugin/component/Message'
// import fetch from '../../plugin/component/util/fetch'
import { color, font, fetchLite } from '../../source/util'
import { register } from '../../source/service/user'

class Register extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  state = {
    firstName: '',
    lastName: '',
    eMail: '',
    firstPassword: '',
    confirmPassword: '',
    checkEmail: true,
    checkFirstPassword: true,
    checkConfirmPassword: true,
    waringInfo: ''
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
  // 校验邮箱
  handleCheckEmail = () => {
    const {eMail} = this.state
    if (!eMail) {
      this.setState(() => ({
        checkEmail: false,
        waringInfo: '邮箱不能为空'
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
  createAccount = () => {
    const {eMail, checkEmail, firstPassword, checkFirstPassword, confirmPassword, checkConfirmPassword} = this.state
    if (!eMail) {
      this.setState(() => ({
        waringInfo: '邮箱不能为空',
        checkEmail: false
      }))
    } else if (!checkEmail) {
      this.setState(() => ({
        waringInfo: '请输入正确的邮箱格式'
      }))
    } else if (!firstPassword) {
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
      this.postDataRegister()
    }
  }
  postDataRegister=() => {
    const {firstName, lastName, eMail, firstPassword, confirmPassword} = this.state
    // fetch('/member/register',
    //   {
    //     method: 'post',
    //     body: {
    //       'first_name': firstName,
    //       'last_name': lastName,
    //       'email': eMail,
    //       'password': firstPassword,
    //       'password_confirmation': confirmPassword
    //     }
    //   }
    // ).then((res) => {
    //   if (res.state === 0) {
    //     Link.goTo('/account_information/')
    //   } else {
    //     Message.error('注册失败，请重新注册')
    //   }
    // }).catch(() => {
    //   Message.error('注册失败，请重新注册')
    // })

    fetchLite(register.bind(null, {
      firstName,
      lastName,
      eMail,
      firstPassword,
      confirmPassword
    }), {
      done: () => {
        Link.goTo('/account_information/')
      }
    })
  }

  render () {
    const {firstName, lastName, firstPassword, eMail, confirmPassword, checkEmail, checkFirstPassword, checkConfirmPassword, waringInfo} = this.state
    return (
      <div className={`m-register-wrap  l-centerBlock`}>
        <div className='register-start'>
          <h2 className={`register-title ${font('title')} ${color('title')}`}>CREATE ACCOUNT</h2>
          <div className={`warn-info ${font('f-secTitle')} ${color('title')}`}>{waringInfo}</div>
          <h3 className={`${font('f-secTitle')} ${color('title')}`}>FIRST NAME</h3>
          <Input
            type='text'
            placeholder='First Name'
            value={firstName}
            clearIcon
            onClear={this.clearValue.bind(this, 'firstName')}
            onChange={this.changeValue.bind(this, 'firstName')}
          />
          <h3 className={`${font('f-secTitle')} ${color('title')}`}>LAST NAME</h3>
          <Input
            type='text'
            placeholder='Last Name'
            value={lastName}
            clearIcon
            onClear={this.clearValue.bind(this, 'lastName')}
            onChange={this.changeValue.bind(this, 'lastName')}
          />
          <h3 className={`${font('f-secTitle')} ${color('title')}`}>EMAIL ADDRESS<span
            className={`${font('text')} ${color('text')}`}>(Required)</span></h3>
          <Input
            type='text'
            placeholder='EMAIL ADDRESS'
            value={eMail}
            clearIcon
            onClear={this.clearValue.bind(this, 'eMail')}
            onChange={this.changeValue.bind(this, 'eMail')}
            className={checkEmail ? '' : 'warning'}
            onBlur={this.handleCheckEmail}
          />
          <h3 className={`${font('f-secTitle')} ${color('title')}`}>SET PASSWORD<span
            className={`${font('text')} ${color('text')}`}>(Required)</span></h3>
          <Input
            type='password'
            placeholder='SET PASSWORD'
            value={firstPassword}
            clearIcon
            onClear={this.clearValue.bind(this, 'firstPassword')}
            onChange={this.changeValue.bind(this, 'firstPassword')}
            className={checkFirstPassword ? '' : 'warning'}
            onBlur={this.handleCheckFirstPassword}
          />
          <h3 className={`${font('f-secTitle')} ${color('title')}`}>CONFIRM PASSWORD<span
            className={`${font('text')} ${color('text')}`}>(Required)</span></h3>
          <Input
            type='password'
            placeholder='CONFIRM PASSWORD'
            value={confirmPassword}
            clearIcon
            onClear={this.clearValue.bind(this, 'confirmPassword')}
            onChange={this.changeValue.bind(this, 'confirmPassword')}
            className={checkConfirmPassword ? '' : 'warning'}
            onBlur={this.handleCheckConfirmPassword}
          />
          <Button className='create' onClick={this.createAccount}>CREATE</Button>
          <div className='to-login'>
            <Link href='/login' className={`${font('text')} ${color('subText')}`}>Back to Customer Login</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
