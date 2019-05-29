let answerlist = [
  {
    key: ["优惠券", '1'], value: {
      title: '淘宝优惠券',
      description: '点击领取淘宝优惠券',
      picurl: 'https://mmbiz.qpic.cn/mmbiz_jpg/jGXkunogI3YmbUvNM7DfJHdyiaqhJAIDWvPRrJ3NYCc0tovRnLByIehG1nAAibnxwPfhJ1BGqtu7pc6B3PtGhzvQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
      url: 'http://www.wssso.com/index.php'
    }
  },
  {
    key: ["9块9", '2'], value: {
      title: '淘宝9块9包邮',
      description: '点击领取淘宝9块9包邮商品',
      picurl: 'https://mmbiz.qpic.cn/mmbiz_jpg/jGXkunogI3YmbUvNM7DfJHdyiaqhJAIDWvcWkIakFPuwaX25oVc0DiaNVniblWtuYuFPR9ZqpydxMmtwGHL4XgjfA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
      url: 'http://www.wssso.com/index.php?r=nine/wap'
    }
  },
  {
    key: ["漫画", '3'], value: {
      title: '精选短篇漫画',
      description: '点击观看精选短篇漫画',
      picurl: 'https://mmbiz.qpic.cn/mmbiz_jpg/jGXkunogI3YmbUvNM7DfJHdyiaqhJAIDWvcWkIakFPuwaX25oVc0DiaNVniblWtuYuFPR9ZqpydxMmtwGHL4XgjfA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
      url: 'http://www.wssso.com:8081/topics/'
    }
  },
  {
    key: ["美图", '4'], value: {
      title: '精选美图',
      description: '点击欣赏精选美图',
      picurl: 'https://mmbiz.qpic.cn/mmbiz_jpg/jGXkunogI3YmbUvNM7DfJHdyiaqhJAIDWvcWkIakFPuwaX25oVc0DiaNVniblWtuYuFPR9ZqpydxMmtwGHL4XgjfA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
      url: 'https://www.wssso.com/blogs/?type=1'
    }
  },
  {
    key: ["搞笑", '5'], value: {
      title: '精选搞笑段子',
      description: '点击观看精选搞笑段子',
      picurl: 'https://mmbiz.qpic.cn/mmbiz_jpg/jGXkunogI3YmbUvNM7DfJHdyiaqhJAIDWvcWkIakFPuwaX25oVc0DiaNVniblWtuYuFPR9ZqpydxMmtwGHL4XgjfA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
      url: 'https://www.wssso.com:8081/blogs/?type=2'
    }
  }
]

module.exports = class {
  answer(msg) {
    let index = -1
    for (let i in answerlist) {
      if (answerlist[i].key.indexOf(msg.Content) !== -1) {
        index = i
        return [answerlist[i].value];
      }
    }

    if (index === -1) {
      return [
        {
          title: '关键词错误或不存在',
          description: '关键词错误或不存在，您可看看这些推荐',
          picurl: 'https://mmbiz.qlogo.cn/mmbiz_jpg/jGXkunogI3YATIQLx0yV7fm0SZrRu7vWjIskwwLvsooR4f4iaWbym7xvmnujrrMQBBaWZiaCZYAgbBqkMppv6zqQ/640?wx_fmt=jpeg',
          url: 'http://www.wssso.com/index.php'
        }
      ];
    }
  }
}
