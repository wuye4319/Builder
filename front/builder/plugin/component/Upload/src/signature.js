const restApi = window.location.origin + '/supersell/rest'

const randomFileName = (file) => {
  const randomString = () => {
    const len = 30
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const maxPos = chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  }

  const suffix = () => {
    const filename = file.name
    const _pos = filename.lastIndexOf('.')
    let _suffix = ''
    if (_pos !== -1) {
      _suffix = filename.substring(_pos)
    }
    return _suffix
  }

  return randomString() + suffix()
}

/** 获取签名 **/
const getSignature = () => {
  return new Promise((resolve, reject) => {
    window.fetch(`http://www.test.com/product-admin/sig/policy`)
            .then(response => response.json())
            .then((data) => {
              if (data) {
                resolve(data)
              } else {
                reject()
              }
            }).catch(() => { reject() })
  })
}

/** 上传图片 **/
const upload = (sign, file) => {
  return new Promise((resolve, reject) => {
    let fileName = randomFileName(file)
    let formData = new FormData()

    formData.append('policy', sign.policy)
    formData.append('signature', sign.signature)
    formData.append('OSSAccessKeyId', sign.accessId)
    formData.append('key', sign.dir + fileName)
    formData.append('file', file)

    window.fetch(sign.host, { method: 'POST', body: formData }).then(data => {
      if (data.ok) {
        resolve(data.url + sign.dir + fileName)
      } else {
        reject()
      }
    }).catch(() => { reject() })
  })
}

export { getSignature, upload }
