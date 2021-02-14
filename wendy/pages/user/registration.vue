<template>
  <div>
    <h2>新規登録画面</h2>
    <p><input type="email" v-model="email"></p>
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
      console.log(this.login_user.uid);
      await this.createUser({
        uid: this.login_user.uid,
        email: this.email,
        displayName: 'ゲストユーザー'
      });
    },
  },
  created: function() {
  },
}
</script>