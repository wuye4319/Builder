import React from 'react'
import Icon from '../../../../builder/plugin/component/Icon/src/Icon'
import Button from '../../../../builder/plugin/component/Button/src/Button'
import Input from '../../../../builder/plugin/component/Input/src/Input'

export class CollectionCard extends React.Component {
  render () {
    let {change, remove, btnTxt1, btnTxt2, collection} = this.props

    if (!change || typeof change !== 'function') {
      change = () => {
        this.props.open()
      }
    }
    if (!remove || typeof remove !== 'function') {
      remove = () => {}
    }

    return (
      <React.Fragment>
        {
          collection && <div className='coll-card'>
            <div className='coll-card-header'>
              <span>Collection</span>
              <a href='http://buckydrop.test.com/en/admin/online_store/collections' target='_blank'>
                <span>Edit Collection</span>
                <span><Icon type='edit' /></span>
              </a>
            </div>
            <div className='coll-card-action'>
              <div className='coll-info'>
                <img src={collection.cover_images} />
                <h3>{collection.title}</h3>
              </div>
              <Button.Group>
                <Button type='sub' onClick={change}>{btnTxt1 || 'Change'}</Button>
                <Button type='sub' onClick={remove}>{btnTxt2 || 'Remove'}</Button>
              </Button.Group>
            </div>
          </div>
        }
        {
          !collection && <div className='coll-null'>
            <div><Button onClick={this.props.open}>Select Products</Button></div>
          </div>
        }
      </React.Fragment>
    )
  }
}

export class ProductsCollection extends React.Component {
  handleSelect = (index) => {
    let data = this.props.data

    for (let i = 0, len = data.length; i < len; i++) {
      if (i === index) {
        if (data[index]['selected']) {
          return
        }
        data[index]['selected'] = 1
        data[index]['className'] = 'selected'
      } else {
        if (!data[i]['selected']) {
          continue
        }
        data[i]['selected'] = 0
        data[i]['className'] = ''
      }
    }
    this.props.upDateState({
      disabled: false,
      selectedIndex: index,
      productCollection: data
    })
  }
  render () {
    const {data} = this.props
    return (
      <div className='BlogAssembleList-select-collection'>
        <div className='header'>
          {/*<h2>Product Collection</h2>
          <div className='blog-assemble-search'>
            <Input search placeholder='Search' />
          </div>*/}
          <a href='http://buckydrop.test.com/en/admin/online_store/collections/edit' target='blank' className='edit' style={{padding: '0 10px'}}>
            <Icon type='add1' />
            <span>Create Product Colllection</span>
            <Icon type='edit' />
          </a>
        </div>
        <div className='coll-list'>
          <ul >
            {(data && data.length > 0) && data.map((item, i) =>
              <li key={item.id} className={item.className} onClick={() => this.handleSelect(i)}>
                <img src={item.cover_images} />
                <p>
                  <span>{item.title}</span>
                  <Icon type='yes-filling' />
                </p>
              </li>
            )}
          </ul>
        </div>
        <div className='load-more'>
          <Button type='sub' onClick={this.loadMore}>Load More</Button>
        </div>
      </div>
    )
  }
}
