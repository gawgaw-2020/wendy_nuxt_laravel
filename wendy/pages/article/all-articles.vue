<template>
  <section class="allArticles" :style="{ backgroundColor: background }">
    <div class="allArticles__inner">
      <p class="allArticles__title">全店舗一覧</p>
      <StoreCard :favoriteArticles="allArticles" @background-color='background = $event'/>
    </div>
    <div><button @click="loadAllArticles">追加の読み込み</button></div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      background: ''
    }
  },
  computed: {
    ...mapGetters('articles', ['allArticles'])
  },
  methods: {
    ...mapActions('articles', ['getAllArticles', 'addAllArticles']),
    loadAllArticles() {
      this.addAllArticles()
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
  background-color: rgba(236, 103, 63, 0.15);
  padding-bottom: 7rem;
  &__inner {
    width: 93%;
    margin: 0 auto;
    max-width: 768px;
  }
  &__title {
    display: inline-block;
    color: #ff427a;
    font-weight: bold;
    text-align: center;
    font-size: 1.2rem;
    border-bottom: 1px solid #ff427a;
    padding: 2rem 1rem 0.8rem;
    margin-bottom: 2.4rem;
  }
}
</style>