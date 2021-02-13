export default function ({ store, redirect }) {
  // ユーザーが認証されていない場合
  if (!store.state.auth.authenticated) {
    return redirect('/user/login')
  }
} 