<template>
    <div class="logo">
      <div :class="['logo1',ib?'active':'']">
        <img src="../assets/shell logo.png" alt="">
      </div>
      <div class="logo2">
        <img src="../assets/logo.png" alt="">
      </div>
    </div>
</template>
<script>
export default {
  props: ["ib"]
};
</script>
<style lang="scss" scoped>
.logo2 {
  position: fixed;
  right: 0.7rem;
  top: 0.4rem;
  width: 1.24rem;
  z-index: 100001;
  img {
    display: block;
    width: 100%;
  }
}
.logo1 {
  position: fixed;
  left: 0;
  top: 0.4rem;
  width: 1.4rem;
  z-index: 100001;
  &.active {
    img {
      border: 1px solid #fed700;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>
