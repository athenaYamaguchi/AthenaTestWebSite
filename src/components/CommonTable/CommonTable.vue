
<template>
  <div>
    <!-- タブ部分 -->
    <v-tabs v-model="tab">
      <v-tab
        v-for="item in CommonTableData"
        :key="item.key"
        :value="item.key"
      >
        {{ item.tabLabel }}
      </v-tab>
    </v-tabs>

    <!-- タブの中身（動的コンポーネント） -->
    <v-window v-model="tab">
      <v-window-item
        v-for="item in CommonTableData"
        :key="item.key"
        :value="item.key"
      >
        <component 
          :is="tabs[item.key]" 
          :CommonTableData="item"
        />
      </v-window-item>
    </v-window>
  </div>
</template>


<script setup lang="ts">
  import { ref, markRaw } from "vue";
  import CommonTableDetail from "./CommonTableDetail/CommonTableDetail.vue";

  import type {CommonTableInfo} from "./CommonTableType.ts";
  
  const props = defineProps<{ CommonTableData: CommonTableInfo[] }>();

  const tab = ref(props.CommonTableData[0]?.key ?? "");

  const tabs: Record<string, any> = {};
  props.CommonTableData.forEach(item => {
    tabs[item.key] = markRaw(CommonTableDetail);
  });


</script>

<style scoped>
</style>
