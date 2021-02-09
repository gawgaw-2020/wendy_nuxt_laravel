<template>
  <div>
    <h2>ログイン</h2>
    <p>メールアドレス入力</p>
    <p>パスワード入力</p>
    <h3>ログイン</h3>
    <p>初めての方はこちら</p>
    <nuxt-link :to="`/user/registration`">新規登録</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    
  },
  created: function() {
  },
}
</script>