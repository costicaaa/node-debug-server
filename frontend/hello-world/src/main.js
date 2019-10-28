import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
let collect = require('collect.js');

Vue.config.productionTip = false
Vue.prototype.$coll = collect;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
