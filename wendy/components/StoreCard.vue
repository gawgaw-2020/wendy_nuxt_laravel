<template>
  <ul class="allArticles__list">
    <li class="allArticles__item" v-for="(article, index) in favoriteArticles" :key="index">
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
    @include mq() {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .allArticles__item {
    @include mq() {
      border-radius: 10px;
      width: calc((100% / 2) - 12px);
    }
  }
  .allArticles__item:nth-child(odd) {
    @include mq() {
      margin-right: 24px;
    }
  }

</style>