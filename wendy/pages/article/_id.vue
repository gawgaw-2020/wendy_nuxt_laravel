<template>
  <section>
    <h1>{{ message }}</h1>
    <p><img :src="article.store_main_image" alt=""></p>
    <p>店名：{{ article.store_name }}</p>
    <p>店名：{{ article.store_category }}</p>
    <p>最寄り駅：{{ article.store_area }}</p>
    <p>ランチタイム：{{ article.store_business_hours_lunch }}</p>
    <p v-if="article.store_business_hours_cafe">カフェタイム：{{ article.store_business_hours_cafe }}</p>
    <p>ディナータイム：{{ article.store_business_hours_dinner }}</p>
    <p>店舗ID：{{ article.store_id }}</p>
    <ul>
      <li v-for="(coupon, index) in article.coupons" :key="index">
        <p>{{ coupon.coupon_category }}</p>
        <p>{{ coupon.coupon_start }}~{{ coupon.coupon_end }}の入店で</p>
        <p>クーポン内容{{ coupon.coupon_title }}</p>
      </li>
    </ul>
    <p>住所：{{ article.store_address }}</p>
    <p><nuxt-link to="/">TOPページへ</nuxt-link></p>
  </section>
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
      message: '/articles/_id.vueを表示中',
    }
  },
  async asyncData(context) {
    let article
    let coupons = []
    const collection = await articlesRef.doc(context.params.id).get()
    .then(async function(doc) {
      article = doc.data()
      const subCollection = await doc.ref.collection('coupons').orderBy('coupon_start').get();
      subCollection.forEach(doc => {
        console.log(doc.id);
        coupons.push(doc.data())
      });
    })
    article['coupons'] = coupons
    console.log(article);
    return { article }
  },
  // computed: {
  //   ...mapState('articles', ['article'])
  // },
  // methods: {
  //   ...mapActions('articles', ['getArticleById'])
  // },
  // created: function(){
  //   this.getArticleById({
  //     articleId: this.$route.params.id
  //   })
  // }
}
</script>

<style>

</style>