module.exports = {
  'main': {
    template: 'public/index.html',
    filename: 'index.html',
    title: '主页',
    // chunks: ['chunk-vendors', 'chunk-common', 'index']
  },
  'pages/report': {
    template: 'public/index.html',
    filename: 'report.html',
    title: '后台管理',
    // chunks: ['chunk-vendors', 'chunk-common', 'index']
  },
  // 'pages/mobile': {
  //   template: 'public/index.html',
  //   filename: 'mobile.html',
  //   title: '移动端',
  //   // chunks: ['chunk-vendors', 'chunk-common', 'index']
  // }
}