<template>
  <section class="allArticles background" :style="{ backgroundColor: background }">
    <div class="allArticles__inner">
      <p class="allArticles__title">全店舗一覧</p>
      <StoreCard :favoriteArticles="allArticles" @background-color='background = $event'/>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      background: ''
    }
  },
  computed: {
    ...mapState('articles', ['allArticles']),
    
  },
  methods: {
    ...mapActions('articles', ['getAllArticles']),
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