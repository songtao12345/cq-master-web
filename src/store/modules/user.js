import { login, logout, getInfo, getMoveRouter } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    menus: ""
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENU: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {

      login({ username: username.trim(), password: password }).then(response => {
      //  console.log(response.headers.token);
        // const { data } = response
        // commit('SET_TOKEN', data.token)
        commit('SET_TOKEN', response.headers.token)
  
        setToken(response.headers.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // console.log(response.data.data);
        const { data } = response.data
        console.log(data);

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        // const { name, avatar } = data
        const { nickName, avatar } = data

        // commit('SET_NAME', name)
        commit('SET_NAME', nickName)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },


  // getRouter
  getRouter({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMoveRouter().then(response => {
        const menus = response.data.data.navigation

        // const menus = [
        

         
        // ]


        //如果需要404 页面，请在此处添加
        menus.push({
          path: "/404",
          component: "404",
          hidden: true
        }, {
          path: "*",
          redirect: "/404",
          hidden: true
        })
        commit('SET_MENU', menus) //把name 保存到vuex中
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

