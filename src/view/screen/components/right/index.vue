<template>
    <div class="left-container">
        <Scene class="scene" />
        <Tourist class="tourist" />
        <Order class="order" />
    </div>
</template>

<script setup lang="ts">
import Scene from './components/SceneView.vue'

import Tourist from './components/TouristContrastView.vue'
import Order from './components/OrderView.vue'


</script>

<style scoped lang="scss">
.left-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .scene {
        flex: 1;
        background: url(../../images/dataScreen-main-lb.png) no-repeat;
        background-size: 100% 100%;
        margin: 2.5%;
    }

    .tourist {
        flex: 1;
        background: url(../../images/dataScreen-main-lb.png) no-repeat;
        background-size: 100% 100%;
        margin: 2.5%;
    }


    .order {
        flex: 1.5;
        background: url(../../images/dataScreen-main-lb.png) no-repeat;
        background-size: 100% 100%;
        margin: 2.5%;
    }


}
</style>