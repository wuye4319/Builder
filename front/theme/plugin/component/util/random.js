/**
 * 取n到m的随机数 [n,m]
 * @author MG
 * @param n <number> 整数, m > n
 * @param m <number> 整数, m > n
 * @return number n到m之间的任意整数,包含n和m
 * */
export default function random (n, m) {
  // eslint-disable-next-line no-mixed-operators
  return window.parseInt(Math.random() * (m - n + 1) + n)
}
