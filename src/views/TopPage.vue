<template>
  <!-- 共通ヘッダを表示 -->
  <CommonHeader 
    :headerTitle=headerTitle
  />

  <div class="home-page-page">
    <h1>トップページ</h1>
    <p>ここがアプリの最初に表示されるページです。</p>

    <div class="welcome-box">
      <p>読んだデータは以下の通りです</p>

      <!-- 読み込んだデータを表示 -->
      <pre>{{ viewData }}</pre>

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
  name: "TopPage",
  // 変数
  data() {
    return {
      headerTitle: "トップページ",
      viewData: null,  // ← API の結果がここに入る
    };
  },

  // ★ APIを読みに行く
  async created() {
    try {
      const res = await fetch(`https://b22-function.azurewebsites.net/api/HttpTrigger`);
      if (!res.ok) {
        this.viewData = `API エラー（ステータス: ${res.status}）`
        throw new Error("API error");
      }

      // JSON へ変換
      const json = await res.json();

      // ★ Vue のデータ変数へ代入
      this.viewData = json;

    } catch (err) {
      console.error("API 読み込みエラー：", err);
    }
  },

  methods: {}
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
</style>

