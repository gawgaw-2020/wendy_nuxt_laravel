import { extendWith } from "lodash"
import firebase from 'firebase'

export default function ({ store, redirect, route }) {
  // 店舗ログインが認証されていない場合はリダイレクトさせる
  if (!store.state["store-auth"].storeAuthenticated) {
    return redirect('/admin/login')
  }
  
} 
