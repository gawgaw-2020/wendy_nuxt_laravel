<template>
  <div>
    <div>
      <p @click="$router.push('/')" style="cursor: pointer" v-text="title"></p>
      <button small elevation="" color="" @click="$router.push('/user/login')">ログイン・新規登録</button>
      <button small elevation="" color="" @click="$router.push('/user/mypage-favorite')">マイページ</button>
    </div>
    <main>
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
