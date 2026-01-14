/**
 * テーブル情報 マスタ 取引先会社情報
 */
import type { CommonTableInfo, SearchTemplateInfo, ColumnInfo, Item} from './CommonTableType';
import { COLTYPE} from './CommonTableType';

// 実体をセット
const COL_COMPANY_ID: ColumnInfo = {
  columnTitle:    "会社ID",           
  columnName:     "company_id",              
  columnType:     COLTYPE.NUM,   
  viewFlg:        false,                   
  isBulkEditable: true,                   
}
const COL_COMPANY_NAME: ColumnInfo = {
  columnTitle:    "会社名",                   
  columnName:     "company_name",            
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_SALES_REPRESENTATIVE_ID: ColumnInfo = {
  columnTitle:    "営業担当者ID",                   
  columnName:     "sales_representative_id",           
  columnType:     COLTYPE.NUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_SE_REPRESENTATIVE_ID: ColumnInfo = {
  columnTitle:    "SE担当者ID",         
  columnName:     "se_representative_id",       
  columnType:     COLTYPE.NUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_REPORT_FLG: ColumnInfo = {
  columnTitle:    "訪問履歴報告対象フラグ",         
  columnName:     "report_flg",      
  columnType:     COLTYPE.SELECTLIST,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_IS_ACTIVE: ColumnInfo = {
  columnTitle:    "有効フラグ",         
  columnName:     "is_active",      
  columnType:     COLTYPE.SELECTLIST,   
  viewFlg:        false,                   
  isBulkEditable: true,                   
}

// 項目情報
export const columnData: ColumnInfo[] = [
  COL_COMPANY_ID,
  COL_COMPANY_NAME,
  COL_SALES_REPRESENTATIVE_ID,
  COL_SE_REPRESENTATIVE_ID,
  COL_REPORT_FLG,
  COL_IS_ACTIVE
];

export const searchTemplateData: SearchTemplateInfo[] = [
  {
    templateLabel:  "営業担当",
    searchWords:    {
      [COL_COMPANY_ID.columnName]:"", 
      [COL_COMPANY_NAME.columnName]:"", 
      [COL_SALES_REPRESENTATIVE_ID.columnName]:"", 
      [COL_SE_REPRESENTATIVE_ID.columnName]:"", 
      [COL_REPORT_FLG.columnName]:"", 
      [COL_IS_ACTIVE.columnName]:"", 
    },
  },
  {
    templateLabel:  "SE担当",
    searchWords:    {
      [COL_COMPANY_ID.columnName]:"", 
      [COL_COMPANY_NAME.columnName]:"", 
      [COL_SALES_REPRESENTATIVE_ID.columnName]:"", 
      [COL_SE_REPRESENTATIVE_ID.columnName]:"", 
      [COL_REPORT_FLG.columnName]:"", 
      [COL_IS_ACTIVE.columnName]:"", 
    },
  },
  {
    templateLabel:  "訪問履歴報告",
    searchWords:    {
      [COL_COMPANY_ID.columnName]:"", 
      [COL_COMPANY_NAME.columnName]:"", 
      [COL_SALES_REPRESENTATIVE_ID.columnName]:"", 
      [COL_SE_REPRESENTATIVE_ID.columnName]:"", 
      [COL_REPORT_FLG.columnName]:"", 
      [COL_IS_ACTIVE.columnName]:"", 
    },
  },
]; 
