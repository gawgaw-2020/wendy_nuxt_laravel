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

  async firebaseLogin(payload) {
    await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
  },
  async firebaseSignUp(payload) {
    await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
  },

  googleLogin() {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(google_auth_provider).then((res) => {
      return firebase.firestore().doc(`users/${res.user.uid}`).set({
        uid: res.user.uid,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      });
    })
    .then(() => {
      console.log('success');
    })
  },

  async createUser(payload) {
    const { uid, ...data } = payload
    await firebase.firestore().doc(`users/${uid}`).set(data)
  },

  logout() {
    firebase.auth().signOut()
  }
}

export const getters = {
  userName: state => state.login_user ? state.login_user.displayName :'',
  userEmail: state => state.login_user ? state.login_user.email :'',
  userPhotoURL: state => state.login_user ? state.login_user.photoURL :''
}

