/**
 * @author Alan (曹昌盛)
 * @desc 首页自定义模块控制器选择图片
 */
import React from 'react'
import Icon from '../../../../builder/plugin/component/Icon'
import Button from '../../../../builder/plugin/component/Button'
import Input from '../../../../builder/plugin/component/Input'
import Tabs from '../../../../builder/plugin/component/Tabs'

const Pane = Tabs.Pane
const blogAssembleList = [
  {
    imgSrc: '/source/img/001.png'
  },
  {
    imgSrc: '/source/img/002.png'
  },
  {
    imgSrc: '/source/img/003.png'
  },
  {
    imgSrc: '/source/img/004.png'
  }
]

class ImageAssembleList extends React.Component {
  state = {}
  closeImageAssembleList = () => {
    this.props.toggleImageAssembleList()
  }

  render () {
    const {showImageAssembleList} = this.props

    return (
      <div className={`ImageAssembleList-wrap ${showImageAssembleList ? 'show' : ''}`}>
        <div className='title'>
          <span>Images</span>
          <span className='icon' onClick={this.closeImageAssembleList}>
            <Icon type='close' />
          </span>
        </div>
        <div className='image-list-tables-wrap'>
          <Tabs className='image-list-tables' defaultActiveKey='1'>
            <Pane key='1' tab='Library' forceRender>
              <div className='library-image-picker'>
                <div className='library-image-list'>
                  <div className='img-empty'>
                    <h3>You haven't uploaded any pictures yet</h3>
                    <form>
                      <label>
                        <input type='file' accept='image/jpeg, image/jpg' />
                      </label>
                    </form>
                    <h4>You can Upload JPG,JPEG Less than 2MB</h4>
                  </div>
                </div>
              </div>
            </Pane>
            <Pane key='2' tab='Free Images' forceRender>Tab2</Pane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default ImageAssembleList
