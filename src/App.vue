<template>
  <div id="app">
    <CommonHeader :menu-items="menuItems" />
    <router-view />
  </div>
</template>

<script>
import CommonHeader from './components/CommonHeader.vue';

export default {
  components: { CommonHeader },
  data() {
    return {
      menuItems: [
        { icon: '🏠', key: 'TopPage',       label: 'トップページ',   route: '/' },
        { key: 'settings-page',  label: '設定',          route: '/settings-page' }
      ]
    };
  }
};
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
