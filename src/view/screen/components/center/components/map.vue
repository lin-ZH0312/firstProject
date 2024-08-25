<template>
    <div class="box" ref="map">
        ditu
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import chinaJSON from './china.json'

let map = ref()
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
    let mychart = echarts.init(map.value)
    mychart.setOption({
        geo: {
            map: 'china',//中国地图
            roam: true,//是否开启缩放效果
            left: 180,//地图位置
            top: 150,
            right: 180,
            bottom: 0,
            zoom: 1.2,//放大
            label: {
                show: true,//显示文字
                color: 'white',
                fontSize: 10,//字体大小
            },

            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [//渐变色
                        {
                            offset: 0,
                            color: 'red',
                        },
                        {
                            offset: 1,
                            color: 'blue',
                        },
                    ],
                    global: false,
                },
                opacity: 0.8,
            },
            emphasis: {//地图高亮效果
                itemStyle: {
                    color: 'red',
                },
                label: {
                    fontSize: 40,
                },
            },
        },
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        },
        series: [//航线
            {
                type: 'lines',
                data: [//数据
                    {
                        coords: [
                            [116.405285, 39.904989],//起点
                            [119.306239, 26.075302],//终点
                        ],
                        lineStyle: {
                            color: 'orange',
                            width: 5,
                        },
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [114.298572, 30.584355],
                        ],
                        lineStyle: {
                            color: 'yellow',
                            width: 5,
                        },
                    },
                ],
                effect: {//箭头特效
                    show: true,
                    symbol: 'arrow',
                    color: 'black',
                    symbolSize: 10,
                },
            },
        ],
    })
})

onMounted(() => {

})
</script>

<style scoped></style>