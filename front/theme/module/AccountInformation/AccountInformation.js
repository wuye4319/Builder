/**
 * @author Alan (曹昌盛)
 * @desc 用户中心账号信息
 */
import './AccountInformation.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from './../../plugin/component/Button'
import Input from './../../plugin/component/Input'
import Link from './../../plugin/component/Link'
import Message from '../../plugin/component/Message'
import {updateUserInfo, updatePassword} from '../../source/service/user'
const {color, font, fetchLite} = window.supervar.util
let init = false
class AccountInformation extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  state = {
    name: '',
    email: '',
    initPassword: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    modifyPassword: false,
    waringInfo: ''
  }
  static getDerivedStateFromProps ({userInfo}) {
    if (!init && userInfo.login) {
      init = true

      return {
        name: userInfo.name,
        email: userInfo.email
      }
    } else {
      return null
    }
  }
  handleChangeValue = (key, e) => {
    const value = e.target.value
    this.setState(() => ({
      [key]: value
    }))
  }
  editPassword = () => {
    this.setState(() => ({
      modifyPassword: true
    }))
  }
  cancelEditPassword = () => {
    this.setState(() => ({
      modifyPassword: false
    }))
  }
  handleSubmitName = () => {
    fetchLite(updateUserInfo.bind(null, {
      name: this.state.name,
      email: this.state.email,
      phone: this.props.phone
    }), {
      done: () => {
        Message.success('Success')
      }
    })
  }
  handleUpdatePassword = () => {
    fetchLite(updatePassword.bind(null, {
      old_password: this.state.oldPassword,
      password: this.state.newPassword,
      password_confirmation: this.state.confirmPassword
    }), {
      done: () => {
        Message.success('Success')
      }
    })
  }
  componentDidMount () {
    // this.getUserInfo()
  }

  render () {
    const {pageMode} = this.props
    // const {name, email} = userInfo
    const {modifyPassword, oldPassword, newPassword, confirmPassword, waringInfo, name, email} = this.state

    return (
      <div className='m-account-information-wrap'>
        {
          !!pageMode && <h2 className={`${font('title')} ${color('title')}`}>ACCOUNT INFORMATION</h2>
        }
        <div className={`username-box border-line ${color.border('hr')}`}>
          <h3 className={`${font('secTitle')} ${color('title')}`}>USER NAME</h3>
          <div className='username'>
            <div className='username-input'>
              <Input type='text' value={name} placeholder='USER NAME'
                onChange={this.handleChangeValue.bind(this, 'name')} />
            </div>
            <Button onClick={this.handleSubmitName}>SUBMIT</Button>
          </div>
        </div>
        <div className={`register-email-box border-line ${color.border('hr')}`}>
          <h3 className={`${font('secTitle')} ${color('title')}`}>REGISTER EMAIL</h3>
          <p className={`register-email ${font('text')} ${color('subText')}`}>{email}</p>
        </div>
        <div className={`password-box border-line ${color.border('hr')}`}>
          <h3 className={`${font('secTitle')} ${color('title')}`}>{modifyPassword ? 'MODIFY PASSWORD' : 'PASSWORD'}</h3>
          {
            modifyPassword
              ? <div className='modify-password'>
                <div className='password-list'>
                  <div className={`warn-info ${font('f-secTitle')} ${color('title')}`}>{waringInfo}</div>
                  <Input type='password' value={oldPassword} placeholder='OLD PASSWORD'
                    onChange={this.handleChangeValue.bind(this, 'oldPassword')} />
                  <Input type='password' value={newPassword} placeholder='NEW PASSWORD'
                    onChange={this.handleChangeValue.bind(this, 'newPassword')} />
                  <Input type='password' value={confirmPassword} placeholder='CONFIRM PASSWORD'
                    onChange={this.handleChangeValue.bind(this, 'confirmPassword')} />
                </div>
                <div className='operate-section'>
                  <span className={`${font('text')} ${color('link')}`} onClick={this.cancelEditPassword}>Cancel</span>
                  <Button onClick={this.handleUpdatePassword}>SUBMIT</Button>
                </div>
              </div>
              : <div className='modify-password'>
                <p className={`${font('text')} ${color('text')}`}>*************</p>
                <span className={`${font('text')} ${color('link')}`} onClick={this.editPassword}>Modify</span>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default AccountInformation
