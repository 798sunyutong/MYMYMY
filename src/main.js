// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import {Icon,DatetimePicker,Picker,Input,Switch,Progress,Button} from 'we-vue'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(WeVue)
Vue.use(Icon)
Vue.use(DatetimePicker)
Vue.use(Picker)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Progress)
Vue.use(Button)
// Vue.use(Selector)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
