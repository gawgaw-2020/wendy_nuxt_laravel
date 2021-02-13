<template>
  <section>
    <h1>{{ message }}</h1>
    <p>店名：{{ article.store_name }}</p>
    <p>エリア：{{ article.store_area }}</p>
    <p>店舗ID：{{ article.store_id }}</p>
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
    await articlesRef.doc(context.params.id).get()
    .then(function(doc) {
      article = doc.data()
    })
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