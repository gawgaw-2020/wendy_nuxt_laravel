<template>
  <div class="coupon-detail">
    <CouponDetailSectionTitle class="coupon-detail__section-title" :coupon-detail-section-title="'こちらのクーポンを利用します'"/>
    <div
      class="coupon"
      :style="{ backgroundImage: 'url(/img/' + coupon.coupon_id + '-bg.png)' }"
    >
      <div class="coupon__content">
        <p class="coupon__category">{{ coupon.category }}</p>
        <p class="coupon__time">
          {{ coupon.start }}~{{ coupon.end }}の入店で
        </p>
        <p class="coupon__title">{{ coupon.title }}</p>
      </div>
      <p class="coupon__link">
      </p>
    </div>
    <CouponDetailSectionTitle class="coupon-detail__section-title" :coupon-detail-section-title="'利用条件とお店からのメッセージ'"/>
    <p class="coupon-detail__message">{{ coupon.how_to_use }}</p>
    <p class="coupon-detail__message">{{ coupon.rule }}</p>
    <p class="coupon-detail__message">{{ coupon.information }}</p>
    <!-- <p class="coupon-detail__sub-title">今日は何人で利用しますか</p>
    <p class="coupon-detail__sub-title">お店のQRコードを読み取ってお食事スタート!!</p> -->
    <CouponDetailSectionTitle class="coupon-detail__section-title" :coupon-detail-section-title="'お店のQRコードを読み取ってお食事スタート'"/>
    <div class="scan-btn">
      <router-link :to="{ path: '/article/scan', query: { start: coupon.start, end: coupon.end, title: coupon.title, article_id: coupon.article_id }}">
        <p class="scan-btn__icon"><img src="/img/qr-code@2x.png" alt=""></p>
        <p class="scan-btn__texr">店舗での掲示クーポン発行<br>QRコードスキャンはこちら</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import firebase from "firebase";
//firestoreのアクション部分のパッケージをインストールする
import { firestoreAction } from "vuexfire";

//firebaseのDBを定義する
const db = firebase.firestore();
const articlesRef = db.collection("articles");

export default {
  data() {
    return {};
  },
  async asyncData(context) {
    let coupon;
    let coupon_id;
    await articlesRef
      .doc(context.params.articleId)
      .collection("coupons")
      .doc(context.params.couponCategory)
      .get()
      .then(function (doc) {
        coupon_id = doc.id
        coupon = {coupon_id, ...doc.data()}
      });
    return { coupon };
  },
  computed: {},
  methods: {},
  created: function () {},
};
</script>

<style lang="scss" scoped>
.coupon-detail {
  &__section-title {
    padding: 3.2rem 0;
  }
  &__message {
    color: #2e6171;
    font-weight: bold;
    margin-bottom: 0.4rem;
    padding: 0 2rem;
  }
  &__sub-title {
    color: #2e6171;
    font-weight: bold;
    text-align: center;
    padding: 3rem 0 2rem;
  }
  .scan-btn {
    width: 260px;
    margin: 0 auto;
    border: 3px solid #ff427a;
    border-radius: 20px;
    padding: 1.6rem 2.5rem 2.1rem;
    text-align: center;
    &__icon img {
      width: 35px;
      margin: 0 auto 0.9rem;
    }
  }
}
.coupon {
  width: 340px;
  height: 112px;
  margin: 0 auto 0.8rem;
  color: #2e6171;
  font-weight: bold;
  position: relative;
  display: flex;
  background-position: center;
  &__content {
    width: 75%;
  }
  &__category {
    font-size: 1.4rem;
    color: #ff427a;
    position: absolute;
    left: 16px;
    top: 10px;
  }
  &__time {
    font-size: 1.2rem;
    padding: 1.2rem 0 0.6rem 6rem;
    text-align: center;
  }
  &__title {
    font-size: 1.2rem;
    padding-left: 1.5rem;
    line-height: 1.7;
  }
  &__link {
    width: 25%;
  }
  &__link a {
    font-size: 1rem;
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #fff;
  }
}

</style>

