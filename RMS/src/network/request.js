import axios from 'axios'
import store from '../store/index'
// import {
//   Toast
// } from 'vant'
// 根据环境不同引入不同api地址
// import { baseApi } from '@/config'
// const baseApi = 'http://123.207.32.32:8000/api/x6' 
const {
  baseUrl
} = require('../config/env.' + process.env.NODE_ENV);
const service = axios.create({
  baseURL: baseUrl, // url = base api url + request url
  // withCredentials: false, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config,"请求")
    // 不传递默认开启loading
    // if (!config.hideloading) {
    //   // loading
    //   Toast.loading({
    //     forbidClick: true
    //   })
    // }
    // config.headers.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklEIjoiMzAiLCJuYmYiOjE1OTg5NDI1OTAsImV4cCI6MTU5ODk1MzM5MCwiaXNzIjoiT2N0b2JlciIsImF1ZCI6IlNob3BBcHBfQVBJIn0.lY39lVigGALsXJI1veIO8gP53Z9WalHyrguqjUvid78'
    // console.log(store.state.token,"请求")
    if (store.state.token) {
      config.headers.Authorization  = store.state.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    // Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      if (res.status === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    // Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service