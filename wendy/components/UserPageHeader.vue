<template>
  <div class="mypage-header">
    <div class="mypage-header__inner">
      <h2 class="mypage-header__title">マイページ</h2>
      <div class="mypage-header__icon-name">
        <p class="mypage-header__icon">
          <img v-if="userPhotoURL" :src="userPhotoURL" alt="">
          <img v-if="!userPhotoURL" src="/img/user-icon.png" alt="">
        </p>
        <p class="mypage-header__name">{{ userName }} 様</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "default",
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('auth', ['userName', 'userPhotoURL'])
  }
}
</script>

<style lang="scss" scoped>
.mypage-header {
  background-color: #ff427a;
  color: #fff;
  padding: 2.8rem 4.6rem;
  &__inner {
    max-width: 768px;
    margin: 0 auto;
  }
  &__title {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 1.8rem;
  }
  &__icon-name {
    display: flex;
  }
  &__icon img {
  width: 46px;
  border-radius: 50%;
  margin-right: 1.3rem;
  }
  &__name {
    line-height: 46px;
    font-weight: bold;
  }
}
</style>
