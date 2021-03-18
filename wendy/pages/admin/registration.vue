<template>
  <div class="registration-form">
    <div class="registration-form__inner">
      <h2>店舗を新規登録する画面（運営専用）</h2>
      <div class="user-input">
        <p class="user-input__input"><input type="text" v-model="name" placeholder="店舗名"></p>
      </div>
      <div class="user-input">
        <p class="user-input__input"><input type="text" v-model="name_kana" placeholder="店舗名（カタカナ）"></p>
      </div>
      <div class="user-input">
        <p class="user-input__input"><input type="tell" v-model="tell" placeholder="電話番号"></p>
      </div>
      <div class="user-input">
        <p class="user-input__input"><input type="text" v-model="address" placeholder="住所"></p>
      </div>
      <div class="user-input">
        <p class="user-input__input"><input type="text" v-model="area" placeholder="エリア"></p>
      </div>
      <div class="user-input">
        <p class="user-input__input"><input type="text" v-model="nearest_station" placeholder="最寄り駅"></p>
      </div>
      <div class="user-input">
        <p class="user-input__input"><input type="email" v-model="email" placeholder="メールアドレス"></p>
      </div>
      <div class="user-input">
        <p class="user-input__input"><input type="password" v-model="password" placeholder="パスワード"></p>
      </div>
      <button class="registration-link__btn btn btn-primary" @click="signUp">新規登録</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: 'admin',
  data() {
    return {
      name: '',
      name_kana: '',
      tell: '',
      address: '',
      area: '',
      nearest_station: '',
      email: '',
      password: '',
    }
  },
  computed: {
  },
  methods: {
    ...mapActions("store-auth", ["firebaseSignUp"]),
    async signUp() {
      const data = {
        name: this.name,
        name_kana: this.name_kana,
        tell: this.tell,
        address: this.address,
        area: this.area,
        nearest_station: this.nearest_station,
        email: this.email,
        password: this.password,
      }
      await this.firebaseSignUp(data)
    },
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>

</style>