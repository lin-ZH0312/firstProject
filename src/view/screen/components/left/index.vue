<template>
    <div class="left-container">
        <Tourist class="tourist" />
        <SexView class="sex" />
        <AgeView class="age" />
    </div>
</template>

<script setup lang="ts">
import AgeView from './component/AgeViem.vue'
import SexView from './component/SexView.vue'
import Tourist from './component/TouristView.vue'



</script>

<style scoped lang="scss">
.left-container {
    height: 100%;
    display: flex;
    flex-direction: column;


    .tourist {
        flex: 1.5;
        background: url(../../images/dataScreen-main-lb.png) no-repeat;
        background-size: 100% 100%;
        margin: 2.5%;
    }

    .sex {
        flex: 1;
        background: url(../../images/dataScreen-main-lb.png) no-repeat;
        background-size: 100% 100%;
        margin: 2.5%;
    }

    .age {
        flex: 1;
        background: url(../../images/dataScreen-main-lb.png) no-repeat;
        background-size: 100% 100%;
        margin: 2.5%;
    }


}
</style>