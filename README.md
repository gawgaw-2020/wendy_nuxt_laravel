# WENDY

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