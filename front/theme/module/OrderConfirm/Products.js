import React from 'react'
import { color, font, formatPrice } from '../../source/util'

class Products extends React.Component {
    render() {
        const { classPrefix, shippingPrice, products, costList, totalCost } = this.props

        if (!products || products.length === 0) {
            return null
        }
    
        let _costList = costList.map(e=>{
            if (e.name === 'Shipping') {
                e.value = shippingPrice
            }
            return e
        })

        return (
            <React.Fragment>
                <div className={`${classPrefix}-goods`} id='goods'>
                    <div className='animate-container'>
                        <div className='goods-content'>
                            <ul>
                                {
                                    products.map(v => (
                                        <li key={v.product_id}>
                                            <div className='item-col1'>
                                                <img src={v.imgSrc} />
                                            </div>
                                            <div className='item-col2'>
                                                <p className={`${color('text')} ${font('text')}`}>{v.goodsName}</p>
                                                <p className={`${color('subText')} ${font('text')}`}>{v.props}</p>
                                            </div>
                                            <div className='item-col3'>
                                                <span className={`${color('text')} ${font('text')}`}>{v.count}</span>
                                                <span className={`${color('text')} ${font('text')}`}>{v.price}</span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='cost-list'>
                            {
                                _costList.map((item, index) => (
                                    <p key={index.toString()}>
                                        <span>{item.name}</span>
                                        <span>{`${item.currency_symbol} ${formatPrice(item.value, true)}`}</span>
                                    </p>
                                ))
                            }
                        </div>
                        <div className='totalCost'>
                            <span className={`${color('text')} ${font('subTitle')}`}>Total</span>
                            <p>
                                <span
                                    className={`${color('prompt')} ${font('text')}`}>
                                    {costList[0]['currency']}
                                </span>
                                <span
                                    className={`${color('price')} ${font('price')}`}>
                                    {`${costList[0]['currency_symbol']} ${formatPrice((totalCost + shippingPrice), true)}`}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Products