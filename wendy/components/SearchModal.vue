<template>
  <div class="search-modal">
    <div class="search-modal__inner">
      <div class="search-box">
        <div class="search-box__inner" action="#">
          <div class="search-box__search">
            <p class="search-box__trigger search-box__trigger--left" @click="selectTime">{{ selectedTime }}</p>
            <p class="search-box__trigger search-box__trigger--right" @click="selectArea">{{ selectedArea }}</p>
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
  top: 285px;
  &__inner {
    width: 90%;
    margin: 0 auto;
  }
  .search-box {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    background-color: #fff;
    padding: 1.6rem 2rem;
    border-radius: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    &__search {
      display: flex;
      position: relative;
    }
    &__trigger {
      height: 55px;
      font-size: 1.6rem;
      background-color: #ddd;
      border: none;
      margin-bottom: 1.2rem;
      line-height: 55px;
      cursor: pointer;
    }
    &__trigger--left {
      text-align: center;
      width: 34%;
      border-radius: 28px 0 0 28px;
      position: relative;
    }
    &__trigger--left::after {
      content: '|';
      margin-left: 0.5rem;
      position: absolute;
      right: 0;
    }
    &__trigger--right {
      line-height: 1;
      text-align: center;
      width: 66%;
      border-radius: 0 28px 28px 0;
      padding-right: 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__submit {
      text-align: center;
      font-size: 1.6rem;
      font-weight: bold;
      width: 100%;
      color: #fff;
      background-color: #ff427a;
      padding: 1.6rem;
      border: none;
      border-radius: 28px;
      cursor: pointer;
    }
    &__submit:focus {
      outline: none;
    }
  }
}
</style>