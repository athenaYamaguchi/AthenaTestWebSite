<template>
  <!-- 共通ヘッダを表示 -->
  <CommonHeader :headerTitle="headerTitle" />

  <!-- タブ名を props で渡す -->
  <CommonTable :CommonTableData="CommonTableData" />

  <div class="home-page-page">
    <p>ここがアプリの最初に表示されるページです。</p>

    <div class="welcome-box">
      <p>読んだデータは以下の通りです</p>

      <!-- 読み込んだデータを表示 -->
      <pre>{{ viewData }}</pre>

      <router-link to="/settings-page">設定ページへ</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CommonHeader from '../components/CommonHeader.vue';
import CommonTable from '../components/CommonTable/CommonTable.vue';

import type { CommonTableInfo, SearchTemplateInfo, ColumnInfo } from '../components/CommonTable/CommonTableType';

// props はないので不要
// コンポーネント登録は <script setup> では import するだけで OK

// headerTitle
const headerTitle = ref("トップページ");

// tabNames
const ColumnData: ColumnInfo[] = [
  {
    columnName:     "項目1",
    columnType:     0,
    viewFlg:        true,
    selectOptions:  ["aaa", "bbb"],
    isBulkEditable: true,
  },
  {
    columnName:     "項目2",
    columnType:     0,
    viewFlg:        false,
    selectOptions:  ["ccc", "ddd"],
    isBulkEditable: true,
  },
  {
    columnName:     "項目3",
    columnType:     0,
    viewFlg:        true,
    selectOptions:  ["eee", "fff"],
    isBulkEditable: false,
  },
];

const SearchTemplateData: SearchTemplateInfo[] = [
  {
    templateLabel:  "テンプレート1",
    searchWords:    ["aaaa", "bbbb", "cccc"],
  },
]

const CommonTableData: CommonTableInfo[] = [
  { 
    key:      'one', 
    tabLabel: 'タブ1',
    columns:  ColumnData,
    searchTemplates:  SearchTemplateData,
  },
  { 
    key:      'two', 
    tabLabel: 'タブ2',
    columns:  ColumnData,
    searchTemplates:  SearchTemplateData,
  },
];

// API の結果を格納
const viewData = ref<unknown>(null);

// API 呼び出し
onMounted(
  async () => {
    try {
      // 以下コメント解除して実際の API 呼び出しに利用
      const res = await fetch(`https://b22-function.azurewebsites.net/api/HttpTrigger`);
      if (!res.ok) {
        viewData.value = `API エラー（ステータス: ${res.status}）`;
        throw new Error("API error");
      }
      const json = await res.json();
      viewData.value = json;
    } catch (err) {
      console.error("API 読み込みエラー：", err);
    }
  }
);

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
