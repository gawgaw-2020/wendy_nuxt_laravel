<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-spacer />
      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer" v-text="title" />
      <v-spacer />
      <v-btn small elevation="" color="" @click="$router.push('/user/login')">ログイン・新規登録</v-btn>
      <v-btn small elevation="" color="" @click="$router.push('/user/mypage-favorite')">マイページ</v-btn>
    </v-app-bar>
    <v-main>
      <div class="maypage-menu">
        <h1>マイページ</h1>
          <p><nuxt-link :to="`/user/mypage-favorite`">マイページ-お気に入り店舗一覧</nuxt-link></p>
          <p><nuxt-link :to="`/user/mypage-info`">マイページ-お知らせ</nuxt-link></p>
          <p><nuxt-link :to="`/user/mypage-history`">マイページ-利用履歴</nuxt-link></p>
          <p><nuxt-link :to="`/user/mypage-setting`">マイページ-メール＆パスワード再設定</nuxt-link></p>
          <p>ログアウト（処理してトップページへ遷移）</p>
      </div>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <v-spacer />
      <span>&copy; WENDY {{ new Date().getFullYear() }}</span>
      <v-spacer />
    </v-footer>
  </v-app>
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

<style >
.maypage-menu {
  background-color: #EB5276;
  height: 344px;
}

h1,h2 {
  text-align: center;
  padding: 1rem;
}
</style>