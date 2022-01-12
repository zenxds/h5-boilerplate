/**
 * 入口
 */
import * as wx from './wx'

import 'normalize.css/normalize.css'
import './styles/index.less'

const $ = window.jQuery

$(() => {
  document.body.addEventListener(
    'touchmove',
    event => {
      event.preventDefault()
    },
    {
      passive: false
    }
  )

  // 微信分享
  if (process.env.NODE_ENV === 'production') {
    wx.share({
      // title: '',
      desc: '',
      imgUrl: ''
    })
  }
})
