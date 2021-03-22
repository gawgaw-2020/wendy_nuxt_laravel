<template>
  <div class="coupon-edit">
    <div class="coupon-input">
      <div class="coupon-input__inner">
        <AdminPageTitle :page-title="'クーポン情報編集'"/>
        <div class="input">
          <div class="user-input">
            <label for="start">クーポン適用時間（開始）</label>
            <p class="user-input__input"><input id="start" type="text" v-model="coupon.start"></p>
          </div>
          <div class="user-input">
            <label for="end">クーポン適用時間（終了）</label>
            <p class="user-input__input"><input id="end" type="text" v-model="coupon.end"></p>
          </div>
          <div class="user-input">
            <label for="title">お得になる商品・コース名</label>
            <p class="user-input__input"><input id="title" type="text" v-model="coupon.title"></p>
          </div>
          <div class="user-input">
            <label for="normal_price">通常価格</label>
            <p class="user-input__input"><input id="normal_price" type="text" v-model="coupon.normal_price"></p>
          </div>
          <div class="user-input">
            <label for="discount_rate">割引率</label>
            <div>
              <select v-model.number="coupon.discount_rate">
                <option disabled value="">割引率を選択</option>
                <option value="0">「お得」表示</option>
                <option value="10">10% OFF</option>
                <option value="20">20% OFF</option>
                <option value="30">30% OFF</option>
                <option value="40">40% OFF</option>
                <option value="50">50% OFF</option>
                <option value="60">60% OFF</option>
                <option value="70">70% OFF</option>
                <option value="80">80% OFF</option>
                <option value="90">90% OFF</option>
                <option value="100">100% OFF（無料）</option>
              </select>
            </div>
          </div>
          <div class="user-input">
            <p>割引後価格※自動計算されます</p>
            <p class="user-input__input">{{ Math.floor(coupon.normal_price * ((100 - coupon.discount_rate) / 100)).toLocaleString() }}円</p>
          </div>
          <div class="user-input">
            <label for="how_to_use">利用方法</label>
            <p class="user-input__input"><input id="how_to_use" type="text" v-model="coupon.how_to_use"></p>
          </div>
          <div class="user-input">
            <label for="rule">利用条件</label>
            <p class="user-input__input"><input id="rule" type="text" v-model="coupon.rule"></p>
          </div>
          <div class="user-input">
            <label for="information">フリーコメント</label>
            <textarea id="title" cols="30" rows="10" v-model="coupon.information"></textarea>
          </div>
          <button class="btn btn-primary" @click="update">この内容で登録する</button>
        </div>
      </div>
    </div>
    <div class="coupon-content">
      <div class="coupon-content__inner">
        <AdminPageTitle :page-title="'現在編集中のクーポン'"/>
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
            <p class="coupon__discount-price">Wendy特別価格 <span>{{ Math.floor(coupon.normal_price * ((100 - coupon.discount_rate) / 100)).toLocaleString() }}円</span></p>
          </div>
          <dl class="coupon__infotext">
            <dt>利用方法</dt>
            <dd>{{ coupon.how_to_use }}</dd>
            <dt>利用条件</dt>
            <dd>{{ coupon.rule }}</dd>
            <dt>フリーコメント</dt>
            <dd>
              <p v-for="(str, index) in (coupon.information).split('\n')" :key="index">{{ str }}</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

//firebaseのDBを定義する
const db = firebase.firestore()
const suspendedArticlesRef = db.collection('suspended_articles')
const articlesRef = db.collection('articles')

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";


export default {
  middleware: 'storeAuthenticated',
  layout: 'admin',
  data() {
    return {
      coupon: {}
    }
  },
  async asyncData(context) {
    let coupon;
    let coupon_id;

    let wendyLocal = localStorage.getItem('wendy')
    const user = JSON.parse(wendyLocal)['store-auth'].login_store

    await suspendedArticlesRef.doc(user.uid).get()
    .then(async function(doc) {
      if(doc.exists) {
        await suspendedArticlesRef
          .doc(user.uid)
          .collection("coupons")
          .doc(context.params.couponId)
          .get()
          .then(function (doc) {
            coupon_id = doc.id
            coupon = {coupon_id, ...doc.data()}
          });
      } else {
        await articlesRef
          .doc(user.uid)
          .collection("coupons")
          .doc(context.params.couponId)
          .get()
          .then(function (doc) {
            coupon_id = doc.id
            coupon = {coupon_id, ...doc.data()}
          });
      }
    })
    return { coupon }
  },
  computed: {
  },
  methods: {
    ...mapActions("store-edit", ["updateCoupon"]),
    update() {
      this.updateCoupon(this.coupon)
    }
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>
.coupon-edit {
  padding: 4.8rem 0;
  @include mq(lg) {
    display: flex;
  }
}
.coupon-content, .coupon-input {
  &__inner {
    width: 90%;
    margin: 0 auto;
  }
    @include mq(lg) {
    width: 50%;
  }
}

.input {
  max-width: 365px;
  height: 600px;
  margin: 0 auto 4rem;
}

.coupon {
  max-width: 365px;
  margin: 0 auto 4rem;
  color: #2e6171;
  font-weight: bold;
  &__image {
    position: relative;
  }
  &__image img {
    @include mq() {
      border-radius: 10px;
    }
  }
  &__tag {
    padding: 0.5rem 1rem;
    backdrop-filter: blur(4px);
    width: 100%;
    position: absolute;
    @include mq() {
      border-radius: 10px 10px 0 0;
    }
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
    max-width: 375px;
    margin: -6px auto;
    padding: 2rem 2.4rem 1.4rem;
    position: relative;
    display: flex;
    flex-direction: column;
    background-size: cover;
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
    bottom: 10px;
    right: 88px;
    font-size: 1.2rem;
    font-weight: normal;
    span {
      margin-left: 0.2rem;
      font-size: 2.4rem;
      color: #ff427a;
      font-weight: bold;
    }
  }
  &__infotext {
    color: #383838;
    font-weight: normal;
    font-size: 1.4rem;
    padding: 1.6rem;
    dt {
      float: left;
    }
    dd {
      margin-left: 12rem;
      margin-bottom: 1rem;
    }
  }
}


</style>