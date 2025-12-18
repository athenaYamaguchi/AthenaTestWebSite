<template>
  <span>CommonTableDetail</span>

  <CommonTableDetailSerchBox/>

  <CommonTableDetailView/>
  
</template>

<script>
import CommonTableDetailSerchBox from "./CommonTableDetailSerchBox/CommonTableDetailSerchBox.vue";
import CommonTableDetailView from "./CommonTableDetailView/CommonTableDetailView.vue";

export default {
  // 部品名
  name: 'CommonTableDetail',

  // 引数
  props: {
  },

  // コンポーネント
  components: { 
    CommonTableDetailSerchBox,
    CommonTableDetailView
  },

  // 内部変数
  data() {
    return {
      
    };
  },

  methods: {
    
  },

  mounted() {
    
  },
  
  beforeUnmount () {
    
  }
};
</script>

<style scoped>

</style>
