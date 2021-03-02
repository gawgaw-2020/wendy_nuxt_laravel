<template>
  <div class="top">
    <div class="time-modal" v-show="timeModal">
      <div class="time-modal__inner animate__animated animate__fadeIn">
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
    <SearchModal @timeModal='openTimeModal' @areaModal='openAreaModal' :selectedTime="this.selectedTime" :selectedArea="this.selectedArea"/>
    <div class="content">
      <div class="appeal">
        <p class="appeal__title">＊全てのお店をチェックする＊</p>
        <p class="appeal__sub-title">どのお店もお得がいっぱい😍</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card" v-for="(article, index) in allArticles" :key="index">
              <nuxt-link :to="`/article/${article.store_id}`">
                <p class="mini-store-card__image"><img :src="article.main_image" alt=""></p>
                <p class="mini-store-card__title">{{ article.name }}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more"><nuxt-link :to="`/article/all-articles/`">もっと見る ＞</nuxt-link></p>
      </div>
      <div class="appeal">
        <p class="appeal__title">遅い時間のランチでお得なお店</p>
        <p class="appeal__sub-title">今日は<span class="oso-lunch">遅ランチ</span>で元気をチャージ🍴</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card" v-for="(article, index) in osoLunchArticles" :key="index">
              <nuxt-link :to="`/article/${article.store_id}`">
                <p class="mini-store-card__image"><img :src="article.main_image" alt=""></p>
                <p class="mini-store-card__title">{{ article.name }}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more"><nuxt-link :to="`/article/osoLunchArticles/?selectedTime=遅ランチ`">もっと見る ＞</nuxt-link></p>
      </div>
      <div class="appeal">
        <p class="appeal__title">早めの晩ごはんでお得なお店</p>
        <p class="appeal__sub-title">今日は<span class="haya-dinner">早ディナー</span>でゆったりお食事</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card" v-for="(article, index) in hayaDinnerArticles" :key="index">
              <nuxt-link :to="`/article/${article.store_id}`">
                <p class="mini-store-card__image"><img :src="article.main_image" alt=""></p>
                <p class="mini-store-card__title">{{ article.name }}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more"><nuxt-link :to="`/article/hayaDinnerArticles/?selectedTime=早ディナー`">もっと見る ＞</nuxt-link></p>
      </div>
      <div class="appeal">
        <p class="appeal__title">遅い時間の入店でお得なお店</p>
        <p class="appeal__sub-title">実は<span class="oso-dinner">遅ディナー</span>もお得がいっぱい🌙</p>
        <div class="appeal-stores">
          <ul class="appeal-stores__inner">
            <li class="mini-store-card" v-for="(article, index) in osoDinnerArticles" :key="index">
              <nuxt-link :to="`/article/${article.store_id}`">
                <p class="mini-store-card__image"><img :src="article.main_image" alt=""></p>
                <p class="mini-store-card__title">{{ article.name }}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <p class="appeal__view-more"><nuxt-link :to="`/article/osoDinnerArticles/?selectedTime=遅ディナー`">もっと見る ＞</nuxt-link></p>
      </div>
      <div class="appeal">
        <p class="appeal__view-more"><nuxt-link :to="`/add_article_data/`">管理用リンク ＞</nuxt-link></p>
      </div>
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
  background-position: center;
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

.content {
  padding-top: 10rem;
  padding-bottom: 8.8rem;
}

.appeal {
  margin-bottom: 2.2rem;
  padding-left: 1.6rem;
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
      overflow-x: auto;
      white-space: nowrap;
      margin-bottom: 1rem;
    }
  }
  .mini-store-card {
    display: inline-block;
    margin-right: 2rem;
    &__image {
      width: 140px;
      max-height: 90px;
      overflow: hidden;
      margin-bottom: 0.4rem;
      @include mq() { // 引数を個別に指定
        width: 280px;
        max-height: 180px;
      }
    }
    &__image img {
      border-radius: 5px;
    }
    &__title {
      width: 140px;
      @include mq() { // 引数を個別に指定
        width: 280px;
      }
      font-size: 1.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
