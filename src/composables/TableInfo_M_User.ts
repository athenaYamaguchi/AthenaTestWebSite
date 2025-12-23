/**
 * テーブル情報 マスタ ユーザー情報
 */

import { ref } from 'vue'
import type { CommonTableInfo, SearchTemplateInfo, ColumnInfo } from '../components/CommonTable/CommonTableType';

// 項目情報
const columnData: ColumnInfo[] = [
  {
    columnTitle:    "ユーザーID",
    columnName:     "USER_ID",
    columnType:     0,
    viewFlg:        true,
    selectOptions:  ["aaa", "bbb"],
    isBulkEditable: true,
  },
  {
    columnTitle:    "氏",
    columnName:     "LAST_NAME",
    columnType:     0,
    viewFlg:        false,
    selectOptions:  ["ccc", "ddd"],
    isBulkEditable: true,
  },
  {
    columnTitle:    "名",
    columnName:     "FIRST_NAME",
    columnType:     0,
    viewFlg:        true,
    selectOptions:  ["eee", "fff"],
    isBulkEditable: false,
  },
  {
    columnTitle:    "氏(ふりがな)",
    columnName:     "LAST_NAME_KANA",
    columnType:     0,
    viewFlg:        false,
    selectOptions:  ["eee", "fff"],
    isBulkEditable: false,
  },
  {
    columnTitle:    "名(ふりがな)",
    columnName:     "FIRST_NAME_KANA",
    columnType:     0,
    viewFlg:        false,
    selectOptions:  ["eee", "fff"],
    isBulkEditable: false,
  },
  {
    columnTitle:    "利用開始日",
    columnName:     "START_DATE",
    columnType:     0,
    viewFlg:        false,
    selectOptions:  ["eee", "fff"],
    isBulkEditable: false,
  },
  {
    columnTitle:    "利用終了日",
    columnName:     "END_DATE",
    columnType:     0,
    viewFlg:        false,
    selectOptions:  ["eee", "fff"],
    isBulkEditable: false,
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

/**
 * 検索メソッド
 * @param keywords 
 */
const SearchTable = async (
  keywords: any[]
): Promise<any> => {
  // 戻り値を定義
  type Item = Record<string, unknown>;
  const items = ref<Item[]>([])

  try {
    // テーブルからデータを読み出し


    // 結果をセット


    return items;

  } catch (e) {
    console.error('fnSearch error:', e)
  }
}

export const tableInfoMUser: CommonTableInfo = { 
  key:      'one', 
  tabLabel: 'ユーザー情報',
  columns:  columnData,
  searchTemplates:  searchTemplateData,
};