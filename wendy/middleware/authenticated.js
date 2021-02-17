import { extendWith } from "lodash"
import firebase from 'firebase'

export default function ({ store, redirect, route }) {
  // どうにかして判定したい

  // firebaseに問い合わせ → nullになる（onAuthStateChangedより前の処理だから）
  var user = firebase.auth().currentUser;
  // console.log(user);

  // （暫定対応）何かしらlocalstorageの値で判定 → とりあえず動作的にはOKだが書き換えたらアクセスできてしまう
  // console.log(localStorage.getItem("linePosition"));
  if (['info', 'favorite', 'history', 'setting'].includes(localStorage.getItem("linePosition"))) {
    return
  }

  // ユーザーが認証されていない場合はリダイレクトさせる
  if (user === null) {
    return redirect('/login/login')
  }
} 