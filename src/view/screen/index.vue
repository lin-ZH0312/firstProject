<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <div class="left">
                    <Left />
                </div>
                <div class="center">
                    <Center />
                </div>
                <div class="right">
                    <right />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Top from './components/top/index.vue'
import Left from './components/left/index.vue'
import Right from './components/right/index.vue'
import Center from './components/center/index.vue'
import { onMounted, ref } from 'vue';
//获取数据大屏的dom元素
let screen = ref()

onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})


function getScale(w = 1980, h = 1080) {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh;
}

window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png);
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        // background-color: red;
        left: 50%;
        top: 50%;

        transform-origin: left top;

        .top {
            width: 100%;
            height: 40px;

        }

        .bottom {
            display: flex;

            .right {
                flex: 1;
                height: 1040px;
            }

            .left {
                flex: 1;
                height: 1040px;
            }

            .center {
                flex: 2;
            }
        }
    }


}
</style>