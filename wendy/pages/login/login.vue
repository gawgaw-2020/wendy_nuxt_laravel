<template>
  <div class="login-form">
    <div class="login-form__inner">
      <div class="login-form-card">
        <div class="login-form-card__inner">
          <div class="login-form-card__navigation"><LoginNavigation/></div>
          <div class="login-link">
            <div class="user-input">
              <p class="user-input__input"><input type="email" v-model="email" placeholder="メールアドレス"></p>
              <p class="user-input__error">{{ errMessageEmail }}</p>
            </div>
            <div class="user-input">
              <p class="user-input__input"><input type="password" v-model="password" placeholder="パスワード"></p>
              <p class="user-input__error">{{ errMessagePassword }}</p>
            </div>
            <button class="login-link__btn btn btn-primary" @click="login">ログイン</button>
            <p class="login-link__social-title">他サイトIDで簡単ログイン</p>
            <p class="login-link__social-btn" @click="googleLogin"><img src="/img/btn_google_signin_dark_normal_web@2x.png" alt="Googleアカウントでログイン"></p>
          </div>
          <div class="registration-link">
            <p class="registration-link__title">はじめての方はこちら</p>
            <p class="registration-link__btn btn btn-additional" @click="setBoxPosition('registration')">
              新規登録
            </p>
          </div>
        </div>
      </div>
      <p class="guestLogin"><button @click="guestLogin">【ゲストユーザーでログイン】</button></p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  head() {
    return {
      title: 'ログイン'
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
  ...mapState("auth", ["login_user"])
  },
  methods: {
    ...mapActions('auth', ['googleLogin', 'firebaseLogin', 'createUser']),
    ...mapActions("login", ["setBoxPosition"]),
    async login() {
      await this.firebaseLogin({ email: this.email, password: this.password })
      .catch((error) => {
        if(error.code === 'auth/invalid-email') {
          this.errMessageEmail = 'メールアドレスを正しく入力して下さい'
        } else if(error.code === 'auth/wrong-password') {
          this.errMessagePassword = 'パスワードを正しく入力して下さい'
        }
      });
    },
    async guestLogin() {
      await this.firebaseLogin({ email: 'user@user.user', password: 'password' });
    }
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>
.login-form {
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
  .login-form-card {
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
    .login-link {
      padding-bottom: 2rem;
      border-bottom: 1px solid #2E6171;
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
        max-width: 220px;
        margin: 0 auto 1rem;
      }
    }
    .registration-link {
      padding: 2rem 0 0;
      &__title {
        font-size: 1.8rem;
        text-align: center;
        color: #838383;
        font-weight: bold;
        margin-bottom: 0.4rem;
      }
    }
  }
}

// for dev
.guestLogin {
  text-align: center;
  padding: 2rem 0;
  font-size: 1.4rem;
  button {
    background-color: #fff;
    padding: 0.5rem;
  }
}

</style>