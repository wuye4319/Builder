import './Confirm.less'
import React from 'react'
import Icon from '../../Icon/'
import Button from '../../Button/'

export default class Confirm extends React.Component {
  render () {
    return (
      <div className='bc-confirm-mask'>
        <div className='content'>
          <div className='title'>
            <span>
              <Icon type='info-filling' />
            </span>
            <span>Delete this address ?</span>
          </div>
          <div className='main'>
            <p>xiao Liao 18713502156</p>
            <p>City,Chegongmiao Futian Shenzhen,518000 Guangdong China</p>
          </div>
          <div className='btn'>
            <Button>DETERMINE</Button>
            <Button>CANCEL</Button>
          </div>
        </div>
      </div>
    )
  }
}
