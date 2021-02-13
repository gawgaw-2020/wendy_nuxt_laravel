<template>
  <div>
    <p><nuxt-link :to="`/user/mypage-info`">お知らせ</nuxt-link></p>
    <p><nuxt-link :to="`/user/mypage-favorite`">お気に入り店舗一覧</nuxt-link></p>
    <p><nuxt-link :to="`/user/mypage-history`">利用履歴</nuxt-link></p>
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
