/**
 * @author MG Ding (丁文强)
 * @desc 页面基本布局
 */
import React from 'react'
import Header from '../module/Header/Header'
import Footer from '../module/Footer/Footer'
import UserAside from '../module/UserAside/UserAside'
const {setClass, color, font} = window.supervar.util

export default class Layout extends React.Component {
    render () {
        const {header, footer, fetch} = this.props.config
        const {pageMode, userCenter, children, userInfo, cartInfo} = this.props
        return (
            <div className={`l-wrap ${color.bg('bg')} ${color('text')} ${font('text')} ${setClass({'l-mobile': pageMode === 1})}`}>
                <div className='l-header'>
                    <Header config={header} fetch={fetch} pageMode={pageMode} userInfo={userInfo} cartInfo={cartInfo} />
                </div>
                <div className='l-main'>
                    {userCenter
                        ? (
                            <UserAside type={userCenter}>
                                {children}
                            </UserAside>
                        )
                        : children
                    }
                </div>
                <div className='l-footer'>
                    <Footer config={footer} fetch={fetch} pageMode={pageMode} />
                </div>
            </div>
        )
    }
}
