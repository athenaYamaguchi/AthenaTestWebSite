
<template>
  <v-container>
    <span class="d-block mb-2">検索</span>

    <v-row
      v-for="(columnData, index) in columnDatas"
        :key="columnData.columnName"
    >
      <!--自由入力-->
      <v-col class="pa-2" v-if="columnData.columnType===COLTYPE.FREESTRINGUM" cols="12">
        <v-text-field
          v-model="inputData[columnData.columnName]"
          :label="columnData.columnTitle"
          variant="outlined"
          density="compact"
          hide-details="auto"
          clearable
        ></v-text-field>
      </v-col>  

      <!--数値入力-->
      <v-col class="pa-2" v-else-if="columnData.columnType===COLTYPE.NUM" cols="12">
        <v-text-field
          v-model="inputData[columnData.columnName]"
          type="number"
          :label="columnData.columnTitle"
          variant="outlined"
          density="compact"
          hide-details="auto"
          clearable
        ></v-text-field>
      </v-col>

      <!--選択入力-->
      <v-col class="pa-2" v-else-if="columnData.columnType===COLTYPE.SELECTLIST" cols="12">
        <v-combobox
          v-model="inputData[columnData.columnName]"
          :label="columnData.columnTitle"
          :items="columnData.selectOptions"
          multiple
          variant="outlined"
          density="compact"
          hide-details="auto"
          clearable
        ></v-combobox>
      </v-col>

      <!--日付入力(開始)-->
      <v-col class="pa-2" v-else-if="columnData.columnType===COLTYPE.DATE" cols="6">
        <v-text-field
          v-model="inputData['STA_' + columnData.columnName]"
          :label="columnData.columnTitle"
          type="date"
          variant="outlined"
          density="compact"
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <!--日付入力(終了)-->
      <v-col class="pa-2" v-if="columnData.columnType===COLTYPE.DATE" cols="6">
        <v-text-field
          v-model="inputData['END_' + columnData.columnName]"
          :label="columnData.columnTitle"
          type="date"
          variant="outlined"
          density="compact"
          hide-details="auto"
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
import { reactive, onMounted} from 'vue'
import type {ColumnInfo} from "../../../../composables/CommonTableType.ts";
import { COLTYPE} from '../../../../composables/CommonTableType.ts';

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_import_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const props = defineProps<{
    columnDatas: ColumnInfo[]
}>()

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_Data_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const inputData = reactive<Record<string, any | null>>({}); // 入力エリア

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_Data_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_EventEntry_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const emit = defineEmits<{
  // 検索ボタンクリック時
  (
    e: 'eventClickSerch', 
    serchWords: Record<string, any | null>,
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
    // 親へ入力情報を通知
    emit('eventClickSerch', inputData);
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
  // 項目情報の数分だけ検索項目のエリアを準備する
  for (const col of props.columnDatas) {
    // まだ登録していない場合は追加するため判定
    if (!(col.columnName in inputData)) {
      // まだ登録していない

      // 種別によって初期値を変更する
      if (col.columnType === COLTYPE.DATE) {
        // 日付

        // 開始と終了を用意し、初期値をそれぞれ最小と最大をセットする
        inputData['STA_' + col.columnName] = "0001-01-01";
        inputData['END_' + col.columnName] = "9999-12-31";
      }
      else {
        // その他 (nullをセット)
        inputData[col.columnName] = null;
      }
    }
  }

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

<style scoped>

</style>

