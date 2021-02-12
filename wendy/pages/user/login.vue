<template>
  <div>
    <h2>ログイン画面</h2>
    <p>メールアドレス入力欄</p>
    <p>パスワード入力欄</p>
    <h3>ログインボタン</h3>
    <button @click="googleLogin">Googleアカウントでログイン</button>
    <p>初めての方はこちら</p>
    <nuxt-link :to="`/user/registration`">新規登録</nuxt-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {

    }
  },
  computed: {
    
  },
  methods: {
    ...mapActions('auth', ['googleLogin'])
  },
  created: function() {
  },
}
</script>