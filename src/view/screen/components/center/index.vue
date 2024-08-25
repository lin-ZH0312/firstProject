<template>
    <div class="center-container">
        <Map class="map" />
        <Line class="line" />
    </div>
</template>

<script setup lang="ts">
import Map from './components/map.vue'
import Line from './components/line.vue'

</script>

<style scoped lang="scss">
.center-container {
    height: 100%;
    display: flex;
    flex-direction: column;


    .map {
        flex: 3;
        // background-color: red;
    }

    .line {
        flex: 1;
        background: url(../../images/dataScreen-main-lb.png) no-repeat;
        background-size: 100% 100%;

    }
}
</style>