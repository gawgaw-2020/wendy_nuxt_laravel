<template>
  <div class="search-modal">
    <div class="search-modal__inner">
      <div class="search-box">
        <div class="search-box__inner" action="#">
          <div class="search-box__search">
            <p><i class="search-box__icon fas fa-search"></i></p>
            <p class="search-box__trigger search-box__trigger--left">行きたい時間</p>
            <p class="search-box__trigger search-box__trigger--right">エリア</p>
          </div>
          <button class="search-box__submit" type="submit">お店を探す</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
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
    background-color: #fff;
    padding: 1.6rem 2rem;
    border-radius: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    &__search {
      display: flex;
      position: relative;
    }
    &__icon {
      font-size: 2.4rem;
      position: absolute;
      color: #aaa;
      top: 16px;
      left: 20px;
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
      text-align: right;
      width: 58%;
      border-radius: 28px 0 0 28px;
    }
    &__trigger--left::after {
      content: '|';
      margin-left: 2rem;
    }
    &__trigger--right {
      padding-left: 3rem;
      width: 42%;
      border-radius: 0 28px 28px 0;
    }
    &__submit {
      font-size: 1.6rem;
      font-weight: bold;
      width: 100%;
      color: #fff;
      background-color: #eb5276;
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