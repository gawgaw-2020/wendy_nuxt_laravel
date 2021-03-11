<template>
  <div>
    <header class="header">
      <div class="header__inner">
        <h1
          class="header__title"
          @click="$router.push('/')"
          v-text="title"
        ></h1>
        <div class="header__buttons">
          <p class="header__logout-button" v-if="storeName">{{ storeName }}様</p>
        </div>
        <div class="header__buttons">
          <p class="header__logout-button" v-if="storeName" @click="logout">
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
  </div>
</template>

<script>
import firebase from "../plugins/firebase";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "default",
  data() {
    return {
      title: "管理画面",
    };
  },
  created() {

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        let { uid, email } = user;
        let store_name = ''

        await firebase
        .firestore()
        .collection("suspended_articles")
        .doc(uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            store_name = doc.data().name;
          }
        });

        await this.setLoginStore({ uid, email, store_name });

        // ログイン時（currentページが「ログインページ」か「新規登録ページ」だった場合）にマイページの「お気に入り画面」へリダイレクトさせる
        if (this.$router.currentRoute.name === "admin-login") {
          this.$router.push({ name: "admin-edit" });
        }

      } else {
        // 以下ログアウト時 ＆ ログアウト時にリロードした時の処理
        this.deleteLoginStore();
        localStorage.removeItem("wendy");

        // admin/edit/以下のディレクトリにいた場合のみ、管理画面のログインへ遷移させる
        const str = this.$router.currentRoute.name
        const pattern = 'admin-edit'
        if (str.startsWith(pattern)) {
          this.$router.push({ name: "admin-login" });
        }
      }
    });
  },
  computed: {
    ...mapGetters("store-auth", ["storeName"]),
  },
  methods: {
    ...mapMutations("store-auth", [
      "setLoginStore",
      "deleteLoginStore",
    ]),
    ...mapActions("store-auth", [
      "logout",
    ]),

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
  box-shadow: none;
  &__inner {
    max-width: 768px;
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

</style>