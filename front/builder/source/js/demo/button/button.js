/**
 * @author MG Ding (丁文强)
 * @desc Button DEMO
 */
import '../../builder/src/builder.less'
import './button.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../../../../plugin/component/Button'
const ButtonGroup = Button.Group

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
          <h1>Button</h1>
          <div className='block'>
            <Button>default</Button>
          </div>
          <div className='block'>
            <Button type='sub'>type=sub</Button>
          </div>

          <br />
          <div className='block'>
            <Button size='large'>size=large</Button>
            <Button size='default'>size=default</Button>
            <Button size='small'>size=small</Button>
          </div>
          <div className='block'>
            <Button type='sub' size='large'>size=large</Button>
            <Button type='sub' size='default'>size=default</Button>
            <Button type='sub' size='small'>size=small</Button>
          </div>
          <br />
          <div className='block'>
            <Button href='http://www.baidu.com' target='_blank' size='large'>link</Button>
            <Button href='http://www.baidu.com' target='_blank'>link</Button>
            <Button href='http://www.baidu.com' target='_blank' disabled>link</Button>
            <Button href='http://www.baidu.com' target='_blank' size='small'>link</Button>
          </div>
          <div className='block'>
            <Button type='sub' href='http://www.baidu.com' target='_blank' size='large'>link</Button>
            <Button type='sub' href='http://www.baidu.com' target='_blank'>link</Button>
            <Button type='sub' href='http://www.baidu.com' target='_blank' disabled>link</Button>
            <Button type='sub' href='http://www.baidu.com' target='_blank' size='small'>link</Button>
          </div>
          <br />
          <div className='block'>
            <Button disabled size='large'>disabled</Button>
            <Button disabled>disabled</Button>
            <Button disabled size='small'>disabled</Button>
          </div>
          <div className='block'>
            <Button type='sub' disabled size='large'>disabled</Button>
            <Button type='sub' disabled>disabled</Button>
            <Button type='sub' disabled size='small'>disabled</Button>
          </div>
          <br />
          <div className='block'>
            <Button loading={loading} size='large' onClick={this.handleLoading}>Loading</Button>
            <Button loading size='large'>Loading</Button>
            <Button loading>Loading</Button>
            <Button loading size='small'>Loading</Button>
          </div>
          <div className='block'>
            <Button loading={loading} type='sub' size='large' onClick={this.handleLoading}>Loading</Button>
            <Button loading type='sub' size='large'>Loading</Button>
            <Button loading type='sub'>Loading</Button>
            <Button loading type='sub' size='small'>Loading</Button>
          </div>

          <div className='block'>
            <Button icon='delete' size='large'>Icon</Button>
            <Button icon='delete'>Icon</Button>
            <Button icon='delete' size='small'>Icon</Button>
          </div>

          <div className='block'>
            <Button icon='delete' type='sub' size='large'>Icon</Button>
            <Button icon='delete' type='sub'>Icon</Button>
            <Button icon='delete' type='sub' size='small'>Icon</Button>
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

        <div className='bc-buttonGroup-demo'>
          <h1>Button.Group</h1>

          <div className='block'>
            <ButtonGroup>
              <Button size='large'>large</Button>
              <Button size='large'>large</Button>
              <Button size='large'>large</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button>default</Button>
              <Button>default</Button>
              <Button>default</Button>
            </ButtonGroup>

            <ButtonGroup className='myClassName'>
              <Button size='small'>small</Button>
              <Button size='small'>small</Button>
              <Button size='small'>small</Button>
            </ButtonGroup>
          </div>
          <div className='block'>
            <ButtonGroup>
              <Button type='sub'>sub</Button>
              <Button type='sub'>sub</Button>
              <Button type='sub'>sub</Button>
            </ButtonGroup>
          </div>

          <br />
          <div className='block'>
            <ButtonGroup>
              <Button disabled>disabled</Button>
              <Button disabled>disabled</Button>
              <Button disabled>disabled</Button>
            </ButtonGroup>
          </div>
          <div className='block'>
            <ButtonGroup>
              <Button type='sub' disabled>disabled</Button>
              <Button type='sub' disabled>disabled</Button>
              <Button type='sub' disabled>disabled</Button>
            </ButtonGroup>
          </div>
        </div>

      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
