import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    //存储token
    Authorization: localStorage.getItem('Authorization')?localStorage.getItem('Authorization'):'',
    powerCode: 3,
    user:{
      id:'',
      userName: '',
      password:'',
      address: '',
      telephoneNumber: '',
      powerCode: '',
      sex: '',
      age: '',
      createTime: '',
    }
  },
  //方法
  mutations:{
    //修改token，并且将token存入localStorage
    changeLogin(state,user){
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization',user.Authorization);
      console.log('token',localStorage.getItem('Authorization'))
    },
    changePowerCode(state,data){
      state.powerCode = data;
      console.log('powerCode:',data);
    },
    changUser(state,data){
        state.user.id=data.id;
        state.user.userName=data.userName
        state.user.password=data.password
        state.user.address=data.address
        state.user.telephoneNumber=data.telephoneNumber
        state.user.powerCode=data.powerCode
        state.user.sex=data.sex
        state.user.age=data.age
        state.user.createTime=data.createTime
      console.log(state.user);
    }
  }
})
//导出
export default store;
