<template>
  <div class="box">
    <p class="title">年龄比例</p>
    <p class="bg"></p>
    <p class="total">总数：{{ total }}</p>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
//获取节点
let chart = ref()
//获取总数
let total = ref<number>(0)
//图标数据
let data = reactive([
  { value: 1048, name: '18-30岁' },
  { value: 735, name: '30-40岁' },
  { value: 580, name: '10-18岁' },
  { value: 484, name: '60岁以上' },
  { value: 300, name: '10岁以下' },
])

onMounted(() => {
  let myCharts = echarts.init(chart.value)
  data.forEach((item) => {
    total.value += item.value
  })
  myCharts.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      right: 30,
      top: 90,
      orient: 'vertical', //列表方向
      formatter: function (name: string) {
        //百分比
        let p = ''
        data.forEach((item) => {
          if (name == item.name) {
            p = ((item.value / total.value) * 100).toFixed(2)
          }
        })
        return `${name}\t${p}%`
      },
      textStyle: {
        //列表文字
        color: 'white',
        fontSize: 15,
      },
    },
    series: [
      {
        name: '本日总数',
        type: 'pie',
        radius: ['40%', '80%'],
        right: 150,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderWidth: 20,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
          fontSize: 14,
          formatter: '{d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            formatter: '{b} {d}%',
          },
        },
        labelLine: {
          show: true,
        },
        data: data,
      },
    ],

    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  .title {
    color: white;
    font-size: 25px;
    margin-left: 20px;
  }

  .bg {
    width: 80px;
    height: 10px;
    margin-left: 20px;
    margin-top: 5px;
    background: url(../../../images/dataScreen-title.png) no-repeat;
    background-size: 100% 100%;
  }

  .right {
    float: right;
    margin-right: 20px;
    color: white;
    font-size: 20px;
    margin-bottom: 2.5%;
  }

  .total {
    float: right;
    margin-right: 50px;
    margin-top: 20px;
    color: white;
    font-size: 20px;
  }

  .chart {
    height: 90%;
  }
}
</style>
