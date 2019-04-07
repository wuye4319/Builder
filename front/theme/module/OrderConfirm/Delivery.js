import React from 'react'
import { getDelivery } from '../../source/service/user'
import { color, font, formatPrice, fetchLite, setClass } from '../../source/util'
import myreflux from '../../plugin/reactcommon/myreflux';
let test = {
  currency: 'USD',
  currency_symbol: 'US $',
  delivery_cycle: '',
  delivery_feature: '经济型路线，价格便宜，在途时间较长，物流更新慢。避免贵重物品寄送，具体请参照保险赔偿标准。',
  delivery_home: '',
  delivery_id: 107,
  delivery_logo: '',
  delivery_name: 'DHL',
  id: 'g9jP2e',
  is_free: 1,
  name: 'DHL',
  shipping_price: 0,
  tax: 0,
  tax_name: ''
}
const Radio = (props) => (
  <div className={`radio-item ${props.className}`}>
    <input
      type='radio'
      id={props.id}
      name={props.name}
      value={props.value}
      defaultChecked={props.default} />
    <i />
  </div>
)

class Delivery extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { address_id } = nextProps
    if (address_id !== prevState.address_id) {
      return { address_id }
    }
    return null
  }
  constructor(props) {
    super(props)
    this.state = {
      curIndex: 0, //当前选中的物流索引值
      address_id: '', // 用户选中的地址对应ID
      deliveryList: null, // 物流列表数据
    }
  }
  componentDidUpdate(nextProps, prevState) {
    if (this.state.address_id !== prevState.address_id) {
      
      if (!this.state.address_id) {
        return
      }
      this.fetchDelivery(this.state.address_id)
    }
  }
  fetchDelivery = (address_id) =>{
    // 获取用户选取地址对应的物流路线列表
    if (!address_id) {
      return 
    }

    const cart_list = JSON.parse(sessionStorage.getItem('cart_list')) || []
    fetchLite(getDelivery.bind(null, address_id, cart_list), {
      done: (res) => {
        if (!res.data || res.data.length === 0) {
          return
        }

        this.setState({
          deliveryList: res.data.map((item, i)=>{
            if (i ===0) {
              item.selected = 1
            } else {
              item.selected = 0
            }
            return item
          })
        })

        // 更新商品结算飞雁中的运费和物流ID
        myreflux.trigger('updateTopState', {
          shipping_id: res.data[0]['shipping_id'],
          shippingPrice: res.data[0]['shipping_price']
        })
      }
    })
  }
  selecetdDelivery = (e, index) => {
    e.preventDefault()
    e.stopPropagation()

    if (index === this.state.curIndex) {
      return
    }

    let shipping_id = 0
    let shippingPrice = 0

    let deliveryList = this.state.deliveryList.map((item, i) => {
      if (i === index) {
        item.selected = 1
        shipping_id = item.shipping_id
        shippingPrice = item.shipping_price
      } else {
        if (item.selected) {
          item.selected = 0
        }
      }
      return item
    })

    this.setState({ deliveryList, curIndex: index })
    myreflux.trigger('updateTopState', { shippingPrice,shipping_id })
  }
  render() {
    const { deliveryList } = this.state

    if (!deliveryList) {
      return null
    }
    console.log('deliveryList',deliveryList)
    const { classPrefix } = this.props

    return (
      <div className={`${classPrefix}-delivery`}>
        <h2 className={`${color('text')} ${font('subTitle')}`}>Delivery Method</h2>
        <div className='deliveryDom'>
          <ul ref={ref => { this.delivery = ref }}>
            {
              deliveryList.map((item, index) => (
                <label key={item.shipping_id} htmlFor={`del-${index}`}>
                  <li className='item-delivery'
                    onClick={(e) => { this.selecetdDelivery(e, index) }}
                  >
                    <div className='radio'>
                      <Radio
                        value={index} id={`del-${index}`}
                        className={setClass({ 'selected': item.selected })} />
                    </div>
                    <p>
                      <span className={`${color('text')} ${font('text')}`}>
                        {item.shipping_title}
                      </span>
                      {/*<span className={`${color('subText')} ${font('text')}`}>*/}
                        {/*{item.delivery_feature}*/}
                      {/*</span>*/}
                      <span className={`${color('text')} ${font('text')}`}>
                        {`${item.currency_symbol} ${formatPrice(item.shipping_price, true)}`}
                      </span>
                    </p>
                  </li>
                </label>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Delivery
