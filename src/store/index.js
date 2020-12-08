import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    //存储token
    Authorization: localStorage.getItem('Authorization')?localStorage.getItem('Authorization'):''
  },
  //方法
  mutations:{
    //修改token，并且将token存入localStorage
    changeLogin(state,user){
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization',user.Authorization);
      console.log('token',localStorage.getItem('Authorization'))
    }
  }
})
//导出
export default store;
