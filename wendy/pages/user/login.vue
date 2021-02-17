<template>
  <div>
    <LoginNavigation/>
    <h2>ログイン画面</h2>
    <p>メールアドレス</p>
    <p><input type="email" v-model="email"></p>
    <p>パスワード</p>
    <p><input type="password" v-model="password"></p>
    <button @click="login">ログイン</button>
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
      email: '',
      password: ''

    }
  },
  computed: {
  ...mapState("auth", ["login_user"])
  },
  methods: {
    ...mapActions('auth', ['googleLogin', 'firebaseLogin', 'createUser']),
    async login() {
      await this.firebaseLogin({ email: this.email, password: this.password });
    }
  },
  created: function() {
  },
}
</script>