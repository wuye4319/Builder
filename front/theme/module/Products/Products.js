
/**
 * @author MG Ding (丁文强)
 * @desc 商详页
 */
import './Products.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../plugin/component/Button'
import Select from '../../plugin/component/Select'
import Quantity from '../../plugin/component/Quantity'
import Link from '../../plugin/component/Link'
import Icon from '../../plugin/component/Icon'
import Message from '../../plugin/component/Message'
import {setClass, color, font, copyJson, query2Obj, fetchLite} from '../../source/util'
import {productDetail, add2Cart} from '../../source/service/page'

let initialConfig = require('./config.json')

/* eslint-disable camelcase */

export default class Products extends React.Component {
  static propTypes = {
    config: PropTypes.object
  }
  static classPrefix = 'm-products'
  state = {
    id: query2Obj().id,
    activePic: 0,
    goodsInfo: null,
    propsMap: null,
    showGallery: false,
    selectedProps: {
      sku: null,
      quantity: 999,
      count: 1,
      price: null,
      skuImg: '',
      market_price: 0
    }
  }
  componentDidMount = () => {
    this.getGoodsInfo()
  }
  getGoodsInfo = () => {
    const {id} = this.state
    fetchLite(productDetail.bind(null, id), {
      done: (data) => {
        this.initGoods(data.data)
      }
    })
  }
  add2Cart = (isBuyNow) => {
    const {goodsInfo, selectedProps, id} = this.state
    if (!id) {
      return
    }

    fetchLite(add2Cart.bind(null, {
      id: goodsInfo.id,
      spu: goodsInfo.spu_code,
      sku: selectedProps.sku,
      count: selectedProps.count
    }), {
      done: (data) => {
        if (isBuyNow === true) {
          window.sessionStorage['cart_list'] = JSON.stringify([data.data['cart_id']])
          Link.goTo('/order_confirm/')
        } else {
          Message.success('success')
          this.props.reloadCartInfo()
        }
      }
    })
  }
  buyNow = () => {
    this.add2Cart(true)
  }
  initGoods (goodsInfo) {
    let skuList = goodsInfo.skus

    /** 上下架状态 **/
    let initGoodsDown = () => {
      let upAndDown = goodsInfo.upAndDown
      let res = false
      if (skuList && skuList.length > 0) {
        if (upAndDown === 2) res = 2
      } else {
        res = 1
      }
      return res
    }

    /** 属性列表 **/
    let initPropsMap = () => {
      let obj = {}
      let arr = []
      let {options} = goodsInfo
      let initProps = (props) => {
        return props[0].values.map(item => {
          return {
            state: 0,
            name: item,
            value: item
          }
        })
      }

      try {
        options.forEach(item => {
          if (!obj[item.id]) obj[item.id] = []
          obj[item.id].push(item)
        })

        for (let name in obj) {
          let props = obj[name]
          arr.push({
            name: props[0].name,
            activeIndex: -1,
            propsId: props[0].id,
            props: initProps(props)
          })
        }
      } catch (e) {
        console.error(e)
      }

      return arr
    }

    /** sku结果集 **/
    let initSkuResult = () => {
      let data = {}
      let skuResult = {}

      let makeMId = ({options1, options2, options3}) => {
        let arr = [options1, options2, options3]
        let str = ''

        for (let i = 0; i < arr.length; i++) {
          if (arr[i]) {
            str += `&options${i + 1}=${arr[i]}`
          } else {
            break
          }
        }

        return str.substr(1)
      }

      skuList.forEach(item => {
        data[makeMId(item)] = {
          sku: item.sku_code || null,
          quantity: item.quantity || 999,
          price: item.sell_price || null,
          skuImg: item.sku_img || '',
          market_price: item.market_price

        }
      })

      // 获得对象的key
      function getObjKeys (obj) {
        if (obj !== Object(obj)) throw new TypeError('Invalid object')
        let keys = []
        for (let key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) { keys[keys.length] = key }
        }
        return keys
      }

      // 把组合的key放入结果集SKUResult
      function add2SKUResult (combArrItem) {
        let key = combArrItem.join('&')
        skuResult[key] = {}
      }

      /**
       * 从数组中生成指定长度的组合
       * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
       */
      function combInArray (aData) {
        if (!aData || !aData.length) {
          return []
        }

        let len = aData.length
        let aResult = []

        for (let n = 1; n < len; n++) {
          let aaFlags = getCombFlags(len, n)
          while (aaFlags.length) {
            let aFlag = aaFlags.shift()
            let aComb = []
            for (let i = 0; i < len; i++) {
              aFlag[i] && aComb.push(aData[i])
            }
            aResult.push(aComb)
          }
        }

        return aResult
      }

      /**
       * 得到从 m 元素中取 n 元素的所有组合
       * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
       */
      function getCombFlags (m, n) {
        if (!n || n < 1) {
          return []
        }

        let aResult = []
        let aFlag = []
        let bNext = true
        let i, j, iCnt1

        for (i = 0; i < m; i++) {
          aFlag[i] = i < n ? 1 : 0
        }

        aResult.push(aFlag.concat())

        while (bNext) {
          iCnt1 = 0
          for (i = 0; i < m - 1; i++) {
            if (aFlag[i] === 1 && aFlag[i + 1] === 0) {
              for (j = 0; j < i; j++) {
                aFlag[j] = j < iCnt1 ? 1 : 0
              }
              aFlag[i] = 0
              aFlag[i + 1] = 1
              let aTmp = aFlag.concat()
              aResult.push(aTmp)
              if (aTmp.slice(-n).join('').indexOf('0') === -1) {
                bNext = false
              }
              break
            }
            aFlag[i] === 1 && iCnt1++
          }
        }
        return aResult
      }

      // 初始化得到结果集
      function initSKU () {
        // eslint-disable-next-line one-var
        let i, j, skuKeys = getObjKeys(data)
        for (i = 0; i < skuKeys.length; i++) {
          let skuKey = skuKeys[i] // 一条SKU信息key
          let sku = data[skuKey] // 一条SKU信息value
          // sku.quantity = data.quantity || 999 // 强制库存为999
          let skuKeyAttrs = skuKey.split('&') // SKU信息key属性值数组

          // 对每个SKU信息key属性值进行拆分组合
          let combArr = combInArray(skuKeyAttrs)
          for (j = 0; j < combArr.length; j++) {
            add2SKUResult(combArr[j], sku)
          }

          // 结果集接放入SKUResult
          skuResult[skuKeyAttrs.join('&')] = data[skuKeyAttrs.join('&')]
        }
      }

      initSKU()

      return skuResult
    }

    let initSkuResultWithNoProps = () => {
      let item = goodsInfo.skus[0]
      return {
        '': {
          sku: item.sku_code || null,
          quantity: item.quantity || 999,
          price: item.sell_price || null,
          skuImg: item.sku_img || '',
          market_price: item.market_price
        }
      }
    }

    /** 更新state **/
    this.setState(() => {
      let {options} = goodsInfo

      if (options && options.length) {
        return {
          goodsDown: initGoodsDown(),
          propsMap: initPropsMap(),
          skuResult: initSkuResult(),
          goodsInfo
        }
      } else {
        return {
          goodsDown: initGoodsDown(),
          propsMap: null,
          skuResult: initSkuResultWithNoProps(),
          goodsInfo
        }
      }
    }, () => {
      let {skus} = this.state.goodsInfo
      /** 如果只有一个sku，选中 **/
      if (skus && skus.length === 1) {
        this.selectSKU(skus[0].sku_code)
        return
      }

      /** 其他情况，过滤一次无sku的属性 **/
      this.initActiveSize()
    })
  }
  selectSKU (id) {
    // alert(id)
    /** 下半部分和handleActiveSize是一样的 **/

    let {skus, options} = this.state.goodsInfo
    let {skuResult} = this.state
    let skuInfo = null

    if (skus && skus.length > 0) {
      for (let i = 0; i < skus.length; i++) {
        if (skus[i].sku_code === id) skuInfo = skus[i]
      }
    }

    if (skuInfo) {
      if (options && options.length) {
        let checkedProps = (() => {
          let {options1, options2, options3} = skuInfo
          let arr = [options1, options2, options3]
          let res = []

          for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
              res.push(`options${i + 1}=${arr[i]}`)
            } else {
              break
            }
          }

          return res
        })()

        /**
         * 进一步处理propsMap:
         * 1.循环每个属性组和属性值
         * 2.选中状态不做处理
         * 3.未选中状态和checkedProps组合成新的checkedProps，在skuResult中查找，不存在即为没库存
         * **/
        let propsMap = this.refreshPropsMap(checkedProps)

        /**
         * 检查是否已选择完整的sku:
         * 1.checkedProps中没有""即为完整sku
         * 2.如果是完整sku则更新selectedProps
         * **/
        let {selectedProps} = this.state
        let sku = copyJson(skuResult[checkedProps.join('&')])
        sku.count = Math.min(selectedProps.count, sku.quantity)
        selectedProps = sku
        this.setState({propsMap, selectedProps})
      } else {
        let {selectedProps} = this.state
        let sku = copyJson(skuResult[''])
        sku.count = Math.min(selectedProps.count, sku.quantity)
        selectedProps = sku
        this.setState({selectedProps})
      }
    }
  }
  refreshPropsMap (checkedProps) {
    let propsMap = copyJson(this.state.propsMap)
    let {skuResult} = this.state

    return propsMap.map((item, i) => {
      let _checkedProps = copyJson(checkedProps)
      let activeIndex = -1

      item.props = item.props.map((prop, j) => {
        let ___checkedProps = copyJson(_checkedProps)
        ___checkedProps[i] = `options${i + 1}=${prop.value}`

        if (___checkedProps[i] === checkedProps[i]) {
          prop.state = 1
          activeIndex = j
        } else {
          prop.state = skuResult[___checkedProps.join('&').replace(/(^&*)|(&*$)/g, '').replace(/&{2,}/g, '&')] ? 0 : -1
        }
        return prop
      })
      item.activeIndex = activeIndex
      return item
    })
  }
  initActiveSize () {
    let checkedProps = this.state.propsMap.map(item => '')
    let propsMap = this.refreshPropsMap(checkedProps)
    this.setState({propsMap})
  }
  handleActiveSize (propsIndex, valueIndex, value_id) {
    let propsMap = copyJson(this.state.propsMap)
     /**
     * 不传入propsIndex,valueIndex用于过滤初始化时无sku的属性
     * **/
    if (propsIndex !== undefined && valueIndex !== undefined) {
      /**
       * 初步处理propsMap:
       * 1.如果点击的是禁用状态按钮，不做处理
       * 2.处理当前点击属性的选中状态
       * 3.当前属性组其他属性选中状态置为0
       * 4.更新当前属性组的activeIndex
       * **/
      let propState = propsMap[propsIndex].props[valueIndex].state

      if (propState === -1) return

      propsMap[propsIndex].props.map((item, i) => {
        if (valueIndex === i) {
          item.state = value_id ? 1 : 0
        } else {
          item.state = 0
        }
        return item
      })

      propsMap[propsIndex].activeIndex = value_id ? valueIndex : -1
    }

    /**
     * 获取已选中属性拼接成的属性id集合checkedProps
     * **/
    let checkedProps = propsMap.map((item, index) => item.activeIndex !== -1 ? `options${index + 1}=${item.props[item.activeIndex].value}` : '')

    /**
     * 进一步处理propsMap:
     * 1.循环每个属性组和属性值
     * 2.选中状态不做处理
     * 3.未选中状态和checkedProps组合成新的checkedProps，在skuResult中查找，不存在即为没库存
     * **/

    propsMap = this.refreshPropsMap(checkedProps)

    /**
     * 检查是否已选择完整的sku:
     * 1.checkedProps中没有""即为完整sku
     * 2.如果是完整sku则更新selectedProps
     * **/
    let {skuResult, selectedProps} = this.state
    if (checkedProps.indexOf('') === -1) {
      let sku = copyJson(skuResult[checkedProps.join('&')])
      sku.count = Math.min(selectedProps.count, sku.quantity)
      selectedProps = sku
    } else {
      selectedProps.sku = null
    }

    this.setState(({activePic}) => ({propsMap, selectedProps, activePic: selectedProps.skuImg ? -1 : activePic}))
  }
  handleToggleGallery = () => {
    this.setState(({showGallery}) => {
      window.document.body.style.overflowY = showGallery ? 'auto' : 'hidden'
      return {showGallery: !showGallery}
    })
  }
  handleActivePic = (i) => {
    this.setState({activePic: i})
  }
  handleChangeQuantity = (n) => {
    this.setState(({selectedProps}) => {
      let {count, ...rest} = selectedProps
      rest.count = n
      return {selectedProps: rest}
    })
  }
  render () {
    const {classPrefix} = Products
    const {config = initialConfig} = this.props
    const {activePic, goodsInfo, propsMap, selectedProps, showGallery} = this.state
    const {market_price: showMarket_price, buyNow} = config
    const {skuImg} = selectedProps
    let mainImg = goodsInfo ? activePic === -1 ? {image_url: skuImg, alt: ''} : goodsInfo.imgs[activePic] : ''

    const renderPage = () => {
      let quantity = goodsInfo.quantity || 0
      let price = goodsInfo.sell_price
      let market_price = goodsInfo.market_price
      let detail = goodsInfo.detail
      let symbol = goodsInfo.currency_symbol

      if (selectedProps.sku) {
        quantity = selectedProps.quantity
        price = selectedProps.price
        market_price = selectedProps.market_price
      }

      return (
        <div className={`${classPrefix} l-centerBlock`}>
          <div className={`${classPrefix}-goods`}>
            <div className={`${classPrefix}-review`}>
              <div className={`${classPrefix}-review-window`}>
                <div>
                  {mainImg && <img src={mainImg.image_url} alt={mainImg.alt} />}
                </div>
                <Icon
                  type='fullscreen'
                  className={`${classPrefix}-review-btn ${color('icon')}`}
                  onClick={this.handleToggleGallery}
                />
              </div>
              {!!(goodsInfo.imgs && goodsInfo.imgs.length) && (
                <div className={`${classPrefix}-review-list`}>
                  <ul>
                    {goodsInfo.imgs.map(({id, image_url, alt}, i) => (
                      <li
                        key={id}
                        onClick={this.handleActivePic.bind(this, i)}
                      >
                        <img src={image_url} alt={alt} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            <div className={`${classPrefix}-info`}>
              <header>
                <h1 className={`${color('title')} ${font('title')}`}>{goodsInfo.product_name}</h1>
                <h2 className={`${color('price')} ${font('price')}`}>{symbol}{price}</h2>
                {showMarket_price && <span className={`${color('subText')} ${font('subText')}`}>MARKET {symbol}{market_price}</span>}
              </header>
              <form>
                {!!(propsMap && propsMap.length) && propsMap.map(({name, props, propsId, activeIndex}, index) => {
                  let value = activeIndex === -1 ? '' : props.filter(({state}) => state === 1)[0].value + ''
                  return (
                    <React.Fragment key={propsId}>
                      <p className={`formLabel ${color('text')} ${font('secTitle')}`}>{name}</p>
                      <Select className='formItem' name={propsId} value={value} onChange={(e) => {
                        let {value} = e.target
                        let valueIndex = 0
                        if (value) {
                          for (let i = 0; i < props.length; i++) {
                            if (props[i].value + '' === value) {
                              valueIndex = i
                              break
                            }
                          }
                        } else {
                          for (let i = 0; i < props.length; i++) {
                            if (props[i].state === 1) {
                              valueIndex = i
                              break
                            }
                          }
                        }

                        this.handleActiveSize(index, valueIndex, value)
                      }}>
                        <option value='' key=''>please choose</option>
                        {props.map(({name, value, state}) => <option value={value + ''} key={value} disabled={state === -1}>{name}</option>)}
                      </Select>
                    </React.Fragment>
                  )
                })}
                <p className={`formLabel ${color('text')} ${font('secTitle')}`}>Quantity</p>
                <Quantity className='formItem' max={quantity} value={selectedProps.count} onChange={this.handleChangeQuantity} />
                <span className={`remain ${color('subText')} ${font('subText')}`}>
                The remaining {quantity} items
              </span>

                <Button
                  className={`formItem add2Cart ${buyNow ? '' : 'noBuyNow'}`}
                  disabled={!selectedProps.sku}
                  onClick={this.add2Cart}
                >ADD TO CART</Button>
                {buyNow && (
                  <Button
                    className='formItem buyNow'
                    disabled={!selectedProps.sku}
                    onClick={this.buyNow}
                    type='ghost'
                  >BUY NOW</Button>
                )}

              </form>
            </div>
          </div>

          {!!detail && (
            <div
              className={`${classPrefix}-desc`}
              dangerouslySetInnerHTML={{__html: detail}}
            />
          )}

          {showGallery && (
            <Gallery
              classPrefix={classPrefix}
              imgs={goodsInfo.imgs}
              handleClose={this.handleToggleGallery}
              activePic={activePic}
              mainImg={mainImg}
              handleActivePic={this.handleActivePic}
            />
          )}
        </div>
      )
    }

    return goodsInfo ? renderPage() : null
  }
}

class Gallery extends React.Component {
  render () {
    const {classPrefix, imgs, mainImg, handleClose, activePic, handleActivePic} = this.props
    return (
      <div className={`${classPrefix}-gallery`}>
        <div className={`${classPrefix}-gallery-top`}>
          <div>
            <img src={mainImg.image_url} />
          </div>
        </div>
        <div className={`${classPrefix}-gallery-bottom`}>
          <ul>
            {imgs.map(({image_url}, i) => (
              <li
                key={i}
                onClick={() => { handleActivePic(i) }}
                className={setClass({active: i === activePic})}
              >
                <img src={image_url} />
              </li>
            ))}
          </ul>
        </div>
        <Icon type='close' className={`${classPrefix}-gallery-close`} onClick={handleClose} />
      </div>
    )
  }
}
