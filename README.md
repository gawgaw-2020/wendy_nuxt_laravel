# WENDYメモ

nuxtプロジェクト新規作成  
SPAを選択

firebase関連パッケージのインストール  
```
npm install --save firebase@7.19.1
npm install --save vuexfire@3.0.1
```

環境変数の設定
```
npm install --save @nuxtjs/dotenv@1.3.0
```
.envに記述
```
FIREBASE_PROJECT_ID = 'project-name'
```
念の為、.gitignoreに.envの記述があるか確認

次に、 ``nuxt.config.js`` に.envを読み込む設定をする
```
modules: [
    '@nuxtjs/dotenv'
  ],
```

``plugin/firebase.js``を作成
```

import firebase from 'firebase'

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
```

そしてvuexfireのmutationsの機能を使いたいので、storeファイルにindex.jsを作成。
```
import { vuexfireMutations } from 'vuexfire'

export const mutations = {
  ...vuexfireMutations
}

```

lodashを使えるようにする
nuxt.config.jsに
```
const webpack = require('webpack')

（中略）

build: {
  plugins: [
    new webpack.ProvidePlugin({
      '_': 'lodash'
    })
  ]
}
```

momentを使えるようにする
```
npm install --save moment@2.24.0
```

ダークテーマ解除  
nuxt.config.jsにて  
darkをfalseに
```
light: {
  primary: colors.blue.darken2,
  accent: colors.grey.darken3,
  secondary: colors.amber.darken3,
  info: colors.teal.lighten1,
  warning: colors.amber.base,
  error: colors.deepOrange.accent4,
  success: colors.green.accent3
}
```
以下のテーマを追加

簡単なメモサンプルでデータが入ることが確認できたので、nuxt × firebaseで開発していく

TOPページ  
↓  
店舗一覧  
↓  
店舗詳細  
↓  
TOPページ流れだけ作成

nuxtとfirebaseが一番テンション上がる

最初はvuexfireインストールしたが、逆に分かりづらくなりそうだったので辞めた。

dispatchもやめて、map~に統一

vueとfirebaseのドキュメントが読みやすくてありがたい。

Components  
↓  
Actions ←→ firebase  
↓  
Mutations  
↓  
State ← Getters  
↓        ↑
Components

この流れをひたすら実感した１日だった  
当たり前だけどasyncDataとかcreatedやmountedのタイミングも考えないとダメ

寝るまでに時間があったので、  
``<nuxt-link :to="`/article/${article.id}`">``  
と  
``@click="$router.push('/')"``  
以上２つでページ遷移を作ってみた

sassを導入したかったので  
```npm install sass-loader node-sass --save-dev```

sass-loaderの最新バージョンがVuetifyと噛み合わず。  
```npm uninstall sass-loader --save-dev```  
```npm install sass-loader@10  --save-dev```  
ダウングレードした。

```
  "dependencies": {
    "@nuxtjs/axios": "^5.12.5",
    "@nuxtjs/dotenv": "^1.3.0",
    "core-js": "^3.8.2",
    "firebase": "^7.19.1",
    "lodash": "^4.17.20",
    "moment": "^2.24.0",
    "nuxt": "^2.14.12",
    "vuexfire": "^3.0.1"
  },
  "devDependencies": {
    "@nuxtjs/vuetify": "^1.11.3",
    "node-sass": "^5.0.0",
    "sass-loader": "^10.1.1"
  }
```

sassのテスト  
各ページのstyleタグにscoped属性をつけるとそのvueファイルだけに適用される  
ネストも成功

css設計したかったけど  
vuetifyがめっちゃ邪魔だしいらんかった。全部上書きされる!!

```npm uninstall @nuxtjs/vuetify```

読み込みなど全て削除

``assets/sass``の中にFLOCSSぽいの作っていく。  
vuetifyは管理画面で使おう。

vuetifyのタグを全て修正した。

component内で変数が使えない問題  
```npm install --save-dev @nuxtjs/style-resources```

```
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    sass: [
      // '@/assets/sass/variable.sass'
    ],
    scss: [
      '@/assets/scss/_mixin.scss'
    ],
    stylus: [
      // '@/assets/stylus/layout.styl'
    ]
  }
```