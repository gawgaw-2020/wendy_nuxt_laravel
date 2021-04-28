<template>
  <div class="login-form">
    <div class="login-form__inner">
      <h2 class="login-title">店舗ログイン</h2>
      <div class="store-login">
        <div class="user-input">
          <p class="user-input__input"><input type="email" v-model="email" placeholder="店舗ログイン用アドレス"></p>
          <p class="user-input__error"></p>
        </div>
        <div class="user-input">
          <p class="user-input__input"><input type="password" v-model="password" placeholder="パスワード"></p>
          <p class="user-input__error"></p>
        </div>
        <button class="login-link__btn btn btn-primary" @click="login">ログイン</button>
      </div>
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
.login-title {
  margin-bottom: 2.4rem;
}
.store-login {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  max-width: 650px;
  padding: 4rem 6rem;
  .user-input {
    margin-bottom: 2.4rem;
  }
  .login-link__btn {
    display: block;
    margin-left: auto;
  }
}
</style>