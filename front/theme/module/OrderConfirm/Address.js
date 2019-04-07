
import React from 'react'
import { fetchLite } from '../../source/util'
import { getAddress } from '../../source/service/user'
import { addAddress } from '../../source/service/user'

import AddressForm from './AddressForm'
import AddressList from './AddressList'
import Button from '../../plugin/component/Button'
import myreflux from '../../plugin/reactcommon/myreflux'

class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addressList: null // 用户地址列表
        }
    }
    componentDidMount() {
        fetchLite(getAddress, {
            done: (res) => {
                this.initData(res)
            }
        })
    }
    initData = (res) => {
        if (!res.data || !res.data.length === 0) {
            return null
        }
        let address_id = null
        let addressList = res.data.map(item => {
            item.selected = item.is_default
            item.details = `${item.address} ${item.city} ${item.zip_code} ${item.province_name} ${item.country_name}`

            if (item.is_default ===1) {
                address_id = item.id
            }
            return item
        }).sort((a, b)=>{
            return b.is_default - a.is_default
        })

        this.setState({ addressList })
        myreflux.trigger('updateTopState', { address_id })
    }
    handleSelected = (e, index) => {
        e.preventDefault()
        e.stopPropagation()
        if (this.state.addressList[index]['selected']) {
            return
        }
        this.setState({
            addressList: this.state.addressList.map((e, i) => {
                if (i === index) {
                    e.selected = 1
                } else {
                    e.selected = 0
                }
                return e
            })
        })
        myreflux.trigger('updateTopState', {
            address_id:this.state.addressList[index]['id'],
        })
    }
    rebuildSort = (fn) =>{
        // 将默认地址置顶排列
        let addressList = [...this.state.addressList]
        if (addressList[0]['selected']) {
            return fn()   
        }
        this.setState((prev=>{
            return {addressList: prev.addressList.sort((a,b)=>{
                return (b.selected - a.selected)
            })}
        }), ()=>{fn()})
    }
    saveAddress = ()=>{
        if (this.lock) {
            return
        }
        this.lock = true

        let data = myreflux.getdata('addAddress')
        let { province_name } = data

        //发起请求添加地址
         fetchLite(addAddress.bind(null, data), {
              done: (res) => {
                let address_id = res.data.id

                data.selected = 1
                data.is_default = 1
                data.details = `${data.address} ${data.city} ${data.zip_code} ${data.province_name} ${data.country_name}`
               
                this.setState({ addressList: [data] })
                myreflux.trigger('updateTopState', { address_id })
              },
              complete: () => {
                this.lock = false
              },
              authority: true,
              error: (err) => {
                console.log(err)
              }
            })

    }
    render() {
        const { addressList} = this.state
        if (!addressList) {
            return null
        }

        if (addressList.length === 0) {
            return (<React.Fragment>
                <AddressForm/>
                <div style={{marginBottom:'15px'}}>
                <Button onClick={this.saveAddress}>Save address</Button>
                </div>
            </React.Fragment>)
        }
        return (
            <React.Fragment>
                <AddressList 
                data={addressList}
                rebuildSort={this.rebuildSort}
                handleSelected={this.handleSelected} 
                />
            </React.Fragment>
        )
    }
}

export default Address
