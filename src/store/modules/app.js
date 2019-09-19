import MapApi from '../../api/myMap'
const app = {
  state: {
    city: null,
    heat: null,
    cityHz: null,
    heatHz: null
  },
  mutations: {
    SET_CITY: (state, city) => {
      state.city = city
    },
    SET_HEAT: (state, heat) => {
      state.heat = heat
    },
    SET_HZCITY: (state, cityHz) => {
      state.cityHz = cityHz
    },
    SET_HZHEAT: (state, heatHz) => {
      state.heatHz = heatHz
    }
  },
  actions: {
    GetCity ({ commit }) {
      return new Promise((resolve, reject) => {
        MapApi.getCity().then(response => {
          const data = response.data
          commit('SET_CITY', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetHeat ({ commit }) {
      return new Promise((resolve, reject) => {
        MapApi.getHeat().then(response => {
          const data = response.data
          commit('SET_HEAT', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetHzCity ({ commit }) {
      return new Promise((resolve, reject) => {
        MapApi.getHzCity().then(response => {
          const data = response.data
          commit('SET_HZCITY', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetHzHeat ({ commit }) {
      return new Promise((resolve, reject) => {
        MapApi.getHzHeat().then(response => {
          const data = response.data
          commit('SET_HZHEAT', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
