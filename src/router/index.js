// 配置路由信息
import VueRouter from 'vue-router'
import Vue from 'vue'
import Register from '../views/Register';
import index from '../views/index';
import login from '../views/login';
import home from '../views/AdminView/home.vue'
import android from "@/views/android";
import NotFound from '../views/404';
import UserHome from "../views/UserView/UserHome"
import Messages from '../views/Message';
import UserManagement from "../views/AdminView/UserManagement";
import UserMessages from "../views/UserView/UserMessages";
import Echarts from "../views/showDateBy3D/Echarts"
import User from "../views/UserView/User";
import SystemMessage from "../views/UserView/SystemMessage";
import MyMessages from "../views/UserView/MyMessages";
import AdminMessages from "@/views/AdminMessages";
//Vue.use(插件)传入路由对插件、
Vue.use(VueRouter)
    //创建路由对象



//路由数组
const routes = [
    {
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
      path: '/android',
      name: 'android',
      component: android
    },
    {
      path: '/Echarts',
      name: 'Echarts',
      component: Echarts
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      meta: '管理员消息中心',
      children:[
        {
          path: 'adminMessages',
          component: AdminMessages
        },
      ]
    },
    {
      path: '/userManagement',
      name: 'UserManagement',
      component: UserManagement
    }
    ,
    {
      path: "/user",
      name: 'User',
      component: User,
      meta: '用户页面',
      children:[
        {
          path: 'userHome',
          component: UserHome
        },
        {
          path: 'userMessages',
          component: UserMessages,
          children : [
            {
              path: 'systemMessage',
              component: SystemMessage
            },
            {
              path: 'myMessages',
              component: MyMessages
            }
          ]
        }
      ]
    },
    {
        path: '/*',
        name: 'NotFound',
        component: NotFound
    }
];
const router = new VueRouter({
    mode: 'history',
    routes: routes,
});
//将router 传入到实例对象
//导航守卫
//判断是否登录
router.beforeEach((to, from, next) => {
        console.log('to.path=' + to.path);
        if (to.path === '/login' || to.path === '/register') {
            next();
        } else {
            let token = localStorage.getItem("Authorization");
            if (token === null || token === '') {
                next('/login');
            } else {
                next();
            }
        }
    })
    //导出
export default router
