export default {
  init: function () {
    const AK = 'NfVnmDeIpsRIG4DAknaO5j9mAYks3KWA'
    const BMapURL = 'https://api.map.baidu.com/api?v=2.0&ak=' + AK + '&callback=onBMapCallback'
    return new Promise((resolve, reject) => {
      if (typeof BMap !== 'undefined') {
        resolve(window.BMap)
        return true
      }

      window.onBMapCallback = function () {
        console.log('百度地图脚本初始化成功...')
        resolve(window.BMap)
      }

      let scriptNode = document.createElement('script')
      scriptNode.setAttribute('type', 'text/javascript')
      scriptNode.setAttribute('src', BMapURL)
      document.body.appendChild(scriptNode)
    })
  }
}
