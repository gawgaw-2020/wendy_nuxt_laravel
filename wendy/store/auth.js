import firebase from '~/plugins/firebase'

export const state = () => ({
  login_user: null,
})

export const mutations = {
  setLoginUserState(state, user)  {
    state.login_user = user
  }
}

export const actions = {
  setLoginUser({ commit }, user) {
    commit('setLoginUserState', user)
  },
  googleLogin() {
    console.log('googleLogin');
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider) // このタイミングでGoogleの認証画面にリダイレクトされる
  },

}
export const getters = {}