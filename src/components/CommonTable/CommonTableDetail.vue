<template>
  <v-row>
    <!-- 左側（絞り込み） -->
    <v-col cols="3">
      <CommonTableDetailSerchBox 
        :columnDatas="commonTableData.columns"
        :inputData="inputData"
        @eventClickSerch="exeSearch"
      />
    </v-col>

    <!-- 右側（テーブルビュー） -->
    <v-col cols="9">
      <CommonTableDetailView 
        :commonTableData    = "commonTableData"
        :columnDatas        = "commonTableData.columns"
        :searchTemplates    = "commonTableData.searchTemplates"
        :tableItems         = "items"
        @eventClickTemplate = "exeSetTemplate"
      />
    </v-col>
  </v-row>
  
</template>

<script setup lang="ts">
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_import_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
import CommonTableDetailSerchBox from "./CommonTableDetailSerchBox.vue";
import CommonTableDetailView from "./CommonTableDetailView.vue";
import { ref, onMounted, reactive} from 'vue'
import {COLTYPE, type CommonTableInfo, type SearchTemplateInfo} from "../../composables/CommonTableType.ts";

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_import_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const props = defineProps<{ 
  commonTableData: CommonTableInfo 
}>();

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_Data_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
type Item = Record<string, unknown>;                        // 表示データ型

const inputData = reactive<Record<string, any | null>>({}); // 入力エリア
const items = ref<Item[]>([])                               // 表示データ

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
  keywords: Record<string, any | null>
): Promise<void> => {
  try {
    if (props.commonTableData.fnSearch !== undefined) {
      // 未定義ではない

      // コールバック関数を実行
      const result = await props.commonTableData.fnSearch(keywords);
      // 結果を反映
      items.value = Array.isArray(result) ? result : []
    }
    console.log("DB成功")
    
  } catch (err) {
    console.error("exeSearch error:", err);
    console.log("DB失敗")
    // 必要ならユーザー通知（Snackbarなど）/ エラーハンドリング
  }
};

/**
 * テンプレートセット時実行処理
 * @param searchTemplateInfo 
 */
const exeSetTemplate = async (
  searchTemplateInfo: SearchTemplateInfo
): Promise<void> => {
  try {
    // セットされたテンプレートの検索ワードを検索のエリアに配置し、検索を実行する
    for (const columnData of props.commonTableData.columns) {
      if ((columnData.columnType === COLTYPE.FREESTRINGUM) ||
          (columnData.columnType === COLTYPE.NUM) ||
          (columnData.columnType === COLTYPE.SELECTLIST)) {
        // 自由入力 or 数値 or 選択式

        // そのままセット
        inputData[columnData.columnName] = searchTemplateInfo.searchWords[columnData.columnName];
      }
      else if (columnData.columnType === COLTYPE.DATE) {
        // 日付

        // 日付を分けてセット
        const setDatas: string[] = searchTemplateInfo.searchWords[columnData.columnName].split(",");
        if (setDatas.length >= 2) {
          inputData["STA_" + columnData.columnName] = setDatas[0];
          inputData["END_" + columnData.columnName] = setDatas[1];
        }
        
      }
      columnData.columnName
    }
    console.log(`${searchTemplateInfo}`)
    
  } catch (err) {
    // エラー発生

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
