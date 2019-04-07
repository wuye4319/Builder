/**
 * @author MG Ding (丁文强)
 * @desc builder右侧
 */

import './BuilderBody.less'
import React from 'react'
import Icon from '../../../../plugin/component/Icon'
import Select from '../../../../plugin/component/Select'
import Button from '../../../../plugin/component/Button'
import { setClass } from '../../../../source/util'

const reviewModal = [
  {type: 'phone', id: 1},
  {type: 'computer', id: 0},
  {type: 'fullscreen', id: 2}
]

class BuilderBody extends React.Component {
  handleChangePageMode = (type) => {
    this.props.handleChangePageMode(type)
  }
  handleChangePage = (value) => {
    this.props.handleChangePage(value)
  }

  render () {
    const {pageState, title, pageMode, pageHref, routerMap, handlePageLoad, handlePageError, getPageContext, isModuleDragged, pageOrigin} = this.props
    let _routerMap = routerMap.filter(el => (el.sort >= 0)).sort((a, b) => (a.sort - b.sort))
    return (
      <div className='builder-body'>
        <header>
          <div className='builder-header'>
            <div>
              <div className='logo'/>
              <Select value={title} onChange={this.handleChangePage}>
                {_routerMap.map((item) => <Select.Option key={item.name} value={item.title}>{item.title}</Select.Option>)}
              </Select>
            </div>
            <div className='builder-header-review'>
              {reviewModal.map(item => {
                const {id, type} = item
                return (
                  <span
                    key={id}
                    className={setClass({active: pageMode === id})}
                    onClick={this.handleChangePageMode.bind(this, id)}
                  >
                    <Icon type={type}/>
                  </span>
                )
              })}

            </div>
            <div>
              <Button style={{verticalAlign: 'middle'}} onClick={this.props.savePageConfig}>Save</Button>
            </div>
            {/* <div className={setClass({
              'page-loading': pageState === 0,
              'page-success': pageState === 1,
              'page-error': pageState === -1
            })}>
              {setClass({
                'loading...': pageState === 0,
                'success': pageState === 1,
                'failed': pageState === -1
              })}
            </div> */}
          </div>
        </header>
        <div className='builder-body-main'>
          <div className={'pageContainer ' + setClass({moduleDragged: isModuleDragged})}>
            <iframe
              src={pageOrigin + pageHref}
              frameBorder='0'
              style={{width: '100%', height: '100%', display: 'block'}}
              ref={getPageContext}
              onLoad={handlePageLoad}
              onError={handlePageError}
            />
          </div>
        </div>

      </div>
    )
  }
}

export default BuilderBody
