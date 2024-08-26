//封装时间阶段函数，早上上午下午晚上
export const getTime = () => {
  let hours = new Date().getHours()
  let message = ''
  if (hours > 5 && hours <= 9) {
    message = '早上'
  } else if (hours <= 14) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
