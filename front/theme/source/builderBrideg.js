/**
 * @author MG Ding (丁文强)
 * @desc shopBuilder操作页面方法
 */
const { updateColor, getDomPosition } = window.supervar.util
const scrollToModule = (id) => {
  let ele = document.getElementById(id)
  if (ele) {
    window.scroll(0, document.documentElement.scrollTop = getDomPosition(ele).top)
    // util.setScrollTop(util.getDomPosition(ele).top)
  }
}
export default (pageInstant) => {
  return {
    updateConfig: (pageConfig) => {
      pageInstant.updateConfig(pageConfig)
      try {
        let colors = {}
        Object.values(pageConfig.theme.colors.data).forEach(item=>{
          if (item) {
            for(let key in item) {
              colors[key] = item[key]
            }
          }
        })
        updateColor(colors)
      } catch (e) {
        console.error(e)
      }
    },
    dragModule: (from, to, id) => {
      pageInstant.dragModule(from, to, id)
    },
    scrollToModule
  }
}
