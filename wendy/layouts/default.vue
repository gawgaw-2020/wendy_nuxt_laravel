<template>
  <div>
    <header class="header">
      <h1 class="header__title" @click="$router.push('/')" v-text="title"></h1>
      <div class="header__buttons">
        <p class="header__login-button" v-if="!userName" @click="$router.push('/user/login')">ログイン</p>
        <p class="header__logout-button" v-if="userName" @click="logout">ログアウト</p>
      </div>
    </header>
    <main>
      <div>
        <nuxt />
      </div>
    </main>
    <footer>
      <span @click="$router.push('/')" style="cursor: pointer">ホーム</span>
      <span>検索（未実装）</span>
      <span @click="$router.push('/user/mypage-favorite')" style="cursor: pointer">お気に入り</span>
    </footer>
  </div>
</template>

<script>
import firebase from '../plugins/firebase'

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "default",
  data () {
    return {
      title: 'WENDY'
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        let { uid, email, displayName, photoURL } = user

        if (displayName === null) {
          displayName = 'ゲストユーザー'
        }

        await firebase.firestore().collection('users').doc(uid).get().then(function(doc) {
          if (doc.exists) {
            displayName = doc.data().displayName
            photoURL = doc.data().photoURL
          }
        })

        this.setLoginUser({ uid, email, displayName, photoURL })

        if(this.$router.currentRoute.name === 'user-login' || this.$router.currentRoute.name === 'user-registration') this.$router.push({ name: 'user-mypage-favorite' })

      } else {

        this.deleteLoginUser()
        this.$router.push({ name: 'index' })

      }
    })
  },
  computed: {
    ...mapGetters('auth', ['userName'])
  },
  methods: {
    ...mapActions('auth', ['setLoginUser', 'logout', 'deleteLoginUser', 'createUser'])
  }
}
</script>

<style lang="scss">
  .header {
    height: 50px;
    display: flex;
    justify-content: center;
    position: relative;
    &__title {
      font-size: 3.2rem;
      font-family: 'nicomoji';
      cursor: pointer;
    }
    &__buttons {
      position: absolute;
      right: 0;
      margin-right: 1.6rem;
      cursor: pointer;
    }
    &__login-button {
      line-height: 50px;
    }
    &__logout-button {
      line-height: 50px;
    }
  }

  footer {
    background-color: #efefef;
    padding: 1rem;
  }
</style>