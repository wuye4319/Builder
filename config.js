/*
 * author : nero
 * 修改参数来使用
 * 看参数注解说明
 */
const config = {
  version: '1.2.2',
  myModule: 'builder', // myModule:1级目录
  childModule: '', // childModule:2级目录
  currTheme: 'builder',
  basepath: '',
  htmlbasepath: '', // html根目录，空则没有
  lang: '', // cn:中文，en:英文，all:中英文同时编译
  firstlang: 'cn', // 初始语种
  proxy: 'www.dev.com/', // proxy是代理地址，常见：test,super,superbuy,请求是实时的数据
  transfile: 'trans/trans.json', // 默认目录：当前js的同目录下 [trans/trans.json]
  sourcedir: ['src'], // js需要过滤的资源目录
  routerdir: ['account', 'partner'], // router的根目录
  loadimg: '<div style="position:fixed;top:0;right:0;bottom:0;left:0;background:url(\'/source/img/loading.gif\') no-repeat center;"></div>',
  wrapper: 'wrapper/wrapper.js', // 公共模块
  userinfor: 'nero',
  webpack: {
    config: { chunks: false, colors: true, version: true, hash: true, assets: true, modules: false },
    externals: { 'react': 'React', 'react-dom': 'ReactDOM' },
    plugins: [], // 默认自带插件：[i18n]，可以继续添加其他插件
    devtool: ['dev', 'pub'], // [ dev , pub ]
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env', 'stage-0'],
              plugins: [// antd的动态引入编译，及css样式文件编译
                ['import', { libraryName: 'antd', style: 'css' }]
              ]
            }
          }
        },
        { test: /\.less$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }] },
        { test: /\.css/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
        { test: /\.(png|jpg|jpeg)$/, use: { loader: 'url-loader', options: { limit: 5120 } } }
      ]
    }
  }
}

module.exports = config
