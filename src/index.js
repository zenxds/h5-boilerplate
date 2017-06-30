/**
 * 入口
 */
import 'ctu-mlib/flexible'
import $ from 'ctu-mlib/zepto/zepto'
import 'ctu-mlib/zepto/event'
import 'ctu-mlib/zepto/touch'
import FastClick from 'fastclick'

import 'normalize.css/normalize.css'
import './index.less'

$(() => {
  FastClick.attach(document.body)

  const $app = $('#app')
  const $sections = $('.section')
  const length = $sections.length
  const animationend = 'animationend webkitAnimationEnd'
  const classes = 'active slideOutUp slideOutDown slideInUp slideInDown'
  let activeIndex = 0

  // 阻止默认滚动
  $(document).on('touchmove', function(e){
    e.preventDefault()
  })

  $sections.on(animationend, (e) => {
    $(e.target).removeClass(classes)
    $sections.eq(activeIndex).addClass('active')
  })
  $app.swipeUp(() => {
    if (activeIndex === length - 1) {
      return
    }
    $sections.eq(activeIndex).addClass('slideOutUp')
    activeIndex++
    $sections.eq(activeIndex).addClass('slideInUp')

  }).swipeDown(() => {
    if (activeIndex === 0) {
      return
    }
    $sections.eq(activeIndex).addClass('slideOutDown')
    activeIndex--
    $sections.eq(activeIndex).addClass('slideInDown')
  })
})
