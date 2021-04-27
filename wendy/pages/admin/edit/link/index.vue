<template>
  <div class="link">
    <div class="link-header">
      <div class="link-header__inner">
          <AdminPageTitle :page-title="'外部リンク編集'"/>
      </div>
    </div>
    <div class="link-content">
      <div  class="link-content__inner">
        <div class="user-input">
          <label for="url_official">オフィシャルホームページ</label>
          <p class="user-input__input"><input id="url_official" type="text" v-model="storeData.url_official"></p>
        </div>
        <div class="user-input">
          <label for="url_gnavi">ぐるなび</label>
          <p class="user-input__input"><input id="url_gnavi" type="text" v-model="storeData.url_gnavi"></p>
        </div>
        <div class="user-input">
          <label for="url_hotpepper">ホットペッパーグルメ</label>
          <p class="user-input__input"><input id="url_hotpepper" type="text" v-model="storeData.url_hotpepper"></p>
        </div>
        <div class="user-input">
          <label for="url_instagram">インスタグラム</label>
          <p class="user-input__input"><input id="url_instagram" type="text" v-model="storeData.url_instagram"></p>
        </div>
        <div class="user-input">
          <label for="url_tabelog">食べログ</label>
          <p class="user-input__input"><input id="url_tabelog" type="text" v-model="storeData.url_tabelog"></p>
        </div>
        <div class="user-input">
          <label for="url_twitter">Twitter</label>
          <p class="user-input__input"><input id="url_twitter" type="text" v-model="storeData.url_twitter"></p>
        </div>
        <button class="btn btn-primary" @click="update">この内容で登録する</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"

//firebaseのDBを定義する
const db = firebase.firestore()
const suspendedArticlesRef = db.collection('suspended_articles')
const articlesRef = db.collection('articles')

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";


export default {
  head() {
    return {
      title: '外部リンク編集'
    }
  },
  middleware: 'storeAuthenticated',
  layout: 'admin',
  data() {
    return {
      storeData: {}
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
        storeData['coupons'] = coupons
      } else {
        await articlesRef.doc(user.uid).get()
        .then(async (doc) => {
          storeData = doc.data()
          const subCollection = await doc.ref.collection('coupons').orderBy('start').get();
          subCollection.forEach(doc => {
            coupon_id.coupon_id = doc.id
            const allData = {...coupon_id, ...doc.data()}
            coupons.push(allData)
          });
          storeData['coupons'] = coupons
        })
      }
    })
    return { storeData }
  },
  computed: {
  },
  methods: {
    ...mapActions("store-edit", ["updateLinks"]),
    update() {
      this.updateLinks(this.storeData)
    }
  },
  created: function() {
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.link {
  padding: 4.8rem 0;
}

.link-header {
  &__inner {
    width: 90%;
    margin: 0 auto 2.4rem;
  }
}

.link-content {
  &__inner {
    width: 90%;
    margin: 0 auto 2.4rem;
  }
}

.user-input {
  margin-bottom: 32px;
  &__input {
    input {
      padding: 10px 5px 5px;
    }
  }
}

</style>