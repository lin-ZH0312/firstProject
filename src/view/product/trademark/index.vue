<template>
    <div>
        <el-card class="box-card">
            <!-- 添加按钮 -->
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark"
                v-has="`btn.Trademark.add`">添加品牌</el-button>
            <!-- 表格 -->
            <el-table style="margin:10px 0px" border :data="trademarkArr">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <el-table-column label="品牌名称" align="center">
                    <template #="{ row }">
                        <pre style="color: blueviolet;">{{ row.tmName }}</pre>
                    </template>
                </el-table-column>
                <el-table-column label="品牌LOGO" align="center">
                    <template #="{ row }">
                        <img :src="row.logoUrl" alt="未有图片 " width="50px" height="50px">
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" align="center">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"
                            v-has="`btn.Trademark.update`"></el-button>
                        <el-popconfirm title="是否删除已有品牌吗？" @confirm="removetradeMark(row.id)">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete" width="250px"
                                    v-has="`btn.Trademark.remove`"></el-button>
                            </template>
                        </el-popconfirm>

                    </template>

                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination :pager-count="9" v-model:current-page="pageNo" v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9]" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
                :background="true" @current-change="getHasTrademark" @size-change="sizeChange">

            </el-pagination>





        </el-card>

        <!-- 对话框组件 -->
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
            <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽 -->
            <template #footer>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">确定</el-button>
            </template>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type';
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
//当前页码
let pageNo = ref<number>(1);
//多少数据
let limit = ref<number>(3);
//存储已有品牌数据总量
let total = ref<number>(0);
//存储已有品牌的数据
let trademarkArr = ref<Records>([])
//对话框显示和隐藏
let dialogFormVisible = ref<boolean>(false)
//定义手机新增品牌的数据
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
//获取el-form组件实例
let formRef = ref();


//接口封装为一个函数：在任何情况下向获取数据，调用次函数即可
const getHasTrademark = async () => {
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
    if (result.code == 200) {
        //存储已有品牌总个数
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
    }

}
//组件挂载完毕后发一次请求，获取第一页数据
onMounted(() => {
    getHasTrademark();
})

//分页器事件触发事件
//页面发生变化
// const changePageNo=()=>{
//     getHasTrademark();

// }
//当下拉菜单发生变化
const sizeChange = () => {
    pageNo.value = 1;
    getHasTrademark();
}

//添加品牌方法
const addTrademark = () => {
    //显示对话框
    dialogFormVisible.value = true;
    //收集数据清空
    trademarkParams.id = 0;
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';
    // //清除字段
    // formRef.value?.clearValidate('tmName')
    // //清除字段
    // formRef.value?.clearValidate('logoUrl')

    nextTick(() => {
        //清除字段
        formRef.value?.clearValidate('tmName')
        //清除字段
        formRef.value?.clearValidate('logoUrl')
    })

}
//修改品牌的方法
const updateTrademark = (row: TradeMark) => {
    //清空校验规则错误信息
    nextTick(() => {
        //清除字段
        formRef.value?.clearValidate('tmName')
        //清除字段
        formRef.value?.clearValidate('logoUrl')
    })
    //显示对话框
    console.log(row);

    dialogFormVisible.value = true;

    //es6合并对象
    Object.assign(trademarkParams, row)
    //修改数据
    // trademarkParams.id=row.id  
    // trademarkParams.tmName =row.tmName;
    // trademarkParams.logoUrl = row.logoUrl;
}

//对话框底部取消按钮
const cancel = () => {
    dialogFormVisible.value = false
}

//对话框底部确定按钮
const confirm = async () => {

    //对表单进行校验
    await formRef.value.validate();

    let result: any = await reqAddOrUpdateTrademark(trademarkParams);
    //添加成功
    if (result.code == 200) {
        //关闭对话框
        dialogFormVisible.value = false
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        })
        //重新渲染
        getHasTrademark();

    } else {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        })
        //关闭对话框
        dialogFormVisible.value = false
    }




}


//上传文件方法->钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/jpg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: "上传的文件必须小于4M"
            })
        }
    }

    else {
        ElMessage({
            type: 'error',
            message: "上传的文件必须是PNG,JPEG,JPG,GIF格式"
        })
        return false;
    }
}
//上传文件方法->钩子函数->成功

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    trademarkParams.logoUrl = response.data;
    //清除字段
    formRef.value.clearValidate('logoUrl')

}
//表单校验方法
const validatorTmName = (value: any, callBack: any) => {
    //自定义规则

    if (value.trim().length > 2) {
        callBack()
    } else {
        callBack(new Error('品牌名称位数要大于两位'))
    }
}

const validatorLogoUrl = (value: any, callBack: any) => {
    if (value) {
        callBack()
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }

}


//表单校验规则属性
const rules = {

    tmName: [
        //trigger：触发时机【blur,change】
        //validator :触发方法
        { validator: validatorTmName, trigger: 'blur', required: true },
    ],
    logoUrl: [
        { required: true, trigger: 'change', validator: validatorLogoUrl }
    ]
}
//删除品牌
const removetradeMark = async (id: number) => {
    let result = await reqDeleteTrademark(id);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        })
        getHasTrademark();
    } else {
        ElMessage({
            type: 'error',
            message: '删除品牌失败'
        })
    }

}


</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>