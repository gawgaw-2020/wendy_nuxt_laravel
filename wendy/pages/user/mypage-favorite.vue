<template>
  <div>
    <UserPageHeader/>
    <MyPageNavigation/>
    <h2>お気に入り店舗</h2>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
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