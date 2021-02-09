<template>
  <section v-if="article">
    <h1>{{ message }}</h1>
    <p>{{ article.store_name }}</p>
    <p>{{ article.store_area }}</p>
    <p>{{ article.store_id }}</p>
    <p><nuxt-link to="/">TOPページへ</nuxt-link></p>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      message: '/articles/_id.vueを表示中',
      store_name: '店舗名'
    }
  },
  computed: {
    ...mapState('articles', ['article'])
  },
  methods: {
    ...mapActions('articles', ['getArticleById'])
  },
  created: function(){
    this.getArticleById({
      articleId: this.$route.params.id
    })
  }
}
</script>

<style>

</style>