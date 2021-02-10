<template>
  <div>
    <div>
      <p @click="$router.push('/')" style="cursor: pointer" v-text="title"></p>
    </div>
    <main>
      <div class="maypage-menu">
        <h1>マイページ</h1>
          <p><nuxt-link :to="`/user/mypage-favorite`">マイページ-お気に入り店舗一覧</nuxt-link></p>
          <p><nuxt-link :to="`/user/mypage-info`">マイページ-お知らせ</nuxt-link></p>
          <p><nuxt-link :to="`/user/mypage-history`">マイページ-利用履歴</nuxt-link></p>
          <p><nuxt-link :to="`/user/mypage-setting`">マイページ-メール＆パスワード再設定</nuxt-link></p>
          <p>ログアウト（処理してトップページへ遷移）</p>
      </div>
      <div>
        <nuxt />
      </div>
    </main>
    <footer>
      <span>&copy; WENDY {{ new Date().getFullYear() }}</span>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'WENDY'
    }
  }
}
</script>

<style lang="scss">
.maypage-menu {
  background-color: #EB5276;
  height: 344px;
  h1,h2 {
    text-align: center;
    padding: 1rem;
  }
}

</style>