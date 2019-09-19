import request from '../utils/request'

export default {
  getCity: () => {
    return request({url: '/city/110100.json', method: 'get'})
  },
  getHeat: () => {
    return request({url: '/city/heat.json', method: 'get'})
  },
  getHzCity: () => {
    return request({url: '/city/330100.json', method: 'get'})
  },
  getHzHeat: () => {
    return request({url: '/city/hangzhou.json', method: 'get'})
  }
}
