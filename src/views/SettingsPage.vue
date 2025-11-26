<template>
  <div class="home-page">
    <h1>ここは設定ページだよ！</h1>
    <p>ここがアプリの2に表示されるページです。</p>

    <div class="welcome-box">
      <p>Vue Router で別ページに移動できます。</p>
      <router-link to="/about">概要ページへ</router-link>
      <br />
      <router-link to="/settings">設定ページへ</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsPage"
};
</script>

<style scoped>
.home-page {
  padding: 20px;
}

h1 {
  color: #42b983;
  margin-bottom: 16px;
}

.welcome-box {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9f9f9;
}

router-link {
  color: #42b983;
  text-decoration: underline;
  cursor: pointer;
}
</style>
