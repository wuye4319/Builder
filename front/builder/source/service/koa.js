/**
 * @author MG Ding (丁文强)
 * @desc koa接口
 */
// import {fetch} from '../../../../source/util'
// const APIRoot = 'http://builder.test.com:8080/shopbuilder/'
const APIRoot = 'http://www.' + window.supervar.domain + ':8081/shopbuilder/'

export function getPageConfig (shop) {
    return window.fetch(`${APIRoot}userpageconfig/get/${shop}/`).then(response => response.json())
}

export function updatePageConfig (shop, config) {
    return window.fetch(`${APIRoot}userpageconfig/edit/${shop}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(config)
    }).then(response => {
        return new Promise((resolve, reject) => {
            if (response.status === 200) {
                resolve(response)
            } else {
                reject(response)
            }
        })
    // console.log(response)
    // return response.json()
    })
}
