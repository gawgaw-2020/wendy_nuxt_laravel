<template>
  <section class="background" :style="{ backgroundColor: this.background }">
    <p>全店舗一覧</p>
    <ul>
      <li v-for="(article, index) in allArticles" :key="index">
        <nuxt-link :to="`/article/${article.id}`">
          <p class="image" :style="{ backgroundImage: 'url(' + article.store_main_image + ')' }"></p>
          <p>{{ article.store_name }}</p>
          <p>{{ article.store_category }}</p>
          <p>{{ article.store_area }}</p>
          <p>{{ article.store_small_text }}</p>
        </nuxt-link>
        <ul class="tab__label">
          <li v-for="(coupon, index) in article.coupons" :key="index">
            <a :class="{ active: active === coupon.coupon_id }" href="#" @click.prevent="activate(coupon.coupon_id)">
              <p>{{ coupon.coupon_category }}</p>
            </a>
          </li>
        </ul>
        <div class="tab__content" v-show="active === coupon.coupon_id" v-for="(coupon, index) in article.coupons" :key="index">
          <p>{{ coupon.coupon_start }}~{{ coupon.coupon_end }}の入店</p>
          <p>{{ coupon.coupon_title }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      active: "haya-dinner",
      background: 'skyblue'
    }
  },
  computed: {
    ...mapState('articles', ['allArticles']),
    
  },
  methods: {
    ...mapActions('articles', ['getAllArticles']),
    activate(id) {
      this.active = id
      if (id === 'oso-lunch') {
        this.background = 'skyblue'
      }
      if (id === 'haya-dinner') {
        this.background = 'orange'
      }
      if (id === 'oso-dinner') {
        this.background = 'purple'
      }
    }
  },
  created: function(){
    this.getAllArticles()
  }
}
</script>

<style lang="scss" scoped>
</style>