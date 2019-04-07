/**
 * @author MG Ding (丁文强)
 * @desc Link (链接)
 */

const Link = ({children, onClick, href, target, ...rest}) => {
  const handleClick = (e) => {
    let flag = false
    try {
      flag = window.parent.builderBridge.changePage(href)
    } catch (e) {}
    flag && e.preventDefault()
    onClick && onClick(e)
  }
  return <a {...rest} href={href} target={target} onClick={handleClick}>{children}</a>
}

Link.goTo = (href, target = 'self') => {
  let a = document.createElement('a')
  a.href = href

  if (target !== 'replace') {
    a.target = '_' + target
  }

  let flag = false
  try {
    flag = window.parent.builderBridge.changePage(href)
  } catch (e) {}

  if (!flag) {
    target === 'replace' ? window.location.replace(href) : a.click()
  }

  return flag
}

export default Link
