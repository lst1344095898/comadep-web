import axios from 'axios'
//分装axios
const http = axios.create({
    baseURL: '/api',
    withCredentials: true,
    timeout: 5000,
    hearts: {

    }
})
//请求拦截
http.interceptors.request.use(
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

export default http
