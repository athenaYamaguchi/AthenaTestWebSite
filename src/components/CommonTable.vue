<template>
  <div>
    <!-- タブ部分 -->
    <v-tabs v-model="tab">
      <v-tab value="one">タブ1</v-tab>
      <v-tab value="two">タブ2</v-tab>
    </v-tabs>

    <!-- タブの中身（動的コンポーネント） -->
    <v-window v-model="tab">
      <v-window-item value="one">
        <component :is="currentComponent"></component>
      </v-window-item>

      <v-window-item value="two">
        <component :is="currentComponent"></component>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import TabOne from "./TabOne.vue";
import TabTwo from "./TabTwo.vue";

export default {
  name: 'CommonTable',

  data() {
    return {
      tab: "one",
      tabs: {
        one: TabOne,
        two: TabTwo,
      }
    };
  },

  computed: {
    currentComponent() {
      return this.tabs[this.tab];
    }
  }
};
</script>

<style scoped>
</style>
