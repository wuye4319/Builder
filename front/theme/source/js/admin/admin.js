import './admin.less'

/* your logic code */
class Content extends React.Component {
  componentWillMount() {
    document.getElementById('container').style.opacity = 1
  }

  render() {
    return (
      <div>
        <div className="blog">
          <div className="analysis">
            <h5>添加博客</h5>
            <div className="url">
              <label>解析ID：</label>
              <input type="text" placeholder="请输入解析ID" className="bc-input-input" />
            </div>
            <div className="blog-type">
              <label>博客类型：</label>
              <select className="bc-selection">
                <option value="1">漫画</option>
                <option value="2">美图</option>
                <option value="3">搞笑</option>
              </select>
            </div>
            <div className="user-type">
              <label>用户类型：</label>
              <select className="bc-selection">
                <option value="1">女性</option>
                <option value="2">男性</option>
                <option value="3">大众</option>
              </select>
            </div>
          </div>
          <div className="blog-box">
            <h5>解析结果</h5>
            <div className="blog-title">
              <label>标题：</label>
              <input type="text" placeholder="标题" className="bc-input-input" />
            </div>
            <div className="blog-img">
              <label>主图：</label>
              <p><img src="/source/img/001.png" width="100%" /></p>
            </div>
            <div className="blog-context">
              <label>内容：</label>
              <p>test</p>
            </div>
          </div>
        </div>
        <div className="topic">
          <h5>添加专题</h5>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Content />,
  document.getElementById('container')
)
