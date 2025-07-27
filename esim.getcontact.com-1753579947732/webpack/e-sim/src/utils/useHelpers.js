const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Huawei|Opera Mini/i.test(
    navigator.userAgent
  )
const isAndroid = /Android/.test(navigator.userAgent);
const isHuawei = /Huawei/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

export default {
  isMobile,
  isAndroid,
  isHuawei,
  isIOS,
}
