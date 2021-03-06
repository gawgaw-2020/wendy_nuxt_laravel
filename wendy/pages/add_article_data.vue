<template>
  <div class="add_article_data">
    <button @click="add">ダミーデータを登録する</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const articlesRef = db.collection('articles')

const nearestStationList = [
  '八千代駅',
  '谷中駅',
  '穂川駅',
  '上越駅',
  '日笠駅',
  '杉並駅',
  '湯野駅',
  '長月駅',
  '東田辺駅',
  '箱崎駅',
  '谷町駅',
  '新白鳥駅',
  '多摩駅',
]

const smallTextList = [
  '【JR浜松駅徒歩2分】“生け簀”を囲む店内で佐世保の新鮮な魚介を粋にあふれた空間で愉しむ',
  '名物うにしゃぶコース！お時間、特別プランなどのご相談も可能です！',
  'point利用出来ます。【ダイバーシティ東京プラザ】焼肉といえばここ！デートや記念日に♪',
  'スペインの人気店がOPEN！世界一に輝いたパエリア専門店！名店の味をご堪能下さい',
  '【豊悦駅5分】生簀の魚をその場で捌く！自慢の海鮮料理をお好みの一杯と楽しむ。完全個室有',
  '《ワイン1杯からお食事まで》ビストロ＆ワインバーで素敵なひと時をお過ごしください。',
  '【目比良駅徒歩5分】厳選食材に秘伝の味噌だれ！戦国で13年支持されてきた人気焼鳥店',
  '美味い酒、旨い肴、活気あふれる夜市と薫り。美食の街へようこそ!ご予約も承り中',
  '【讃美駅東口 徒歩10秒】★2名様～個室・テラス席有り★GoToイートキャンペーン登録店舗',
  '【お一人様・少人数でのご来店大歓迎◎】サクッと飲める安価なセットメニューご用意しております',
  '【Go To Eat 対象店】旬の食材が味わえるモダン和食。昼呑み、飲み放題プランもお得に！',
  '窯焼きピザが500！ボトルワインも1,900～☆気軽にイタリアンを楽しむならココ！',
  '【橋助駅スグ】幹事様必見！リーズナブルで大宴会◎陽気な空間でウチナータイム♪',
  '広島モダンテラス内 バハムンの本格韓国居酒屋！多彩な韓国料理と生マッコリでサクッと乾杯◎',
  '新型コロナ対策実施中！新柏木駅 ３分のイタリアン酒場★旬食材の品から肉料理・本格パスタも',
]

const categoryList = [
  '日本料理',
  '寿司',
  '魚介料理・海鮮料理',
  '天ぷら・揚げ物',
  'そば・うどん',
  '焼き鳥・串焼',
  'すき焼き・しゃぶしゃぶ',
  'おでん',
  'パスタ・ピザ',
  '鉄板焼',
  'ハンバーガー',
  'イタリアン',
  'フレンチ',
  'スペイン料理',
  '中華料理',
  'カレーライス',
  'もつ鍋',
  '居酒屋',
  'ダイニングバー',
  'ラーメン',
  '焼き肉・ホルモン',
]

const addressList = [
  '広島県広島市中区大手町3-3-21',
  '広島県広島市中区幟町5-2',
  '広島県広島市中区流川町3-1',
  '広島県広島市中区堀川町1-8',
  '広島県広島市中区基町6-21',
  '広島県広島市中区袋町3-1',
  '広島県広島市中区堀川町1-22',
  '広島県広島市中区胡町3-1',
  '広島県広島市中区三川町10-1',
]

const nameList = [
  'タイ料理店 レリラロイ',
  'Bar harapeko',
  'ルレーション・ラ',
  '小料理 満月の夜',
  'イタリア料理メリアリーゾ',
  'ビストロエンリコ',
  'Oysterbar MEKURU新橋店',
  '伯剌西爾食堂田町店',
  'すし寿司SUSHI 目際町店',
  'インド料理パリピール 庄司店',
  '焼肉ホルモン酒場 めぐみちゃん',
  '瀬戸内海料理店 泣馬謖斬',
  'リストランテ ポルトフィーノ',
  'ワイン酒場 マクダックス',
  '炭火焼鳥 にかいから',
  '岩融sake塩率',
  'メイプル・イン',
  'Explorer Restaurant',
  'Mesano',
  '割烹 善',
  'A5焼肉 煉獄',
  'やきとん 竈門',
  '椿食堂',
  'ロシアン コーヒーハウス',
  'ダリオ',
  '金光食堂',
  'Cafe mono koto',
  '絶景カフェ お庭',
  'ダンテ茶房',
  'テックダイナー ENTER'
]

const areaList = [
  '新宿・代々木',
  '渋谷・原宿・表参道',
  '恵比寿・代官山・目黒',
  '五反田・品川',
  '六本木・広尾・赤坂',
  '浜松町・三田・田町',
  '新橋・有楽町・銀座',
  '東京・日本橋・茅場町',
  '池袋・目白・高田馬場',
  '四谷・神楽坂・飯田橋',
  '上野・御徒町・浅草',
  '水道橋・神田・秋葉原',
  '中野・吉祥寺・三鷹'
]


const mainImageList = [
  '/img/main-image-sample/main_image-sample1.jpg',
  '/img/main-image-sample/main_image-sample2.jpg',
  '/img/main-image-sample/main_image-sample3.jpg',
  '/img/main-image-sample/main_image-sample4.jpg',
  '/img/main-image-sample/main_image-sample5.jpg',
  '/img/main-image-sample/main_image-sample6.jpg',
  '/img/main-image-sample/main_image-sample7.jpg',
  '/img/main-image-sample/main_image-sample8.jpg',
  '/img/main-image-sample/main_image-sample9.jpg',
  '/img/main-image-sample/main_image-sample10.jpg',
  '/img/main-image-sample/main_image-sample11.jpg',
  '/img/main-image-sample/main_image-sample12.jpg',
  '/img/main-image-sample/main_image-sample13.jpg',
  '/img/main-image-sample/main_image-sample14.jpg',
]

const couponImageList = [
  '/img/coupon-image-sample/coupon_image-sample1.jpg',
  '/img/coupon-image-sample/coupon_image-sample2.jpg',
  '/img/coupon-image-sample/coupon_image-sample3.jpg',
  '/img/coupon-image-sample/coupon_image-sample4.jpg',
  '/img/coupon-image-sample/coupon_image-sample5.jpg',
  '/img/coupon-image-sample/coupon_image-sample6.jpg',
  '/img/coupon-image-sample/coupon_image-sample7.jpg',
  '/img/coupon-image-sample/coupon_image-sample8.jpg',
  '/img/coupon-image-sample/coupon_image-sample9.jpg',
  '/img/coupon-image-sample/coupon_image-sample10.jpg',
  '/img/coupon-image-sample/coupon_image-sample11.jpg',
  '/img/coupon-image-sample/coupon_image-sample12.jpg',
  '/img/coupon-image-sample/coupon_image-sample13.jpg',
  '/img/coupon-image-sample/coupon_image-sample14.jpg',
  '/img/coupon-image-sample/coupon_image-sample15.jpg',
  '/img/coupon-image-sample/coupon_image-sample16.jpg',
  '/img/coupon-image-sample/coupon_image-sample17.jpg',
  '/img/coupon-image-sample/coupon_image-sample18.jpg',
  '/img/coupon-image-sample/coupon_image-sample19.jpg',
  '/img/coupon-image-sample/coupon_image-sample20.jpg',
  '/img/coupon-image-sample/coupon_image-sample21.jpg',
  '/img/coupon-image-sample/coupon_image-sample22.jpg',
  '/img/coupon-image-sample/coupon_image-sample23.jpg',
  '/img/coupon-image-sample/coupon_image-sample24.jpg',
  '/img/coupon-image-sample/coupon_image-sample25.jpg',
  '/img/coupon-image-sample/coupon_image-sample26.jpg',
]



export default {
  data() {
    return {
      imageList: null,
      store_id: '',
      owner_id: '',
      published: true,
      access_count: 0,
      area: '新宿・代々木',  // 検索で使うので変更する
      name: '居酒屋 兎',
      address: '広島県広島市美鈴が丘西4-11-4',
      nearest_station: '新宿駅',
      business_hour: 'LUNCH TIME: 11:00 ~ 14:00\\nDINNER TIME: 17:00 ~ 23:00\\n不定休',
      cashless: false,
      non_smoke: true,
      category: '魚介系居酒屋',
      credit_card: 'VISA MASTER',
      e_money: '交通系電子マネー メルペイ iD',
      main_text: '「Ba Lat (バラッ)」はハイセンスで高級感溢れるエリア・狎鴎亭(アックジョン)にあり、芸能事務所が集まる場所柄、有名人も頻繁に訪れる人気の海鮮料理専門店です。\\n落ち着いた雰囲気の中でゆっくりと食事を味わうことが出来ます。\\n日本からの観光客に人気のメニューは「カニ身ビビンバ」で、カニ身と濃厚なカニ味噌がたっぷり入った一般のビビンバとは一味違うリッチな一品。\\n野菜もたっぷり入っていてシャキシャキした食感も食べ応えがあります。\\nその他にも、４～10月にはウニをふんだんに使用した「ウニビビンバ」、冬には石鍋でぐつぐつ煮込まれたピリ辛味の「太刀魚の煮物」、夏には新鮮な旬の魚介類をシャーベット氷入りの酢コチュジャンスープでいただく「名品盛合せ水刺身」も人気です。',
      pictures: [
        '/img/slide-sample01.jpg',
        '/img/slide-sample02.jpg',
        '/img/slide-sample03.jpg'
      ],
      small_text: '夏には新鮮な旬の魚介類をシャーベット氷入りの酢コチュジャンスープでいただく「名品盛合せ水刺身」も人気です。',
      url_gnavi: 'https://r.gnavi.co.jp/954k73zg0000/',
      url_hotpepper: 'https://www.hotpepper.jp/strJ001155200/',
      url_instagram: 'https://www.instagram.com/miobar_hiroshima/',
      url_official: 'http://maplecity.jp/zona/',
      url_tabelog: 'https://tabelog.com/chiba/A1201/A120104/12020535/',
      url_twitter: 'https://twitter.com/usagihirosima',
      food01_name: 'マルゲリータ',
      food01_price: 1480,
      food02_name: 'カプリチョーザ',
      food02_price: 1780,
      food03_name: '4種のチーズのピッツァ',
      food03_price: 2280,
      food04_name: '海老のアヒージョ',
      food04_price: 980,
      food05_name: 'フライドポテトトリュフ風味',
      food05_price: 480,
      drink01_name: 'キリン 一番搾り',
      drink01_price: 480,
      drink02_name: '各種グラスワイン',
      drink02_price: 780,
      drink03_name: 'デトックスモヒート',
      drink03_price: 680,
      coupon_oso_lunch_active: true, // 検索で使うので変更する
      coupon_haya_dinner_active: true, // 検索で使うので変更する
      coupon_oso_dinner_active: true, // 検索で使うので変更する
      favorite_counter: 0,
    };
  },
  computed: {},
  methods: {
    add() {
      const oso_lunch_is_active = Math.random() < 0.5
      const haya_dinner_is_active = Math.random() < 0.5
      const oso_dinner_is_active = Math.random() < 0.5

      const createdID = articlesRef.doc().id
      articlesRef.doc(createdID)
      .set({
      store_id: createdID,
      owner_id: this.owner_id,
      published: this.published,
      access_count: this.access_count,
      area: areaList[Math.floor(Math.random() * areaList.length)],
      name: nameList[Math.floor(Math.random() * nameList.length)],
      address: addressList[Math.floor(Math.random() * addressList.length)],
      nearest_station: nearestStationList[Math.floor(Math.random() * nearestStationList.length)],
      business_hour: this.business_hour,
      cashless: Math.random() < 0.5,
      non_smoke: Math.random() < 0.5,
      category: categoryList[Math.floor(Math.random() * categoryList.length)],
      credit_card: this.credit_card,
      e_money: this.e_money,
      main_image: mainImageList[Math.floor(Math.random() * mainImageList.length)],
      main_text: this.main_text,
      pictures: this.pictures,
      small_text: smallTextList[Math.floor(Math.random() * smallTextList.length)],
      url_gnavi: this.url_gnavi,
      url_hotpepper: Math.random() < 0.5 ? 'https://www.hotpepper.jp/strJ001155200/' : '',
      url_instagram: Math.random() < 0.5 ? 'https://www.instagram.com/miobar_hiroshima/' : '',
      url_official: Math.random() < 0.5 ? 'http://maplecity.jp/zona/' : '',
      url_tabelog: Math.random() < 0.5 ? 'https://tabelog.com/chiba/A1201/A120104/12020535/' : '',
      url_twitter: Math.random() < 0.5 ? 'https://twitter.com/usagihirosima' : '',
      food01_name: this.food01_name,
      food01_price: this.food01_price,
      food02_name: this.food02_name,
      food02_price: this.food02_price,
      food03_name: this.food03_name,
      food03_price: this.food03_price,
      food04_name: this.food04_name,
      food04_price: this.food04_price,
      food05_name: this.food05_name,
      food05_price: this.food05_price,
      drink01_name: this.drink01_name,
      drink01_price: this.drink01_price,
      drink02_name: this.drink02_name,
      drink02_price: this.drink02_price,
      drink03_name: this.drink03_name,
      drink03_price: this.drink03_price,
      coupon_oso_lunch_active: oso_lunch_is_active,
      coupon_haya_dinner_active: haya_dinner_is_active,
      coupon_oso_dinner_active: oso_dinner_is_active,
      favorite_counter: 0,
      create_time: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then((docRef) => {
          console.log("Document written with ID: ", createdID);
          articlesRef.doc(createdID).collection('coupons').doc('oso-lunch').set({
            active: oso_lunch_is_active,
            article_id: createdID,
            category: '遅ランチ',
            end: '16:30',
            start: '14:00',
            title: '店主自慢の日替り定食（なくなり次第終了となります）',
            information: '当日でも使えますが、予約をしていただけると嬉しいです！',
            rule: '席利用２時間まで',
            how_to_use: '予約時・来店時・注文時・会計時に掲示',
            discount_rate : 20,
            normal_price: 1080,
            image: couponImageList[Math.floor(Math.random() * couponImageList.length)],
          })
          articlesRef.doc(createdID).collection('coupons').doc('haya-dinner').set({
            active: haya_dinner_is_active,
            article_id: createdID,
            category: '早ディナー',
            end: '17:30',
            start: '18:00',
            title: '『主役へメッセージ入り特製デザート盛り合わせ』プレゼント♪',
            information: '当日でも使えますが、予約をしていただけると嬉しいです！',
            rule: '席利用２時間まで',
            how_to_use: '予約時・来店時・注文時・会計時に掲示',
            discount_rate : 100,
            normal_price: 1000,
            image: couponImageList[Math.floor(Math.random() * couponImageList.length)],
          })
          articlesRef.doc(createdID).collection('coupons').doc('oso-dinner').set({
            active: oso_dinner_is_active,
            article_id: createdID,
            category: '遅ディナー',
            end: '22:30',
            start: '21:00',
            title: 'おまかせドルチェ３種盛り!!１ドリンク付き★',
            information: '当日でも使えますが、予約をしていただけると嬉しいです！',
            rule: '席利用２時間まで',
            how_to_use: '予約時・来店時・注文時・会計時に掲示',
            discount_rate : 50,
            normal_price: 1080,
            image: couponImageList[Math.floor(Math.random() * couponImageList.length)],
          })
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });

    }
  },
  created: function () {
  }
};
</script>

<style lang="scss" scoped>

</style>
