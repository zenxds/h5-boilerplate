import $ from 'dx-mlib/zepto/zepto'
import 'dx-mlib/zepto/event'
import 'dx-mlib/zepto/touch'

const animationendEvent = getAnimationendEvent()
const defaultOptions = {
  page: '.page',
  activeIndex: 0
}

export default class APP {
  constructor(options) {
    this.options = $.extend({}, defaultOptions, options || {})
    this.initProps()
    this.bindEvents()

    this.$pages.eq(this.activeIndex).addClass('active loaded')
    this.preload()
  }

  initProps() {
    this.$pages = $(this.options.page)
    this.length = this.$pages.length
    this.activeIndex = this.options.activeIndex
  }

  bindEvents() {
    this.$pages.on('swipeUp', () => {
      if (this.activeIndex === this.length - 1 || this.isAnimating) {
        return
      }

      this.move('up')
    }).on('swipeDown', () => {
      if (this.activeIndex === 0 || this.isAnimating) {
        return
      }

      this.move('down')
    })
  }

  /**
   * 预加载上下一页
   */
  preload() {
    const activeIndex = this.activeIndex
    setTimeout(() => {
      if (activeIndex > 0) {
        this.$pages.eq(activeIndex - 1).addClass('loaded')
      }
      if (activeIndex < this.length - 1) {
        this.$pages.eq(activeIndex + 1).addClass('loaded')
      }
    }, 400)
  }

  move(action) {
    action = ucfirst(action)
    const activeIndex = this.activeIndex
    const nextIndex = action === 'Up' ? activeIndex + 1 : activeIndex - 1
    const $out = this.$pages.eq(activeIndex)
    const $in = this.$pages.eq(nextIndex)

    this.isAnimating = true

    $in.one(animationendEvent, (e) => {
      $in.toggleClass(`slideIn${action} active`)
      this.activeIndex = nextIndex
      this.isAnimating = false
      this.preload()
    }).addClass(`slideIn${action}`)

    $out.one(animationendEvent, (e) => {
      $out.removeClass(`slideOut${action} active`)
    }).addClass(`slideOut${action}`)
  }
}

function getAnimationendEvent() {
  const el = document.createElement("fakeelement")
  const animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (let i in animations) {
    if (el.style[i] !== undefined) {
      return animations[i]
    }
  }
}

/**
 * 首字母大写
 */
function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}
