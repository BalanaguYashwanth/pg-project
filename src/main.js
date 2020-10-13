import Vue from 'vue'
import App from './App.vue'
import Vuerouters from 'vue-router'
import Routers from './routers'
import {store} from './store/store'
import Slider from '@jeremyhamm/vue-slider'
import VueFlashMessage from 'vue-flash-message';
import FlashMessage from '@smartweb/vue-flash-message';
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
 
Vue.use(Datetime)
Vue.use(FlashMessage);
Vue.use(VueFlashMessage);
Vue.use(Slider)
Vue.use(Vuerouters)

Vue.config.productionTip = false
Vue.component('datetime', Datetime);


const router = new Vuerouters({
  routes:Routers,
  mode:'history',
})

new Vue({
  render: h => h(App),
  router:router,
  store:store,
}).$mount('#app')
