<template>
  <div class="store-card">
    <nuxt-link :to="`/article/${article.store_id}`">
      <div  class="store-card__header">
        <p class="store-card__main-image" :style="{ backgroundImage: 'url(' + article.main_image + ')' }"></p>
        <p class="store-card__name">{{ article.name }}</p>
        <p class="store-card__category">{{ article.category }}</p>
      </div>
      <div  class="store-card__content">
        <p class="store-card__nearest_station">最寄り駅：{{ article.nearest_station }}</p>
        <p class="store-card__small_text">{{ article.small_text }}</p>
      </div>
    </nuxt-link>
    <div  class="store-card__footer">
      <ul class="store-card__tab-list">
        <li :class="{ active: active === coupon.coupon_id }" class="store-card__tab-item" v-for="(coupon, index) in article.coupons" :key="index">
          <a  href="#" @click.prevent="activate(coupon.coupon_id)">
            <div class="store-card__tab-inner">
              <p class="store-card__coupon-time-image"><img :src="'/img/' + coupon.coupon_id + '-time-image@2x.png'" alt=""></p>
              <p class="store-card__coupon-category">{{ coupon.category }}</p>
            </div>
          </a>
        </li>
      </ul>
      <div class="store-card__tab-content" v-show="active === coupon.coupon_id" v-for="(coupon, index) in article.coupons" :key="index">
        <div v-if="coupon.active" class="store-card__coupon-content animate__animated animate__fadeIn animate__faster">
          <p class="store-card__coupon-title">{{ coupon.title }}</p>
          <div  class="store-card__content-footer">
            <div class="store-card__coupon-content-left">
              <p class="store-card__badge"><img :src="`/img/discount-badge/discount-badge${coupon.discount_rate}.png`" alt=""></p>
              <p class="store-card__thumbnail"><img :src="coupon.image" alt=""></p>
            </div>
            <div class="store-card__coupon-content-right">
              <p class="store-card__coupon-time">{{ coupon.start }} ~ {{ coupon.end }}の入店限定</p>
              <p class="store-card__normal-price">通常価格 {{ coupon.normal_price.toLocaleString() }}円</p>
              <p class="store-card__discount-price">Wendy特別価格 <span>{{ Math.floor(coupon.normal_price * ((100 - coupon.discount_rate) / 100)).toLocaleString() }}円</span></p>
            </div>
          </div>
        </div>
        <div v-else class="animate__animated animate__fadeIn animate__faster">
          <p class="store-card__no-coupon-time">クーポン検討中です。</p>
          <p class="store-card__no-coupon-title">他の時間帯のクーポンをご覧下さい。店舗をお気に入り登録して、クーポンの追加を待ちましょう★</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'article',
  ],
  data() {
    return {
      active: "haya-dinner",
    }
  },
  created() {
    if(this.$route.query.selectedTime === '遅ランチ') {
      this.active = 'oso-lunch'
    }
    if(this.$route.query.selectedTime === '早ディナー') {
      this.active = 'haya-dinner'
    }
    if(this.$route.query.selectedTime === '遅ディナー') {
      this.active = 'oso-dinner'
    }
  },
  methods: {
    activate(id) {
      this.active = id
    }

  }
}
</script>

<style lang="scss" scoped>
  .store-card {
    background-color: #fff;
    margin-bottom: 3.2rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    @include mq() {
      border-radius: 10px;
    }
    &__header {
      height: 155px;
      position: relative;
    }
    &__main-image {
      height: 100%;
      background-size: cover;
      @include mq() {
        border-radius: 10px 10px 0 0;
      }
    }
    &__main-image:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgb(0,0,0);
      background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.196516106442577) 30%, rgba(255,255,255,0) 100%);
    }
    &__name {
      position: absolute;
      bottom: 0;
      color: #fff;
      font-weight: bold;
      font-size: 1.8rem;
      padding: 0.8rem 1rem;
    }
    &__category {
      position: absolute;
      top: 0;
      color: #fff;
      font-size: 1.4rem;
      font-weight: bold;
      background-color: rgba(46, 97, 113, 0.7);
      padding: 0.4rem 2.2rem;
      border-radius: 0px 0 4px 0;
      @include mq(sm) {
        border-radius: 10px 0 4px 0;
      }
    }
    &__content {
      padding: 1rem 1rem 1.6rem;
    }
    &__nearest_station {
      font-size: 1.2rem;
      color: #838383;
      margin-bottom: 0.8rem;
    }
    &__small_text {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: left;
    }
    // card footer
    &__tab-list {
      display: flex;
      justify-content: space-between;
    }
    &__tab-item {
      width: 33%;
      border-radius: 4px 4px 0 0;
    }
    &__coupon-time-image {
      padding: 0 3.5rem 0;
      margin-bottom: -1rem;
      filter: grayscale(100%);
      transition: all 0.1s;
    }
    &__coupon-category {
      display: inline-block;
      font-size: 1.2rem;
      font-weight: bold;
      color: #aaa;
      padding: 0 0 0.4rem;
      transition: all 0.1s;
    }
    &__tab-item.active {
      background-color: #efefef;
    }
    &__tab-item.active .store-card__coupon-time-image {
      filter: grayscale(0%);
    }
    &__tab-item.active .store-card__coupon-category {
      color: #ff427a;
      border-bottom: 1px solid #ff427a;
    }
    &__tab-content {
      min-height: 112px;
      background-color: #efefef;
      color: #2E6171;
      min-height: 14.5rem;
      @include mq(sm) {
        border-radius: 0 0 10px 10px;
      }
    }
    &__coupon-title {
      font-size: 1.4rem;
      font-weight: bold;
      text-align: left;
      padding: 0.8rem 1rem 1rem;
      min-height: 6rem;
    }
    &__content-footer {
      display: flex;
    }
    &__coupon-content-left {
      width: 40%;
      position: relative;
    }
    &__thumbnail img {
      border-radius: 0 4px 0 0;
      @include mq() {
        border-radius: 0 10px 0 10px;
      }
    }
    &__badge {
      width: 40px;
      position: absolute;
      top: 0;
      right: 0;
      overflow: hidden;
      border-radius: 50%;
    }
    &__badge img {
      transform: scale(1.2);
      border-radius: 50%;
    }
    &__coupon-content-right {
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: -1rem;
    }
    &__coupon-time {
      font-size: 1.4rem;
      font-weight: bold;
      padding-bottom: 0.4rem;
    }
    &__normal-price {
      font-size: 1.2rem;
      text-decoration: line-through;
      margin-bottom: -0.4rem;
    }
    &__discount-price {
      font-size: 1.2rem;
      span {
        margin-left: 0.8rem;
        font-size: 2.4rem;
        color: #ff427a;
        font-weight: bold;
      }
    }
    &__no-coupon-time {
      min-height: 60px;
      font-size: 1.4rem;
      padding: 1rem 0 0.6rem;
    }
    &__no-coupon-title {
      min-height: 100px;
      font-size: 1.4rem;
      padding: 0 1rem;
      text-align: left;
    }
  }
</style>