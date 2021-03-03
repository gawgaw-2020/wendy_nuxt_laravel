<template>
  <section class="allArticles">
    <div class="allArticles__inner">
      <p class="allArticles__title">{{ displayTime }} ／ {{ displayArea }}でお得なお店</p>
      <p class="mypage-favorite__empty-message" v-if="!searchedArticles.length">条件に一致する店舗がありません</p>
      <StoreCard :favoriteArticles="searchedArticles" :selectedTime="userSelectedTime"/>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      userSelectedTime: '',
      displayTime: '',
      displayArea: ''
    }
  },
  computed: {
    ...mapGetters('articles', ['searchedArticles'])
  },
  methods: {
    ...mapActions('articles', ['getSearchedArticles']),
  },
  created: function(){
    const selectedArea = this.$route.query.selectedArea
    this.displayArea = this.$route.query.selectedArea
    this.displayTime = this.$route.query.selectedTime
    let selectedTime = ''
    if (this.$route.query.selectedTime === '遅ランチ') {
      selectedTime = 'coupon_oso_lunch_active'
      this.userSelectedTime = 'oso-lunch'
    }
    if (this.$route.query.selectedTime === '早ディナー') {
      selectedTime = 'coupon_haya_dinner_active'
      this.userSelectedTime = 'haya-dinner'
    }
    if (this.$route.query.selectedTime === '遅ディナー') {
      selectedTime = 'coupon_oso_dinner_active'
      this.userSelectedTime = 'oso-dinner'
    }
    this.getSearchedArticles({ selectedTime, selectedArea })
  }
}
</script>

<style lang="scss" scoped>
.allArticles {
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