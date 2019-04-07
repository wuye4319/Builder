/* eslint-disable camelcase */
/* eslint-disable-next-line no-unused-vars */
/**
 * @author MG Ding (丁文强)
 * @desc 单页
 */
import './Single.less'
import React from 'react'
import PropTypes from 'prop-types'
// import Button from '../../plugin/component/Button'
// import Input from '../../plugin/component/Input'
// import Select from '../../plugin/component/Select'
// import Link from '../../plugin/component/Link'
// import {setClass, color, font, query2Obj} from '../../source/util'
import {getSinglePage} from '../../source/service/page'

const {query2Obj} = window.supervar.util

export default class Single extends React.Component {
  static propTypes = {
    config: PropTypes.object
  }
  static classPrefix = 'm-single'
  state = {
    title: '',
    content: ''
  }

  getData = (id) => {
    getSinglePage(id).then((data) => {
      if (data.state === 0) {
        const {title, content, seo_title, seo_desc} = data.data
        this.setState({
          title,
          content
        })

        document.title = seo_title
        document.description = seo_desc
      }
    })
  }

  componentWillMount () {
    const {id} = query2Obj()
    id && this.getData(id)
  }
  render () {
    const {classPrefix} = Single
    const {title, content} = this.state
    if (!title && !content) {
      return (
        <div className={`${classPrefix} l-centerBlock no-content`} >
          <span>no content~</span>
        </div>
      )
    }
    return (
      <div className={`${classPrefix} l-centerBlock`} >
        <h1 className='title'>{title}</h1>
        <div className='content' dangerouslySetInnerHTML={{__html: content}} />
      </div>
    )
  }
}
