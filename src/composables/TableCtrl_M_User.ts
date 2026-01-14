/**
 * テーブル情報 マスタ ユーザー情報
 */
import type { CommonTableInfo, Item} from './CommonTableType';
import { commonSearchTable} from './CommonTableType';
import { columnData, COL_START_DATE, COL_END_DATE, searchTemplateData} from './TableInfo_M_User';

/**
 * 検索メソッド
 * @param searchWords 
 */
export const searchTable = async (
  searchWords: Record<string, any | null>
): Promise<Item[]> => {
  try {
    // 共通の検索メソッドを利用
    const items = await commonSearchTable(searchWords, `${import.meta.env.VITE_AZURE_FUNC_URL}getM_Users`, columnData);

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
  key:              'ユーザー情報', 
  tabLabel:         'ユーザー情報',
  columns:          columnData,
  searchTemplates:  searchTemplateData,
  fnSearch:         searchTable,
};