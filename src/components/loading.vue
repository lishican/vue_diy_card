<template>
  <div class="loading" v-show="isLoading.show">
    <div class="inner">
      {{isLoading.text}}
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        isLoading: 'isLoading'
      })
    }
  };
</script>
<style lang="scss" scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100000000;
    background: rgba(0, 0, 0, .67);
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      width: 2rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      font-size: 0.24rem;
      border-radius: .12rem;
      box-shadow: .2rem .2rem .4rem rgba(0, 0, 0, .37);
    }
  }
</style>
