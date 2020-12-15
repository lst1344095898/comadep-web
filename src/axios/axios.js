import axios from 'axios'
const http = axios.create({
    baseURL: 'http://localhost:8081/',
    withCredentials: true,
    timeout: 5000,
})

export default http
