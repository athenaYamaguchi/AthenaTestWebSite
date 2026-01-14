<template>
  <!-- 共通ヘッダを表示 -->
  <CommonHeader :headerTitle="headerTitle" />

  <!-- タブ名を props で渡す -->
  <CommonTable :CommonTableData="commonTableData" />

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

import type { CommonTableInfo, SearchTemplateInfo, ColumnInfo } from '../composables/CommonTableType';

// headerTitle
const headerTitle = ref("トップページ");

// tabNames
const columnData: ColumnInfo[] = [
  {
    columnTitle:    "項目名1",
    columnName:     "項目1",
    columnType:     0,
    viewFlg:        true,
    selectOptions:  ["aaa", "bbb"],
    isBulkEditable: true,
  },
  {
    columnTitle:    "項目名2",
    columnName:     "項目2",
    columnType:     0,
    viewFlg:        false,
    selectOptions:  ["ccc", "ddd"],
    isBulkEditable: true,
  },
  {
    columnTitle:    "項目名3",
    columnName:     "項目3",
    columnType:     0,
    viewFlg:        true,
    selectOptions:  ["eee", "fff"],
    isBulkEditable: false,
  },
];

const columnData2: ColumnInfo[] = [
  {
    columnTitle:    "項目名4",
    columnName:     "項目4",
    columnType:     0,
    viewFlg:        true,
    selectOptions:  ["ccc", "ddd"],
    isBulkEditable: true,
  },
  {
    columnTitle:    "項目名5",
    columnName:     "項目5",
    columnType:     0,
    viewFlg:        false,
    selectOptions:  ["eee", "fff"],
    isBulkEditable: true,
  },
];

const searchTemplateData: SearchTemplateInfo[] = [
  {
    templateLabel:  "テンプレート1",
    searchWords:    ["aaaa", "bbbb", "cccc"],
  },
  {
    templateLabel:  "テンプレート2",
    searchWords:    ["dddd", "eeee", "ffff"],
  },
  {
    templateLabel:  "テンプレート3",
    searchWords:    ["gggg", "hhhh", "ffff"],
  },
]

const searchTemplateData2: SearchTemplateInfo[] = [
  {
    templateLabel:  "テンプレート4",
    searchWords:    ["aaaa", "bbbb", "cccc"],
  },
  {
    templateLabel:  "テンプレート5",
    searchWords:    ["dddd", "eeee", "ffff"],
  },
]

const commonTableData: CommonTableInfo[] = [
  { 
    key:      'one', 
    tabLabel: 'タブ1',
    columns:  columnData,
    searchTemplates:  searchTemplateData,
  },
  { 
    key:      'two', 
    tabLabel: 'タブ2',
    columns:  columnData2,
    searchTemplates:  searchTemplateData2,
  },
];

// API の結果を格納
const viewData = ref<unknown>(null);

  

// ログインユーザー情報・API結果
type ClientPrincipal = {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
  // claims は direct-access(/.auth/me)のみ。API側ヘッダーには含まれない点に注意
  claims?: Array<{ typ: string; val: string }>;
} | null;

const user = ref<ClientPrincipal>(null);

// 1) ログイン者情報を取得して state に保持
async function loadUser() {
  const res = await fetch('/.auth/me', { credentials: 'include' });
  const payload = await res.json(); // { clientPrincipal } or { clientPrincipal: null }
  user.value = payload?.clientPrincipal ?? null;
}

// API 呼び出し
onMounted(
  async () => {
    await loadUser();      // 一度だけ呼ぶ

    try {
      const payload = {
        name: '山口',
        options: { mode: 'fast', retry: 1 }
      };

      const res = await fetch(`${import.meta.env.VITE_AZURE_FUNC_URL}getM_Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const json = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      viewData.value = json;
    } catch (err) {
      console.error('API 読み込みエラー：', err);
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
