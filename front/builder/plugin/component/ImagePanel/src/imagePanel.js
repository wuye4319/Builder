import './imagePanel.less'

import React from 'react'
import ReactDOM from 'react-dom'
import Icon from '../../Icon'
import Tabs from '../../Tabs'
import Button from '../../Button'
import Upload from '../../Upload'

import { getImages } from '../../../../source/service/api'
const ImageItems = (props) => {
    if (!props.data || props.data.length === 0) {
        return null
    }
    return (
        <ul className='images-list'>
            {
                props.data.map((item, index) => (
                    <li key={index.toString()}
                        className={item.selected ? 'selected' : ''}
                        onClick={() => props.selectPreviews(index)}
                    >
                        <div className='itemImg' style={{ backgroundImage: `url(${item.url})` }} />
                        <Icon type='yes-filling' />
                    </li>
                ))
            }
        </ul>
    )
}

class ImageCtrl extends React.Component {
    state = {
        activeKey: '1',//当前选中tab,
        showPanel:false, // 是否打开tab面板
        localUrlArr: [], // 上传成功图片转化成的URL资源数组
        uploadUrlArr: [], // 上传成功生成的阿里云图片链接Url
        freeImages: [ //第三方图片资源库
            {
                selected: 0, url: 'https://gw.alicdn.com/bao/uploaded/TB1sYPQNpXXXXX4aXXXSutbFXXX.jpg_.webp',
            },
            {
                selected: 0, url: 'https://gw.alicdn.com/bao/uploaded/TB1voBROVXXXXcVXVXXSutbFXXX.jpg_.webp',
            },
        ],
        pageSize: 10, //每页的数据条数
        current: 1, // 当前页码，
        total: null, //数据总数量
    }
    componentDidMount () {
      this.index = 0
      // 获取图片库资源
      getImages().then(res=>{
          if (res.state !==0 || !res.data || !res.data.data || res.data.data.length===0) {
              return
          }
          const { uploadUrl } = this.state
          this.setState({uploadUrl: [...uploadUrl, ...res.data.data]})
      })
    }
    componentWillUnmount () {
        this.index = null
    }
    fetchImages = ()=>{
      const { pageSize, current, total,uploadUrlArr} = this.state
      // 数据拉取完后禁止再发送请求

      if (uploadUrlArr.length === total) {
          return
      }
    }
    changeFile = (url, localUrl) => {
        if (!url) {
            return
        }

        let localUrlArr = [...this.state.localUrlArr]
        let uploadUrlArr = [...this.state.uploadUrlArr]

        if (localUrlArr.length === 0) {
            localUrlArr.push({ selected: 1, url: localUrl })
            uploadUrlArr.push(url)
        } else {
            localUrlArr = this.state.localUrlArr.map(item => {
                if (item.selected) {
                    item.selected = 0
                }
                return item
            })
            localUrlArr.unshift({ selected: 1, url: localUrl })
            uploadUrlArr.unshift(url)
        }

        let hasSelected = this.state.freeImages.some(item => (item.selected == 1))
        if (hasSelected) {
            let freeImages = this.state.freeImages.map(item => {
                item.selected = 0
                return item
            })
            this.setState({ uploadUrlArr, localUrlArr, freeImages,name:'f' })
            return
        }
        this.setState({ uploadUrlArr, localUrlArr })
    }
    selectPreviews = (index) => {
        this.index = index
        const {activeKey} = this.props

        if (activeKey === '1') {
            let localUrlArr = [...this.state.localUrlArr]
            let hasSelected = this.state.freeImages.some(item => (item.selected == 1))

            if (hasSelected) {
                let freeImages = this.state.freeImages.map(item => {
                    item.selected = 0
                    return item
                })
                this.setState({ localUrlArr: setSelected(localUrlArr), freeImages })
                return
            }
            this.setState({ localUrlArr: setSelected(localUrlArr) })
        }

        if (activeKey === '2') {
            let freeImages = [...this.state.freeImages]
            let hasSelected = this.state.localUrlArr.some(item => (item.selected == 1))

            if (hasSelected) {
                let localUrlArr = this.state.localUrlArr.map(item => {
                    item.selected = 0
                    return item
                })
                this.setState({ localUrlArr, freeImages: setSelected(freeImages) })
                return
            }
            this.setState({ freeImages: setSelected(freeImages) })
        }

        function setSelected(array) {
            for (let i = 0; array[i]; i++) {
                if (i === index) {
                    array[i]['selected'] = !array[i]['selected']
                } else {
                    if (array[i]['selected']) {
                        array[i]['selected'] = 0
                    }
                }
            }
            return array
        }
    }
    handleConfirm = () => {
        let index = this.index
        let { activeKey } = this.props
        let imageUrl
    
        if (activeKey === '1') {
            imageUrl = this.state.uploadUrlArr[index]
        } else if (activeKey === '2') {
            imageUrl = this.state.freeImages[index]['url']
        }

        if (!imageUrl) {
            return
        }
        this.props.confirmPreviews(imageUrl)
    }
    clearSelected = ()=>{
        let freeImages = [...this.state.freeImages]
        let localUrlArr = [...this.state.localUrlArr]
        
        if (freeImages.length ===0 && localUrlArr.length===0) {
            return
        }

        if (freeImages.length>0) {
            freeImages.forEach(item=>{item.selected = 0})
        }

        if (localUrlArr.length>0) {
            localUrlArr.forEach(item=>{item.selected = 0})
        }
        this.setState({ localUrlArr, freeImages })
    }
    isSelected = () => {
        return (this.state.localUrlArr.some(item => (item.selected == 1)) || this.state.freeImages.some(item => (item.selected == 1))
        )
    }
    switchTab = (key) => {
        this.setState({ activeKey: key })
    }
    showPanel = (activeKey)=>{
        this.setState({ showPanel: true, activeKey})
    }
    closePanel = ()=>{
        this.setState({ showPanel: false})
    }
    render() {
        const { localUrlArr, freeImages,showPanel, activeKey } = this.state
        const disabled = this.isSelected()

        return (
            <div className={`upload-image ${showPanel ? 'show' : 'hide'}`}>
                <div className='upload-image-titleNav'>
                    <h2>Image</h2>
                    <Icon type='close' onClick={this.closePanel} />
                </div>
                <div className='upload-image-list'>
                    <Tabs activeKey={activeKey} onChange={this.switchTab}>
                        <Tabs.Pane key='1' tab='Library'>
                            <Upload
                                change={this.changeFile}
                            />
                            <ImageItems
                                name='library'
                                data={localUrlArr}
                                selectPreviews={this.selectPreviews}
                            />
                        </Tabs.Pane>
                        <Tabs.Pane key='2' tab='Free images'>
                            <ImageItems
                                forceRender
                                name='free'
                                data={freeImages}
                                selectPreviews={this.selectPreviews}
                            />
                        </Tabs.Pane>
                    </Tabs>
                </div>
                <div className='upload-image-bottom-btn'>
                    <Button disabled={!disabled} onClick={this.handleConfirm}>Select</Button>
                </div>
            </div>
        )
    }
}


export default class ImagePanel extends React.Component {
    state = {
        sideNode: null, // ImageCtrl的挂在DOM节点
        showSelect: this.props.bdImg,
    }
    componentDidMount () {
        let t = setInterval(()=>{
          if (this.state.sideNode) {
              clearInterval(t)
          }else {
            this.setState({
              sideNode: document.getElementsByClassName('builder-aside')[0]
            })
          }
        },60)
    }
    handleRemove = () => {
        this.setState({ showSelect: false})
        this.imgCtrl.clearSelected()
        this.props.selectImage()
    }
    updateState = (params) => {
        if (!params && typeof params !== 'object') {
            return
        }
        this.setState({ ...params })
    }
    confirmPreviews = (image) => {
        this.setState({ showPanel: false, showSelect: true })
        this.props.selectImage(image)
    }
    show = (key)=>{
        this.imgCtrl.showPanel(key)
}
    render() {
        const { showSelect, sideNode} = this.state
        const props = {
            updateState: this.updateState,
            handleRemove: this.handleRemove,
            confirmPreviews: this.confirmPreviews,
            handleSelectImage: this.handleSelectImage
        }
        const { imgUrl } = this.props
        return (
            <React.Fragment>
                <div className='bc-upload-image'>
                  {
                    showSelect ?<div className='bc-upload-image-previews'>
                        <div className='previews' style={{ backgroundImage: 'url(' + imgUrl + ')' }} />
                        <div className='edit'>
                            <Button.Group>
                                <Button type='sub' onClick={this.show}>Change</Button>
                                <Button type='sub' onClick={this.handleRemove}>Remove</Button>
                            </Button.Group>
                        </div>
                    </div>:  <div className='bc-upload-image-select'>
                        <Button onClick={()=>{this.show('1')}}>Select image</Button>
                        <a href='javascript:void(0)' onClick={()=>{this.show('2')}}>Explore free image</a>
                    </div>
                  }
                </div>
                {
                  sideNode && ReactDOM.createPortal(
                    <ImageCtrl
                      {...props}
                      ref={ref=>{this.imgCtrl = ref}}/>,
                    sideNode
                  )
                }
            </React.Fragment>
        )
    }
}