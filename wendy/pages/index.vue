<template>
  <div class="top">
    <div class="time-modal" v-show="timeModal">
      <div class="area-modal__inner animate__animated animate__fadeIn">
        <p class="time-modal__message">時間帯を選択してください</p>
        <p class="time-modal__item" @click="selectTime" data-time="遅ランチ">遅ランチ</p>
        <p class="time-modal__item" @click="selectTime" data-time="早ディナー">早ディナー</p>
        <p class="time-modal__item" @click="selectTime" data-time="遅ディナー">遅ディナー</p>
      </div>
      <div class="time-modal__background animate__animated animate__fadeIn" @click="timeModalToggle"></div>
    </div>
    <div class="area-modal" v-show="areaModal">
      <div class="area-modal__inner animate__animated animate__fadeIn">
        <p class="area-modal__message">エリアを選択してください</p>
        <p class="area-modal__item" @click="selectArea" data-area="新宿・代々木">新宿・代々木</p>
        <p class="area-modal__item" @click="selectArea" data-area="渋谷・原宿・表参道">渋谷・原宿・表参道</p>
        <p class="area-modal__item" @click="selectArea" data-area="恵比寿・代官山・目黒">恵比寿・代官山・目黒</p>
        <p class="area-modal__item" @click="selectArea" data-area="五反田・品川">五反田・品川</p>
        <p class="area-modal__item" @click="selectArea" data-area="六本木・広尾・赤坂">六本木・広尾・赤坂</p>
        <p class="area-modal__item" @click="selectArea" data-area="浜松町・三田・田町">浜松町・三田・田町</p>
        <p class="area-modal__item" @click="selectArea" data-area="新橋・有楽町・銀座">新橋・有楽町・銀座</p>
        <p class="area-modal__item" @click="selectArea" data-area="東京・日本橋・茅場町">東京・日本橋・茅場町</p>
        <p class="area-modal__item" @click="selectArea" data-area="池袋・目白・高田馬場">池袋・目白・高田馬場</p>
        <p class="area-modal__item" @click="selectArea" data-area="四谷・神楽坂・飯田橋">四谷・神楽坂・飯田橋</p>
        <p class="area-modal__item" @click="selectArea" data-area="上野・御徒町・浅草">上野・御徒町・浅草</p>
        <p class="area-modal__item" @click="selectArea" data-area="水道橋・神田・秋葉原">水道橋・神田・秋葉原</p>
        <p class="area-modal__item" @click="selectArea" data-area="中野・吉祥寺・三鷹">中野・吉祥寺・三鷹</p>
        <p class="area-modal__item" @click="selectArea" data-area="その他">その他</p>
      </div>
      <div class="area-modal__background animate__animated animate__fadeIn" @click="areaModalToggle"></div>
    </div>

    <!-- <div class="search-top">
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
    </div> -->
    <div class="hero">
      <div class="hero__mask">
        <div class="hero__catch">
          <p class="hero__sub-title">飲食店のクーポンが探せます</p>
          <p class="hero__title">来店時間のピークからずらして</p>
          <p class="hero__title">お得に食事をしよう</p>
        </div>
      </div>
    </div>
    <SearchModal @timeModal='openTimeModal' @areaModal='openAreaModal' :selectedTime="this.selectedTime" :selectedArea="this.selectedArea"/>
    <div class="introduction">
      <div class="introduction__inner">
        <section>
          <h3>「ずらし飯」３つのおすすめ来店時間</h3>
          <div class="time-box">
            <div class="time-box__item">
              <img src="/img/oso-lunch-time-image@2x.png" alt="" style="width: 80px; margin: 0 auto;">
              <p>「遅めのランチ」</p>
            </div>
            <div class="time-box__item">
              <img src="/img/haya-dinner-time-image@2x.png" alt="" style="width: 80px; margin: 0 auto;">
              <p>「早めのディナー」</p>
            </div>
            <div class="time-box__item">
              <img src="/img/oso-dinner-time-image@2x.png" alt="" style="width: 80px; margin: 0 auto;">
              <p>「遅めのディナー」</p>
            </div>
          </div>
          <p>いつもの混雑を避けて、<br>ゆったりとお食事してみませんか？</p>
        </section>
        <section>
          <h3>変化に対応した飲食店の新しい取り組み</h3>
          <p>「お客さんにたくさん来て欲しいけど、<br>来店時間が重なると密になってしまうな...」</p>
          <p>多くの飲食店が、ピーク時間にとらわれず<br>楽しんでもらいたいと思っています。</p>
        </section>
        <section>
          <h3>せっかくならお得な特典を探してみよう</h3>
          <p>飲食店にも嬉しいお客さんの分散来店！</p>
          <p>「ずらし飯」でより安全でお得な<br>新しい食体験をお楽しみ下さい。</p>
        </section>
      </div>
    </div>
    <div class="content">
      <div class="appeal">
        <div class="appeal__header">
          <p class="appeal__header-image"><img src="/img/oso-lunch-time-image@2x.png" alt=""></p>
          <div class="appeal__header-titles">
            <p class="appeal__title">遅い時間のランチでお得なお店</p>
            <p class="appeal__sub-title">今日は<span class="oso-lunch">遅ランチ</span>で元気をチャージ</p>
          </div>
        </div>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card" v-for="(article, index) in osoLunchArticles" :key="index">
              <nuxt-link :to="`/article/${article.store_id}`">
                <div class="mini-store-card__image">
                  <img :src="article.coupons[0].image" alt="">
                  <p class="mini-store-card__badge"><img :src="`/img/discount-badge/discount-badge${article.coupons[0].discount_rate}.png`" alt=""></p>
                </div>
                <p class="mini-store-card__area">{{ article.area }}</p>
                <div class="mini-store-card__content">
                  <p class="mini-store-card__name">{{ article.name }}</p>
                  <p class="mini-store-card__title">{{ article.coupons[0].title }}</p>
                  <p v-if="article.coupons[0].discount_rate === 0" class="mini-store-card__discount-rate"><span class="haya-dinner">早ディナーで特別価格</span></p>
                  <div v-else class="mini-store-card__discount-rate"><p><span class="haya-dinner">早ディナーで{{ article.coupons[0].discount_rate }}%OFF</span></p></div>
                  <p v-if="article.coupons[0].discount_rate === 0" class="mini-store-card__normal-price">特別価格でご用意</p>
                  <p v-else class="mini-store-card__normal-price">通常価格 {{ article.coupons[0].normal_price.toLocaleString() }}円</p>
                  <p class="mini-store-card__discount-price">Wendy価格 <span>{{ Math.floor(article.coupons[0].normal_price * ((100 - article.coupons[0].discount_rate) / 100)).toLocaleString() }}<span class="yen">円</span></span></p>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more"><nuxt-link :to="`/article/osoLunchArticles/?selectedTime=遅ランチ`">もっと見る ＞</nuxt-link></p>
      </div>
      <div class="appeal">
        <div class="appeal__header">
          <p class="appeal__header-image"><img src="/img/haya-dinner-time-image@2x.png" alt=""></p>
          <div class="appeal__header-titles">
            <p class="appeal__title">早めの晩ごはんでお得なお店</p>
            <p class="appeal__sub-title">今日は<span class="haya-dinner">早ディナー</span>でゆったりお食事</p>
          </div>
        </div>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card" v-for="(article, index) in hayaDinnerArticles" :key="index">
              <nuxt-link :to="`/article/${article.store_id}`">
                <div class="mini-store-card__image">
                  <img :src="article.coupons[1].image" alt="">
                  <p class="mini-store-card__badge"><img :src="`/img/discount-badge/discount-badge${article.coupons[1].discount_rate}.png`" alt=""></p>
                </div>
                  <p class="mini-store-card__area">{{ article.area }}</p>
                <div class="mini-store-card__content">
                  <p class="mini-store-card__name">{{ article.name }}</p>
                  <p class="mini-store-card__title">{{ article.coupons[1].title }}</p>
                  <p v-if="article.coupons[1].discount_rate === 0" class="mini-store-card__discount-rate"><span class="haya-dinner">早ディナーで特別価格</span></p>
                  <div v-else class="mini-store-card__discount-rate"><p><span class="haya-dinner">早ディナーで{{ article.coupons[1].discount_rate }}%OFF</span></p></div>
                  <p v-if="article.coupons[1].discount_rate === 0" class="mini-store-card__normal-price-blank"></p>
                  <p v-else class="mini-store-card__normal-price">通常価格 {{ article.coupons[1].normal_price.toLocaleString() }}円</p>
                  <p class="mini-store-card__discount-price">Wendy価格 <span>{{ Math.floor(article.coupons[1].normal_price * ((100 - article.coupons[1].discount_rate) / 100)).toLocaleString() }}<span class="yen">円</span></span></p>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more"><nuxt-link :to="`/article/hayaDinnerArticles/?selectedTime=早ディナー`">もっと見る ＞</nuxt-link></p>
      </div>
      <div class="appeal">
        <div class="appeal__header">
          <p class="appeal__header-image"><img src="/img/oso-dinner-time-image@2x.png" alt=""></p>
          <div class="appeal__header-titles">
            <p class="appeal__title">遅い時間の入店でお得なお店</p>
            <p class="appeal__sub-title">実は<span class="oso-dinner">遅ディナー</span>もお得がいっぱい</p>
          </div>
        </div>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card" v-for="(article, index) in osoDinnerArticles" :key="index">
              <nuxt-link :to="`/article/${article.store_id}`">
                <div class="mini-store-card__image">
                  <img :src="article.coupons[2].image" alt="">
                  <p class="mini-store-card__badge"><img :src="`/img/discount-badge/discount-badge${article.coupons[2].discount_rate}.png`" alt=""></p>
                </div>
                <p class="mini-store-card__area">{{ article.area }}</p>
                <div class="mini-store-card__content">
                  <p class="mini-store-card__name">{{ article.name }}</p>
                  <p class="mini-store-card__title">{{ article.coupons[2].title }}</p>
                  <p v-if="article.coupons[2].discount_rate === 0" class="mini-store-card__discount-rate"><span class="haya-dinner">早ディナーで特別価格</span></p>
                  <div v-else class="mini-store-card__discount-rate"><p><span class="haya-dinner">早ディナーで{{ article.coupons[2].discount_rate }}%OFF</span></p></div>
                  <p v-if="article.coupons[2].discount_rate === 0" class="mini-store-card__normal-price-blank"></p>
                  <p v-else class="mini-store-card__normal-price">通常価格 {{ article.coupons[2].normal_price.toLocaleString() }}円</p>
                  <p class="mini-store-card__discount-price">Wendy価格 <span>{{ Math.floor(article.coupons[2].normal_price * ((100 - article.coupons[2].discount_rate) / 100)).toLocaleString() }}<span class="yen">円</span></span></p>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more"><nuxt-link :to="`/article/osoDinnerArticles/?selectedTime=遅ディナー`">もっと見る ＞</nuxt-link></p>
      </div>
      <div class="appeal">
        <p class="appeal__title">＊全てのお店をチェックする＊</p>
        <p class="appeal__sub-title">どのお店もお得がいっぱい</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card" v-for="(article, index) in allArticles" :key="index">
              <nuxt-link :to="`/article/${article.store_id}`">
                <div class="mini-store-card__image">
                  <img :src="article.coupons[1].image" alt="">
                  <p class="mini-store-card__badge"><img :src="`/img/discount-badge/discount-badge${article.coupons[1].discount_rate}.png`" alt=""></p>
                </div>
                  <p class="mini-store-card__area">{{ article.area }}</p>
                <div class="mini-store-card__content">
                  <p class="mini-store-card__name">{{ article.name }}</p>
                  <p class="mini-store-card__title">{{ article.coupons[1].title }}</p>
                  <p v-if="article.coupons[1].discount_rate === 0" class="mini-store-card__discount-rate"><span class="haya-dinner">早ディナーで特別価格</span></p>
                  <div v-else class="mini-store-card__discount-rate"><p><span class="haya-dinner">早ディナーで{{ article.coupons[1].discount_rate }}%OFF</span></p></div>
                  <p v-if="article.coupons[1].discount_rate === 0" class="mini-store-card__normal-price-blank"></p>
                  <p v-else class="mini-store-card__normal-price">通常価格 {{ article.coupons[1].normal_price.toLocaleString() }}円</p>
                  <p class="mini-store-card__discount-price">Wendy価格 <span>{{ Math.floor(article.coupons[1].normal_price * ((100 - article.coupons[1].discount_rate) / 100)).toLocaleString() }}<span class="yen">円</span></span></p>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more"><nuxt-link :to="`/article/all-articles/`">もっと見る ＞</nuxt-link></p>
      </div>
      <!-- <div class="appeal">
        <p class="appeal__view-more"><nuxt-link :to="`/add_article_data/`">管理用リンク ＞</nuxt-link></p>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      timeModal: false,
      areaModal: false,
      selectedTime: '早ディナー',
      selectedArea: '東京・日本橋・茅場町',
    };
  },
  computed: {
    ...mapGetters('articles', ['allArticles', 'osoLunchArticles', 'hayaDinnerArticles', 'osoDinnerArticles'])
  },
  methods: {
    ...mapActions('articles', ['getAllArticles', 'getOsoLunchArticles', 'getHayaDinnerArticles', 'getOsoDinnerArticles']),
    toggleFixedBackground() {
      if(document.body.style.overflow === '') {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    areaModalMoveToTop() {
      const obj = document.querySelector('.area-modal__inner');
      obj.scrollTop = 0
    },
    timeModalToggle() {
      this.timeModal = !this.timeModal
      this.toggleFixedBackground()
    },
    areaModalToggle() {
      this.areaModal = !this.areaModal
      this.toggleFixedBackground()
      this.areaModalMoveToTop()
    },
    openTimeModal(payload) {
      this.timeModal = payload
      this.toggleFixedBackground()

    },
    openAreaModal(payload) {
      this.areaModal = payload
      this.toggleFixedBackground()
    },
    selectTime(e) {
      this.selectedTime = e.currentTarget.getAttribute('data-time')
      this.timeModal = !this.timeModal
      this.toggleFixedBackground()
    },
    selectArea(e) {
      this.selectedArea = e.currentTarget.getAttribute('data-area')
      this.areaModal = !this.areaModal
      this.toggleFixedBackground()
      this.areaModalMoveToTop()
    }
  },
  created: function () {
    this.getAllArticles()
    this.getOsoLunchArticles()
    this.getHayaDinnerArticles()
    this.getOsoDinnerArticles()
  },
};
</script>

<style lang="scss" scoped>
.time-modal {
  text-align: center;
  color: #fff;
  &__inner{
    max-width: 768px;
    overflow: scroll;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    background: transparent linear-gradient(180deg, #ff427a 0%, #EAE5E6 300%) 0% 0% no-repeat padding-box;
    opacity: 1;
    z-index: 10000;
    border-radius: 20px;
    @include mq() {
      top: 40%;
    }
  }
  &__background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    z-index: 9999;
    cursor: pointer;
  }
  &__message {
    font-size: 1.4rem;
    padding: 1.4rem 0;
  }
  &__item {
    border-top: 1px solid #bbb;
    padding: 1.5rem 0;
    font-weight: bold;
  }
}
.area-modal {
  text-align: center;
  color: #fff;
  &__inner{
    max-width: 768px;
    overflow: scroll;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    background: transparent linear-gradient(180deg, #ff427a 0%, #EAE5E6 300%) 0% 0% no-repeat padding-box;
    opacity: 1;
    z-index: 10000;
    border-radius: 20px;
    max-height: 435px;
  }
  &__background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    z-index: 9999;
    cursor: pointer;
  }
  &__message {
    font-size: 1.4rem;
    padding: 1.4rem 0;
    background: #ff427a;
    position: sticky;
    top: 0;
    width: 100%;
  }
  &__item {
    font-size: 1.6rem;
    border-top: 1px solid #bbb;
    padding: 1rem 0;
    font-weight: bold;
  }

}

.test {
  font-size: 1.6rem;
  line-height: 2;
  background-color: #ddd;
}

.top {
  position: relative;
}

.search-top {
  padding-bottom: 0.8rem;
  &__inner {
    max-width: 768px;
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
    font-size: 1.4rem;
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
  background-size: cover;
  background-position: center -30px;
  max-width: 768px;
  height: 320px;
  margin: 0 auto;
  @include mq() {
    border-radius: 8px;
    height: 400px;
  } 
  &__mask {
    background-color: rgba(56, 56, 56, 0.4);
    height: 100%;
    position: relative;
    @include mq() {
      border-radius: 8px;
    } 
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
    font-size: 2.4rem;
  }
}

.introduction {
  background-color: #f7f7f7;
  text-align: center;
  br {
    @include mq() {
      display: none;
    }
  }
  &__inner {
    max-width: 768px;
    margin: 0 auto;
    padding: 10.6rem 2rem 0.5rem;
  }
  section {
    margin-bottom: 4rem;
  }
  h3 {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
    border-bottom: 2px solid #ff427a;
  }
  p {
    font-size: 1.4rem;
    color: #5a5a5a;
    margin-bottom: 8px;
  }
  .time-box {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1.6rem;
    &__item {
      width: 33%;
      p {
        color: #383838;
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
  }
}

.content {
  padding-top: 2.2rem;
  padding-bottom: 8.8rem;
  max-width: 768px;
  margin: 0 auto;
}

.appeal {
  padding-bottom: 2.2rem;
  margin-bottom: 2.2rem;
  border-bottom: 16px solid #efefef;
  @include mq() {
    border-bottom: none;
  }
  &__header {
    display: flex;
    padding-left: 1.6rem;
  }
  &__header-image {
    margin-left: -8px;
    width: 55px;
    margin-right: 0.4rem;
  }
  &__title {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
  &__sub-title {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    .oso-lunch {
      color: rgb(72, 179, 245);
    }
    .haya-dinner {
      color: rgba(236, 103, 63, 1);
    }
    .oso-dinner {
      color: rgba(66, 58, 141, 1);
    }
  }
  .appeal-stores {
    &__inner {
      display: flex;
      flex-wrap: wrap;

    }
  }
  .mini-store-card:nth-child(even) {
    margin-left: 1.6rem;
  }
  .mini-store-card {
    width: calc(100% / 2 - 0.8rem);
    margin-bottom: 2.4rem;
    &__image {
      max-height: 90px;
      overflow: hidden;
      position: relative;
      @include mq(sm) {
        max-height: 180px;
        border-radius: 8px 8px 0 0;
      }
    }
    &__badge {
      position: absolute;
      top: 0;
      right: 0;
      width: 45px;
      overflow: hidden;
      border-radius: 50%;
    }
    &__badge img {
      transform: scale(1.2);
      border-radius: 50%;
    }
    &__area {
      width: 13.6rem;
      font-size: 1.2rem;
      text-align: center;
      padding: 0.2rem 0.6rem;
      border-radius: 0 0 4px 0;
      background-color: #2e6171;
      color: #fff;
    }
    &__content {
      padding: 0.4rem 1rem 0 1rem;
    }
    &__name {
      max-width: 100%;
      font-size: 1.4rem;
      margin-bottom: 0.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__title {
      min-height: 7.2rem;
      font-size: 1.4rem;
      font-weight: bold;
    }
    &__normal-price-blank {
      height: 18px;
    }
    &__normal-price {
      text-align: right;
      font-size: 1.2rem;
      text-decoration: line-through;
      color: #838383;
      margin-bottom: -0.4rem;
    }
    &__discount-rate {
      text-align: right;
      font-size: 1.4rem;
      margin-top: -0.8rem;
      .oso-lunch {
        color: rgb(72, 179, 245);
      }
      .haya-dinner {
        color: rgba(236, 103, 63, 1);
      }
      .oso-dinner {
        color: rgba(66, 58, 141, 1);
      }
      @include mq(sm) {
        margin-top: -3.2rem;
      }
    }
    &__discount-price {
      text-align: right;
      font-size: 1rem;
      span {
        margin-left: 0.8rem;
        font-size: 2.4rem;
        color: #ff427a;
        font-weight: bold;
      }
      .yen {
        font-size: 1.8rem;
        margin-left: 2px;
      }
    }
  }
  &__view-more {
    display: block;
    font-size: 1.4rem;
    text-align: right;
    padding-right: 2rem;
    cursor: pointer;
    a {
      color: #2e6171;
    }
  }
}

</style>
