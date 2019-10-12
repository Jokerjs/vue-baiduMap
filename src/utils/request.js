import axios from 'axios'
import { Message } from 'iview'
import 'iview/dist/styles/iview.css'

// create an axios instance
const apiHttp = '/static'
const service = axios.create({
  baseURL: apiHttp, // api 的 base_url
  timeout: 5000 // request timeout
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error.message)// for debug
    Message.error({
      content: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
