/**
 * @author MG Ding (丁文强)
 * @desc Button DEMO
 */
import '../../../theme.less'
import './modal.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../../../../plugin/component/Button'
import Modal from '../../../../plugin/component/Modal'

class Content extends React.Component {
  state = {
    m1: false,
    m2: false,
    m3: false,
    m4: false,
    m5: false,
    m6: false,
    m7: false,
    m8: false,
    m9: false,
    m10: false,
    m11: false,
    loading: false
  }
  closeModal = (key) => {
    this.setState({[key]: false})
  }
  openModal = (key) => {
    this.setState({[key]: true})
  }
  render () {
    const {m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, loading} = this.state
    return (
      <div className='bc-demo'>
        <h1>Modal 模态框</h1>
        <Button onClick={this.openModal.bind(this, 'm1')}>M1: 基本对话框</Button>
        <Modal
          title='M1: 基本对话框'
          visible={m1}
          onCancel={this.closeModal.bind(this, 'm1')}
          onOk={this.closeModal.bind(this, 'm1')}
        >
          <p>设置了title, visible, onCancel, onOk</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm2')}>M2: 修改底部按钮文字</Button>
        <Modal
          title='M2: 自定义底部按钮文字'
          visible={m2}
          onCancel={this.closeModal.bind(this, 'm2')}
          onOk={this.closeModal.bind(this, 'm2')}
          cancelText='自定义按钮文字'
          okText='自定义按钮文字'
        >
          <p>通过cancelText， okText修改底部按钮文字</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm3')}>M3: 精简对话框部件</Button>
        <Modal
          title=''
          visible={m3}
          footer={null}
          closable={false}
          onCancel={this.closeModal.bind(this, 'm3')}
        >
          <p>M3: 精简对话框部件</p>
          <p>{`title=''`} 去掉标题</p>
          <p>{`footer={null}`} 去掉底部</p>
          <p>{`closable={false}`} 去掉右上角关闭按钮</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm4')}>M4: 点击遮罩层不能关闭对话框</Button>
        <Modal
          title='M4: 点击遮罩层不能关闭对话框'
          visible={m4}
          onCancel={this.closeModal.bind(this, 'm4')}
          onOk={this.closeModal.bind(this, 'm4')}
          maskClosable={false}
        >
          <p>设置{`maskClosable={false}`}</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm5')}>M5: 不显示遮罩层</Button>
        <Modal
          title='M5: 不显示遮罩层'
          visible={m5}
          onCancel={this.closeModal.bind(this, 'm5')}
          onOk={this.closeModal.bind(this, 'm5')}
          mask={false}
        >
          <p>设置{`mask={false}`}</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm6')}>M6: 关闭对话框时摧毁组件</Button>
        <Modal
          title='M6: 关闭对话框时摧毁组件'
          visible={m6}
          onCancel={this.closeModal.bind(this, 'm6')}
          onOk={this.closeModal.bind(this, 'm6')}
          destroyOnClose
        >
          <p>设置{`destroyOnClose`}</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm7')}>M7: 指定Modal挂载的HTML节点</Button>
        <Modal
          title='M7: 指定Modal挂载的HTML节点'
          visible={m7}
          onCancel={this.closeModal.bind(this, 'm7')}
          onOk={this.closeModal.bind(this, 'm7')}
          getContainer={() => window.document.getElementById('container')}
        >
          <p>设置{`getContainer为一个函数，返回HTML节点为挂载点`}</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm8')}>M8: 自定义底部</Button>
        <Modal
          title='M8: 自定义底部'
          visible={m8}
          onCancel={this.closeModal.bind(this, 'm8')}
          footer={<p style={{padding: 24, textAlign: 'center'}}>这是一个自定义底部</p>}
        >
          <p>设置{`footer={ReactNode}`}</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm9')}>M9: 自定义样式</Button>
        <Modal
          title='M9: 自定义样式'
          visible={m9}
          onCancel={this.closeModal.bind(this, 'm9')}
          onOk={this.closeModal.bind(this, 'm9')}
          className='myClassName'
          style={{color: 'red'}}
          zIndex={2000}
          width={760}
        >
          <p>设置{`className='类名'`}给对话框添加className自定义样式</p>
          <p>设置{`style={样式}`}给对话框添加style自定义样式</p>
          <p>设置{`zIndex={number}`}给对话框最外层添加zIndex</p>
          <p>设置{`width={number}`}定义对话框宽度</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm10')}>M10: 内容超高的对话框</Button>
        <Modal
          title='M10: 内容超高的对话框'
          visible={m10}
          onCancel={this.closeModal.bind(this, 'm10')}
          onOk={this.closeModal.bind(this, 'm10')}
        >
          <p>内容超高的对话框</p>
          <p style={{height: 1000}}>&nbsp;</p>
          <p>内容超高的对话框</p>
        </Modal>

        <Button onClick={this.openModal.bind(this, 'm11')}>M11: 确认按钮loading状态</Button>
        <Modal
          title='M11: confirmLoading确认按钮loading状态'
          visible={m11}
          onCancel={this.closeModal.bind(this, 'm11')}
          onOk={() => {
            this.setState({loading: true}, () => {
              setTimeout(() => {
                this.setState({loading: false})
                this.closeModal('m11')
              }, 1000)
            })
          }}
          confirmLoading={loading}
        >
          <p>confirmLoading确认按钮loading状态</p>
        </Modal>

        {/* <h1>Modal methods</h1>
        <Button onClick={() => {
          Modal.confirm({
            title: 'Title',
            content: '确认和取消回调',
            onOk: () => {
              window.alert('点击了确定')
            },
            onCancel: () => {
              window.alert('点击了取消')
            }
          })
        }}>Modal.confirm() 确认和取消回调</Button>

        <Button onClick={() => {
          let confirm = Modal.confirm({
            title: 'Title',
            content: '两秒后自动关闭'
          })
          setTimeout(() => {
            // console.log(confirm.close)
            confirm.close()
          }, 2000)
        }}>Modal.confirm() 两秒后自动关闭</Button> */}

        <div style={{height: 1500, background: '#ddd', width: 200}}>撑高页面</div>
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
