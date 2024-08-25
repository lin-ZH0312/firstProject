<!-- 商品分类 -->
<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select :disabled="scene == 0 ? false : true" style="width: 200px;" v-model="categoryStore.c1Id"
                    @change="handler">
                    <el-option v-for="(c1) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
                        :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select :disabled="scene == 0 ? false : true" style="width: 200px;" v-model="categoryStore.c2Id"
                    @change="handler1">
                    <el-option v-for="(c2) in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
                        :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select :disabled="scene == 0 ? false : true" style="width: 200px;" v-model="categoryStore.c3Id">
                    <el-option v-for="(c3) in categoryStore.c3Arr" :key="c3.id" :label="c3.name"
                        :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>

</template>
1
<script setup lang="ts">
//引入组件挂载完毕方法
import { onMounted } from 'vue';
//引入分类相关仓库
import useCategoryStore from '@/store/modules/category';

let categoryStore = useCategoryStore();
//分类全局主角挂载完毕，通知仓库发送一份分类数据
onMounted(() => {
    getC1();
})
//通知仓库获取一级分类方法
const getC1 = () => {
    //调用仓库方法
    categoryStore.getC1();
}

//一级下拉菜单的值改变的change事件
const handler = () => {
    //需要将二级、三级分类的数据清空
    categoryStore.c2Id = '';
    categoryStore.c3Arr = [];
    categoryStore.c3Id = '';
    //通知仓库获取二级分类数组
    categoryStore.getC2();
}

//二级下拉菜单的值改变的change事件
const handler1 = () => {
    //清理三级分类的数据
    categoryStore.c3Id = '';
    //通知仓库获取三级分类数组
    categoryStore.getC3();
}

//接受父组件传递数据
defineProps(['scene']);

</script>

<style scoped></style>