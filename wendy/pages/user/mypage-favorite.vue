<template>
  <div class="mypage-favorite__container">
    <UserPageHeader/>
    <MyPageNavigation/>
    <div class="mypage-favorite">
      <div class="mypage-favorite__inner">
        <h2 class="mypage-favorite__title">お気に入り店舗</h2>
        <div class="favorite">
          <p class="mypage-favorite__empty-message" v-if="!favoriteArticles.length">お気に入りした店舗がありません</p>
          <StoreCard :favoriteArticles="favoriteArticles"/>
        </div>
      </div>
    </div>
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
    ...mapActions('mypage', ['getFavoriteArticles', 'setLinePosition']),
  },
  created: function() {
    this.setLinePosition('favorite')
    this.getFavoriteArticles()
  },
  mounted() {
    const page = document.querySelector('.mypage-favorite__container')
    const bodyHeight = document.body.clientHeight
    if (bodyHeight > page.clientHeight) {
      page.style.height = `${bodyHeight}px`
    }
  }
}
</script>

<style lang="scss" scoped>
  .mypage-favorite__container {
    background-color: #efefef;
    padding-bottom: 80px;
  }
  .mypage-favorite {
    color: #2e6171;
    &__inner {
      max-width: 1366px;
      padding: 0 16px;
      margin: 0 auto;
    }
    &__title {
      font-size: 1.4rem;
      text-align: center;
      padding: 3.2rem 0 2.2rem;
    }
    &__empty-message {
      text-align: center;
      padding: 3rem 0;
    }
  }

</style>