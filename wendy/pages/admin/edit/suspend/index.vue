<template>
  <div class="suspend">
    <div class="suspend-header">
      <div class="suspend-header__inner">
          <AdminPageTitle :page-title="'掲載の停止・再開'"/>
      </div>
    </div>
    <div class="suspend-content">
      <div class="suspend-content__inner">
        <p>現在の掲載状況</p>
        <p class="status" v-if="isActive">掲載中</p>
        <p class="status" v-else>停止中</p>
        <p>下記のボタンより掲載の停止・再開ができます。</p>
        <div v-if="isActive"><button class="btn btn-success" @click="suspend">掲載を停止する</button></div>
        <div v-else><button class="btn btn-primary" @click="resume">掲載を再開する</button></div>
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
    let isActive = true
    let storeData
    let coupons = []
    let osoLunchData = null
    let hayaDinnerData = null
    let osoDinnerData = null
    let wendyLocal = localStorage.getItem('wendy')
    const user = JSON.parse(wendyLocal)['store-auth'].login_store
    await suspendedArticlesRef.doc(user.uid).get()
    .then(async function(doc) {
      if(doc.exists) {
        isActive = false
        storeData = doc.data()
        const subCollection = await doc.ref.collection('coupons').orderBy('start').get();
        subCollection.forEach(doc => {
          const allData = doc.data()
          coupons.push(allData)
        });
        osoLunchData = coupons[0]
        hayaDinnerData = coupons[1]
        osoDinnerData = coupons[2]
      } else {
        await articlesRef.doc(user.uid).get()
        .then(async (doc) => {
          storeData = doc.data()
          const subCollection = await doc.ref.collection('coupons').orderBy('start').get();
          subCollection.forEach(doc => {
            const allData = doc.data()
            coupons.push(allData)
          });
          osoLunchData = coupons[0]
          hayaDinnerData = coupons[1]
          osoDinnerData = coupons[2]
        })
      }
    })
    return { storeData, osoLunchData, hayaDinnerData, osoDinnerData, isActive, }
  },
  computed: {
  },
  methods: {
    ...mapActions("store-edit", ["suspendPublication", "resumePublication"]),
    suspend() {
      this.suspendPublication({
        storeData: this.storeData,
        osoLunchData: this.osoLunchData,
        hayaDinnerData: this.hayaDinnerData,
        osoDinnerData: this.osoDinnerData,
      })
    },
    resume() {
      this.resumePublication({
        storeData: this.storeData,
        osoLunchData: this.osoLunchData,
        hayaDinnerData: this.hayaDinnerData,
        osoDinnerData: this.osoDinnerData,
      })
    }
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>
.suspend {
  padding: 4.8rem 0;
}
.suspend-header {
  &__inner {
    width: 90%;
    margin: 0 auto 2.4rem;
  }
}
.suspend-content {
  &__inner {
    width: 90%;
    margin: 0 auto;
    .status {
      font-weight: bold;
      font-size: 3.6rem;
    }
    p {
      margin-bottom: 16px;
    }
  }
}


</style>