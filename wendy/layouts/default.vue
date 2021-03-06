<template>
  <div>
    <header class="header" :class="{addShadow: isActiveShadow}">
      <div class="header__inner">
        <h1
          class="header__title"
          @click="$router.push('/')"
        ><img src="/img/wendy-logo.png" alt=""></h1>
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
        <nuxt-link
          class="footer__button"
          to="/user/mypage-favorite"
        >
          <p><i class="fas fa-heart"></i></p>
          <p>お気に入り</p>
        </nuxt-link>
        <nuxt-link 
          v-if="!userName"
          class="footer__button"
          to="/login/login">
          <p><i class="fas fa-user"></i></p>
          <p>ログイン</p>
        </nuxt-link>
        <nuxt-link
          to="/user/mypage-history"
          v-if="userName"
          class="footer__button">
          <p><i class="fas fa-utensils"></i></p>
          <p>利用履歴</p>
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
      isActiveShadow: true
    };
  },
  created() {
    // ホーム画面なら影を付けない
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
        // 以下ログアウト時 ＆ ログアウト時にリロードした時の処理
        this.deleteLoginUser();
        this.deleteLinePositionState();
        localStorage.removeItem("wendy");

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
      "deleteLinePositionState"
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
    // 常にページ遷移を監視
    '$route': function(to, from) {
      if (to.path !== from.path) {
        // ホーム画面に遷移した時のみ、影を付けない
        if (to.path === '/') {
          this.isActiveShadow = false
        } else {
          this.isActiveShadow = true
        }
        // ログイン画面に遷移した時に、boxの初期位置を指定
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
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  box-shadow: nome;
  &.addShadow {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
  &__inner {
    max-width: 768px;
    padding: 0 16px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    position: relative;
  }
  &__title {
    width: 120px;
    font-size: 3.2rem;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
  width: 100%;
  height: 75px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
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