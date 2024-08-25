<template>

    <el-button type="primary" icon="Refresh" size="small" circle @click="updateRefsh"></el-button>
    <el-button type="primary" icon="FullScreen" size="small" circle @click="fullScreen"></el-button>


    <el-popover placement="bottom" title="主题设置" :width="150" trigger="hover">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker @change="changeColor" v-model="color" show-alpha :predefine="predefineColors"
                    :teleported="false" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" active-icon="Sunrise" inactive-icon="MoonNight" size="small"
                    v-model="dark" class="mt-2" style="margin-left: 24px" inline-prompt />
            </el-form-item>
        </el-form>


        <template #reference>
            <el-button type="primary" icon="Setting" size="small" circle placement="bottom"></el-button>
        </template>
    </el-popover>





    <img :src='userStore.avatar' style="height: 24px;width: 24px; margin: 0px 10px; border-radius: 50%;">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon>
                <arrow-down></arrow-down>
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>

    </el-dropdown>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import useLayOutSettingStore from '@/store/modules/setting';
import { ref } from 'vue';

let layOutSettingStore = useLayOutSettingStore();

let userStore = useUserStore();

let $router = useRouter();
let $route = useRoute();

let dark = ref<boolean>(false)

//刷新按钮
const updateRefsh = () => {
    layOutSettingStore.refsh = !layOutSettingStore.refsh;
}
//全屏
const fullScreen = () => {
    //判断是否全屏
    let full = document.fullscreenElement;
    //切换全屏方法
    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

const logout = async () => {
    await userStore.userLogout();
    $router.push({ path: '/login', query: { redirect: $route.path } })
}



const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

const changeDark = () => {
    let html = document.documentElement;
    //判断html便签是否有类名
    dark.value ? html.className = 'dark' : html.className = ''
}

const changeColor = () => {
    let html = document.documentElement;
    html.style.setProperty('--el-color-primary', color.value)

}

</script>

<script lang="ts">
export default {
    name: "setting",
}
</script>


<style scoped lang="scss"></style>