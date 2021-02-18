<template>
  <div>
    <LoginNavigation/>
    <p>メールアドレス</p>
    <p><input type="email" v-model="email"></p>
    <p>パスワード</p>
    <p><input type="password" v-model="password"></p>
    <button @click="login">ログイン</button>
    <p>はじめての方はこちら</p>
    <p @click="setBoxPosition('registration')"  class="btn btn-additional">
      新規登録
    </p>
    <button @click="googleLogin">Googleアカウントでログイン</button>
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
    ...mapActions("login", ["setBoxPosition"]),
    async login() {
      await this.firebaseLogin({ email: this.email, password: this.password });
    }
  },
  created: function() {
  },
}
</script>