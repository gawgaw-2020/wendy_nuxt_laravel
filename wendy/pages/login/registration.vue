<template>
  <div class="registration-form">
    <div class="registration-form__inner">
      <div class="registration-form-card">
        <div class="registration-form-card__inner">
          <div class="registration-form-card__navigation"><LoginNavigation/></div>
          <div class="registration-link">
            <div class="user-input">
              <p class="user-input__input"><input type="email" v-model="email" placeholder="メールアドレス"></p>
              <p class="user-input__error">{{ errMessageEmail }}</p>
            </div>
            <div class="user-input">
              <p class="user-input__input"><input type="password" v-model="password" placeholder="パスワード"></p>
              <p class="user-input__error">{{ errMessagePassword }}</p>
            </div>
            <button class="registration-link__btn btn btn-primary" @click="signUp">新規登録</button>
            <p class="registration-link__social-title">他サイトIDで簡単登録</p>
            <p class="registration-link__social-btn" @click="googleLogin"><img src="/img/btn_google_signin_dark_normal_web@2x.png" alt="Googleアカウントでログイン"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  head() {
    return {
      title: '新規登録'
    }
  },
  data() {
    return {
      email: '',
      password: '',
      errMessageEmail: '',
      errMessagePassword: ''
    }
  },
  computed: {
    ...mapState("auth", ["login_user"]),
  },
  methods: {
    ...mapActions("auth", ["googleLogin", "firebaseSignUp", 'createUser']),
    async signUp() {
      await this.firebaseSignUp({ email: this.email, password: this.password })
      .catch((error) => {
        if(error.code === 'auth/invalid-email') {
          this.errMessageEmail = 'メールアドレスを正しく入力して下さい'
        } else if(error.code === 'auth/wrong-password') {
          this.errMessagePassword = 'パスワードを正しく入力して下さい'
        }
      });
    },
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>
.registration-form {
  height: calc( 100vh - 50px);
  background-color: #efefef;
  color: #2E6171;
  background-image: url(/img/login-background.png);
  background-size: cover;
  @include mq() {
    background-image: none;
  }
  &__inner {
    width: 90%;
    padding: 3.2rem 0;
    margin: 0 auto;
  }
  .registration-form-card {
    max-width: 480px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 5rem 0;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
    &__inner {
      width: 80%;
      margin: 0 auto;
    }
    &__navigation {
      margin-bottom: 1.2rem;
    }
    .registration-link {
      padding-bottom: 2rem;
      &__social-title {
        text-align: center;
        font-size: 1.4rem;
      }
      &__btn {
        margin-top: 2rem;
        margin-bottom: 1.6rem;
        width: 100%;
      }
      &__social-btn {
        width: 80%;
        margin: 0 auto 1rem;
      }
    }
  }
}

</style>