import axios from "axios";
import router from "../router";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token");
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    console.log(error);
    // 对响应错误做点什么
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: "/user/signin",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
      }
    }
    return Promise.reject(error);
  }
);

export function get(url, params){
  return new Promise((resolve, reject) =>{
      axios.get(url, {
          params: params
      }).then(res => {
          resolve(res.data);
      }).catch(err =>{
          reject(err.data)
  })
});}
export function post(url, params) {
  return new Promise((resolve, reject) => {
        axios.post(url, params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}
