import firebase from '~/plugins/firebase'

export const state = () => ({
  login_user: null,
  authenticated: false
})

export const mutations = {
  setLoginUserState(state, user) {
    state.login_user = user
    state.authenticated = true
  },
  deleteLoginUserState(state) {
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
    await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((res) => {
      firebase.firestore().doc(`users/${res.user.uid}`).set({
        uid: res.user.uid,
        displayName: 'ゲストユーザー',
        photoURL: res.user.photoURL,
        email: res.user.email
      })
    })
  },

  googleLogin() {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(google_auth_provider).then((res) => {
      
      firebase.firestore().collection('users').doc(res.user.uid).get().then(function(doc) {
        if (!doc.exists) {
          firebase.firestore().doc(`users/${res.user.uid}`).set({
            uid: res.user.uid,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
            email: res.user.email
          });
        }
      })
    })
  },

  async createUser({ commit }, payload) {
    console.log(payload);
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

