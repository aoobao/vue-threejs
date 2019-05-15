import Home from './views/Home.vue'

export default [{
    path: '/',
    name: 'home',
    text: '首页',
    component: Home
  },
  {
    path: '/box-render',
    name: 'box-render',
    text: '渲染纹理矩形',
    component: () => import( /* webpackChunkName:"box-render2" */ './views/BoxRender.vue')
  }, {
    path: '/pano-render',
    name: 'pano-render',
    text: '全景图渲染(6张图)',
    component: () => import( /* webpackChunkName:"PanoRender" */ './views/PanoRender.vue')
  },{
    path:'/pano-render2',
    name:'/pano-render2',
    text:'全景图渲染',
    component: () => import( /* webpackChunkName:"PanoRender" */ './views/PanoRender2.vue')
  }
]
