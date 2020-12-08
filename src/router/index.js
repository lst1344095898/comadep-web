// 配置路由信息
import VueRouter from 'vue-router'
import Vue from 'vue'
import Register from '../views/Register';
import index from '../views/index';
import login from '../views/login';
import home from '../views/home.vue'
import NotFound from '../views/404';
//Vue.use(插件)传入路由对插件、
Vue.use(VueRouter)
    //创建路由对象



//路由数组
const routes = [{
        path: '/',
        name: 'index',
        component: index
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound
    }
];
const router = new VueRouter({
        routes,
    });
    //将router 传入到实例对象
//导航守卫
//判断是否登录
router.beforeEach((to,from,next)=>{
  console.log('to.path'+to.path);
  if (to.path === '/login'){
    next();
  }else {
    let  token=localStorage.getItem("Authorization");
    if (token===null||token===''){
      next('/login');
    }else {
      next();
    }
  }
})
//导出
export default router
