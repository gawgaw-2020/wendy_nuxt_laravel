<template>
  <section class="allArticles">
    <div class="allArticles__inner">
      <p class="allArticles__title">早い時間のディナーでお得なお店</p>
      <StoreCard :favoriteArticles="hayaDinnerArticles"/>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('articles', ['hayaDinnerArticles'])
  },
  methods: {
    ...mapActions('articles', ['getHayaDinnerArticles']),
  },
  created: function(){
    this.getHayaDinnerArticles()
  }
}
</script>

<style lang="scss" scoped>
.allArticles {
  background-color: rgba(236, 103, 63, 0.15);
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