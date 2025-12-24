/**
 * テーブル情報 マスタ ユーザー情報
 */

import { ref } from 'vue'
import type { CommonTableInfo, SearchTemplateInfo, ColumnInfo} from '../components/CommonTable/CommonTableType';
import { COLTYPE} from '../components/CommonTable/CommonTableType';

// 項目名
type COL_INFO = {
  columnTitle:    string,       // 項目タイトル (テーブル表示項目名)
  columnName:     string,       // 内部ID
  columnType:     number,       // 種別
  viewFlg:        boolean,      // 表示設定フラグ
  selectOptions:  string[],     // 選択肢 (種別によっては不要)
  isBulkEditable: boolean,      // 編集可能フラグ
}
const COL_USER_ID: COL_INFO = {
  columnTitle:    "ユーザーID",           
  columnName:     "USER_ID",              
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  selectOptions:  [],                     
  isBulkEditable: true,                   
}
const COL_LAST_NAME: COL_INFO = {
  columnTitle:    "氏",                   
  columnName:     "LAST_NAME",            
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  selectOptions:  [],                     
  isBulkEditable: true,                   
}
const COL_FIRST_NAME: COL_INFO = {
  columnTitle:    "名",                   
  columnName:     "FIRST_NAME",           
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  selectOptions:  [],                     
  isBulkEditable: true,                   
}
const COL_LAST_NAME_KANA: COL_INFO = {
  columnTitle:    "氏(ふりがな)",         
  columnName:     "LAST_NAME_KANA",       
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  selectOptions:  [],                     
  isBulkEditable: true,                   
}
const COL_FIRST_NAME_KANA: COL_INFO = {
  columnTitle:    "名(ふりがな)",         
  columnName:     "FIRST_NAME_KANA",      
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  selectOptions:  [],                     
  isBulkEditable: true,                   
}
const COL_START_DATE: COL_INFO = {
  columnTitle:    "利用開始日",         
  columnName:     "START_DATE",      
  columnType:     COLTYPE.DATE,   
  viewFlg:        true,                   
  selectOptions:  [],                     
  isBulkEditable: true,                   
}
const COL_END_DATE: COL_INFO = {
  columnTitle:    "利用終了日",         
  columnName:     "END_DATE",      
  columnType:     COLTYPE.DATE,   
  viewFlg:        true,                   
  selectOptions:  [],                     
  isBulkEditable: true,                   
}

// 項目情報
const columnData: ColumnInfo[] = [
  COL_USER_ID,
  COL_LAST_NAME,
  COL_FIRST_NAME,
  COL_LAST_NAME_KANA,
  COL_FIRST_NAME_KANA,
  COL_START_DATE,
  COL_END_DATE,
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
    const payload = {
      name: '山口',
      options: { mode: 'fast', retry: 1 }
    };

    const res = await fetch('https://b22-function.azurewebsites.net/api/getM_Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // 失敗
      throw new Error(`API error: ${res.status}`);
    }
    else {
      // 成功

      // 結果を取得
      const ansJson = await res.json();
      // データ分だけ戻り値を作成する
      for (const item of ansJson.items) {
        items.value.push({
          [COL_USER_ID.columnName]:         item[COL_USER_ID.columnName],
          [COL_LAST_NAME.columnName]:       item[COL_LAST_NAME.columnName],
          [COL_FIRST_NAME.columnName]:      item[COL_FIRST_NAME.columnName],
          [COL_LAST_NAME_KANA.columnName]:  item[COL_LAST_NAME_KANA.columnName],
          [COL_FIRST_NAME_KANA.columnName]: item[COL_FIRST_NAME_KANA.columnName],
          [COL_START_DATE.columnName]:      item[COL_START_DATE.columnName],
          [COL_END_DATE.columnName]:        item[COL_END_DATE.columnName],
        });
      }
    }

    // 結果をセット
    return items;

  } catch (e) {
    console.error('fnSearch error:', e)
  }
}

export const tableInfoMUser: CommonTableInfo = { 
  key:              'one', 
  tabLabel:         'ユーザー情報',
  columns:          columnData,
  searchTemplates:  searchTemplateData,
  fnSearch:         SearchTable,
};