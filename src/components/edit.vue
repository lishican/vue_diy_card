<template>
  <div>
    <div class="animated fadeInUp infinite downa" v-show='currentIndex<3'>
      <img src="../assets/down.png" alt="">
    </div>
    <div v-if='!isFromShare'>


        <div class="tips">上传该骑行路线的相关风景照</div>

      <div :class="['preview',isHavaEdit?'two':'']" v-if="!isEdit">
        <div class="btn" @click="$emit('showEdit2')" v-fib="{type:'编辑页',name:'立即制作'}"  >{{isHavaEdit?'进入编辑':'立即制作'}}</div>
        <div class="btn" @click="$emit('doShare')" v-if='isHavaEdit'>{{btnName}}</div>
      </div>
      <input type="file" accept="image/*" class="file" :id='id' @change="$emit('handleFileUpload',$event)">
      <div class="edit_tool" v-if="isEdit">
        <div class="btn" @click="$emit('saveEdit')" v-fib="{type:'编辑页',name:'保存编辑'}">保存编辑</div>
        <div class="btn" @click="$emit('choseMusic')" v-fib="{type:'编辑页',name:'选择音乐'}">选择音乐</div>
        <!-- <div class="btn">预览</div> -->
      </div>
    </div>
    <div v-if="isFromShare">
      <Menu :isMe='isMe' :rid="rid" />
    </div>
  </div>
</template>


<script>
import Menu from "./menu";

export default {
  props: [
    "currentIndex",
    "isFromShare",
    "id",
    "isMe",
    "isHavaEdit",
    "isEdit",
    "btnName",
    "rid"
  ],
  components: {
    Menu
  }
};
</script>
<style lang="scss" scoped>
</style>
