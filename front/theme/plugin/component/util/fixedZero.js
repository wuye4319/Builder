/**
 * @author MG Ding (丁文强)
 * @desc 工具方法
 */
export default function fixedZero (val) {
  return val * 1 < 10 ? `0${val}` : val
}
