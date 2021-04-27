<template>
  <div class="coupon-detail">
    <CouponDetailSectionTitle class="coupon-detail__section-title" :coupon-detail-section-title="'こちらのクーポンを利用します'"/>
    <div class="coupon">
      <div class="coupon__header">
        <div class="coupon__image">
          <div class="coupon__tag">
            <p class="coupon__category">{{ coupon.category }}</p>
            <p class="coupon__time">{{ coupon.start }}~{{ coupon.end }}の入店限定</p>
          </div>
          <img :src="coupon.image" alt="">
          <p class="coupon__badge"><img :src="`/img/discount-badge/discount-badge${coupon.discount_rate}.png`" alt=""></p>
        </div>
      </div>
      <div  class="coupon__content" :style="{ backgroundImage: 'url(/img/' + coupon.coupon_id + '-bg.png)' }">
        <p class="coupon__title">{{ coupon.title }}</p>
        <p v-if="coupon.discount_rate === 0" class="coupon__discount-rate"><span :class="coupon.coupon_id">{{ coupon.category }}で特別価格</span></p>
        <div v-else class="coupon__discount-rate"><p><span :class="coupon.coupon_id">{{ coupon.category }}で{{ coupon.discount_rate }}%OFF</span></p></div>
        <p v-if="coupon.discount_rate === 0" class="coupon__normal-price-blank"></p>
        <p v-else class="coupon__normal-price">通常 {{ coupon.normal_price.toLocaleString() }}円</p>
        <p class="coupon__discount-price">ずらし飯特別価格 <span>{{ Math.floor(coupon.normal_price * ((100 - coupon.discount_rate) / 100)).toLocaleString() }}<span class="yen">円</span></span></p>
        <div class="cover"></div>
      </div>
    </div>
    <CouponDetailSectionTitle class="coupon-detail__section-title" :coupon-detail-section-title="'利用条件とお店からのメッセージ'"/>
    <p class="coupon-detail__message">{{ coupon.how_to_use }}</p>
    <p class="coupon-detail__message">{{ coupon.rule }}</p>
    <p class="coupon-detail__message">{{ coupon.information }}</p>
    <!-- <p class="coupon-detail__sub-title">今日は何人で利用しますか</p>
    <p class="coupon-detail__sub-title">お店のQRコードを読み取ってお食事スタート!!</p> -->
    <CouponDetailSectionTitle class="coupon-detail__section-title" :coupon-detail-section-title="'お店で店員さんにこの画面を掲示して下さい'"/>
    <div class="scan-btn">
      <router-link :to="{ path: '/article/scan', query: { start: coupon.start, end: coupon.end, title: coupon.title, article_id: coupon.article_id }}">
        <p class="scan-btn__icon"><img src="/img/qr-code@2x.png" alt=""></p>
        <p class="scan-btn__texr">対象店舗での<br>QRコードスキャンはこちら</p>
      </router-link>
    </div>
    <p class="scan"><button @click="scan">【選択店舗でスキャンしたことにする】</button></p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"
//firestoreのアクション部分のパッケージをインストールする
import { firestoreAction } from "vuexfire";

//firebaseのDBを定義する
const db = firebase.firestore();
const articlesRef = db.collection("articles");

export default {
  head() {
    return {
      title: this.coupon.category + 'のクーポン詳細'
    }
  },
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
  methods: {
    scan() {
      let wendyLocal = localStorage.getItem('wendy')
      const user = JSON.parse(wendyLocal).auth.login_user
      if (user) {
        this.result = this.coupon.article_id
        const title = this.coupon.title
        const start = this.coupon.start
        const end = this.coupon.end
        const id = this.coupon.article_id

        if(id !== this.coupon.article_id) {
          alert('読み取りエラー：店舗が違います')
          return
        }
        const db = firebase.firestore()
        const usersRef = db.collection('users')

        usersRef
        .doc(user.uid)
        .collection('visited_articles')
        .add({
          article_id: this.coupon.article_id,
          ref: db.doc('articles/' + this.coupon.article_id),
          create_time: firebase.firestore.FieldValue.serverTimestamp(),
          used_coupon_title: title,
          used_coupon_start: start,
          used_coupon_end: end
        })
        .then(() => {
          this.$router.push({ name: "article-scan-success" });
        })
      } else {
        alert('ログインしてください')
      }
    }
  },
  created: function () {},
};
</script>

<style lang="scss" scoped>
.coupon-detail {
  padding-bottom: 12rem;
  &__section-title {
    padding: 3.2rem 0 1.6rem;
  }
  &__message {
    text-align: center;
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
  max-width: 768px;
  margin: 0 auto 0.8rem;
  color: #2e6171;
  font-weight: bold;
  @include mq() {
    padding: 0rem 12rem;
  }
  &__header {
    background-color: lightgreen;
  }
  &__image {
    position: relative;
  }
  &__tag {
    padding: 0.5rem 1rem;
    backdrop-filter: blur(4px);
    width: 100%;
    position: absolute;
  }
  &__category {
    font-size: 1.4rem;
    color: #ff427a;
    display: inline-block;
    margin-right: 0.8rem;
    text-shadow:0 0 5px #888;
  }
  &__time {
    font-size: 1.2rem;
    color: #fff;
    display: inline-block;
    text-shadow:0 0 5px #000;
  }
  &__badge {
    width: 80px;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    overflow: hidden;
  }
  &__badge img {
    border-radius: 50%;
    transform: scale(1.2);
  }
  &__content {
    height: 120px;
    max-width: 360px;
    margin: 0 auto;
    padding: 2rem 2.4rem 1.6rem;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  &__title {
    font-size: 1.2rem;
    width: 240px;
  }
  &__normal-price {
    margin-top: auto;
    font-weight: normal;
    font-size: 1.2rem;
    text-decoration: line-through;
    color: #838383;
  }
  &__discount-rate {
    font-size: 1.4rem;
    .oso-lunch {
      color: rgb(72, 179, 245);
    }
    .haya-dinner {
      color: rgba(236, 103, 63, 1);
    }
    .oso-dinner {
      color: rgba(66, 58, 141, 1);
    }
  }
  &__discount-price {
    position: absolute;
    bottom: 13px;
    right: 88px;
    font-size: 1.2rem;
    font-weight: normal;
    span {
      margin-left: 0.2rem;
      font-size: 2.4rem;
      color: #ff427a;
      font-weight: bold;
    }
    .yen {
      font-size: 1.8rem;
      margin-left: 2px;
    }
  }
  .cover {
    width: 45px;
    height: 30px;
    background-color: #ff427a;
    position: absolute;
    bottom: 16px;
    right: 20px;
  }
}

.scan {
  text-align: center;
  padding: 2rem 0;
  font-size: 1.4rem;
  button {
    background-color: #fff;
    padding: 0.5rem;
  }
}

</style>

