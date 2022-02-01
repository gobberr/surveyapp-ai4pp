/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_SET_USER, AUTH_UPDATE_PROFILE } from '../actions/auth'

const state = {
  status: '',
  hasLoadedOnce: false,
  token: localStorage.getItem('token') || '',
  owner: window.env.VUE_APP_OWNER,
  id: null,
  profile: {
    email: null,
    firstName: null,
    lastName: null,
    username: null,
    name: null,
    companyName: null,
    vat: null,
    iban: null,
    fiscalCode: null,
    walletAddress: null
  },
  role: []
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, response) => {

    //console.log('AUTH_REQUEST: ' + JSON.stringify(response))
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      localStorage.setItem('status', 'success')
      localStorage.setItem('token', response.userInfo.id_token)
      localStorage.setItem('access_token', response.userInfo.access_token)
      localStorage.setItem('username', response.userInfo.profile.user_name)
      localStorage.setItem('oidc_response', response)
      commit(AUTH_SUCCESS, response)
      resolve()
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('status')
      localStorage.removeItem('token')
      localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('username')
      localStorage.removeItem('iban')
      localStorage.removeItem('companyName')
      localStorage.removeItem('vat')
      localStorage.removeItem('oidc_response')
      localStorage.removeItem('partner')
      localStorage.removeItem('lastName')
      localStorage.removeItem('firstName')
      localStorage.removeItem('walletUser')
      localStorage.removeItem('walletAddress')
      localStorage.removeItem('fiscalCode')
      localStorage.removeItem('siachain_access_token')
      localStorage.removeItem('siachain_refresh_token')
      localStorage.removeItem('partner')
      localStorage.removeItem('roles')
      resolve()
    })
  },
  [AUTH_SET_USER]: ({commit, dispatch}, response) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_SET_USER, response.payload)
      resolve()
    })
  },
  [AUTH_UPDATE_PROFILE]: ({commit, dispatch}, {payload}) => {
    return new Promise((resolve, reject) => {
      localStorage.setItem('companyName', payload.companyName)
      localStorage.setItem('iban', payload.iban)
      localStorage.setItem('vat', payload.vat)
      commit(AUTH_UPDATE_PROFILE, payload)
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    console.log('AUTH_SUCCESS')
    // console.log(resp)
    // state.token = resp.token
    state.hasLoadedOnce = true
    state.owner = resp.user
    state.status = 'success'
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    console.log('AUTH_LOGOUT')
    state.status = 'not logged'
    state.token = null
    state.owner = null
    state.cid = null
    state.hasLoadedOnce = false
    state.profile = null
  },
  [AUTH_SET_USER]: (state, resp) => {
    state.id = resp.sub
    state.profile.email = resp.email
    state.profile.firstName = resp.firstName
    state.profile.lastName = resp.lastName
    state.profile.username = resp.preferred_username
    state.profile.name = resp.name
    state.profile.vat = resp.vat
    state.profile.iban = resp.iban
    state.profile.companyName = resp.companyName
    state.profile.walletAddress = resp.walletAddress
    state.role = resp.realm_access.roles.map(role => role.toLowerCase())
  },
  [AUTH_UPDATE_PROFILE]: (state, payload) => {
    state.profile.vat = payload.vat
    state.profile.iban = payload.iban
    state.profile.companyName = payload.companyName
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
