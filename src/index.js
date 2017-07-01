/**
 * 入口
 */
import 'ctu-mlib/flexible'
import $ from 'ctu-mlib/zepto/zepto'
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
})
