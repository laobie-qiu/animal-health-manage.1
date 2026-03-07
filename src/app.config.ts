export default typeof definePageConfig === 'function'
  ? defineAppConfig({
      pages: [
        'pages/index/index',
        'pages/diagnosis/index',
        'pages/profile/index'
      ],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#FF6B35',
        navigationBarTitleText: '马驴健康管家',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#999999',
        selectedColor: '#FF6B35',
        backgroundColor: '#FFFFFF',
        borderStyle: 'black',
        list: [
          {
            pagePath: 'pages/index/index',
            text: '首页',
            iconPath: './assets/tabbar/home.png',
            selectedIconPath: './assets/tabbar/home-active.png',
          },
          {
            pagePath: 'pages/diagnosis/index',
            text: '诊断',
            iconPath: './assets/tabbar/stethoscope.png',
            selectedIconPath: './assets/tabbar/stethoscope-active.png',
          },
          {
            pagePath: 'pages/profile/index',
            text: '我的',
            iconPath: './assets/tabbar/user.png',
            selectedIconPath: './assets/tabbar/user-active.png',
          }
        ]
      }
    })
  : {
      pages: [
        'pages/index/index',
        'pages/diagnosis/index',
        'pages/profile/index'
      ],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#FF6B35',
        navigationBarTitleText: '马驴健康管家',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#999999',
        selectedColor: '#FF6B35',
        backgroundColor: '#FFFFFF',
        borderStyle: 'black',
        list: [
          {
            pagePath: 'pages/index/index',
            text: '首页',
            iconPath: './assets/tabbar/home.png',
            selectedIconPath: './assets/tabbar/home-active.png',
          },
          {
            pagePath: 'pages/diagnosis/index',
            text: '诊断',
            iconPath: './assets/tabbar/stethoscope.png',
            selectedIconPath: './assets/tabbar/stethoscope-active.png',
          },
          {
            pagePath: 'pages/profile/index',
            text: '我的',
            iconPath: './assets/tabbar/user.png',
            selectedIconPath: './assets/tabbar/user-active.png',
          }
        ]
      }
    }
