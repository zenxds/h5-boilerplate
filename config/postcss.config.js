// const px2rem = require('postcss-px2rem')
const pxToViewport = require('postcss-px-to-viewport')

module.exports = {
  plugins: [
    // px2rem(),
    pxToViewport({
      viewportWidth: 750,
      selectorBlackList: [],
    }),
    require('autoprefixer')({}),
  ],
}
