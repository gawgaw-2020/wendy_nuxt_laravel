import { extendWith } from "lodash"
import firebase from 'firebase'

export default function ({ store, redirect, route }) {

  let wendyLocal = localStorage.getItem('wendy')
  if (wendyLocal !== null) {
    
    if (['info', 'favorite', 'history', 'setting'].includes(JSON.parse(wendyLocal).mypage.linePosition)) {
      return
    }
    
  }

  // ユーザーが認証されていない場合はリダイレクトさせる
  if (!store.state.auth.authenticated) {
    return redirect('/login/login')
  }
  
} 