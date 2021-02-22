//vuexfireのmutationsを利用するためにまずはインポートする
import { vuexfireMutations } from 'vuexfire'

//使うためにmutationsを定義して、その中でvuexfireMutationsを読み込んでexport→これで呼び出せるようになる
export const mutations = {
  ...vuexfireMutations
}

//このvuexfireMutationsはindex.jsにしか記載してはいけない。エラーになる。

// export const strict = false
