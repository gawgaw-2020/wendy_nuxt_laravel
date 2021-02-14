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

  async firebaseLogin({ commit }, payload) {
    await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
  },
  async firebaseSignUp({ commit }, payload) {
    await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
  },
  async createUser({ commit }, payload) {
    const { uid, ...data } = payload
    await firebase.firestore().doc(`users/${uid}`).set(data)
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

