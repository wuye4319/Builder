import React from 'react'
import Icon from '../../../../builder/plugin/component/Icon'

const indexOf = function (arr, value) {
  if (!arr || arr.length === 0) {
    return -1
  }
  for (let i = 0; arr[i]; i++) {
    if (arr[i]['id'] === value) {
      return i
    }
  }
  return -1
}

export const CollItem = (props) => {
  let _data = props.data
  if (!_data) {
    _data = {}
  }
  return (
    <div className='coll-item'>
      <img src={_data.cover_images}/>
      <span>{_data.title}</span>
    </div>
  )
}

export class CollItemList extends React.Component {
  handleSelect = (index) => {
    const { operateCode } = this.props
    switch (operateCode) {
      case 0:
        this.add(index)
        break
      case 1:
        this.replace(index)
        break
    }
  }
  replace = (index) => {
    let selectedIndex = -1
    let unselectedCollection = this.props.unselectedCollection.map((e, i) => {
      if (i === index) {
        if (e.selected) {
          e.selected = 0
        } else {
          e.selected = 1
          selectedIndex = i
        }
      } else {
        if (e.selected) {
          e.selected = 0
        }
      }
      return e
    })

    this.props.updateState({
      selectedIndex,
      unselectedCollection,
      footerBtnDisable: selectedIndex === -1
    })
  }
  add = (index) => {
    let cacheCollection = this.props.cacheCollection.slice()
    let unselectedCollection = this.props.unselectedCollection.slice()
    let id = unselectedCollection[index]['id']

    if (unselectedCollection[index]['selected']) {
      let _index = indexOf(this.cacheCollection, id)
      cacheCollection.splice(_index, 1)
      unselectedCollection[index]['selected'] = 0
    } else {
      cacheCollection.unshift(unselectedCollection[index])
      unselectedCollection[index]['selected'] = 1
    }

    this.props.updateState({
      cacheCollection,
      unselectedCollection,
      footerBtnDisable: !cacheCollection.length > 0
    })
  }
  render() {
    const { unselectedCollection } = this.props
    return (
      <React.Fragment>
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
        {
          (unselectedCollection && unselectedCollection.length > 0) && <div className='coll-list'>
            <ul>
              {
                unselectedCollection.map((item, i) => (
                  <li key={item.collection_id}>
                    <a href='javascript:void(0)'
                      className={item.selected === 1 ? 'selected' : ''}
                      onClick={() => this.handleSelect(i)}>
                      <img src={item.cover_images}/>
                      <p>
                        <span>{item.title}</span>
                        <span><Icon type='yes-filling' /></span>
                      </p>
                    </a>
                  </li>
                ))
              }
            </ul>
            {/* <Button type='sub'>Load More</Button> */}
          </div>
        }
      </React.Fragment>
    )
  }
}
