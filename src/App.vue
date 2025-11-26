<template>
  <CommonHeader />
  <img alt="Vue logo" src="./assets/logo.png">
  
  <div class="mt-2">テスト</div>
</template>

<script>
import CommonHeader from './components/header.vue'

export default {
  name: 'App',
  components: {
    CommonHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
