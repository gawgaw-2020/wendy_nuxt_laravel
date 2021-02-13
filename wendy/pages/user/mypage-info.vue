<template>
  <div>
    <UserPageHeader/>
    <MyPageNavigation/>
    <h2>WENDYからのお知らせ</h2>
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