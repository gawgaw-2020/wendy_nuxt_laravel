<template>
  <div class="mypage-setting-section">
    <UserPageHeader/>
    <MyPageNavigation/>
    <div class="mypage-setting">
      <div class="mypage-setting__inner">
        <h2 class="mypage-setting__title">ユーザー情報</h2>
        <div class="user-profile">
          <div class="user-data">
            <p class="user-data__title">ユーザーネーム
              <!-- <span class="user-data__edit">変更する</span> -->
            </p>
            <p class="user-data__content">{{ userName }}</p>
          </div>
        </div>
        <div class="user-email-and-password">
          <div class="user-data">
            <p class="user-data__title">メールアドレス</p>
            <p class="user-data__content">{{ userEmail }}</p>
          </div>
          <div class="user-data">
            <p class="user-data__title">パスワード</p>
            <p class="user-data__content">*************</p>
          </div>
        </div>
        <!-- <p class="mypage-setting__change-button">
          <button class="btn btn-additional">メール・パスワードを変更する</button>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  middleware: 'authenticated',
  head() {
    return {
      title: 'ユーザー情報'
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('auth', ['userName', 'userEmail'])
  },
  created: function() {
  },
  mounted() {
  const page = document.querySelector('.mypage-setting-section')
  const bodyHeight = document.body.clientHeight
  if (bodyHeight > page.clientHeight) {
    page.style.height = `${bodyHeight}px`
  }
}

}
</script>

<style lang="scss" scoped>
  .mypage-setting-section {
    height: calc( 100vh - 50px);
    background-color: #efefef;
  }
  .mypage-setting {
    color: #2e6171;
    &__inner {
      max-width: 768px;
      padding: 0 16px 120px;
      margin: 0 auto;
    }
    &__title {
      font-size: 1.4rem;
      text-align: center;
      padding: 3.2rem 0 1.2rem;
    }
    .user-profile {
      padding-bottom: 3rem;
      border-bottom: 1px solid #707070;
    }
    .user-email-and-password {
      padding: 3.6rem 0;
    }
    .user-data {
      &__title {
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }
      &__content {
        padding-left: 1.6rem;
      }
      &__edit {
        color: #ff427a;
        text-decoration: underline;
        margin-left: 1.6rem;
      }
    }
    .user-data:not(:last-child) {
      margin-bottom: 2.7rem;
    }
    &__change-button {
      text-align: center;
    }
  }

</style>