<template>
  <div class="mypage-history__container">
    <UserPageHeader/>
    <MyPageNavigation/>
    <div class="mypage-history">
      <div class="mypage-history__inner">
        <h3 class="mypage-history__title">WENDYクーポン利用履歴</h3>
        <div class="history">
          <ul class="history__list">
            <li class="history__item"  v-for="(article, index) in historyArticles" :key="index">
              <div class="history__content">
                <p class="history__date">{{ article.create_time | format-date}}</p>
                <p class="history__title">{{ article.store_name }}</p>
                <p class="history__coupon-time">{{ article.used_coupon_start }}~{{ article.used_coupon_end }}</p>
                <p class="history__coupon-content">{{ article.used_coupon_title }}</p>
              </div>
              <p class="history__icon">
                <nuxt-link :to="`/article/${article.article_id}`">
                  <img src="/img/history-icon.png" alt="">
                  <span>店舗ページへ</span>
                </nuxt-link>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  middleware: 'authenticated',
  data() {
    return {

    }
  },
  computed: {
    ...mapState('mypage', ['historyArticles']),
  },
  methods: {
    ...mapActions('mypage', ['getHistoryArticles', 'setLinePosition']),

  },
  created: function() {
    this.getHistoryArticles()
  },
  mounted() {
    const page = document.querySelector('.mypage-history')
    const bodyHeight = document.body.clientHeight
    if (bodyHeight > page.clientHeight) {
      page.style.height = `${bodyHeight}px`
    }
  }
}
</script>

<style lang="scss" scoped>
  .mypage-history__container {
    background-color: #efefef;
    padding-bottom: 80px;
  }
  .mypage-history {
    color: #2e6171;
    &__inner {
      max-width: 1366px;
      padding: 0 16px;
      margin: 0 auto;
    }
    &__title {
      font-size: 1.4rem;
      text-align: center;
      padding: 3.2rem 0 1.2rem;
    }
    .history {
      &__item {
        font-size: 1rem;
        display: flex;
        padding: 1.4rem 0 1.4rem 1rem;
        border-bottom: 1px solid #aaa;
      }
      &__icon {
        padding: 2.6rem 1.6rem 1.6rem;
        img {
          width: 46px;
          margin: 0 auto 0.4rem;
        }
        span {
          color: #2e6171;
          font-size: 1rem;
        }
      }
      &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      &__date {
        font-size: 1.6rem;
        margin-bottom: 0.4rem;
      }
      &__title {
        font-size: 1.8rem;
        margin-bottom: 0.4rem;
      }
      &__coupon-time {
        margin-bottom: 0.2rem;
      }
      &__coupon-content {
        font-size: 1.4rem;
      }
    }
  }
</style>