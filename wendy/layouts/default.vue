<template>
  <div>
    <header class="header" :class="{addShadow: isActiveShadow}">
      <div class="header__inner">
        <h1
          class="header__title"
          @click="$router.push('/')"
          v-text="title"
        ></h1>
        <div class="header__buttons">
          <p
            class="header__login-button"
            v-if="!userName"
            @click="$router.push('/login/login')"
          >
            ログイン
          </p>
          <p class="header__logout-button" v-if="userName" @click="logout">
            ログアウト
          </p>
        </div>
      </div>
    </header>
    <main>
      <div>
        <nuxt />
      </div>
    </main>
    <footer class="footer">
      <div class="footer__inner">
        <nuxt-link
          class="footer__button"
          to="/"
          exact
        >
          <p><i class="fas fa-home"></i></p>
          <p>ホーム</p>
        </nuxt-link>
        <nuxt-link to="#" class="footer__button">
          <p><i class="fas fa-search"></i></p>
          <p>検索</p>
        </nuxt-link>
        <nuxt-link
          class="footer__button"
          to="/user/mypage-favorite"
        >
          <p><i class="fas fa-heart"></i></p>
          <p>お気に入り</p>
        </nuxt-link>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase from "../plugins/firebase";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "default",
  data() {
    return {
      title: "WENDY",
      isActiveShadow: true
    };
  },
  beforeCreate() {
    let wendyLocal = localStorage.getItem('wendy')
    if (wendyLocal !== null) {
      const linePosition = JSON.parse(wendyLocal).mypage.linePosition;
      this.$store.commit("mypage/setLinePositionState", linePosition)
      const boxPosition = JSON.parse(wendyLocal).login.boxPosition;
      this.$store.commit("login/setBoxPositionState", boxPosition)
    }
  },
  created() {
    if (this.$router.currentRoute.name === 'index') {
      this.isActiveShadow = false
    }

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        let { uid, email, displayName, photoURL } = user;
        
        if (displayName === null) {
          displayName = "ゲストユーザー";
        }

        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then(function (doc) {
            if (doc.exists) {
              displayName = doc.data().displayName;
              photoURL = doc.data().photoURL;
            }
          });

        await this.setLoginUser({ uid, email, displayName, photoURL });

        // ログイン時（currentページが「ログインページ」か「新規登録ページ」だった場合）にマイページの「お気に入り画面」へリダイレクトさせる
        if (this.$router.currentRoute.name === "login-login" || this.$router.currentRoute.name === "login-registration") {
          this.$router.push({ name: "user-mypage-favorite" });
        }

      } else {
        this.deleteLoginUser();
        localStorage.removeItem("wendy");


        // ここの処理はログアウト時にリロードした場合にも走る
        // ログアウト時に店舗画面や詳細画面でリロードすると、トップページに遷移してしまうので
        // /user/以下のディレクトリにいた場合のみ、トップページへ遷移させる
        const str = this.$router.currentRoute.name
        const pattern = 'user-'
        if (str.startsWith(pattern)) {
          this.$router.push({ name: "index" });
        }
      }
    });

  },
  computed: {
    ...mapGetters("auth", ["userName"]),
  },
  methods: {
    ...mapMutations("auth", [
      "setLoginUser",
      "deleteLoginUser",
    ]),
    ...mapMutations("mypage", [
      "setLinePositionState",
    ]),
    ...mapActions("auth", [
      "logout",
      "createUser",
    ]),
    ...mapActions("mypage", [
      "setLinePosition",
    ]),
    ...mapActions("login", [
      "setBoxPosition",
    ]),
  },
  watch: {
    // ページ遷移を監視
    '$route': function(to, from) {
      if (to.path !== from.path) {
        if (to.path === '/') {
          this.isActiveShadow = false
        } else {
          this.isActiveShadow = true
        }
        if (to.path === '/user/mypage-favorite') {
          this.setLinePosition('favorite')
        }
        if (to.path === '/login/login') {
          this.setBoxPosition('login')
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  width: 100vw;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  box-shadow: nome;
  &.addShadow {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
  &__inner {
    max-width: 1366px;
    padding: 0 16px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    position: relative;
  }
  &__title {
    font-size: 3.2rem;
    font-family: "nicomoji";
    font-weight: normal;
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  &__buttons {
    font-size: 1.4rem;
    cursor: pointer;
  }
  &__login-button {
    line-height: 50px;
  }
  &__logout-button {
    line-height: 50px;
  }
}

.footer {
  height: 75px;
  width: 100vw;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.2);
  color: #000;
  z-index: 9999;
  &__inner {
    max-width: 1366px;
    height: 100%;
    padding: 0 16px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  &__button {
    width: 93px;
    height: 100%;
    text-align: center;
    padding: 1.8rem 0 0;
    font-size: 1rem;
    cursor: pointer;
    .fas {
      color: #838383;
      font-size: 2.5rem;
      margin-bottom: 0.8rem;
    }
  }
}

.nuxt-link-active {
  color: #ff427a;
}
.nuxt-link-active .fas{
  color: #ff427a;
}


</style>