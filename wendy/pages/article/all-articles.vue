<template>
  <section>
    <h1>全店舗一覧</h1>
    <ul>
      <li v-for="(article, index) in allArticles" :key="index">
        <p>{{ article.store_name }}</p>
        <p>{{ article.store_category }}</p>
        <p>{{ article.store_area }}</p>
        <p>{{ article.store_small_text }}</p>
        <ul>
          <li v-for="(coupon, index) in article.coupons" :key="index">
            <p>{{ coupon.coupon_category }}</p>
            <p>{{ coupon.coupon_start }}~{{ coupon.coupon_end }}の入店で</p>
            <p>{{ coupon.coupon_title }}</p>
          </li>
        </ul>
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