<template>
  <div>
    <UserPageHeader/>
    <MyPageNavigation/>
    <h2>利用履歴</h2>
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