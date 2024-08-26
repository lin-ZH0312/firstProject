<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!--渲染子路由-->
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'

let layOutSettingStore = useLayOutSettingStore()
//控制组件是否销毁重建
let flag = ref(true)
//监听刷新按钮数据
watch(
  () => layOutSettingStore.refsh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
