import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import vRefresh from './components/pull_refresh.vue'

Vue.component('v-refresh',vRefresh);

Vue.config.productionTip = false;
Vue.config.silent = true;

var appVue = new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app');
