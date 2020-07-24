<template>
  <div>
    <div>{{msg}}</div>
    <input type="text" placeholder="输入新特性" @keyup.enter="addFeature" />
    <ul>
      <li v-for="f in features" :key="f">{{f}}</li>
      <li>{{count}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

// 接口中只需定义结构，不需要初始化
interface Feature {
  id: number;
  name: string;
  version: string;
}

@Component
export default class Hello extends Vue {
  @Prop({ required: true }) public msg!: string;

  // data中的值
  private features = ["类型注解", "bbbla"];

  private addFeature(event: any) {
    this.features.push(event.target.value);
    event.target.value = "";
  }

  // 生命周期
  private created() {
    setTimeout(() => {
      this.features.push("1231");
    }, 1000);
  }

  get count() {
    return this.features.length;
  }
}
</script>

<style scoped>
</style>
