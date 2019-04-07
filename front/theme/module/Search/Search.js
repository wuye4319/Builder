/**
 * @author MG Ding (丁文强)
 * @desc 搜索结果
 */
// eslint-disable-next-line no-unused-vars
import './Search.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../plugin/component/Button'
import Input from '../../plugin/component/Input'
import Select from '../../plugin/component/Select'
import Pagination from '../../plugin/component/Pagination'
import Link from '../../plugin/component/Link'
import ItemsList from './ItemsList'
import { setClass, color, font, query2Obj } from '../../source/util'
import { searchProducts } from '../../source/service/page'

export default class Search extends React.Component {
  static propTypes = {
    config: PropTypes.object
  }
  static classPrefix = 'm-search'
  static sortMap = [
    {key: '1', label: 'New'},
    {key: '2', label: 'Price high to low'},
    {key: '3', label: 'Price low to high'}
  ]
  state = {
    data: null,
    keywords: decodeURIComponent(query2Obj().keywords || ''),
    pageSize: (this.props.rows || 2) * 4,
    page: 1,
    sort: '1', // 1最新 2价格从高到低 3价格从低到高
    total: 0,
    totalPage: 1,
    noResult: false
  }
  getData = (n) => {
    const {keywords, pageSize, page, sort} = this.state
    return searchProducts({keywords, pageSize, page: n || page, sort}).then((data) => {
      if (data.state === 0) {
        let _data = data.data
        let list = _data.product_list || []
        const {pageMode} = this.props
        this.setState({
          data: pageMode === 1 ? (this.state.data || []).concat(list) : list,
          total: _data.total || 0,
          totalPage: _data['total_page'] || 1,
          page: _data['current_page'] || 1,
          error: list && !list.length
        })
      }
    })
  }
  handleChangePage = (n) => {
    return this.getData(n)
  }
  handleChangeSort = (e) => {
    let value = e.target.value
    this.setState((state) => {
      let res = {sort: value}
      if (this.props.pageMode === 1) {
        res.page = 1
        res.data = state.data ? [] : state.data
      }

      return res
    }, this.getData)
  }
  handleSearch = () => {
    Link.goTo(`/search/?keywords=${encodeURIComponent(this.input.value.trim())}`)
  }
  enter2Search = (event) => {
    let currKey = event.keyCode || event.which || event.charCode

    if (currKey === 13) {
      this.handleSearch()
      event.preventDefault()
    }
  }
  dataPadding = (editLength) => {
    const {data} = this.state
    let _data = data.concat([])
    while (_data.length < editLength) {
      _data.push({
        sell_price: '7.80',
        market_price: '7.80',
        platform_name: 'TB',
        product_id: 'g20yq3' + Math.random(),
        product_name: '东方girls网红同款18早春系列四只猫咪头印花情侣短袖休闲T恤',
        source_url: 'https://item.taobao.com/item.htm?id=564557611305',
        main_img: '//gd3.alicdn.com/imgextra/i2/0/TB1ocGrn22H8KJjy1zkXXXr7pXa_!!0-item_pic.jpg',
        currency_symbol: 'US $'
      })
    }
    return _data
  }

  componentWillMount () {
    this.getData()
  }

  render () {
    const {classPrefix, sortMap} = Search
    const {pageMode} = this.props
    let {data, sort, keywords, total, totalPage, page, pageSize, error} = this.state
    const editLength = (this.props.config.rows || 2) * 4

    if (window.editMod && data && data.length < editLength) {
      data = this.dataPadding(editLength)
    }

    return (
      <div className={`${classPrefix} l-centerBlock ${setClass({})}`}>
        <div className={`${classPrefix}-search`}>
          <Input
            defaultValue={keywords}
            getInput={(ref) => { this.input = ref }}
            onKeyPress={this.enter2Search}
            clearIcon
            onChange={() => {
              const {error} = this.state
              if (error) {
                this.setState({error: false})
              }
            }}
            className={setClass({error})}
          />
          <Button onClick={this.handleSearch}>Search</Button>
        </div>
        {data
          ? data.length
            ? (
              <div className={`${classPrefix}-toolbar ${color.border('border')} clearfix`}>
                <h3 className={`${color('title')} ${font('subTitle')}`}>View {total} Product(s)</h3>
                <span>
                  {pageMode === 0 && <i className={`${color('text')} ${font('text')}`}>Sorting:</i>}
                  <Select value={sort} onChange={this.handleChangeSort}>
                    {sortMap.map(({key, label}) => <option value={key} key={key}>{label}</option>)}
                  </Select>
                </span>
              </div>
            )
            : (
              <div className={`${classPrefix}-none`}>
                <h3 className={`${color('title')} ${font('subTitle')}`}>Very sorry! No products found for "{keywords}"</h3>
                <dl>
                  <dt className={`${color('text')} ${font('text')}`}>Please try the following</dt>
                  <dd className={`${color('subText')} ${font('text')}`}>• Use more conventional wording</dd>
                  <dd className={`${color('subText')} ${font('text')}`}>• Check your spelling</dd>
                </dl>
              </div>
            )
          : null
        }
        <ItemsList data={data}/>

        {!!(data && data.length) && (
          <Pagination
            totalPage={totalPage}
            totalRow={total}
            pageNo={page}
            size={pageSize}
            handleChangePage={this.handleChangePage}
            scrollLoad={pageMode === 1}
          />
        )}

      </div>
    )
  }
}
