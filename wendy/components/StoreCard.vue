<template>
  <ul class="allArticles__list">
    <li class="allArticles__item store-card" v-for="(article, index) in favoriteArticles" :key="index">
      <StoreCardBody :article="article"/>
    </li>
  </ul>
</template>

<script>
export default {
  props: [
    'favoriteArticles',
  ],
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .allArticles__list {
    @include mq(sm) {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>