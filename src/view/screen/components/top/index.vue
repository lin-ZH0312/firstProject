<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="gohome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">数据统计</span>
      <span class="time">当前时间：{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

let $router = useRouter()
const gohome = () => {
  $router.push('/home')
}

// 定义一个响应式变量来存储当前时间
const currentTime = ref('')

// 定义一个方法来获取当前时间
function getCurrentTime() {
  currentTime.value = new Date().toLocaleString()
}

// 在组件挂载后获取当前时间
onMounted(() => {
  getCurrentTime()

  // 设置一个定时器每秒更新时间
  const intervalId = setInterval(getCurrentTime, 1000)

  // 在组件卸载时清除定时器
  onUnmounted(() => {
    clearInterval(intervalId)
  })
})
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: white;
      line-height: 40px;
      font-size: 20px;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 75px;
      color: white;
      font-size: 30px;
    }
  }

  .right {
    flex: 1;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .rbtn {
      width: 150px;
      height: 40px;
      float: left;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      color: white;
      line-height: 40px;
      font-size: 20px;
    }

    .time {
      height: 40px;
      color: white;
      margin-right: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
    }
  }
}
</style>
