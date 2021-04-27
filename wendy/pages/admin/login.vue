<template>
  <div class="login-form">
    <div class="login-form__inner">
      <h2>店舗がログインする画面</h2>
      <div class="user-input">
        <p class="user-input__input"><input type="email" v-model="email" placeholder="メールアドレス"></p>
        <p class="user-input__error"></p>
      </div>
      <div class="user-input">
        <p class="user-input__input"><input type="password" v-model="password" placeholder="パスワード"></p>
        <p class="user-input__error"></p>
      </div>
      <button class="login-link__btn btn btn-primary" @click="login">ログイン</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  head() {
    return {
      title: '店舗ログイン画面'
    }
  },
  layout: 'admin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
  },
  methods: {
    ...mapActions('store-auth', ['firebaseLogin']),
    async login() {
      await this.firebaseLogin({ email: this.email, password: this.password });
    }
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>
</style>