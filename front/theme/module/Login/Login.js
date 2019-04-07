/**
 * @author Alan (曹昌盛)
 * @desc login登录模块
 */
import './Login.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
import { color, font, fetchLite, query2Obj } from '../../source/util'
import Input from './../../plugin/component/Input'
import {login} from '../../source/service/user'

class Login extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  state = {
    eMail: '',
    passWord: '',
    waringInfo: '',
    checkEmail: true,
    checkPassword: true
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
  handleCheckPassword = () => {
    const {passWord} = this.state
    if (!passWord) {
      this.setState(() => ({
        checkPassword: false,
        waringInfo: '密码不能为空'
      }))
      return false
    }
    this.setState(() => ({
      checkPassword: true,
      waringInfo: ''
    }))
  }
  signIn = () => {
    const {eMail, checkEmail, passWord} = this.state
    if (!eMail) {
      this.setState(() => ({
        waringInfo: '请输入账号',
        checkEmail: false
      }))
    } else if (!checkEmail) {
      this.setState(() => ({
        waringInfo: '请输入正确的账号'
      }))
    } else if (!passWord) {
      this.setState(() => ({
        waringInfo: '请输入密码',
        checkPassword: false
      }))
    } else {
      this.postDataLogin()
    }
  }
  postDataLogin=() => {
    const {eMail, passWord} = this.state
    // fetch('/member/login',
    //   {
    //     method: 'post',
    //     body: {
    //       'email': eMail,
    //       'password': passWord
    //     }
    //   }
    // ).then((res) => {
    //   if (res.state === 0) {
    //     if (document.referrer) {
    //       Link.goTo(document.referrer)
    //     } else {
    //       Link.goTo('/account_information/')
    //     }
    //
    //   } else {
    //     Message.error(res.msg)
    //   }
    // }).catch(() => {
    //   Message.error('登录失败，请重新登录')
    // })
    fetchLite(login.bind(null, {eMail, passWord}), {
      done: () => {
        let ref = query2Obj().ref
        Link.goTo(ref ? decodeURIComponent(ref) : '/account_information/')
      }
    })
  }
  goRegister = () => {
    Link.goTo('/register')
  }

  render () {
    const {waringInfo, eMail, passWord, checkEmail, checkPassword} = this.state
    return (
      <div className={`m-Login-wrap  l-centerBlock`}>
        <div className='login-start'>
          <h2 className={`login-title ${font('title')} ${color('title')}`}>CUSTOMER LOGIN</h2>
          <div className={`warn-info ${font('f-secTitle')} ${color('title')}`}>{waringInfo}</div>
          <h3 className={`${font('f-secTitle')} ${color('title')}`}>EMAIL ADDRESS</h3>
          <Input
            type='text'
            placeholder='EMAIL ADDRESS'
            className={checkEmail ? '' : 'warning'}
            value={eMail}
            clearIcon
            onClear={this.clearValue.bind(this, 'eMail')}
            onChange={this.changeValue.bind(this, 'eMail')}
            onBlur={this.handleCheckEmail}
          />
          <h3 className={`${font('f-secTitle')} ${color('title')}`}>PASSWORD</h3>
          <Input
            type='password'
            placeholder='PASSWORD'
            className={checkPassword ? '' : 'warning'}
            value={passWord}
            clearIcon
            onClear={this.clearValue.bind(this, 'passWord')}
            onChange={this.changeValue.bind(this, 'passWord')}
            onBlur={this.handleCheckPassword}
          />
          <div className='sign'>
            <Button onClick={this.signIn}>SIGN IN</Button>
          </div>
          <div className='create'>
            <Button type='ghost' onClick={this.goRegister}>CREATE ACCOUNT</Button>
          </div>
          <div className='forgot-password'>
            <Link href='/send_email' className={`${color('subText')} ${font('text')}`}>Forgot your password?</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
