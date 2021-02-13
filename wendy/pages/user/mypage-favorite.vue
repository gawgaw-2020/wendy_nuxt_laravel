<template>
  <div>
    <UserPageHeader/>
    <MypageNavigation/>
    <h2>お気に入りした<span>店舗</span>一覧</h2>
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

<style lang="scss" scoped>
  h2 {
    color: red;
    span {
      color: blue;
    }
  }
</style>