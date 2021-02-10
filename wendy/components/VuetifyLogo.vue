<template>
  <div>
    <p>component test</p>
  </div>
</template>

<style lang="scss" scoped>
  p {
    font-size: 2.4rem;
    color: gold;
    @include mq() {
      color: blue;
    }
  }
</style>
