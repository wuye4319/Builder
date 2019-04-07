import React from 'react'
import Icon from '../../../../builder/plugin/component/Icon'
import Button from '../../../../builder/plugin/component/Button'

export const CollItem = (props) => {
  return (
    <div className='coll-item'>
      <span className='arrow-right'>
        <Icon type='arrow-right' />
      </span>
      <div className='coll-info'>
        <img src='//gw2.alicdn.com/bao/uploaded/i6/TB1rMkPhY9YBuNjy0FgYXIxcXXa_M2.SS2_210x210.jpg' />
        <span>Collection1</span>
      </div>
      <span>
        <Icon type='move' />
      </span>
    </div>
  )
}

export const CollPanel = () => (
  <React.Fragment>
    <div className='panel-header' >
      <span>Collection</span>
      <a href=''>
        <span>Edit Collection</span>
        <span><Icon type='edit' /></span>
      </a>
    </div>
    <div className='panel-action'>
      <h3>Main Collection</h3>
      <Button.Group>
        <Button type='sub'>Change</Button>
        <Button type='sub'>Remove</Button>
      </Button.Group>
    </div>
  </React.Fragment>
)
export const CollItemList = (props) => (
  <div className={`topics-ctrl-select-collection ${props.showCollCtrl ? 'show' : ''}`} >
    <div className='title' >
      <span>Select Collection</span>
      <span className='icon' onClick={props.toggleCollectPanel}>
        <Icon type='close' />
      </span>
    </div>
    <div className='header'>
      <h2>COLLECTION</h2>
      <div className='edit'>
        <span className='icon'><Icon type='add1' /></span>
        <a href=''>
          <span>Create Collection</span>
          <span><Icon type='edit' /></span>
        </a>
      </div>
    </div>
    <div className='coll-list'>
      <ul>
        <li>
          <img src='//gw2.alicdn.com/bao/uploaded/i6/TB1rMkPhY9YBuNjy0FgYXIxcXXa_M2.SS2_210x210.jpg' />
          <p>
            <span>Collection List01</span>
            <span><Icon type='yes-filling' /></span>
          </p>
        </li>
        <li>
          <img src='//gw2.alicdn.com/bao/uploaded/i6/TB1rMkPhY9YBuNjy0FgYXIxcXXa_M2.SS2_210x210.jpg' />
          <p>
            <span>Collection List01</span>
            <span><Icon type='yes-filling' /></span>
          </p>
        </li>
        <li>
          <img src='//gw2.alicdn.com/bao/uploaded/i6/TB1rMkPhY9YBuNjy0FgYXIxcXXa_M2.SS2_210x210.jpg' />
          <p>
            <span>Collection List01</span>
            <span><Icon type='yes-filling' /></span>
          </p>
        </li>
        <li>
          <img src='//gw2.alicdn.com/bao/uploaded/i6/TB1rMkPhY9YBuNjy0FgYXIxcXXa_M2.SS2_210x210.jpg' />
          <p>
            <span>Collection List01</span>
            <span><Icon type='yes-filling' /></span>
          </p>
        </li>
        <li>
          <img src='//gw2.alicdn.com/bao/uploaded/i6/TB1rMkPhY9YBuNjy0FgYXIxcXXa_M2.SS2_210x210.jpg' />
          <p>
            <span>Collection List01</span>
            <span><Icon type='yes-filling' /></span>
          </p>
        </li>
        <li>
          <img src='//gw2.alicdn.com/bao/uploaded/i6/TB1rMkPhY9YBuNjy0FgYXIxcXXa_M2.SS2_210x210.jpg' />
          <p>
            <span>Collection List01</span>
            <span><Icon type='yes-filling' /></span>
          </p>
        </li>
      </ul>
      <Button type='sub'>Load More</Button>
    </div>
    <div className='bottom-btn'>
      <Button>Select</Button>
    </div>
  </div>
)
