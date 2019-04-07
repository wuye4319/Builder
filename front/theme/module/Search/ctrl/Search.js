/**
 * @author MG Ding (丁文强)
 * @desc 搜索结果
 */
import React from 'react'
import PropTypes from 'prop-types'
// import CheckBox from '../../../../builder/plugin/component/Checkbox'
// const {util} = window.supervar
import './Search.less'

class ProductsCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    changeConfig: PropTypes.func,
    cacheConfig: PropTypes.func
  }
  static classPrefix = 'ctrl-search'
  updateConfig = (key, value, cache) => {
    let {config} = this.props
    config[key] = value
    this.props.changeConfig(config, cache)
  }
  handleChangeRows = (e) => {
    this.updateConfig('rows', e.target.value - 0, true)
  }
  render () {
    const {classPrefix} = ProductsCtrl
    const { rows } = this.props.config

    return (
      <div className={classPrefix}>
        <h2 className='ctrl-card-header'>SETTINGS BAR</h2>
        <div className='ctrl-card'>
          <p>Rows: {rows}</p>
          <input
            value={rows}
            type='range'
            max={6}
            min={2}
            onChange={this.handleChangeRows}
          />
        </div>
      </div>
    )
  }
}

export default ProductsCtrl
