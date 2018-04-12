/**
 * 入口
 */
import 'dx-mlib/flexible'
import $ from 'dx-mlib/zepto/zepto'
import wx from 'dx-mlib/src/wx'
import FastClick from 'fastclick'

import 'normalize.css/normalize.css'
import './index.less'
import APP from './app'

$(() => {
  FastClick.attach(document.body)

  document.body.addEventListener('touchmove', event => {
    event.preventDefault()
  }, {
    passive: false
  })

  new APP()

  // 微信分享
  if (process.env.NODE_ENV === 'production') {
    wx.share({
      // title: '',
      desc: '',
      imgUrl: ''
    })
  }
})
