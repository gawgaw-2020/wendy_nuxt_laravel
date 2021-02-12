<template>
  <div>
    <div>
      <p @click="$router.push('/')" style="cursor: pointer" v-text="title"></p>
      <button small elevation="" color="" @click="$router.push('/user/login')">ログイン・新規登録</button>
      <button small elevation="" color="" @click="$router.push('/user/mypage-favorite')">マイページ</button>
    </div>
    <main>
      <div>
        <nuxt />
      </div>
    </main>
    <footer>
      <span>&copy; WENDY {{ new Date().getFullYear() }}</span>
    </footer>
  </div>
</template>

<script>
//firebaseの初期化の部分のインストール
import firebase from '../plugins/firebase'

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data () {
    return {
      title: 'WENDY'
    }
  },
  created() {
    // onAuthStateChangedは引数に認証の状態が変わった時に呼び出されるコールバック関数を受け取る
    // ログイン・ログアウトの際に引数の関数が呼ばれ、ログイン時にはユーザーのオブジェクトが渡ってくる、ログアウトのときはnullが渡ってくる
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, email, displayName } = user
        this.setLoginUser({ uid, email, displayName })
      }
    })
  },
  methods: {
    ...mapActions('auth', ['setLoginUser'])
  }
}
</script>
