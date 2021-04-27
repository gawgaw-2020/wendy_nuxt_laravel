<template>
  <section class="allArticles">
    <div class="allArticles__inner">
      <p class="allArticles__title">遅い時間のランチでお得なお店</p>
      <StoreCard :favoriteArticles="osoLunchArticles"/>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  head() {
    return {
      title: '遅い時間のランチでお得なお店'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('articles', ['osoLunchArticles'])
  },
  methods: {
    ...mapActions('articles', ['getOsoLunchArticles']),
  },
  created: function(){
    this.getOsoLunchArticles()
  }
}
</script>

<style lang="scss" scoped>
.allArticles {
  background-color: rgba(154, 212, 248, 0.2);
  text-align: center;
  padding-bottom: 7rem;
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
}
</style>