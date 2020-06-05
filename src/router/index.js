import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import first from '../pages/First/first'
import two from '../pages/Two/two'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/first',
      name: 'first',
      component: first,
      meta: {
        title: '第一页'
      }
    },
    {
      path: '/two',
      name: 'two',
      component: two,
      meta: {
        title: '第二页'
      }
    }
  ]
})
