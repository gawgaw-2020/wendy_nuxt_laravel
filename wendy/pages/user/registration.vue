<template>
  <div>
    <h2>新規登録画面</h2>
    <p>メールアドレス</p>
    <p><input type="email" v-model="email"></p>
    <p>パスワード</p>
    <p><input type="password" v-model="password"></p>
    <button @click="signUp">新規登録</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState("auth", ["login_user"])
  },
  methods: {
    ...mapActions("auth", ["firebaseSignUp", 'createUser']),
    async signUp() {
      await this.firebaseSignUp({ email: this.email, password: this.password })
    },
  },
  created: function() {
  },
}
</script>