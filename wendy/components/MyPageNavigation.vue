<template>
  <div>
    <p><nuxt-link :to="`/user/mypage-info`">マイページ-お知らせ</nuxt-link></p>
    <p><nuxt-link :to="`/user/mypage-favorite`">マイページ-お気に入り店舗一覧</nuxt-link></p>
    <p><nuxt-link :to="`/user/mypage-history`">マイページ-利用履歴</nuxt-link></p>
    <p><nuxt-link :to="`/user/mypage-setting`">ユーザー情報</nuxt-link></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
