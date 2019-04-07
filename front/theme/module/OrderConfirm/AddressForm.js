import React from 'react'
import { fetchLite } from '../../source/util'
import Icon from '../../plugin/component/Icon'
import Input from '../../plugin/component/Input'
import Select from '../../plugin/component/Select'
import myreflux from '../../plugin/reactcommon/myreflux'
import { getCountry, getState } from '../../source/service/user'

class AddressForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                address: '',
                city: '',
                company: '',
                country_id: null,
                country_name: '',
                first_name: '',
                id: '',
                is_default: 0,
                is_default_billing: 0,
                last_name: '',
                phone_number: '',
                province_id: null,
                province_name: '',
                suite: '',
                zip_code: ''
            },
            countries: null,
            provinces: null
        }
    }
    componentDidMount() {
        // 获取国家信息
        let countries = JSON.parse(window.sessionStorage.getItem('countries'))
        if (!countries) {
            fetchLite(getCountry, {
                done: (res) => {
                    let countries = []
                    for (let key in res.data) {
                        countries.push({ country_id: key, country_name: res.data[key] })
                    }
                    
                    let data = Object.assign({}, this.state.data)
                    let country_id = countries[0]['country_id']

                    data.country_id = country_id
                    data.country_name = countries[0]['country_name']

                    this.setState({ countries, data }, () => {
                        this.getProvinces(country_id)
                    })

                  myreflux.setdata('addAddress', data)
                  window.sessionStorage.setItem('countries', JSON.stringify(countries))
                }
            })
        } else {
            let country_id = countries[0]['country_id']
            let data = Object.assign({}, this.state.data)
            data.country_id = country_id
            data.country_name = countries[0]['country_name']
            
            myreflux.setdata('addAddress', data) 

            this.setState({ countries, data }, () => {

                this.getProvinces(countries[0]['country_id'])
            })
        }
    }
    componentDidUpdate (nextProps, prevState) {
        let province_id = this.state.data.province_id
        if (province_id !== prevState.data.province_id) {
            let data = Object.assign({}, this.state.data)
            data.province_name = this.state.provinces.filter(e=>(e.province_id === province_id))[0]['province_name']
            myreflux.setdata('addAddress', data)
        }
    }
    getProvinces(countryId) {
        let provinces = JSON.parse(window.sessionStorage.getItem('province_' + countryId))
        if (provinces) {
            let data = Object.assign({}, this.state.data)
            data.province_id = provinces[0]['province_id']
            data.province_name = provinces[0]['province_name']
            this.setState({ provinces, data })
            return
        }
        fetchLite(getState.bind(null, countryId), {
            done: (res) => {
                if (!res.data.has_state) {
                    this.setState({ provinces: [] })
                    return
                }
                let provinces = []
                for (let key in res.data.data) {
                    provinces.push({ province_id: key, province_name: res.data.data[key] })
                }
                
                let data = Object.assign({}, this.state.data)
                data.province_id = provinces[0]['province_id']
                data.province_name = provinces[0]['province_name']

                this.setState({ provinces, data }, () => {
                    window.sessionStorage.setItem('province_' + countryId, JSON.stringify(provinces))
                })
            }
        })
    }
    handleInput = (e, key) => {
        let data = Object.assign({}, this.state.data)
        data[key] = e.target.value
        this.setState({ data })
        myreflux.setdata('addAddress', data)
    }
    handleSelect = (e, key) => {
        if (key === 'country_id') {
            let data = Object.assign({}, this.state.data)
            data.country_id = e.target.value
            data.country_name = this.state.countries.filter(ele=>(ele.country_id === e.target.value))[0]['country_name']
            
            myreflux.trigger('updateTopState', { selectedCountryId: e.target.value })
            myreflux.setdata('addAddress', data)

            this.setState({ data })
            this.getProvinces(e.target.value)
            return
        }

        if ( key === 'province_id') {
            let data = Object.assign({}, this.state.data)
           
            data.province_id = e.target.value
            data.province_name = this.state.provinces.find(ele=> (ele.province_id===e.target.value))['province_name']
            
            this.setState({ data })
            myreflux.setdata('addAddress', data)
        }
    }
    render() {
        const { data, countries, provinces } = this.state
     
        if (!countries || !provinces) {
            return null
        }
        return (
            <div className='address-form'>
                <a href='javascript:void(0)' className='close' onClick={this.togglePanel}>
                    <Icon type='close' />
                </a>
                <div className='form-container'>
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
                                placeholder='Address'
                                value={data.address}
                                onChange={(e) => { this.handleInput(e, 'address') }}
                            />
                            <Input type='text'
                                placeholder='Apt, suite, etc. (optional)'
                                name='suite'
                                value={data.suite}
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
                                <Select onChange={(e) => { this.handleSelect(e, 'country_id') }}>
                                    {
                                        countries.map(item => (
                                            <option key={item.country_id} value={item.country_id}>{item.country_name}</option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className='state'>
                                <Select onChange={(e) => { this.handleSelect(e, 'province_id') }}>
                                    {
                                        provinces.map(item => (
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
                </div>
            </div>
        )
    }
}

export default AddressForm