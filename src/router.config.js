import Home from './views/Home.vue'

export default [{
    path: '/',
    name: 'home',
    text: '首页',
    component: Home
  },
  {
    path: '/test',
    name: 'test',
    text: '测试',
    component: () => import( /* webpackChunkName:"test" */ './views/Test.vue')
  }, {
    path: '/box-render',
    name: 'box-render',
    text: '渲染纹理矩形',
    component: () => import( /* webpackChunkName:"box-render" */ './views/BoxRender.vue')
  }, {
    path: '/box-render2',
    name: 'box=render2',
    text: '渲染纹理矩形2',
    component: () => import( /* webpackChunkName:"box-render2" */ './views/BoxRender2.vue')
  }
]
