<template>
  <div class="coupon-detail">
    <p>こちらのクーポンを使用します</p>
    <p>{{ coupon.coupon_category }}</p>
    <p>{{ coupon.coupon_start }}~{{ coupon.coupon_end }}の入店で</p>
    <p>{{ coupon.coupon_title }}</p>
    <p>利用条件とお店からのメッセージ</p>
    <p>{{ coupon.coupon_use }}</p>
    <p>{{ coupon.coupon_rule }}</p>
    <p>{{ coupon.coupon_infomation }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import firebase from 'firebase'
//firestoreのアクション部分のパッケージをインストールする
import { firestoreAction } from 'vuexfire'

//firebaseのDBを定義する
const db = firebase.firestore()
const articlesRef = db.collection('articles')


export default {
  data() {
    return {
    }
  },
  async asyncData(context) {
    let coupon
    await articlesRef.doc(context.params.articleId).collection('coupons').doc(context.params.couponCategory).get()
    .then(function(doc) {
      coupon = doc.data()
    });
    return { coupon }
  },
  computed: {
  },
  methods: {
  },
  created: function(){
  }
}
</script>

<style lang="scss" scoped>
</style>

