(function () {
  /** common path **/
  var pluginPATH = '/plugin/base/'

  /** top-level domain **/
  var domain = (function (hostname) {
    var port = location.port ? ':' + location.port : ''
    if (hostname === 'localhost' || /^(\d+\.){3}\d+$/.test(hostname)) {
      // console.warn('请通过域名访问页面!');
      return 'superbuy.com' + port
    } else {
      var domain = hostname.match(/^(?:.*\.)?(\w*\.\w*)$/)[1]
      document.domain = domain
      return domain
    }
  })(window.location.hostname)

  /** supervar **/
  window.supervar = {
    imgSrc: '/source/img/',
    domain: domain
  }

  /** js **/
  document.write('<script src="' + pluginPATH + 'react.production.min.js" type="text/javascript"></sc' + 'ript>')
  document.write('<script src="' + pluginPATH + 'react-dom.production.min.js" type="text/javascript"></sc' + 'ript>')
  if (typeof Promise !== 'function') {
    document.write('<script src="' + pluginPATH + 'es6-promise.min.js" type="text/javascript"></sc' + 'ript>')
  }
  if (typeof fetch !== 'function') {
    document.write('<script src="' + pluginPATH + 'fetch.min.js" type="text/javascript"></sc' + 'ript>')
  }
  if (typeof Symbol !== 'function') {
    document.write('<script src="' + pluginPATH + 'browser-polyfill.min.js" type="text/javascript"></sc' + 'ript>')
  }

  /** common plugin **/
  document.write('<script src="' + pluginPATH + 'util.min.js?570d8171aee52970f2ed" type="text/javascript"></sc' + 'ript>')
})()
