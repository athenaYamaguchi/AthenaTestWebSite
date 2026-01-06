
<template>
  <v-row style="margin-bottom: 6px;">
    <v-col
      cols="2"
      v-for="(searchTemplate, index) in searchTemplates"
      :key="searchTemplate.templateLabel"
    >
      <v-btn 
        block 
        class="btn-primary" 
        width="100" 
        @click="clickTemplate(searchTemplate)"
      >
        {{ searchTemplate.templateLabel }}
      </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-data-table
      class="my-table"
      :headers="headers"
      :items="items"
      item-key="code"
      v-model:selected="selected"
      show-select
      return-object
      items-per-page="5"
      hover
      fixed-header
      density="compact"
    >
      <!-- 行ごとの「編集」ボタン列 -->
      <template #item.actions="{ item }">
        <v-btn
          size="small"
          class="btn-edit"
          variant="outlined"
          @click="clickEdit(item)"
        >
          編集
        </v-btn>
      </template>
    </v-data-table>
  </v-row>

  <v-row justify="end" class="mx-0 my-1">
    <v-col cols="2">
      <v-btn 
        block 
        class="btn-danger"
        width="40" 
        @click="deleteSelected"
      >
        削除
      </v-btn>
    </v-col>

    <v-col cols="2">
      <v-btn 
        block 
        class="btn-primary"
        width="40" 
        @click="createNew"
      >
        新規追加
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_import_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
import { ref, onMounted} from 'vue'
import type { DataTableHeader } from 'vuetify'
import type { CommonTableInfo, ColumnInfo, SearchTemplateInfo } from '../../CommonTableType.ts'

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_import_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const props = defineProps<{
  commonTableData:  CommonTableInfo
  columnDatas:      ColumnInfo[]            // 項目情報
  searchTemplates:  SearchTemplateInfo[]    // 検索テンプレート情報
}>()

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_prop_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_Data_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
type Item = Record<string, unknown>;          // 表示データ型
const items = ref<Item[]>([])                 // 表示データ
const selected = ref<Item[]>([])              // 選択行
const headers: DataTableHeader<Item>[] = [];  // 表用ヘッダ情報

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_Data_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_EventEntry_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const emit = defineEmits<{
  // テンプレートクリック時
  (
    e: 'eventClickTemplate', 
    // payload: { id: number; name: string } サンプル
    searchTemplateInfo: SearchTemplateInfo,
  ): void

  // 編集ボタンクリック時
  (
    e: 'eventClickEdit',
    targetItem: Item,
  ): void

  // 削除ボタンクリック時
  (
    e: 'clickDelete', 
    value: string
  ): void

  // 新規追加ボタンクリック時
  (
    e: 'clickNewAdd', 
    err: unknown
  ): void
}>();

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_EventEntry_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/


// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_Method_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
/**
 * ヘッダ初期化処理
 */
const setupHeaders = () => {
  // カラムの情報からヘッダー情報を作成
  for (const col of props.columnDatas) {
    headers.push({
      title:      col.columnTitle,  // ColumnInfoの表示名
      value:      col.columnName,   // Rowのキーに対応
      sortable:   true,             // 固定でソート有り
      align:      'start',          
    });
  }

  // 編集ボタンは一律で追加
  headers.push({
    title: '編集',     
    value: 'actions',   
    sortable: false, 
    align: 'start' 
  });

  return;
}

/**
 * テンプレートボタンクリック時実行処理
 * @param keywords 
 */
const clickTemplate = async (
  searchTemplateInfo: SearchTemplateInfo
): Promise<void> => {
  try {
    // emit('eventClickTemplate', { id: keywords, name: 'Alice' }); // サンプル
    emit('eventClickTemplate', searchTemplateInfo);

    // 検索処理（略）
    if (props.commonTableData.fnSearch != null) {
      const result = await props.commonTableData.fnSearch([
        {},
      ]);

      items.value = Array.isArray(result) ? result : []
      console.log("できたよ")
    }
  } catch (e) {
    console.error('exeSearch error:', e)
  }
}

/**
 * 編集ボタンクリック時実行処理
 * @param item 
 */
const clickEdit = (item: Item) => {
  emit('eventClickEdit', item);

  return;
}

// 選択行の削除
const deleteSelected = () => {
  if (selected.value.length === 0) return
  const selectedCodes = new Set(selected.value.map(r => r.code))
  // for (let i = items.value.length - 1; i >= 0; i--) {
  //   if (selectedCodes.has(items.value[i].code)) {
  //     items.value.splice(i, 1)
  //   }
  // }
  // selected.value = []
}

const createNew = () => {
  // 新規作成処理（ダイアログ・遷移など）
}

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_Method_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

// #region    _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/STA_InitMethod_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
/**
 * 初回実行処理
 * 初回のみ実行するメソッドを本メソッドで実行する
 */
const initMethod = () => {
  setupHeaders(); // ヘッダ初期化処理

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
  // 非同期処理はsetup内で実施しないようにするため本処理で読み出しを実施
  async () => {
    try {
      // 関数ポインタが登録されていない場合はテストデータを表示
      if (props.commonTableData.fnSearch != null) {
        const result = await props.commonTableData.fnSearch([
          {},
        ]);

        items.value = Array.isArray(result) ? result : []
      }
      else {
        items.value = [
          { USER_ID: 'M001', LAST_NAME: 'マスタA',        updatedAt: '2025-12-01' },
          { code: 'M002', name: 'マスタB',        updatedAt: '2025-12-05' },
          { code: 'T987', name: 'トランザクションX', updatedAt: '2025-12-10' },
          { code: 'T988', name: 'トランザクションY', updatedAt: '2025-12-12' },
          { code: 'T989', name: 'トランザクションZ', updatedAt: '2025-12-14' },
          { code: 'M003', name: 'マスタC',        updatedAt: '2025-12-15' },
        ]
      }
    } catch (err) {
      console.error('API 読み込みエラー：', err);
    }
  }
);

// #endregion _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/END_EventMethod_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
</script>

<style scoped>
.my-table :deep(.v-data-table__td .v-data-table__td-content),
.my-table :deep(.v-data-table__th .v-data-table__th-content) {
  justify-content: flex-start !important;
  text-align: left !important;
}

/* ヘッダ全体の背景（thead）を上書き */
.my-table :deep(.v-data-table__thead) {
  background-color: #f5f5f5 !important;
}

/* 各ヘッダセルの背景と文字色 */
.my-table :deep(th.v-data-table__th) {
  background-color: #f5f5f5 !important;
  color: black !important;
}

/* fixed-header 時の sticky オーバーレイ（::before）も上書き */
.my-table :deep(th.v-data-table__th::before) {
  background-color: #f5f5f5 !important;
  /* 既存の影・ボーダーを消したい場合は以下も検討
  box-shadow: none !important;
  border: none !important;
  */
}

.my-table :deep(.v-data-table-column) {
  justify-content: flex-start !important;
  text-align: left !important;
}
.my-table :deep(th.v-data-table__th),
.my-table :deep(td.v-data-table__td) {
  text-align: left !important;
}

/* 編集ボタンスタイル */
.btn-edit  {
  background-color: #42b983; /* 基本色 */
  color: white;              /* テキスト色 */
  border: none;             /* 枠線なし */
  border-radius: 4px;       /* 角丸 */
  cursor: pointer;          /* カーソル */
  transition: background-color 0.3s ease;
}

/* 編集ボタン ホバー時の効果 */
.btn-edit :hover {
  background-color: #338d65 !important; /* 基本色より濃い緑 */
}

/* 編集ボタン 無効状態 */
.btn-edit :disabled {
  background-color: #e7f4ee !important; /* 基本色を薄くした色 */
  cursor: not-allowed !important;
  opacity: 0.7 !important; /* 無効感を出す */
}
</style>
``
