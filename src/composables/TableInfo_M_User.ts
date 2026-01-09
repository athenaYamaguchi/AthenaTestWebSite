/**
 * テーブル情報 マスタ ユーザー情報
 */
import type { CommonTableInfo, SearchTemplateInfo, ColumnInfo} from './CommonTableType';
import { COLTYPE} from './CommonTableType';

// テーブル用の型
type Item = Record<string, unknown>;

// 実体をセット
const COL_USER_ID: ColumnInfo = {
  columnTitle:    "ユーザーID",           
  columnName:     "USER_ID",              
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_LAST_NAME: ColumnInfo = {
  columnTitle:    "氏",                   
  columnName:     "LAST_NAME",            
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_FIRST_NAME: ColumnInfo = {
  columnTitle:    "名",                   
  columnName:     "FIRST_NAME",           
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_LAST_NAME_KANA: ColumnInfo = {
  columnTitle:    "氏(ふりがな)",         
  columnName:     "LAST_NAME_KANA",       
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_FIRST_NAME_KANA: ColumnInfo = {
  columnTitle:    "名(ふりがな)",         
  columnName:     "FIRST_NAME_KANA",      
  columnType:     COLTYPE.FREESTRINGUM,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_START_DATE: ColumnInfo = {
  columnTitle:    "利用開始日",         
  columnName:     "START_DATE",      
  columnType:     COLTYPE.DATE,   
  viewFlg:        true,                   
  isBulkEditable: true,                   
}
const COL_END_DATE: ColumnInfo = {
  columnTitle:    "利用終了日",         
  columnName:     "END_DATE",      
  columnType:     COLTYPE.DATE,   
  viewFlg:        true,                   
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

    // 日付データは文字列に変換する
    for (const item of items) {
      const staDate = item[COL_START_DATE.columnName];
      const endDate = item[COL_END_DATE.columnName];

      item[COL_START_DATE.columnName] = toDateTextJa(staDate);
      item[COL_END_DATE.columnName]   = toDateTextJa(endDate);

    }

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