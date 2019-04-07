/**
 * @author MG Ding (丁文强)
 * @desc Quantity DEMO
 */
import '../../../theme.less'
import './quantity.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Quantity from '../../../../plugin/component/Quantity'
import Button from '../../../../plugin/component/Button'

class Content extends React.Component {
  state = {
    n: 1
  }
  render () {
    return (
      <div className='bc-demo'>
        <h1>Quantity 数量</h1>

        <h2>非受控组件</h2>
        <Quantity ref={(ref) => { this.q1 = ref }} />
        <Button onClick={() => { window.alert(this.q1.value) }}>获取值</Button>

        <h2>受控组件</h2>
        <Quantity
          value={this.state.n}
          onChange={(n) => {
            this.setState({n})
          }}
        />
        <Button onClick={() => { this.setState({n: this.state.n + 1}) }}>+1</Button>

        <h2>默认值 defaultValue={10}</h2>
        <Quantity defaultValue={10} />

        <h2>最大值和最小值 min={10} max={20}</h2>
        <Quantity min={10} max={20} defaultValue={15} />

        <h2>disabled</h2>
        <Quantity disabled />
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
