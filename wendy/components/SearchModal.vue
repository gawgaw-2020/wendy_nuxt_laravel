<template>
  <div class="search-modal">
    <div class="search-modal__inner">
      <div class="search-box">
        <div class="search-box__inner" action="#">
          <div class="search-box__search">
            <p class="search-box__trigger search-box__trigger--left" @click="selectTime">{{ selectedTime }}<i class="fas fa-caret-down"></i></p>
            <p class="search-box__trigger search-box__trigger--right" @click="selectArea">{{ selectedArea }}<i class="fas fa-caret-down"></i></p>
          </div>
          <div class="search-box__submit" @click="search">お店を探す</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'selectedTime',
    'selectedArea'
  ],
  data() {
    return {
      timeModal: true,
      areaModal: true,
    }
  },
  methods: {
    selectTime() {
      this.$emit("timeModal", this.timeModal);
    },
    selectArea() {
      this.$emit("areaModal", this.areaModal);
    },
    search() {
      this.$router.push( { path: '/article/articles', query: { selectedTime: this.selectedTime, selectedArea: this.selectedArea } } )
    }
  },
}
</script>

<style lang="scss" scoped>
.search-modal {
  width: 100%;
  position: absolute;
  top: 255px;
    @include mq() {
    top: 325px;
  }

  &__inner {
    width: 90%;
    margin: 0 auto;
  }
  .search-box {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    background-color: #fff;
    padding: 1.6rem;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    &__search {
      display: flex;
      position: relative;
    }
    &__trigger {
      height: 55px;
      font-size: 1.4rem;
      background-color: #eee;
      border: none;
      margin-bottom: 0.8rem;
      line-height: 55px;
      cursor: pointer;
      .fas {
        margin-left: 0.6rem;
      }
    }
    &__trigger--left {
      text-align: center;
      width: 34%;
      border-radius: 4px;
      position: relative;
    }
    // &__trigger--left::after {
    //   content: '|';
    //   color: #888;
    //   transform: scaleY(2);
    //   margin-left: 0.5rem;
    //   position: absolute;
    //   right: 0;
    // }
    &__trigger--right {
      margin-left: auto;
      text-align: center;
      width: 64%;
      border-radius: 4px;
    }
    &__submit {
      text-align: center;
      font-size: 1.6rem;
      font-weight: bold;
      width: 100%;
      color: #fff;
      background-color: #ff427a;
      padding: 1.3rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    &__submit:focus {
      outline: none;
    }
  }
}
</style>