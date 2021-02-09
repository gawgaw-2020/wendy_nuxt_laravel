<template>
  <section>
    <h1>全店舗一覧</h1>
    <ul>
      <li v-for="(article, index) in allArticles" :key="index">
        <p>{{ article.store_name }}</p>
        <p><nuxt-link :to="`/article/${article.id}`">{{ article.store_name }}の詳細を見る</nuxt-link></p>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState('articles', ['allArticles'])
  },
  methods: {
    ...mapActions('articles', ['getAllArticles'])
  },
  created: function(){
    this.getAllArticles()
  }
}
</script>

<style>

</style>