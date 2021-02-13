<template>
  <div>
    <UserPageHeader/>
    <MypageNavigation/>
    <h2>お気に入り店舗</h2>
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

</style>