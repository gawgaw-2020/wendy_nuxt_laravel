<template>
  <h1 class="page-title">{{ pageTitle }}</h1>
</template>

<script>
export default {
  props: [
    'pageTitle'
  ]
}
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 2.4rem;
  font-weight: normal;
  border-bottom: 1px solid #707070;
}
</style>