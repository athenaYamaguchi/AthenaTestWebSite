/**
 * テーブル情報 マスタ 取引先会社情報
 */
import type { CommonTableInfo, SearchTemplateInfo, ColumnInfo} from './CommonTableType';
import { COLTYPE} from './CommonTableType';

// テーブル用の型
type Item = Record<string, unknown>;

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
const columnData: ColumnInfo[] = [
  COL_COMPANY_ID,
  COL_COMPANY_NAME,
  COL_SALES_REPRESENTATIVE_ID,
  COL_SE_REPRESENTATIVE_ID,
  COL_REPORT_FLG,
  COL_IS_ACTIVE
];

const searchTemplateData: SearchTemplateInfo[] = [
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
]

/**
 * 検索メソッド
 * @param searchWords 
 */
export const searchTable = async (
  searchWords: Record<string, any | null>
): Promise<Item[]> => {
  try {
    const payload = {
      userName: "山口",
      searchWords: searchWords,
    };
    
    // envからパスを取得し、サーバーへ問い合わせる
    const res = await fetch(`${import.meta.env.VITE_AZURE_FUNC_URL}getM_Users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      let detail: any = text;
      try { detail = JSON.parse(text); } catch {}
      // const msg = typeof detail === "string" ? detail : detail?.message ?? "";
      // throw new Error(`API error: ${res.status} ${msg}`);
      return [];
    }

    const ansJson = await res.json();

    // 防御的チェック：items が配列か
    const rows: any[] = Array.isArray(ansJson?.items) ? ansJson.items : [];
    if (!rows.length) {
      // レスポンスが想定外の場合は空配列で返す
      console.warn('fnSearch: items is empty or not an array.', ansJson);
      return [];
    }

    // 列定義に従って詰める（動的キー）
    const items: Item[] = rows.map((row) =>
      Object.fromEntries(
        columnData.map((col) => [col.columnName, row[col.columnName]])
      )
    );

    return items;

  } catch (e) {
    console.error('fnSearch error:', e);
    // throw e;
    return []; // 失敗時は空配列が扱いやすい
  }
};


// ヘルパー：任意の入力（日付文字列、Date、UNIX秒/ミリ秒）を「YYYY/MM/DD」に
function toDateTextJa(value: string | number | Date | null | undefined | unknown): string {
  if (value == null || value === '') return '';

  // 型ごとの正規化
  let d: Date;
  if (value instanceof Date) {
    d = value;
  } else if (typeof value === 'string') {
    // 文字列（ISOなど）→ Date
    d = new Date(value);
  } else if (typeof value === 'number') {
    // 数値：UNIX「秒」の可能性があるため、桁で判定
    d = value > 1e12 ? new Date(value) : new Date(value * 1000);
  } else {
    return '';
  }

  if (isNaN(d.getTime())) return '';

  // 日本の表記で「年月日」だけ
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // 必要なら timeZone を固定: timeZone: 'Asia/Tokyo'
  }).format(d);
}


export const tableInfoMUser: CommonTableInfo = { 
  key:              'one', 
  tabLabel:         'ユーザー情報',
  columns:          columnData,
  searchTemplates:  searchTemplateData,
  fnSearch:         searchTable,
};