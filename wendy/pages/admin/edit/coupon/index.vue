<template>
  <div class="coupon">
    <div class="coupon-content">
      <div class="coupon-content__inner">
        <AdminPageTitle :page-title="'現在掲載中のクーポン'"/>
          <ul class="coupons-list">
            <li class="coupon" v-for="(coupon, index) in activeCoupons" :key="index">
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
                <div class="coupon__discount-rate"><p><span :class="coupon.coupon_id">{{ coupon.category }}で{{ coupon.discount_rate }}%OFF</span></p></div>
                <p class="coupon__normal-price">通常 {{ coupon.normal_price.toLocaleString() }}円</p>
                <p class="coupon__discount-price">Wendy特別価格 <span>{{ Math.floor(coupon.normal_price * ((100 - coupon.discount_rate) / 100)).toLocaleString() }}円</span></p>
              </div>
              <dl class="coupon__infotext">
                <dt>利用方法</dt>
                <dd>{{ coupon.how_to_use }}</dd>
                <dt>利用条件</dt>
                <dd>{{ coupon.rule }}</dd>
                <dt>フリーコメント</dt>
                <dd>{{ coupon.information }}</dd>
              </dl>
              <div>
                <div><nuxt-link :to="`/admin/edit/coupon/${coupon.coupon_id}`" class="btn btn-primary">編集する</nuxt-link></div>
                <div><button class="btn btn-primary" @click="suspend" :data-coupon_id="coupon.coupon_id">掲載を停止する</button></div>
              </div>
            </li>
          </ul>
      </div>
    </div>
    <div class="coupon-content">
      <div class="coupon-content__inner">
        <AdminPageTitle :page-title="'掲載停止中のクーポン'"/>
          <ul class="coupons-list">
            <li class="coupon" v-for="(coupon, index) in suspendedCoupons" :key="index">
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
                <div class="coupon__discount-rate"><p><span :class="coupon.coupon_id">{{ coupon.category }}で{{ coupon.discount_rate }}%OFF</span></p></div>
                <p class="coupon__normal-price">通常 {{ coupon.normal_price.toLocaleString() }}円</p>
                <p class="coupon__discount-price">Wendy特別価格 <span>{{ Math.floor(coupon.normal_price * ((100 - coupon.discount_rate) / 100)).toLocaleString() }}円</span></p>
              </div>
              <dl class="coupon__infotext">
                <dt>利用方法</dt>
                <dd>{{ coupon.how_to_use }}</dd>
                <dt>利用条件</dt>
                <dd>{{ coupon.rule }}</dd>
                <dt>フリーコメント</dt>
                <dd>{{ coupon.information }}</dd>
              </dl>
              <div>
                <div><nuxt-link :to="`/admin/edit/coupon/${coupon.coupon_id}`" class="btn btn-primary">編集する</nuxt-link></div>
                <div><button class="btn btn-primary" @click="resume" :data-coupon_id="coupon.coupon_id">掲載を再開する</button></div>
              </div>
            </li>
          </ul>
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
    }
  },
  async asyncData() {
    let storeData
    let activeCoupons = []
    let suspendedCoupons = []

    let wendyLocal = localStorage.getItem('wendy')
    const user = JSON.parse(wendyLocal)['store-auth'].login_store

    await suspendedArticlesRef.doc(user.uid).get()
    .then(async function(doc) {
      if(doc.exists) {
        storeData = doc.data()
        const subCollectionTrue = await doc.ref.collection('coupons').orderBy('start').where('active', '==', true).get();
        subCollectionTrue.forEach(doc => {
          const coupon_id = doc.id
          const allData = {coupon_id, ...doc.data()}
          activeCoupons.push(allData)
        });
        const subCollectionFalse = await doc.ref.collection('coupons').orderBy('start').where('active', '==', false).get();
        subCollectionFalse.forEach(doc => {
          const coupon_id = doc.id
          const allData = {coupon_id, ...doc.data()}
          suspendedCoupons.push(allData)
        });
      } else {
        await articlesRef.doc(user.uid).get()
        .then(async (doc) => {
          storeData = doc.data()
          const subCollectionTrue = await doc.ref.collection('coupons').orderBy('start').where('active', '==', true).get();
          subCollectionTrue.forEach(doc => {
            const coupon_id = doc.id
            const allData = {coupon_id, ...doc.data()}
            activeCoupons.push(allData)
          });
          const subCollectionFalse = await doc.ref.collection('coupons').orderBy('start').where('active', '==', false).get();
          subCollectionFalse.forEach(doc => {
            const coupon_id = doc.id
            const allData = {coupon_id, ...doc.data()}
            suspendedCoupons.push(allData)
          });
        })
      }
    })
    return { storeData, activeCoupons,suspendedCoupons }
  },
  computed: {
  },
  methods: {
    ...mapActions("store-edit", ["suspendCoupon", "resumeCoupon"]),
    suspend(e) {
      const targetTime = e.target.dataset.coupon_id
      this.suspendCoupon({
        storeData: this.storeData,
        targetTime: targetTime
      })
    },
    resume(e) {
      const targetTime = e.target.dataset.coupon_id
      this.resumeCoupon({
        storeData: this.storeData,
        targetTime: targetTime
      })
    }
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>
.coupon {
  padding: 4.8rem 0;
}
.coupon-content {
  &__inner {
    width: 90%;
    margin: 0 auto;
  }
}

.coupons-list {
  @include mq() {
    display: flex;
    flex-wrap: wrap;
  }
  .coupon {
  max-width: 365px;
  margin: 0 auto 4rem;
  color: #2e6171;
  font-weight: bold;
  @include mq() {
    margin: 0 6.2rem 0 0;
  }
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
}

</style>