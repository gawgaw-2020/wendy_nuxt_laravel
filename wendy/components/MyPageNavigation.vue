<template>
  <div class="mypage-navigation">
    <span id="slide-line" :class="linePosition"></span>
    <p @click="setLinePosition('info')" class="mypage-navigation__item" :class="{current: linePosition === 'info'}">
      お知らせ
    </p>
    <p @click="setLinePosition('favorite')" class="mypage-navigation__item" :class="{current: linePosition === 'favorite'}">
      お気に入り店舗
    </p>
    <p @click="setLinePosition('history')" class="mypage-navigation__item" :class="{current: linePosition === 'history'}">
      利用履歴
    </p>
    <p @click="setLinePosition('setting')" class="mypage-navigation__item" :class="{current: linePosition === 'setting'}">
      ユーザー情報
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
    ...mapGetters("mypage", ["linePosition"]),
  },
  methods: {
    ...mapActions("mypage", ["setLinePosition"]),
  },
};
</script>

<style lang="scss" scoped>
#slide-line {
  width: 25%;
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #ff427a;
  left: 25%;
  transition: all 0.2s;
}
#slide-line.info {
  left: 0%;
}
#slide-line.favorite {
  left: 25%;
}
#slide-line.history {
  left: 50%;
}
#slide-line.setting {
  left: 75%;
}
.mypage-navigation {
  background-color: #fff;
  display: flex;
  position: relative;
  &__item {
    font-size: 1.2rem;
    width: 25%;
    height: 50px;
    text-align: center;
  }
  &__item {
    width: 100%;
    display: inline-block;
    color: #2e6171;
    line-height: 50px;
  }
  &__item.current {
    font-weight: bold;
    color: #ff427a;
  }
}

</style>
