
import firebase from 'firebase'

//firebaseの初期化に必要なデータをconfigで用意する
//必要に応じてパラメーターをここで定義
const config = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  apiKey: 'AIzaSyDJE18gz8IxkrNQdG2XvBfWTseFFWp5iek',
  authDomain: 'wendy-nuxt-firebase.firebaseapp.com',
  projectId: 'wendy-nuxt-firebase',
  storageBucket: 'wendy-nuxt-firebase.appspot.com',
}
//二重に初期化が行われないために!firebase.app.lengthで確認をする
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase