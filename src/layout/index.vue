<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="LayOutSettingStore.fold ? true : false"
          :default-active="$router.path"
          background-color="#001529"
          text-color="white"
          acitve-text-color="yellowgreen"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from 'vue-router'
//引入logo组件
import Logo from './logo/index.vue'
//引入菜单
import Menu from './menu/index.vue'
//引入内容区
import Main from './main/index.vue'
//引入顶部导航栏
import Tabbar from './tabbar/index.vue'

//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
let userStore = useUserStore()
//获取Layout配置仓库
let LayOutSettingStore = useLayOutSettingStore()
//获取路由对象
let $router = useRoute()
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabbar-height);

      .el-menu {
        border-right: none;
        color: white;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    background-color: white;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    background-color: white;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
