<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-class="ArrowRight">
    <!-- 面包屑动态展示路由 -->
    <el-breadcrumb-item
      v-for="(item, index) in $router.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>

      <span style="margin: 0px, 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import useLayOutSettingStore from '@/store/modules/setting'
//获取layout配置相关仓库
let LayOutSettingStore = useLayOutSettingStore()
//获取路由对象
let $router = useRoute()
//点击图标的方法
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'BreadCrumb',
}
</script>

<style scoped lang="scss"></style>
