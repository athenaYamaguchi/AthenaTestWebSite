/**
 * テーブル情報 マスタ ユーザー情報
 */
import type { SearchTemplateInfo, ColumnInfo} from './CommonTableType';
import { COLTYPE} from './CommonTableType';

// 実体をセット
export const COL_USER_ID: ColumnInfo = {
  columnTitle:    "ユーザーID",           
  columnName:     "USER_ID",              
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
export const COL_LAST_NAME: ColumnInfo = {
  columnTitle:    "氏",                   
  columnName:     "LAST_NAME",            
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
export const COL_FIRST_NAME: ColumnInfo = {
  columnTitle:    "名",                   
  columnName:     "FIRST_NAME",           
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
export const COL_LAST_NAME_KANA: ColumnInfo = {
  columnTitle:    "氏(ふりがな)",         
  columnName:     "LAST_NAME_KANA",       
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
export const COL_FIRST_NAME_KANA: ColumnInfo = {
  columnTitle:    "名(ふりがな)",         
  columnName:     "FIRST_NAME_KANA",      
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
export const COL_START_DATE: ColumnInfo = {
  columnTitle:    "利用開始日",         
  columnName:     "START_DATE",      
  columnType:     COLTYPE.DATE,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
export const COL_END_DATE: ColumnInfo = {
  columnTitle:    "利用終了日",         
  columnName:     "END_DATE",      
  columnType:     COLTYPE.DATE,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}

// 項目情報
export const columnData: ColumnInfo[] = [
  COL_USER_ID,
  COL_LAST_NAME,
  COL_FIRST_NAME,
  COL_LAST_NAME_KANA,
  COL_FIRST_NAME_KANA,
  COL_START_DATE,
  COL_END_DATE,
];

export const searchTemplateData: SearchTemplateInfo[] = [
  {
    templateLabel:  "テンプレート1",
    searchWords:    {
      [COL_USER_ID.columnName]:"t-yamaguchi", 
      [COL_LAST_NAME.columnName]:"山口", 
      [COL_FIRST_NAME.columnName]:"達也", 
      [COL_LAST_NAME_KANA.columnName]:"yamaguchi", 
      [COL_FIRST_NAME_KANA.columnName]:"tatsuya", 
      [COL_START_DATE.columnName]:"1994-01-01,9999-12-31", 
      [COL_END_DATE.columnName]:"9999-12-31,9999-12-31", 
    },
  },
  {
    templateLabel:  "テンプレート2",
    searchWords:    {
      [COL_USER_ID.columnName]:"t-hirose", 
      [COL_LAST_NAME.columnName]:"", 
      [COL_FIRST_NAME.columnName]:"", 
      [COL_LAST_NAME_KANA.columnName]:"", 
      [COL_FIRST_NAME_KANA.columnName]:"", 
      [COL_START_DATE.columnName]:"", 
      [COL_END_DATE.columnName]:"", 
    },
  },
  {
    templateLabel:  "テンプレート3",
    searchWords:    {
      [COL_USER_ID.columnName]:"t-yamaguchi", 
      [COL_LAST_NAME.columnName]:"山口", 
      [COL_FIRST_NAME.columnName]:"達也", 
      [COL_LAST_NAME_KANA.columnName]:"yamaguchi", 
      [COL_FIRST_NAME_KANA.columnName]:"tatsuya", 
      [COL_START_DATE.columnName]:"1994-01-01,9999-12-31", 
      [COL_END_DATE.columnName]:"9999-12-31,9999-12-31", 
    },
  },
];
