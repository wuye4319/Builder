/**
 * @author Gavin Yang (杨伟伟)
 * @desc 图片上传组件
 * @date 2018.4.23
 *
 * 使用:
 * const props = {
 *  accept:image/* (上传资源的类型，默认图片)
 *  multiple: true/false (是否可以多选上传，默认单选)
 *  defaultImg: 默认图片地址 （可选）
 *  freeImages:Array, （免费图片库数据）
 *  libraryImages:Array （上传记录数据）
 *  onChange:function (image){....} （选择图片、上传图片的回调fn）
 * }
 *  <UploadImage {...props}/>
 *
 */

import ImagePanel from './src/imagePanel'
export default ImagePanel
