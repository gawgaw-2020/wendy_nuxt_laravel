<template>
  <div>
    <UserPageHeader/>
    <MypageNavigation/>
    <h2>メール・パスワードの再設定</h2>
  </div>
</template>

<script>
import MypageNavigation from '~/components/MypageNavigation.vue'
import UserPageHeader from '~/components/UserPageHeader.vue'
export default {
  components: { 
    MypageNavigation,
    UserPageHeader
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