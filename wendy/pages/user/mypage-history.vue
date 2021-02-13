<template>
  <div>
    <UserPageHeader/>
    <mypage-navigation/>
    <h2>利用履歴</h2>
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