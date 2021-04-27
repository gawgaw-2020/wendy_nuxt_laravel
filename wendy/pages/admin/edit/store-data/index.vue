<template>
  <div class="store-data">
    <div class="store-data-header">
      <div class="store-data-header__inner">
          <AdminPageTitle :page-title="'基本情報確認'"/>
      </div>
    </div>
    <div class="store-data-content">
      <div class="store-data-content__inner">
        <dl class="store-data-list">
          <dt>店名</dt>
          <dd>{{ storeData.name }}</dd>
          <dt>店名（フリガナ）</dt>
          <dd>{{ storeData.name_kana }}</dd>
          <dt>住所</dt>
          <dd>{{ storeData.address }}</dd>
          <dt>電話番号</dt>
          <dd>{{ storeData.tell }}</dd>
        </dl>
        <p>上記の内容に関しては、ずらし飯にて変更作業を行いますので、直接運営者にお問い合わせ下さい。</p>
        <!-- <p>上記の内容に関しては、ずらし飯にて変更作業を行いますので、下のボタンよりご依頼ください。</p> -->
        <!-- <div><button class="btn btn-primary">重要情報の変更を依頼する</button></div> -->
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
  head() {
    return {
      title: '基本情報確認'
    }
  },
  middleware: 'storeAuthenticated',
  layout: 'admin',
  data() {
    return {
    }
  },
  async asyncData() {
    let storeData
    let coupons = []
    let coupon_id = []
    let wendyLocal = localStorage.getItem('wendy')
    const user = JSON.parse(wendyLocal)['store-auth'].login_store
    await suspendedArticlesRef.doc(user.uid).get()
    .then(async function(doc) {
      if(doc.exists) {
        storeData = doc.data()
        const subCollection = await doc.ref.collection('coupons').orderBy('start').get();
        subCollection.forEach(doc => {
          coupon_id.coupon_id = doc.id
          const allData = {...coupon_id, ...doc.data()}
          coupons.push(allData)
        });
      } else {
        console.log('掲載中を探す');
        await articlesRef.doc(user.uid).get()
        .then(async (doc) => {
          storeData = doc.data()
          const subCollection = await doc.ref.collection('coupons').orderBy('start').get();
          subCollection.forEach(doc => {
            coupon_id.coupon_id = doc.id
            const allData = {...coupon_id, ...doc.data()}
            coupons.push(allData)
          });
        })
      }
    })
    storeData['coupons'] = coupons
    return { storeData }
  },
  computed: {
    ...mapGetters("store-auth", ["loginStore"]),
  },
  methods: {
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>
.store-data {
  padding: 4.8rem 0;
}
.store-data-header {
  &__inner {
    width: 90%;
    margin: 0 auto 2.4rem;
  }
}
.store-data-content {
  &__inner {
    width: 90%;
    margin: 0 auto;
    .store-data-list {
      dd {
        margin-bottom: 24px;
      }
    }
  }
}


</style>