
<template>
  <v-container>
    <span class="d-block mb-2">検索</span>

    <v-row 
      v-for="(columnData, index) in columnDatas"
        :key="columnData.columnName"
    >
      <v-col cols="12">
        <v-text-field
          :label="columnData.columnTitle"
          variant="outlined"
          density="compact"
          hide-details="auto"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn
          block
          class="btn-primary"
          @click="exeSearch([])"
        >
          検索
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">

  import type {ColumnInfo} from "../../CommonTableType.ts";

  // 引数を取得
  const props = defineProps<{ 
    columnDatas: ColumnInfo[] ,
    exeSearch: (serchWords: any[]) 
      => Promise<void>;
  }>();
  
</script>
