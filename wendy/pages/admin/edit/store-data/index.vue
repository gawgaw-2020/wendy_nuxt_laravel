<template>
  <div class="store-data">
    <div class="admin-header">
      <div class="admin-header__inner">
        <h1 class="page-title">基本情報確認</h1>
      </div>
    </div>
    <div class="admin-content">
      <dl>
        <dt>店名</dt>
        <dd>{{ storeData.name }}</dd>
        <dt>店名（フリガナ）</dt>
        <dd>{{ storeData.name_kana }}</dd>
        <dt>住所</dt>
        <dd>{{ storeData.address }}</dd>
        <dt>電話番号</dt>
        <dd>{{ storeData.tell }}</dd>
      </dl>
      <p>上記の内容に関しては、WENDYにて変更作業を行いますので、下のボタンよりご依頼ください。</p>
      <div><button>重要情報の変更を依頼する</button></div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

//firebaseのDBを定義する
const db = firebase.firestore()
const suspendedArticlesRef = db.collection('suspended_articles')

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
    let coupons = []
    let coupon_id = []
    let wendyLocal = localStorage.getItem('wendy')
    const user = JSON.parse(wendyLocal)['store-auth'].login_store
    await suspendedArticlesRef.doc(user.uid).get()
    .then(async function(doc) {
      storeData = doc.data()
      const subCollection = await doc.ref.collection('coupons').orderBy('start').get();
      subCollection.forEach(doc => {
        coupon_id.coupon_id = doc.id
        const allData = {...coupon_id, ...doc.data()}
        coupons.push(allData)
      });
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
.admin-header {
  &__inner {
    width: 90%;
    margin: 0 auto 2.4rem;
    .page-title {
      font-size: 2.4rem;
      font-weight: normal;
      border-bottom: 1px solid #707070;
    }
  }
}


</style>