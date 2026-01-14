/**
 * テーブル情報 マスタ 取引先会社情報
 */
import type { CommonTableInfo, Item} from './CommonTableType';
import { commonSearchTable} from './CommonTableType';
import { columnData, searchTemplateData} from './TableInfo_M_CustomerCompany';

/**
 * 検索メソッド
 * @param searchWords 
 */
export const searchTable = async (
  searchWords: Record<string, any | null>
): Promise<Item[]> => {
  try {
    const items = commonSearchTable(searchWords, `${import.meta.env.VITE_AZURE_FUNC_URL}M_CustomerCompany`, columnData);

    return items;

  } catch (e) {
    console.error('fnSearch error:', e);
    // throw e;
    return []; // 失敗時は空配列が扱いやすい
  }
};

export const tableInfoMUser: CommonTableInfo = { 
  key:              '取引先会社情報', 
  tabLabel:         '取引先会社情報',
  columns:          columnData,
  searchTemplates:  searchTemplateData,
  fnSearch:         searchTable,
};