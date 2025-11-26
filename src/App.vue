<template>
  <CommonHeader />
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div class="mt-2">テストだよ</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CommonHeader from './components/header.vue'

export default {
  name: 'App',
  components: {
    HelloWorld, 
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
  margin-top: 60px;
}
</style>
