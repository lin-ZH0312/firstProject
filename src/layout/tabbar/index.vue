<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'

</script>

<script lang="ts">
export default {
    name: "Tabbar",
}
</script>



<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // background-image: linear-gradient(to right, rgb(251, 241, 241), rgb(239, 226, 226), rgb(251, 241, 241));
    border-bottom: 1px solid #beb0b0;
    padding-bottom: 5px;

    /* 为了美观，可以添加一些下内边距 */
    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;

    }

    .tabbar_right {
        display: flex;
        height: 100%;
        align-items: center;
    }

}
</style>