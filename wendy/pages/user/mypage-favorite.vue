<template>
  <div>
    <UserPageHeader/>
    <MyPageNavigation/>
    <h2>お気に入り店舗</h2>
    <ul>
      <li class="allArticles__item store-card" v-for="(article, index) in favoriteArticles" :key="index">
        <p>{{ article.store_name }}</p>
        <p>{{ article.store_categroy }}</p>
        <p>{{ article.store_area }}</p>
        <p>{{ article.store_small_text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  middleware: 'authenticated',
  data() {
    return {

    }
  },
  computed: {
    ...mapState('mypage', ['favoriteArticles']),
  },
  methods: {
    ...mapActions('mypage', ['getFavoriteArticles']),
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      //リロード後に実行したい処理
      this.getFavoriteArticles(user)
    })
  },
}
</script>

<style lang="scss" scoped>

</style>