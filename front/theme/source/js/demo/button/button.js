/**
 * @author MG Ding (丁文强)
 * @desc Button DEMO
 */
import './button.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../../../../plugin/component/Button'

class Content extends React.Component {
  state = {
    loading: false
  }

  handleLoading = () => {
    this.setState({loading: true}, () => {
      setTimeout(() => {
        this.setState({loading: false})
      }, 2000)
    })
  }
  render () {
    const {loading} = this.state

    return (
      <div className='bc-demo'>
        <div className='bc-button-demo'>
          <h1>Button 按钮</h1>
          <div className='block'>
            <Button>default</Button>
          </div>
          <div className='block'>
            <Button type='ghost'>type=ghost</Button>
          </div>

          <br />
          <div className='block'>
            <Button href='http://www.baidu.com' target='_blank'>link</Button>
            <Button href='http://www.baidu.com' target='_blank' disabled>link</Button>
          </div>
          <div className='block'>
            <Button type='ghost' href='http://www.baidu.com' target='_blank'>link</Button>
            <Button type='ghost' href='http://www.baidu.com' target='_blank' disabled>link</Button>
          </div>
          <br />
          <div className='block'>
            <Button disabled>disabled</Button>
          </div>
          <div className='block'>
            <Button type='ghost' disabled>disabled</Button>
          </div>
          <br />
          <div className='block'>
            <Button loading={loading} onClick={this.handleLoading}>Loading</Button>
            <Button loading>Loading</Button>
          </div>
          <div className='block'>
            <Button loading={loading} type='ghost' onClick={this.handleLoading}>Loading</Button>
            <Button loading type='ghost'>Loading</Button>
          </div>

          <div className='block'>
            <Button icon='user'>Icon</Button>
          </div>

          <div className='block'>
            <Button icon='user' type='ghost'>Icon</Button>
          </div>

          <div className='block'>
            <Button
              onClick={() => {
                window.alert('ok')
              }}>onClick</Button>
            <Button style={{marginLeft: 100}}>myStyle</Button>
            <Button className='myClassName'>myClassName</Button>
          </div>
        </div>

      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
