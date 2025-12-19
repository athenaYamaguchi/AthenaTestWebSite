<template>
    
</template>

<script setup lang="ts">
  import type {CommonTableInfo} from "../CommonTableType.ts";

  // 引数を取得
  const props = defineProps<{ 
    CommonTableData: CommonTableInfo 
  }>();

  /**
   * 検索実行関数
   * - 絞り込みボックスから呼ばれるコールバック
   * - タブごとに用意された fnSearch に委譲（存在しない場合は何もしない）
   */
  const exeSearch = async (keywords: string[]): Promise<void> => {
    try {
      if (typeof props.CommonTableData.fnSearch === "function") {
        const result = await props.CommonTableData.fnSearch(keywords);
        // 必要ならここで結果を store / emit / ローカル state に反映
        // 例）emit で親へ渡す:
        // emit('searched', { key: props.CommonTableData.key, result });
      } else {
        // フォールバック：検索関数が未設定の場合
        console.warn("fnSearch is not provided for:", props.CommonTableData.key, keywords);
      }
    } catch (e) {
      console.error("exeSearch error:", e);
      // 必要ならユーザー通知（Snackbarなど）/ エラーハンドリング
    }
  };


</script>

<style scoped>

</style>
