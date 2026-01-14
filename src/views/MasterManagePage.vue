<template>
  <!-- 共通ヘッダを表示 -->
  <CommonHeader
    :headerTitle="headerTitle" 
  />

  <!-- テーブルの情報を表示 -->
  <CommonTable
    :CommonTableData="commonTableData" 
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CommonHeader from '../components/CommonHeader.vue';
import CommonTable from '../components/CommonTable/CommonTable.vue';
import {tableInfoMUser} from '../composables/TableCtrl_M_User.ts';

import type { CommonTableInfo, SearchTemplateInfo, ColumnInfo } from '../composables/CommonTableType.ts';

// ヘッダタイトル
const headerTitle = ref("マスタ管理");

// 項目情報
const columnData2: ColumnInfo[] = [
  {
    columnTitle:    "項目4",
    columnName:     "項目4",
    columnType:     0,
    viewFlg:        true,
    selectOptions:  ["ccc", "ddd"],
    isBulkEditable: true,
  },
  {
    columnTitle:    "項目5",
    columnName:     "項目5",
    columnType:     0,
    viewFlg:        false,
    selectOptions:  ["eee", "fff"],
    isBulkEditable: true,
  },
];

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
  tableInfoMUser,
  { 
    key:      'two', 
    tabLabel: 'タブ2',
    columns:  columnData2,
    searchTemplates:  searchTemplateData2,
  },
];

// API の結果を格納
const viewData = ref<unknown>(null);

// API 呼び出し
onMounted(
  async () => {
    try {
      // // 以下コメント解除して実際の API 呼び出しに利用
      // const res = await fetch(`${import.meta.env.VITE_AZURE_FUNC_URL}HttpTrigger`);
      // if (!res.ok) {
      //   viewData.value = `API エラー（ステータス: ${res.status}）`;
      //   throw new Error("API error");
      // }
      // const json = await res.json();
      // viewData.value = json;
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
