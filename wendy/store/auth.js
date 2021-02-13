import firebase from '~/plugins/firebase'

export const state = () => ({
  login_user: null,
  authenticated: false
})

export const mutations = {
  setLoginUserState(state, user)  {
    state.login_user = user
    state.authenticated = true
  },
  deleteLoginUserState(state)  {
    state.login_user = null
    state.authenticated = false
  }
}

export const actions = {
  setLoginUser({ commit }, user) {
    commit('setLoginUserState', user)
  },
  deleteLoginUser({ commit }) {
    commit('deleteLoginUserState')
  },
  googleLogin() {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider) // このタイミングでGoogleの認証画面にリダイレクトされる
  },
  logout() {
    firebase.auth().signOut()
  }
}

export const getters = {
  userName: state => state.login_user ? state.login_user.displayName :'',
  userPhotoURL: state => state.login_user ? state.login_user.photoURL :''
}

