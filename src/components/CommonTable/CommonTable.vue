<template>
  <div>
    <!-- タブ部分 -->
    <v-tabs v-model="tab">
      <v-tab
        v-for="tabName in tabNames"
        :key="tabName"
        :value="tabName"
      >
        {{ tabName }}
      </v-tab>
    </v-tabs>

    <!-- タブの中身（動的コンポーネント） -->
    <v-window v-model="tab">
      <v-window-item
        v-for="tabName in tabNames"
        :key="tabName"
        :value="tabName"
      >
        <component :is="tabs[tabName]"></component>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from "vue";
import CommonTableDetail from "./CommonTableDetail/CommonTableDetail.vue";

// 引数としてタブ名を受け取る（例: ["one", "two", "three"]）
const props = defineProps<{ tabNames: string[] }>();

// 現在選択中のタブ
const tab = ref(props.tabNames[0]);

// タブごとのコンポーネントを動的に生成
const tabs: Record<string, any> = {};
props.tabNames.forEach(name => {
  tabs[name] = markRaw(CommonTableDetail); // 必要に応じて別コンポーネントに差し替え可能
});
</script>

<style scoped>
</style>
