<template>
  <v-row>
    <!-- 左側（絞り込み） -->
    <v-col cols="2">
      <CommonTableDetailSerchBox 
        :exeSearch="exeSearch"
        :columnDatas="commonTableData.columns"
      />
    </v-col>

    <!-- 右側（テーブルビュー） -->
    <v-col cols="10">
      <CommonTableDetailView 
        :columnDatas      = "commonTableData.columns"
        :searchTemplates  = "commonTableData.searchTemplates"
      />
    </v-col>
  </v-row>

  
</template>

<script setup lang="ts">
  import CommonTableDetailSerchBox from "./CommonTableDetailSerchBox/CommonTableDetailSerchBox.vue";
  import CommonTableDetailView from "./CommonTableDetailView/CommonTableDetailView.vue";

  import type {CommonTableInfo} from "../CommonTableType.ts";

  // 引数を取得
  const props = defineProps<{ 
    commonTableData: CommonTableInfo 
  }>();

  /**
   * 検索実行関数
   * - 絞り込みボックスから呼ばれるコールバック
   * - タブごとに用意された fnSearch に委譲（存在しない場合は何もしない）
   */
  const exeSearch = async (keywords: string[]): Promise<void> => {
    try {
      if (typeof props.commonTableData.fnSearch === "function") {
        const result = await props.commonTableData.fnSearch(keywords);
        // 必要ならここで結果を store / emit / ローカル state に反映
        // 例）emit で親へ渡す:
        // emit('searched', { key: props.CommonTableData.key, result });
      } else {
        // フォールバック：検索関数が未設定の場合
        console.warn("fnSearch is not provided for:", props.commonTableData.key, keywords);
      }
    } catch (e) {
      console.error("exeSearch error:", e);
      // 必要ならユーザー通知（Snackbarなど）/ エラーハンドリング
    }
  };


</script>

<style scoped>

</style>
