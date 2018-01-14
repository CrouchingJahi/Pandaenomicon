import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import registerServiceWorker from './workers'

Vue.config.productionTip = false
registerServiceWorker()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
