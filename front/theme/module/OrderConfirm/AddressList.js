import React from 'react'
import { color, font } from '../../source/util'
import Icon from '../../plugin/component/Icon'
import Link from '../../plugin/component/Link'

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

class AddressList extends React.Component {
   constructor (props) {
       super(props)
      this.state = {
       dir: 'down' // 箭头方向
     }
   }
    componentDidMount() {
        let t = setTimeout(() => {
            clearTimeout(t)
            let li = document.getElementsByClassName('item-address')[0]
            this.ulHeight = this.ul.offsetHeight
            this.dom.style.cssText = `height:${li.offsetHeight}px; transition-duration:350ms`
        }, 150)
    }
    toggle = () => {
        let {dir} = this.state
        if (dir === 'down') {
            let li = document.getElementsByClassName('item-address')[0]
            let ratio = (100 * this.ulHeight) / li.offsetHeight
            this.dom.style.cssText = 'height:' + this.ulHeight + 'px'
            this.dom.style.cssText = `height:${this.ulHeight}px; transition-duration:${ratio}ms`
            this.setState({ dir: 'up'})
        } else {
            this.props.rebuildSort(() => {
                let t = setTimeout(() => {
                    clearTimeout(t)
                    let li = document.getElementsByClassName('item-address')[0]
                    this.dom.style.cssText = `height:${li.offsetHeight}px;`
                  this.setState({ dir: 'down'})
                }, 100)
            })
        }
    }
    render() {
        const { dir } = this.state
        const { data } = this.props
        return (
            <div className='m-orderConfirm-address'>
                <h2>
                    <span className={`${color('text')} ${font('subTitle')}`}>Shopping address</span>
                    <Link href='/address/'>
                        <span className={`${color('link')} ${font('text')}`}>Edit</span>
                        <Icon type='edit' />
                    </Link>
                </h2>
                <div className='address_cont' ref={ref => { this.dom = ref }}>
                    <ul ref={ref => { this.ul = ref }}>
                        {
                            data.map((item, index) => (
                                <label key={item.id} htmlFor={`item-${index}`}>
                                    <li onClick={(e) => { this.props.handleSelected(e, index) }}
                                        className={`item-address ${item.selected ? 'selected' : ''}`}
                                    >
                                        <Radio
                                            value={index}
                                            id={`item-${index}`}
                                            className={item.selected ? 'selected' : ''}
                                        />
                                        <div className='address-info'>
                                            <p className='user-info'>
                                                <span className={`${color('text')} ${font('secTitle')}`}>
                                                    {`${item.first_name} ${item.last_name}`}
                                                </span>
                                                <span className={`${color('text')} ${font('secTitle')}`}>
                                                    {item.phone_number}
                                                </span>
                                            </p>
                                            <p className={`${color('text')} ${font('text')} user-address`}>
                                                {item.details}
                                            </p>
                                        </div>
                                    </li>
                                </label>
                            ))
                        }
                    </ul>
                </div>
                <div className='arrow' style={{ display: data.length > 1 ? 'block' : 'none' }}>
                    <a href='javascript:void(0)' className={`moreTips ${dir}`} onClick={this.toggle}>
                        <span>Collapse address</span>
                        <Icon type='unfold' />
                    </a>
                </div>
            </div>
        )
    }
}

export default AddressList
