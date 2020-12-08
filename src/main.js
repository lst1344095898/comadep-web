import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "@/router/index";
import axios from './axios/axios'
import store from "@/store";
axios.defaults.withCredentials=true
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    el: '#app',
    router: router,
    store:store,
    render: h => h(App),
}).$mount('#app')
axios.interceptors.request.use(
  config =>{
    if (localStorage.getItem('Authorization')){
      config.headers['Authorization']=localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)
