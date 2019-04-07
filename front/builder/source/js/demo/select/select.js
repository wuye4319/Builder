
/**
 * @author Gavin Yang (杨伟伟)
 * @desc Demo Select (下拉选择器)
 */

import './select.less'
import Select from '../../../../plugin/component/Select'
import Icon from '../../../../plugin/component/Icon'
const Option = Select.Option

class Content extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectValue1: 'TEST2'
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleChange3 = this.handleChange3.bind(this)
  }
  componentWillMount () {
    document.getElementById('container').style.opacity = 1
  }
  handleChange1 (value) {
    this.setState({selectValue1: value})
  }
  handleChange2 (value) {
    this.setState({selectValue2: value})
  }
  handleChange3 (value) {
    this.setState({selectValue3: value})
  }
  render () {
    let {selectValue1} = this.state
    return (
      <div className='bc-demo'>
        <h1>Select 下拉选择</h1>
        <div className='block'>
          <h2>Small， 受控组件</h2>
          <Select value={selectValue1} size='small' onChange={this.handleChange1}>
            <Option value='TEST1'>TEST1</Option>
            <Option value='TEST2'>TEST2</Option>
            <Option value='TEST3'>TEST3</Option>
          </Select>
        </div>
        <div className='block'>
          <h2>Default, 非受控组件</h2>
          <Select pos='top'>
            <Option value='TEST1' disabled='true'>TEST1</Option>
            <Option value='TEST2'>TEST2</Option>
            <Option value='TEST3'>TEST3</Option>
            <Option value='TEST4'>TEST4</Option>
          </Select>
        </div>
        <div className='block'>
          <h2>Large，受控组件</h2>
          <Select size='large' disabled={true} onChange={this.handleChange3}>
            <Option value='TEST1'>
              <div>
                <Icon type='favorites' className='demo-select-icon' />
                <span className='demo-select-span'>TEST1</span>
              </div>
            </Option>
            <Option value='TEST2'>
              <div>
                <Icon type='move' className='demo-select-icon' />
                <span className='demo-select-span'>TEST2</span>
              </div>
            </Option>
            <Option value='TEST3'>
              <div>
                <Icon type='product-list' className='demo-select-icon' />
                <span className='demo-select-span'>TEST3</span>
              </div>
            </Option>
            <Option value='TEST4'>
              <div>
                <Icon type='phone' className='demo-select-icon' />
                <span className='demo-select-span'>TEST4</span>
              </div>
            </Option>
            <Option value='TEST5'>
              <div>
                <Icon type='favorites' className='demo-select-icon' />
                <span className='demo-select-span'>TEST5</span>
              </div>
            </Option>
            <Option value='TEST6'>
              <div>
                <Icon type='move' className='demo-select-icon' />
                <span className='demo-select-span'>TEST6</span>
              </div>
            </Option>
            <Option value='TEST7'>
              <div>
                <Icon type='product-list' className='demo-select-icon' />
                <span className='demo-select-span'>TEST7</span>
              </div>
            </Option>
            <Option value='TEST8'>
              <div>
                <Icon type='phone' className='demo-select-icon' />
                <span className='demo-select-span'>TEST8</span>
              </div>
            </Option>
          </Select>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
