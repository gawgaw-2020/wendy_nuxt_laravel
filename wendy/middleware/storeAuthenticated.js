import { extendWith } from "lodash"
import firebase from 'firebase'

export default function ({ store, redirect, route }) {
  let wendyLocal = localStorage.getItem('wendy')
  if (wendyLocal !== null) {
    
    if (JSON.parse(wendyLocal)["store-auth"].storeAuthenticated) {
      return
    }
    
  }
  // 店舗ログインが認証されていない場合はリダイレクトさせる
  if (!store.state["store-auth"].storeAuthenticated) {
    return redirect('/admin/login')
  }
  
} 
