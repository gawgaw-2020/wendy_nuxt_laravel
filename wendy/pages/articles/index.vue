<template>
  <section>
    <h1>店舗一覧</h1>
    {{ articles }}
    <ul>
      <li v-for="(article, index) in articles" :key="index">
        <p>{{ article.store_name }}</p>
        <p><nuxt-link :to="`/articles/${article.id}`">{{ article.store_name }}の詳細を見る</nuxt-link></p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    articles: function() {
      return this.$store.state.articles.articles
    }
    
  },
  created: function() {
    this.$store.dispatch('articles/init')
  },
}
</script>

<style>

</style>