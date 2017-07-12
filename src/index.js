/**
 * 入口
 */
import 'ctu-mlib/flexible'
import $ from 'ctu-mlib/zepto/zepto'
import 'ctu-mlib/zepto/ajax'
import FastClick from 'fastclick'

import 'normalize.css/normalize.css'
import './index.less'
import APP from './app'

$(() => {
  FastClick.attach(document.body)

  // 阻止默认滚动
  $(document).on('touchmove', function(e){
    e.preventDefault()
  })

  new APP()

  // 微信分享
  const wx = window.wx  
  if (/MicroMessenger/i.test(navigator.userAgent) && wx) {
    const shareImage = ''
    $.ajax({
      url: '/weixin/sdkconfig',
      dataType: 'json',
      success: (config) => {
        config.jsApiList = [
          'onMenuShareAppMessage',
          'onMenuShareTimeline'
        ]
        wx.config(config)
        wx.ready(() => {
          wx.onMenuShareTimeline({
            title: document.title,
            link: location.href,
            imgUrl: shareImage
          })

          wx.onMenuShareAppMessage({
            title: document.title,
            desc: '',
            link: location.href,
            imgUrl: shareImage
          })
        })
      }
    })
  }
})
