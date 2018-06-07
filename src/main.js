// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Spinner,IndexList, IndexSection } from 'mint-ui';

// Vue.component(Range.name, Range);
Vue.component(Spinner.name, Spinner);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
