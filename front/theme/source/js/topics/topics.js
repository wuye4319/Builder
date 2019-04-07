/**
 * @author：Gavin Yang (Y杨伟伟)
 * @desc：专题集合页
 * @date：2018.4.11
 * @paramsDesc: 传入Topics的props说明
 *  userInfo: 用户信息
 *  pageMode: C端页面模式 0 桌面版 1 移动版
 *  config: C端页面对应的builder配置文件
 *
 */

import React from 'react'
import Topics from '../../../module/Topics/Topics'

class Page extends React.Component {
    render () {
        const moduleConfig = this.props.config.module[0]
        const { userInfo, pageMode } = this.props
        return (
            <Topics
                userInfo={ userInfo }
                pageMode={ pageMode }
                config={moduleConfig}
            />
        )
    }
}

window.wrapper(Page)
