import './ItemCard.less'
import React from 'react'
import Icon from '../../Icon/src/Icon'
import Button from '../../Button/src/Button'

class ItemCard extends React.Component {
  render () {
    const {btnTxt1, btnTxt2, fn1, fn2} = this.props
    return (
        <div className='bc-item-card'>
          <div className='bc-item-card-header' >
            <span>Collection</span>
            <a href=''>
              <span>Edit Collection</span>
              <span><Icon type='edit' /></span>
            </a>
          </div>
          <div className='bc-item-card-action'>
            <h3>Main Collection</h3>
            <Button.Group>
              <Button type='sub' onClick={() => { fn1() }}>{btnTxt1 || 'Change'}</Button>
              <Button type='sub' onClick={() => { fn2() }}>{btnTxt2 || 'Remove'}</Button>
            </Button.Group>
          </div>
        </div>
    )
  }
}
export default ItemCard
