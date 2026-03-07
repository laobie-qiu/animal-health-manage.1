export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '疾病诊断',
      enablePullDownRefresh: false,
    })
  : {
      navigationBarTitleText: '疾病诊断',
      enablePullDownRefresh: false,
    }
