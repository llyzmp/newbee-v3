import axios from 'axios'
import router from '@/router/index'
import config from '~/config'
import { ElMessage } from 'element-plus'
import { localGet } from './index'

// 前后端没有区分正式和测试，都写成一个接口
axios.defaults.baseURL= config[import.meta.env.MODE].baseUrl
// 携带cookie, 对目前的项目没有什么作用，此项目是token鉴权
axios.defaults.withCredentials = true

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localGet('token') || ''
// 默认post请求使用application/json形式
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 请求拦截器，内部根据返回值重新组装，统一管理

axios.interceptors.response.use(res => {
  if(typeof res.data !== 'object') {
    ElMessage.error('服务端异常！')
    return Promise.reject(res)
  }
  if(res.data.resultCode !== 200) {
    if(res.data.message) ElMessage.error(res.data.message)
    if(res.data.resultCode == 419) {
      router.push({
        path: '/login'
      })
    }
    return Promise.reject(res.data)
  }
  return res.data.data
})

export default axios