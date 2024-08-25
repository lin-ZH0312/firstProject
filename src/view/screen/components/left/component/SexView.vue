<template>
    <div class="box">
        <p class="title">男女比例</p>
        <p class="bg"></p>
        <div class="avatar">
            <div class="man">
                <p>男士</p>
                <img src="../../../images/man.png" alt="" />
            </div>
            <div class="woman">
                <p>女士</p>
                <img src="../../../images/woman.png" alt="" />
            </div>
        </div>
        <div class="bottom">
            <div class="rate">
                <p>男士{{ manRate }}%</p>
                <p>女士{{ womanRate }}%</p>
            </div>
            <div class="chart" ref="chart"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';


let manRate = ref<number>(55)
let womanRate = ref<number>(100 - manRate.value)
import * as echarts from 'echarts'

//获取节点
let chart = ref()
onMounted(() => {
    let myCharts = echarts.init(chart.value)
    myCharts.setOption({
        title: {
            left: '40%',
        },
        xAxis: {
            show: false,
            min: 0,
            max: 100,
        },
        yAxis: {
            show: false,
            type: 'category',
        },
        series: [
            {
                type: 'bar',
                data: [manRate.value],
                barWidth: 20,
                z: 100,
                itemStyle: {
                    color: '#007AFE',
                    borderRadius: 20,
                },
            },
            {
                type: 'bar',
                data: [100],
                barWidth: 20,
                barGap: '-100%',
                itemStyle: {
                    color: '#FF4B7A',
                    borderRadius: 20,
                },
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
    width: 95%;

    .title {
        color: white;
        margin-left: 20px;
        font-size: 25px;
    }

    .bg {
        width: 80px;
        height: 10px;
        margin-left: 20px;
        margin-top: 5px;
        background: url(../../../images/dataScreen-title.png) no-repeat;
        background-size: 100% 100%;
    }

    .avatar {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        color: white;
        font-size: 20px;

        .man {
            height: 115px;
            width: 115px;
            margin-right: 100px;
            background: url(../../../images/man-bg.png) no-repeat;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .woman {
            height: 115px;
            width: 115px;
            background: url(../../../images/woman-bg.png) no-repeat;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        img {
            height: 70px;
            width: 70px;
            margin-top: 10px;
        }
    }

    .bottom {
        width: 100%;
        // background-color: red;

        .rate {
            color: white;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        p {
            padding-top: 5px;
            margin: 0 80px;
        }

        .chart {
            width: 70%;
            height: 25px;
            margin-left: 15%;

        }
    }


}
</style>