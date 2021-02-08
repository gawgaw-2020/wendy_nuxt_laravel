
import firebase from 'firebase'

//firebaseの初期化に必要なデータをconfigで用意する
//必要に応じてパラメーターをここで定義
const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}
//二重に初期化が行われないために!firebase.app.lengthで確認をする
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase