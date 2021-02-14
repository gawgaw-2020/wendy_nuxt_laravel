<template>
  <div>
    <UserPageHeader/>
    <MyPageNavigation/>
    <h2>ユーザー情報</h2>
    <p>ユーザーネーム<span>変更する</span></p>
    <p>{{ userName }}</p>
    <p>メールアドレス</p>
    <p>{{ userEmail }}</p>
    <p>パスワード</p>
    <p>*************</p>
    <button>メール・パスワードを変更する</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  middleware: 'authenticated',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('auth', ['userName', 'userEmail'])
  },
  created: function() {
  },
}
</script>