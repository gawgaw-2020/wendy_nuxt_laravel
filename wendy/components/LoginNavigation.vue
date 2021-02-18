<template>
  <div class="login-navigation">
    <span id="slide-box" :class="boxPosition"></span>
    <p @click="setBoxPosition('login')" class="login-navigation__item" :class="{current: boxPosition === 'login'}">
      ログイン
    </p>
    <p @click="setBoxPosition('registration')" class="login-navigation__item" :class="{current: boxPosition === 'registration'}">
      新規登録
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("login", ["boxPosition"]),
  },
  methods: {
    ...mapActions("login", ["setBoxPosition"]),
  },
};
</script>

<style lang="scss" scoped>
#slide-box {
  width: 50%;
  height: 100%;
  background-color: #ff427a;
  position: absolute;
  bottom: 0;
  left: 0%;
  transition: all 0.2s;
  border-radius: 999px;
  z-index: 0;
}
#slide-box.login {
  left: 0%;
}
#slide-box.registration {
  left: 50%;
}
.login-navigation {
  background-color: transparent;
  width: 250px;
  height: 35px;
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 auto;
  display: flex;
  position: relative;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 999px;
  &__item {
    font-size: 1.2rem;
    color: #ff427a;
    width: 50%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    z-index: 1;
  }
  &__item.current {
    color: #fff;
  }
}

</style>
