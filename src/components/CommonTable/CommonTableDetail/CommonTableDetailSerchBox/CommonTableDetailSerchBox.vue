
<template>
  <v-container>
    <span class="d-block mb-2">検索</span>

    <v-row 
      v-for="(columnData, index) in columnDatas"
        :key="columnData.columnName"
    >
      <v-col cols="12">
        <v-text-field
          :label="columnData.columnTitle"
          variant="outlined"
          density="compact"
          hide-details="auto"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn
          block
          class="btn-primary"
          @click="clickSerch()"
        >
          検索
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_import_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
import { onMounted} from 'vue'
import type {ColumnInfo} from "../../CommonTableType.ts";

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_import_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const props = defineProps<{
    columnDatas: ColumnInfo[] ,
    exeSearch: (serchWords: any[]) => Promise<void>,
}>()

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_Data_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_Data_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_EventEntry_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const emit = defineEmits<{
  // 検索ボタンクリック時
  (
    e: 'eventClickSerch', 
    serchWords: any[],
  ): void
}>();

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_EventEntry_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_Method_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
/**
 * 検索ボタンクリック時実行処理
 */
const clickSerch = async (
): Promise<void> => {
  try {
    let serchWords: any[];
    
    // 暫定
    serchWords = ["", ""];

    // 親へ入力情報を通知
    emit('eventClickSerch', serchWords);
  } 
  catch (e) {
    // エラー発生
    console.error('clickSerch error:', e)
  }
}

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
      

    } catch (err) {
      console.error('onMounted error：', err);
    }
  }
);

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_EventMethod_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
</script>
