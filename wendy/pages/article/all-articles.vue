<template>
  <section class="allArticles">
    <div class="allArticles__inner">
      <p class="allArticles__title">全店舗一覧</p>
      <StoreCard :favoriteArticles="allArticles"/>
      <infinite-loading ref="infiniteLoading" spinner="waveDots" @infinite="loadAllArticles">
        <!-- // ステータスがcompleteに更新されると下記が表示される -->
        <span class="allArticles__finish-roading" slot="no-more">-----検索結果は以上です-----</span>
        <!-- // 結果が存在しない場合下記が表示される -->
        <span slot="no-results">-----検索結果はありません-----</span>
      </infinite-loading>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InfiniteLoading from 'vue-infinite-loading';

export default {
  head() {
    return {
      title: '全店舗表示'
    }
  },
  components: {
    InfiniteLoading
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('articles', ['allArticles'])
  },
  methods: {
    ...mapActions('articles', ['getAllArticles', 'addAllArticles']),
    loadAllArticles() {
      setTimeout(() => {
        if(this.allArticles.length < 60) {
          this.addAllArticles()
          this.$refs.infiniteLoading.stateChanger.loaded()
        } else {
          this.$refs.infiniteLoading.stateChanger.complete()
        }
      }, 1000)
    }
  },
  created: function(){
    this.getAllArticles()
  }
}
</script>

<style lang="scss" scoped>
.allArticles {
  text-align: center;
  padding-bottom: 9rem;
  &__inner {
    margin: 0 auto;
    max-width: 768px;
  }
  &__title {
    display: inline-block;
    color: #ff427a;
    font-weight: bold;
    text-align: center;
    font-size: 1.4rem;
    border-bottom: 1px solid #ff427a;
    padding: 2rem 1rem 0.8rem;
    margin-bottom: 2.4rem;
  }
  &__finish-roading {
    color: #2E6171;
    font-size: 1.4rem;
    font-weight: bold;
  }
}
</style>