/**
 * author : nero
 * date : 2018-11-19
 */

class util {
  getarrt (data, out, obj) {
    let temparr = []
    // get arrt you need
    for (let i in data) {
      let tempobj = {}
      for (let j in out) {
        tempobj[out[j]] = data[i][out[j]]
      }
      temparr.push(tempobj)
    }
    return obj ? temparr[0] : temparr
  }

  result (state, total, page, size) {
    let temp = {
      state: 0,
      msg: 'success',
      data: {}
    }
    if (total) {
      temp['total'] = total // 总条数
      temp['current_page'] = page
      temp['pagesize'] = size
      temp['total_page'] = Math.ceil(total / size) // 总页数
    }
    switch (state) {
      case 1:
        this.initdata = {state: 1, msg: 'faild'}
        break
    }

    return temp
  }
}

module.exports = util
