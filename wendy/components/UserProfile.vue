<template>
  <div>
    <h1>マイページ</h1>
      <p class="user-icon"><img v-if="userPhotoURL" :src="userPhotoURL" alt=""></p>
      <p>{{ userName }}様</p>
      <p><nuxt-link :to="`/user/mypage-favorite`">マイページ-お気に入り店舗一覧</nuxt-link></p>
      <p><nuxt-link :to="`/user/mypage-info`">マイページ-お知らせ</nuxt-link></p>
      <p><nuxt-link :to="`/user/mypage-history`">マイページ-利用履歴</nuxt-link></p>
      <p><nuxt-link :to="`/user/mypage-setting`">マイページ-メール＆パスワード再設定</nuxt-link></p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "default",
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('auth', ['userName', 'userPhotoURL'])
  }
}
</script>

<style lang="scss" scoped>
.user-icon img {
  width: 60px;
  border-radius: 50%;
}
</style>
