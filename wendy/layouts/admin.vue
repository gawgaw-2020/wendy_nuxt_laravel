<template>
  <div>
    <header class="header" v-if="storeName">
      <div id="nav-toggle" @click="open">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1
        class="header__title"
        @click="$router.push('/admin/edit/coupon/')"
        v-text="title"
      ></h1>
      <div class="header__inner">
        <p class="header__store-name" v-if="storeName">{{ storeName }}様</p>
        <p class="header__logout-button" v-if="storeName" @click="logout">ログアウト</p>
      </div>
    </header>
    <div class="main-container" :class="{active: sidebar === true}">
      <aside id="sidebar" v-if="storeName">
        <div class="close" @click="close"><i class="fas fa-times"></i></div>
        <nav id="global-nav">
          <div class="global-nav__header"></div>
          <ul class="link-list">
            <li class="link-list__item">
              <nuxt-link class="link-list__link" to="/admin/edit/coupon/">
                <span><i class="fas fa-ticket-alt"></i></span>
                <span class="link-list__text">クーポン編集</span>
              </nuxt-link>
            </li>
            <li class="link-list__item">
              <nuxt-link class="link-list__link" to="/admin/edit/store/">
                <span><i class="fas fa-store-alt"></i></span>
                <span class="link-list__text">店舗ページ編集</span>
              </nuxt-link>
            </li>
            <li class="link-list__item">
              <nuxt-link class="link-list__link" to="/admin/edit/link/">
                <span><i class="fas fa-external-link-alt"></i></span>
                <span class="link-list__text">外部リンク編集</span>
              </nuxt-link>
            </li>
            <li class="link-list__item">
              <nuxt-link class="link-list__link" to="/admin/edit/store-data/">
                <span><i class="fas fa-th-list"></i></span>
                <span class="link-list__text">基本情報確認</span>
              </nuxt-link>
            </li>
            <li class="link-list__item">
              <nuxt-link class="link-list__link" to="/admin/edit/suspend/">
                <span><i class="fas fa-toggle-on"></i></span>
                <span class="link-list__text">掲載の停止・再開</span>
              </nuxt-link>
            </li>
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
      sidebar: false
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
          .then(async function (doc) {
            if (doc.exists) {
              store_name = doc.data().name;
            } else {
              await firebase.firestore().collection('articles')
              .doc(uid).get()
              .then((doc) => {
                store_name = doc.data().name;
              })
            }
          });

        await this.setLoginStore({ uid, email, store_name });

        if (this.$router.currentRoute.name === "admin-login") {
          this.$router.push({ name: "admin-edit-coupon" });
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
    open() {
      console.log('open');
      this.sidebar = !this.sidebar
    },
    close() {
      this.sidebar = false
    }
  },
};
</script>

<style lang="scss" scoped>

.header {
  background-color: #fafafa;
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 9997;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  @include mq(sm) {
    width: calc(100% - 190px);
  }
  #nav-toggle {
    width: 70px;
    height: 60px;
    padding: 1.6rem 2rem;
    @include mq(sm) {
      display: none;
    }
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
  &__inner {
    display: flex;
  }
}

.main-container.active {
  #sidebar {
    position: fixed;
    transform: translateX(0px);
    z-index: 9998;
    .close {
      opacity: 1;
    }
  }
}
.main-container {
  display: flex;
  padding-top: 10px;
  @include mq(sm) {
    padding-left: 190px;
  }
  #sidebar {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    background-color: #fafafa;
    width: 190px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-190px);
    transition: all 0.3s;
    @include mq(sm) {
      transform: translateX(0px);
    }
    .close {
      color: #fff;
      font-size: 3rem;
      padding: 0.8rem 2.2rem;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
    .global-nav__header {
      height: 60px;
      background-color: #ff427a;
    }
    .link-list {
      &__item {
        background-color: #ff427a;
        height: 60px;
      }
      &__link {
        color: #fff;
        display: flex;
        justify-content: flex-start;
        height: 60px;
        line-height: 60px;
        padding-left: 1.5rem;
        .fas {
          font-size: 2.2rem;
          margin-right: 1.6rem;
          position: relative;
          top: 3px;
        }
      }
      &__text {
        font-size: 1.4rem;
      }
    }
  }
  main {
    width: 100%;
  }
}
.nuxt-link-active {
  background-color: #fafafa;
  .fas {
    color: #383838;
  }
  .link-list__text {
    color: #383838;
  }
}


</style>
