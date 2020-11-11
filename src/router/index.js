import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import first from '../pages/First/first'
// import two from '../pages/Two/two'
import kangshun from '../pages/Si/kangshun.vue'
import fuzujian from '../pages/Si/fuzujian.vue'
// import dataManageNew from '../pages/Si/dataManageNew.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/first',
    //   name: 'first',
    //   component: first,
    //   meta: {
    //     title: '第一页'
    //   }
    // },
    // {
    //   path: '/two',
    //   name: 'two',
    //   component: two,
    //   meta: {
    //     title: '第二页'
    //   }
    // },
    // {
    //   path: '/san',
    //   name: 'san',
    //   component: san,
    //   meta: {
    //     title: '第三页'
    //   }
    // },
    {
      path: '/Si',
      name: 'kangshun',
      component: kangshun,
      meta: {
        title: '第四页'
      }
    },
    {
      path: '/Si/fuzujian',
      name: 'fuzujian',
      component: fuzujian,
      meta: {
        title: '父组件'
      }
    },
    // {
    //   path: '/Si/dataManageNew',
    //   name: 'Inspect_data',
    //   component: dataManageNew,
    //   meta: {
    //     title: '父组件'
    //   }
    // }
  ]
})
