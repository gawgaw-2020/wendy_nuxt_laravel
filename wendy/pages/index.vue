<template>
  <div class="top">
    <div class="search-top">
      <div class="search-top__inner">
        <form class="search-top__container" action="#" method="#">
          <p><i class="search-top__icon fas fa-search"></i></p>
          <input
            class="search-top__search"
            type="text"
            placeholder="店舗名・エリア名・キーワード"
          />
        </form>
      </div>
    </div>
    <div class="hero">
      <div class="hero__mask">
        <div class="hero__catch">
          <p class="hero__sub-title">When do you eat?</p>
          <p class="hero__title">いつもと違う時間で</p>
          <p class="hero__title">いつもよりお得にお食事</p>
        </div>
      </div>
    </div>
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
    <div class="content">
      <div class="appeal">
        <p class="appeal__title">お気に入りしたお店</p>
        <p class="appeal__sub-title">お気に入りしたお店をチェックしよう😍</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more"><nuxt-link :to="`/article/all-articles/`">もっと見る ＞</nuxt-link></p>
      </div>
      <div class="appeal">
        <p class="appeal__title">お気に入りしたお店</p>
        <p class="appeal__sub-title">お気に入りしたお店をチェックしよう😍</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more">もっと見る ＞</p>
      </div>
      <div class="appeal">
        <p class="appeal__title">お気に入りしたお店</p>
        <p class="appeal__sub-title">お気に入りしたお店をチェックしよう😍</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more">もっと見る ＞</p>
      </div>
      <div class="appeal">
        <p class="appeal__title">お気に入りしたお店</p>
        <p class="appeal__sub-title">お気に入りしたお店をチェックしよう😍</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more">もっと見る ＞</p>
      </div>
      <div class="appeal">
        <p class="appeal__title">お気に入りしたお店</p>
        <p class="appeal__sub-title">お気に入りしたお店をチェックしよう😍</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
            <li class="mini-store-card">
              <p class="mini-store-card__image"><img src="/img/store-image01.png" alt=""></p>
              <p class="mini-store-card__title">レストランGOSUGE</p>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more">もっと見る ＞</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  created: function () {},
};
</script>

<style lang="scss" scoped>
.test {
  font-size: 1.6rem;
  line-height: 2;
  background-color: #ddd;
}

.top {
  position: relative;
}

.search-top {
  padding-bottom: 0.6rem;
  &__inner {
    max-width: 1366px;
    padding: 0 16px;
    margin: 0 auto;
    position: relative;
  }
  &__icon {
    font-size: 2.4rem;
    position: absolute;
    color: #aaa;
    top: 6px;
    left: 35px;
  }
  &__search {
    width: 100%;
    height: 36px;
    padding: 0 0 0 6rem;
    background-color: #efefef;
    border: none;
    border-radius: 18px;
  }
  &__search::placeholder {
    color: #aaa;
  }
  &__search:focus {
    outline: none;
  }
}

.hero {
  background-image: url('/img/hero.png');
  height: 320px;
  &__mask {
    background-color: rgba(56, 56, 56, 0.4);
    height: 100%;
    position: relative;
  }
  &__catch {
    width: 100%;
    color: #fff;
    font-weight: bold;
    text-align: center;
    position: absolute;
    top: 37%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__sub-title {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
  &__title {
    font-size: 2.1rem;
  }
}

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

.content {
  padding-top: 10rem;
  padding-bottom: 8.8rem;
}

.appeal {
  margin-bottom: 2.2rem;
  padding-left: 1.6rem;
  &__title {
    font-size: 1.8rem;
    margin-bottom: 0.4rem;
  }
  &__sub-title {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
  .appeal-stores {
    &__inner {
      overflow-x: auto;
      white-space: nowrap;
      margin-bottom: 1rem;
    }
  }
  .mini-store-card {
    display: inline-block;
    margin-right: 2rem;
    &__image {
      margin-bottom: 0.4rem;
    }
    &__title {
      font-size: 1.2rem;
    }
  }
  &__view-more {
    display: block;
    font-size: 1.2rem;
    text-align: right;
    padding-right: 2rem;
    cursor: pointer;
    a {
      color: #2e6171;
    }
  }
}

</style>
