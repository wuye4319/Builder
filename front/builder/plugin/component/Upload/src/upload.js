
import './upload.less'

import Icon from '../../Icon'
import { getSignature, upload } from './signature'

class Upload extends React.Component {
    state = {
        uploadState: 'start',
        text: '',
        sign: {
            dir: null,
            host: null,
            policy: null,
            expire: null,
            accessId: null,
            signature: null,
        }
    }
    icon = (state) => {
        switch (state) {
            case 'start':
                return 'add2'
            case 'padding':
                return 'loading'
            case 'fail':
                return 'info-filling'
            default:
                return 'add2'
        }
    }
    startUpload = (params, _file) => {
        upload(params, _file).then(imagesUrl => {
            this.setState({ uploadState: 'start' })
            let fn = this.props.change
            if (fn && typeof fn === 'function') {
                /**
                 * imagesUrl 上传成功生成的url
                 * window.URL.createObjectURL(_file) 上传图片的本地本地URL（可选）
                 */
                fn(imagesUrl, window.URL.createObjectURL(_file))
            }

        }).catch((err) => {
            console.log(err)
            this.setState({ uploadState: 'fail', text: 'Failed' })
        })
    }
    handleUpload = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const { uploadState } = this.state
        let file = this.image.files[0]

        /** 无图片 **/
        if (!file) return

        /** 上传中 **/
        if (uploadState === 'padding') return

        /** 图片大于3M，退出 **/
        if (file.size > 1024 * 1024 * 3) {
            alert('max 3Mb')
            return
        }

        this.setState({ uploadState: 'padding' }, () => {
            //检查签名是否过期
            const sign = this.state.sign
            if (sign.expire && sign.expire < (~~(Date.now() / 1000))) {
                this.startUpload(sign, file)
                return
            }
            getSignature().then((data) => { this.startUpload(data, file) })
        })
    }
    render() {
        const { text, uploadState } = this.state
        return (
            <a href='javascript:void(0)'
                className='bc-upload'
                onClick={()=>{this.image.click()}}
            >
                <input 
                     hidden
                     type='file'
                     ref={ref => this.image = ref}
                     onChange={this.handleUpload}
                     accept='image/png,image/gif,image/jpeg'
                />
                <span className={`icon-text ${uploadState}`}>
                    <Icon type={this.icon(uploadState)} />
                    {
                        text && <i>{text}</i>
                    }
                </span>
                {
                    uploadState == 'fail' && <span 
                    className='icon-text re-upload'
                    onClick={this.handleUpload}
                    >
                        <Icon type='loading-circle' />
                        <i>re-Upload</i>
                    </span>
                }
            </a>
        )
    }
}

export default Upload
