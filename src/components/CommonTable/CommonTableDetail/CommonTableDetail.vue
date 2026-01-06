<template>
  <v-row>
    <!-- 左側（絞り込み） -->
    <v-col cols="2">
      <CommonTableDetailSerchBox 
        :columnDatas="commonTableData.columns"
        @eventClickSerch="exeSearch"
      />
    </v-col>

    <!-- 右側（テーブルビュー） -->
    <v-col cols="10">
      <CommonTableDetailView 
        :commonTableData  = "commonTableData"
        :columnDatas      = "commonTableData.columns"
        :searchTemplates  = "commonTableData.searchTemplates"
        :tableItems       = "items"
      />
    </v-col>
  </v-row>

  
</template>

<script setup lang="ts">
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_import_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
import CommonTableDetailSerchBox from "./CommonTableDetailSerchBox/CommonTableDetailSerchBox.vue";
import CommonTableDetailView from "./CommonTableDetailView/CommonTableDetailView.vue";
import { ref, onMounted} from 'vue'
import type {CommonTableInfo} from "../CommonTableType.ts";

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_import_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const props = defineProps<{ 
  commonTableData: CommonTableInfo 
}>();

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_Data_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
type Item = Record<string, unknown>;          // 表示データ型
const items = ref<Item[]>([])                 // 表示データ

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_Data_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_EventEntry_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const emit = defineEmits<{
}>();

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_EventEntry_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_Method_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
/**
 * 検索実行関数
 * - 絞り込みボックスから呼ばれるコールバック
 * - タブごとに用意された fnSearch に委譲（存在しない場合は何もしない）
 */
const exeSearch = async (
  keywords: string[]
): Promise<void> => {
  try {
    if (props.commonTableData.fnSearch !== undefined) {
      const result = await props.commonTableData.fnSearch([
        {},
      ]);

      items.value = Array.isArray(result) ? result : []
    }
    console.log("DB成功")
    
  } catch (err) {
    items.value = [
      { USER_ID: 'M001', LAST_NAME: 'マスタA',        updatedAt: '2025-12-01' },
      { code: 'M002', name: 'マスタB',        updatedAt: '2025-12-05' },
      { code: 'T987', name: 'トランザクションX', updatedAt: '2025-12-10' },
      { code: 'T988', name: 'トランザクションY', updatedAt: '2025-12-12' },
      { code: 'T989', name: 'トランザクションZ', updatedAt: '2025-12-14' },
      { code: 'M003', name: 'マスタC',        updatedAt: '2025-12-15' },
    ]
    console.error("exeSearch error:", err);
    console.log("DB失敗")
    // 必要ならユーザー通知（Snackbarなど）/ エラーハンドリング
  }
};

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_Method_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_InitMethod_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
/**
 * 初回実行処理
 * 初回のみ実行するメソッドを本メソッドで実行する
 */
const initMethod = () => {

  return;
}

// 初回処理を実施
initMethod();

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_InitMethod_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_EventMethod_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
/**
 * 表示後処理
 */
onMounted(
  async () => {
    try {
      // exeSearch([""]);
    } catch (err) {
      console.error('API 読み込みエラー：', err);
    }
  }
);

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_EventMethod_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
</script>

<style scoped>

</style>
