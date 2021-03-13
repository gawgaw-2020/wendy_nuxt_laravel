<template>
  <div>
    <header class="header">
      <div id="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1
        class="header__title"
        @click="$router.push('/admin/edit/')"
        v-text="title"
      ></h1>
      <div class="header__inner">
        <div class="header__buttons">
          <p class="header__store-name" v-if="storeName">{{ storeName }}様</p>
        </div>
        <div class="header__buttons">
          <p class="header__logout-button" v-if="storeName" @click="logout">
            ログアウト
          </p>
        </div>
      </div>
    </header>
    <div class="main-container">
      <aside id="sidebar">
        <nav id="global-nav">
          <ul class="link-list">
            <li class="link-list__item"><a href="#">クーポン編集</a></li>
            <li class="link-list__item"><a href="#">店舗ページ編集</a></li>
            <li class="link-list__item"><a href="#">外部リンク編集</a></li>
            <li class="link-list__item"><a href="#">基本情報編集</a></li>
            <li class="link-list__item"><a href="#">掲載の停止・再開</a></li>
          </ul>
        </nav>
      </aside>
      <main>
        <div>
          <nuxt />
        </div>
      </main>
    </div>
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
        let store_name = "";

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
        const str = this.$router.currentRoute.name;
        const pattern = "admin-edit";
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
    ...mapMutations("store-auth", ["setLoginStore", "deleteLoginStore"]),
    ...mapActions("store-auth", ["logout"]),
  },
};
</script>

<style lang="scss" scoped>
#nav-toggle {
  width: 70px;
  height: 60px;
  margin-right: auto;
  padding: 1.6rem 2rem;
}
#nav-toggle:hover {
  background-color: red;
}
#nav-toggle span {
  display: inline-block;
  height: 3px;
  width: 30px;
  background-color: #707070;
  position: absolute;
}
#nav-toggle span:first-child {
  top: 27px;
}
#nav-toggle span:last-child {
  top: 38px;
}

.header {
  background-color: #fff;
  width: calc(100% - 190px);
  height: 60px;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  &__inner {
    display: flex;
  }
}

.main-container {
  display: flex;
  padding-top: 10px;
  padding-left: 190px;
  #sidebar {
    background-color: skyblue;
    width: 190px;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 60px;
    .link-list {
      &__item {
        height: 60px;
      }
    }
  }
  main {
    width: 100%;
  }
}


</style>
