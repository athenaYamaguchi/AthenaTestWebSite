<template>
  <!-- 共通ヘッダを表示 -->
  <CommonHeader 
    :headerTitle=headerTitle
  />

  <div class="home-page-page">
    <h1>ここは設定ページだよ！</h1>
    <p>ここがアプリの2に表示されるページです。</p>

    <div class="welcome-box">
      <p>Vue Router で別ページに移動できます。</p>
      <router-link to="/settings-page">設定ページへ</router-link>
    </div>
  </div>
</template>

<script>

/**
 * 画面のインポート
 */

// 共通ヘッダ
import CommonHeader from '../components/CommonHeader.vue';

export default {
  // 共通ヘッダ
  components: { CommonHeader },
  // ページ名
  name: "settings-page",
  // 変数
  data() {
    return {
      headerTitle: "設定"
    }
  }
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
