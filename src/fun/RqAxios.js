// 请求集中处理
import axios from 'axios'
import store from '../store/index'
let axiosInstance = axios.create({
  baseURL: 'http://houtai.huatuan666.com/'
})
// 设置axios携带cookie
/* axiosInstance.interceptors.request.use(config=>{
    config.withCredentials=false;
    return config
},error=>{
    return Promise.reject(error)
}) */
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use(function(config) { //配置发送请求的信息
  store.dispatch('buttonFalse');
  /* console.log("config",config); */
  return config;
}, function(error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) { //配置请求回来的信息
  store.dispatch('buttonTrue');
  return response;
}, function(error) {
  return Promise.reject(error);
});
const xhr = ({method = 'get', headers, ...options}) => {
// 前提是header不存在,配置header
  if (!headers) {
    if (method === 'get') {
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    } else if (method === 'post') {
      headers = {'Content-Type': 'application/json;charset=utf-8'}
    }
  }
  return axiosInstance({method, headers, ...options})
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        handleError(response)
      }
    })
    .catch((error) => {
      if (error.code) {
        console.log(error)
      }
    })
}
function handleError (response) {
  const {status} = response
  const error = new Error(status + '错误')
  error.response = response
  error.message = response.data.message
  throw error
}
export default xhr
