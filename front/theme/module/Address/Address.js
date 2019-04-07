/**
 * @author：Gavin Yang (杨伟伟)
 * @desc：地址管理页面
 * @date：2018.4.26
 **/
import './Address.less'
import React from 'react'

import Icon from '../../plugin/component/Icon'
import Button from '../../plugin/component/Button'
import AddNewPanel from './Add'
import Modal from '../../plugin/component/Modal'

import { getAddress, getCountry, addressAction } from '../../source/service/user'
import { fetchLite } from '../../source/util'

const AddressListNull = (props) => {
  return (
    <div className='address-null'>
      <div className='logo' />
      <p>You haven't shipping address</p>
      <Button onClick={props.open}>NEW ADDRESS</Button>
    </div>
  )
}


export default class Address extends React.Component {
  state = {
    operateCode: 1,// 1:add 操作,2:edit操作
    modalStatus: false,  //是否显示弹窗
    countries: null, //国家地址列表
    addressList: null, // 用户地址列表
    deleteInfo: { // 删除地址时的确认信息
      user: '',
      address: ''
    },
    editAddress: { // 编辑地址的数据结构
      address: '',
      city: '',
      country_id: '3',
      country_name: '',
      first_name: '',
      id: '',
      is_default: 0,
      last_name: '',
      phone_number: '',
      province_id: '',
      province_name: '',
      suite: '',
      zip_code: ''
    },
    addNewAddress: { //添加地址的数据结构
      address: '',
      city: '',
      country_id: '3',
      country_name: '',
      first_name: '',
      id: '',
      is_default: 0,
      last_name: '',
      phone_number: '',
      province_id: '',
      province_name: '',
      suite: '',
      zip_code: ''
    }
  }
  componentDidMount() {
    // 获取地址用户地址列表
    fetchLite(getAddress, {
      done: (res) => {
        this.initAddressData(res)
      },
      authority: true
    })

    // 获取国家信息
    let countries = JSON.parse(window.sessionStorage.getItem('countries'))
    if (!countries || countries.length === 0) {
      fetchLite(getCountry, {
        done: (res) => {
          let countries = []
          for (let key in res.data) {
            countries.push({ country_id: key, country_name: res.data[key] })
          }
          this.setState({ countries })
          window.sessionStorage.setItem('countries', JSON.stringify(countries))
        }
      })
    } else {
      this.setState({ countries })
    }
  }
  initAddressData = (res) => {
    if (res.data && res.data.length > 0) {
      let addressList = [...res.data].sort((a, b) => (b.is_default - a.is_default))
      addressList.forEach(item => {
        item.detailsAddress = `${item.address} ${item.city} ${item.zip_code} ${item.province_name} ${item.country_name}`
      })
      this.setState({ addressList }, () => {
        this.setDomHeight()
      })
    }
  }
  upDateState = (params) => {
    if (!params || typeof params !== 'object') {
      return
    }
    this.setState({ ...params }, () => {
      if ('addressList' in params) {
        this.setDomHeight()
      }
    })
  }
  editAddress = (index) => {
    let editAddress = Object.assign({}, this.state.addressList[index])
    this.setState({ editAddress, operateCode: 2 }, () => {
      this.addressPanel.togglePanel()
    })
  }
  delete = (index) => {
    let data = this.state.addressList[index]
    this.delIndex = index
    this.setState({
      modalStatus: true,
      deleteInfo: {
        index,
        id: data.id,
        address: data.detailsAddress,
        user: data.first_name + ' ' + data.last_name + ' ' + data.phone_number
      }
    })
  }
  confirmDelete = () => {
    if (this.lockDel) {
      return
    }

    this.lockDel = true
    let index = this.delIndex
    let data = this.state.addressList[index]

    fetchLite(addressAction.bind(null, { type: 1, id: data.id }), {
      done: () => {
        let addressList = this.state.addressList.slice()
        addressList.splice(index, 1)
        this.setState({ addressList, modalStatus: false }, () => {
          this.setDomHeight()
        })
      },
      complete: () => {
        this.lockDel = false
      },
      authority: true
    })
  }

  setDefault = (index) => {
    let data = this.state.addressList[index]
    if (data.is_default) {
      return
    }

    if (this.lockEdit) {
      return
    }
    this.lockEdit = true
    fetchLite(addressAction.bind(null, { id: data.id, type: 2 }), {
      done: () => {
        let addressList = [...this.state.addressList]
        addressList.forEach((item, i) => {
          if (index === i) {
            item.is_default = 1
          } else {
            item.is_default = 0
          }
        })

        this.setState({ addressList })
      },
      complete: () => {
        this.lockEdit = false
      },
      authority: true
    })
  }
  cancelDelete = () => {
    this.setState({
      modalStatus: false,
      deleteInfo: {
        user: '',
        address: ''
      }
    })
  }
  setDomHeight = () => {
    let ulDom = document.getElementsByClassName('address-list')[0]
    let dom = document.getElementsByClassName('address-container')[0]

    if (dom && ulDom) {
      let inlineStyle = `height: ${ulDom.offsetHeight}px; transition:height 0.25s linear 1ms;will-change:height`
      if (!this.init) {
        this.init = true
        inlineStyle = `height: ${ulDom.offsetHeight}px;`
      }
      dom.style.cssText = inlineStyle
    }
  }
  open = () => {
    this.setState({ operateCode: 1 }, () => {
      this.addressPanel.togglePanel()
    })
  }

  render() {
    const { pageMode } = this.props
    const { deleteInfo, modalStatus,addressList, countries, editAddress, addNewAddress,operateCode } = this.state

    const addAddressProps = {
      pageMode,
      countries,
      operateCode,
      addressList,
      editAddress,
      addNewAddress,
      upDateState: this.upDateState
    }

    return (
      <React.Fragment>
        <div className='m-address-centerBlock'>
          <h2 className='m-address-centerBlock-title'>RECIPIENT ADDRESS</h2>
          <div className='m-address-centerBlock-content'>
            {
              (!addressList ||addressList.length === 0) ? <AddressListNull open={this.open} />
                :
               <div>
                <div className='address-container'>
                  <ul className='address-list'>
                    {
                      addressList.map((item, i) => (
                        <li key={item.id}>
                          <p className='user-phone'>
                            <span>{`${item.first_name} ${item.last_name}`}</span>
                            <span>{item.phone_number}</span>
                          </p>
                          <p className='address-details'>{item.detailsAddress}</p>
                          <div className='user-action'>
                            <a href='javascript:void(0)' onClick={() => this.setDefault(i)}>
                              {
                                item.is_default === 0 && <span><Icon type='radio' /></span>
                              }
                              <span style={{ color: `${item.is_default === 1 ? '#302E2F' : ''}` }}>
                                {item.is_default === 0 ? 'SET AS DEFAULT ADDRESS' : '[DEFAULT ADDRESS]'}
                              </span>
                            </a>
                            <div className='edit'>
                              <a href='javascript:void(0)' onClick={() => this.editAddress(i)}>Edit</a>
                              {
                                item.is_default === 0 &&
                                <a href='javascript:void(0)' onClick={() => this.delete(i)}>
                                  Delete
                                    </a>
                              }
                            </div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <Button onClick={this.open}>NEW ADDRESS</Button>
              </div>
            }
          </div>
        </div>
        <AddNewPanel
          {...addAddressProps}
          ref={ref => { this.addressPanel = ref }}
        />
        <Modal
          title={<p><Icon type='info-filling' /><span>Delete this address?</span></p>}
          visible={modalStatus}
          className='confirm'
          zIndex={2000}
          width={760}
          cancelText='CANCEL'
          okText='DETERMINE'
          onCancel={this.cancelDelete}
          onOk={this.confirmDelete}
        >
          <p>{deleteInfo.user}</p>
          <p>{deleteInfo.address}</p>
        </Modal>
      </React.Fragment>
    )
  }
}
