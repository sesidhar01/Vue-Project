import Vue from 'vue'
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';

import App from './App.vue';
import Create from './components/Create.vue';
import Index from './components/Index.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const routes = [
  {
    name: 'Create',
    path: '/create',
    component: Create
  },
  {
    name: 'Edit',
    path: '/edit/:id',
    component: Create
  },
  {
    name: 'Index',
    path: '',
    component: Index
  },
  {
    path: '*',
    component: Index
  },
];

const router = new VueRouter({ mode: 'history', routes: routes });

new Vue({
  render: h => h(App),
  router
}).$mount('#app')