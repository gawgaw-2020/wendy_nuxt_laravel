<template>
  <section>
    <h1>{{ message }}</h1>
    <p>記事のidは{{ id }}</p>
    <p id="data"></p>
  </section>
</template>

<script>
import firebase from '/plugins/firebase'

export default {
  data() {
    return {
      message: '/articles/_id.vueを表示中',
      article: []
    }
  },
  computed: {
    id: function() {
      return this.$route.params.id
    }
  },
  created() {
    this.article.push(12)
    const db = firebase.firestore()
    var docRef = db.collection("articles").doc(this.id)
    var self = this;
    docRef.get().then(function(doc) {
      self.article.push(doc.data())
    })
  }
}
</script>

<style>

</style>