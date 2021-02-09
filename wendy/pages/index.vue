<template>
  <div>
    <h1>トップページ</h1>
    <p><nuxt-link :to="`/articles/`">店舗一覧</nuxt-link></p>
    <h2>エリアAのお店</h2>
        <ul>
      <li v-for="(article, index) in articlesAarea" :key="index">
        <p>{{ article.store_name }}</p>
        <p><nuxt-link :to="`/articles/${article.id}`">{{ article.store_name }}の詳細を見る</nuxt-link></p>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    articlesAarea: function() {
      return this.$store.state.articles.articlesAarea
    }
    
  },
  created: function() {
    this.$store.dispatch('articles/getArticlesAarea')
  },
}
</script>