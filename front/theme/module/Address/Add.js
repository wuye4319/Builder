import React from 'react'
import { color, font, fetchLite } from '../../source/util'

import Input from '../../plugin/component/Input'
import Select from '../../plugin/component/Select'
import Button from '../../plugin/component/Button'
import Icon from '../../plugin/component/Icon'
import { getState, updateAddress, addAddress } from '../../source/service/user'

export default class AddNewPanel extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { operateCode } = nextProps
    let country_id
    if (operateCode === 1) {
      country_id = nextProps.addNewAddress['country_id']
    } else if (operateCode === 2) {
      country_id = nextProps.editAddress['country_id']
    }

    if (country_id !== prevState.country_id) {
      return { country_id }
    }
    return null
  }
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      country_id: null
    }
  }
  componentDidUpdate(nextProps, prevState) {
    if (this.state.country_id !== prevState.country_id) {
      this.getProvincesInfo(this.state.country_id)
    }
  }
  componentDidMount() {
    if (this.props.pageMode === 1) {
      let transEle = document.getElementsByClassName('address-form')[0]
      transEle.addEventListener('transitionend', () => {
        if (!this.state.show) {
          let t = setTimeout(() => {
            this.mod.style.display = 'none'
            clearTimeout(t)
          }, 80)
        }
      })
    }
    this.getProvincesInfo(3)
  }
  getProvincesInfo(countryId) {
    let provinces = JSON.parse(sessionStorage.getItem('province_' + countryId))

    if (provinces) {
      this.setState({ provinces })
      return
    }
    fetchLite(getState.bind(null, countryId), {
      done: (res) => {
        let provinces = []
        let _data = Object.assign({}, res.data.data)
        for (let key in _data) {
          provinces.push({ province_id: key, province_name: _data[key] })
        }
        this.setState({ provinces }, () => {
          window.sessionStorage.setItem('province_' + countryId, JSON.stringify(provinces))
        })
      }
    })
  }
  submitForm = () => {
    let params
    let { operateCode } = this.props

    if (operateCode === 1) {
      params = Object.assign({}, this.props.addNewAddress)
    } else if (operateCode === 2) {
      params = Object.assign({}, this.props.editAddress)
    }

    if (!params.country_id) {
      params.country_id = this.props.countries[0]['country_id']
    }

    if (!params.country_name) {
      params.country_name = this.props.countries[0]['country_name']
    }

    if (!params.province_id) {
      params.province_id = this.state.provinces[0]['province_id']
    }

    if (!params.province_name) {
      params.province_name = this.state.provinces[0]['province_name']
    }

    params.company = ''
    params.zip = params.zip_code

    if (this.lock) {
      return
    }
    this.lock = true

    // params.id地址id,如果id存在请求更新地址接口，否则请求添加地址接口
    fetchLite(!!params.id
      ? updateAddress.bind(null, params.id, params)
      : addAddress.bind(null, params), {
      done: (res) => {
        this.handleUpdateAddress(res.data, params)
      },
      complete: () => {
        this.lock = false
        this.togglePanel()
      },
      authority: true,
      error: (err) => {
        console.log(err)
      }
    })

  }
  handleUpdateAddress = (data, _source) => { //
    let { operateCode, addressList } = this.props
    let source = Object.assign({}, _source)
    let hasSetDefault = !!source.is_default
    let isNull = (!addressList || addressList.length === 0)

    if (!source.id) {
      source.id = data.id
    }
    let _addressList = []
    if (!isNull) {
      _addressList = [...addressList]
    }

    // 添加地址时设置了默认地址
    if (hasSetDefault) {
      _addressList.map(item => {
        item.is_default = 0
        return item
      })
    } else {
      // 地址列表空时，新添加的地址设置默认地址
      if (isNull) {
        source.is_default = 1
      }
    }

    if (operateCode === 1) {
      if (hasSetDefault) {
        _addressList.unshift(source)
      } else {
        _addressList.push(source)
      }
      source.detailsAddress = `${source.address} ${source.city} ${source.zip_code} ${source.province_name} ${source.country_name}`
      let restData = {}
      for (let key in source) {
        if (key !== 'country_id' || key !== 'provice_id') {
          restData[key] = ''
        } else {
          restData[key] = source[key]
        }
      }

      this.props.upDateState({ addAddress: restData, addressList: _addressList })
      return
    }

    if (operateCode === 2) {
      for (let i = 0; _addressList[i]; i++) {
        if (_addressList[i]['id'] === source.id) {
          _addressList[i] = source
          break
        }
      }
      this.props.upDateState({ addressList: _addressList })
    }
  }
  setDefault = () => {
    if (this.props.operateCode === 1) {
      let addNewAddress = Object.assign({}, this.props.addNewAddress)
      addNewAddress.is_default = Math.abs(addNewAddress.is_default - 1)
      this.props.upDateState({ addNewAddress })
    } if (this.props.operateCode === 2) {
      let editAddress = Object.assign({}, this.props.editAddress)
      editAddress.is_default = Math.abs(editAddress.is_default - 1)
      this.props.upDateState({ editAddress })
    }
  }
  togglePanel = () => {
    this.setState(pre => {
      return { show: !pre.show }
    }, () => {
      if (this.state.show) {
        this.mod.style.display = 'block'
        document.body.style.cssText = 'overflow:hidden'
        let _t = setTimeout(() => {
          this.mod.setAttribute('class', 'm-address-mod show')
          clearTimeout(_t)
        }, 80)
      } else {
        if (this.props.pageMode === 0) {
          this.mod.style.display = 'none'
        }
        this.mod.setAttribute('class', 'm-address-mod')
        document.body.style.cssText = ''
      }
    })
  }
  handleInput = (e, key) => {
    const { operateCode } = this.props
    if (operateCode === 1) {
      let addNewAddress = Object.assign({}, this.props.addNewAddress)
      addNewAddress[key] = e.target.value
      this.props.upDateState({ addNewAddress })
    }
    else if (operateCode === 2) {
      let editAddress = Object.assign({}, this.props.editAddress)
      editAddress[key] = e.target.value
      this.props.upDateState({ editAddress })
    }
  }
  handleSelect = (e, key) => {
    let id
    let name
    let _key
    let { operateCode } = this.props

    if (key === 'country_id') {
      id = e.target.value
      name = this.props.countries.filter(ele => (ele.country_id === id))[0]['country_name']
      _key = 'country_name'
    } else if (key === 'province_id') {
      id = e.target.value
      name = this.state.provinces.filter(ele => (ele.province_id === id))[0]['province_name']
      _key = 'province_name'
    }

    if (operateCode === 1) {
      let addNewAddress = Object.assign({}, this.props.addNewAddress)
      addNewAddress[key] = id
      addNewAddress[_key] = name
      this.props.upDateState({ addNewAddress })
    } else if (operateCode === 2) {
      let editAddress = Object.assign({}, this.props.editAddress)
      editAddress[key] = id
      editAddress[_key] = name
      this.props.upDateState({ editAddress })
    }
  }
  render() {
    let data
    let provinces = this.state.provinces
    const { countries, operateCode } = this.props

    if (operateCode === 1) {
      data = this.props.addNewAddress
    } else if (operateCode === 2) {
      data = this.props.editAddress
    }

    return (
      <div className='m-address-mod' ref={ref => { this.mod = ref }}>
        <div className='address-form'>
          <a href='javascript:void(0)' className='close' onClick={this.togglePanel}>
            <Icon type='close' />
          </a>
          {
            data && <div className='form-container'>
              <h2>New address</h2>
              <div className='input-area'>
                <div className='form-item name'>
                  <Input type='text'
                         placeholder='First name'
                         value={data.first_name}
                         onChange={(e) => { this.handleInput(e, 'first_name') }}
                  />
                  <Input type='text'
                         placeholder='Last name'
                         value={data.last_name}
                         onChange={(e) => { this.handleInput(e, 'last_name') }}
                  />
                </div>
                <div className='form-item address'>
                  <Input type='text'
                         value={data.address}
                         placeholder='Address' name='address'
                         onChange={(e) => { this.handleInput(e, 'address') }}
                  />
                  <Input type='text'
                         value={data.suite}
                         placeholder='Apt, suite, etc. (optional)'
                         onChange={(e) => { this.handleInput(e, 'suite') }}
                  />
                </div>
                <div className='form-item city'>
                  <Input type='text'
                         placeholder='City'
                         value={data.city}
                         onChange={(e) => { this.handleInput(e, 'city') }}
                  />
                </div>
                <div className='form-item stateInfo'>
                  <div className='country'>
                    <Select
                      value={data.country_id}
                      onChange={(e) => this.handleSelect(e, 'country_id')}
                    >
                      {
                        countries && countries.map(item => (
                          <option key={item.country_id} value={item.country_id}>{item.country_name}</option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className='state'>
                    <Select
                      value={data.province_id}
                      onChange={(e) => this.handleSelect(e, 'province_id')}
                    >
                      {
                        provinces && provinces.map(item => (
                          <option key={item.province_id} value={item.province_id}>{item.province_name}</option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className='zipCode'>
                    <Input type='text'
                           placeholder='zip Code'
                           value={data.zip_code}
                           onChange={(e) => { this.handleInput(e, 'zip_code') }}
                    />
                  </div>
                </div>
                <div className='form-item iphone'>
                  <Input type='text'
                         placeholder='iphone (optional)'
                         value={data.phone_number}
                         onChange={(e) => { this.handleInput(e, 'phone_number') }}
                  />
                </div>
              </div>
              {
                (operateCode === 1) && <div className='form-item set'>
                  <a href='javascript:void (0)'
                     className='bc-set-default setDefValue'
                     onClick={this.setDefault}
                  >
                    <Icon className='check-item'
                          style={{ color: `${!!data.is_default ? '#D1343E' : ''}` }}
                          type={!!data.is_default ? 'checkbox-checked' : 'checkbox'} />
                    <span className={`${font('text')}`}>SET AS DEFAULT ADDRESS</span>
                  </a>
                </div>
              }
              <div className={`addBtn ${(operateCode === 2 && data.is_default === 1) ? 'no-set' : ''}`}>
                <Button className='submit' onClick={this.submitForm}>Save Add</Button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}
