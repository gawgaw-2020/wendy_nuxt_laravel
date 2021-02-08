<template>
  <section>
    <h1>{{ message }}</h1>
    <p>{{ article.store_name }}</p>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      message: '/articles/_id.vueを表示中',
    }
  },
  computed: {
    ...mapState('articles', ['article'])
    // article: function() {
    //   return this.$store.state.articles.article
    // }
  },
  created() {
    this.$store.dispatch('articles/getArticleById', {
      articleId: this.$route.params.id
    })
  }
}
</script>

<style>

</style>