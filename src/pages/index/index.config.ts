export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '首页',
      enablePullDownRefresh: true,
    })
  : {
      navigationBarTitleText: '首页',
      enablePullDownRefresh: true,
    }
