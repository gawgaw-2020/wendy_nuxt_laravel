<template>
  <div class="mypage-info__container">
    <UserPageHeader/>
    <MyPageNavigation/>
    <div class="mypage-info">
      <div class="mypage-info__inner">
        <h3 class="mypage-info__title">WENDYからのお知らせ</h3>
        <div class="info">
          <ul class="info__list">
            <li class="info__item">
              <p class="info__icon"><img src="/img/info-icon.png" alt=""></p>
              <div class="info__content">
                <p class="info__title">アプリがリニューアルしました！アプリがリニューアルしました！アプリがリニューアルしました！</p>
                <p class="info__date">1日前</p>
              </div>
            </li>
            <li class="info__item">
              <p class="info__icon"><img src="/img/info-icon.png" alt=""></p>
              <div class="info__content">
                <p class="info__title">検索機能がパワーアップしました！検索機能がパワーアップしました！</p>
                <p class="info__date">1日前</p>
              </div>
            </li>
            <li class="info__item">
              <p class="info__icon"><img src="/img/info-icon.png" alt=""></p>
              <div class="info__content">
                <p class="info__title">アプリがリニューアルしました！</p>
                <p class="info__date">1日前</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  head() {
    return {
      title: 'ずらし飯からのお知らせ'
    }
  },
  data() {
    return {

    }
  },
  computed: {
    
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>
  .mypage-info__container {
    height: calc( 100vh - 50px);
    background-color: #efefef;
  }
  .mypage-info {
    color: #2e6171;
    padding-bottom: 12rem;
    &__inner {
      max-width: 768px;
      padding: 0 16px;
      margin: 0 auto;
    }
    &__title {
      font-size: 1.4rem;
      text-align: center;
      padding: 3.2rem 0 1.2rem;
    }
    .info {
      &__item {
        display: flex;
        padding: 1.6rem 0;
        border-bottom: 1px solid #aaa;
      }
      &__icon {
        width: 46px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &__content {
        flex: 1;
        padding: 0 1.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      &__title {
        font-size: 1.4rem;
        margin-bottom: 1.2rem;
      }
      &__date {
        font-size: 1rem;
      }
    }
  }
</style>