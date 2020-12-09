import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import GAuth from 'vue-google-oauth2';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SheetIcon from './components/SheetIcon.vue';

const gauthOption = {
  clientId:
    '122388849548-qtdng04l7vo27i6up7429dr87korq64e.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
};

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(GAuth, gauthOption);
Vue.component('sheet-icon', SheetIcon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
