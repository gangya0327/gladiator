<template>
  <div>
    <div>{{msg}}</div>
    <ul>
      <li v-for="f in features" :key="f">{{f}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Hello extends Vue {
  @Prop({ required: true }) public msg!: string;

  // data中的值
  public features = ["类型注解", "bbbla"];
}
</script>

<style scoped>
</style>
