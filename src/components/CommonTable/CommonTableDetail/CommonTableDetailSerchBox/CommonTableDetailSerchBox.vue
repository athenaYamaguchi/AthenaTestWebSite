
<template>
  <v-container>
    <span class="d-block mb-2">検索</span>

    <v-row 
      class="pa-0 ma-0"
      style="margin-bottom: 6px;"
      v-for="(columnData, index) in columnDatas"
        :key="columnData.columnName"
    >
      <v-col cols="12">
        <v-text-field
          :label="columnData.columnName"
          variant="outlined"
          density="compact"
          hide-details="auto"
          class="mb-1"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">

  import type {ColumnInfo} from "../../CommonTableType.ts";

  // 引数を取得
  const props = defineProps<{ 
    columnDatas: ColumnInfo[] ,
    exeSearch?: (serchWords: any[]) 
      => Promise<void>;
  }>();
  
</script>
