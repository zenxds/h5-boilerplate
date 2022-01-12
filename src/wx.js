/**
 * 微信相关封装
 */
const $ = window.jQuery

const wx = window.wx
const isWX = /MicroMessenger/i.test(navigator.userAgent)

export const share = function (options) {
  if (!isWX || !wx) {
    return
  }

  options = $.extend(
    {
      title: document.title,
      desc: document.title,
      link: location.href,
      imgUrl: '',
    },
    options || {},
  )

  $.ajax({
    url: options.shareConfigUrl || '/weixin/sdkconfig',
    dataType: 'json',
    success: function (config) {
      config.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline']
      wx.config(config)
      wx.ready(function () {
        wx.onMenuShareTimeline(options)
        wx.onMenuShareAppMessage(options)
      })
    },
  })
}
