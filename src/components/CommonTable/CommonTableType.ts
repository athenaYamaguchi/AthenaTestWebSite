/**
 * 項目情報
 */
export type ColumnInfo = {
  columnTitle:    string;           // 項目名(表示用)
  columnName:     string;           // 項目名
  columnType:     number;           // 項目種別
  viewFlg:        boolean;          // 項目表示フラグ
  selectOptions:  any[];            // 選択肢
  isBulkEditable: boolean;          // 一括編集可能フラグ
};

/**
 * 検索テンプレート情報
 */
export type SearchTemplateInfo = {
  templateLabel:  string;           // テンプレートラベル
  searchWords:    any[];            // 検索情報
};

/**
 * 共通テーブル情報
 */
export type CommonTableInfo = {
  key:              string;                 // 内部キー
  tabLabel:         string;                 // タブ表示文字列
  columns:          ColumnInfo[];           // 項目情報
  searchTemplates:  SearchTemplateInfo[];   // 検索テンプレート情報
  fnSearch?: (serchWords: any[]) 
    => Promise<any>;                        // 検索メソッド
  fnUpdate?: (baseDatas: any[], newDatas: any[]) 
    => Promise<any>;                        // 編集メソッド
  fnInsert?: (newDatas: any[]) 
    => Promise<any>;                        // 新規登録メソッド
  fnDelete?: (targetDatas: any[]) 
    => Promise<any>;                        // 削除メソッド
};
