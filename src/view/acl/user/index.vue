<template>
    <el-card :inline="true">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名:">
                <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="search"
                    :disabled="keyword ? false : true">搜索</el-button>
                <el-button type="primary" size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="addUser" style="margin: 0 8px  ;"
            v-has="`btn.User.add`">添加用户</el-button>
        <!-- 添加更新用户抽屉 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
            </template>
            <template #default>
                <el-form label-width="80px" :inline="false" :model="userParams" :rules="rules" ref="formRef">
                    <el-form-item label="用户名字" prop="username" style="margin-top: 50px;">
                        <el-input placeholder="请填写用户名字" v-model="userParams.username" clearable />
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="name">
                        <el-input placeholder="请填写用户昵称" v-model="userParams.name" clearable />
                    </el-form-item>
                    <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                        <el-input placeholder="请填写用户密码" v-model="userParams.password" clearable />
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <el-button size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="saveUser">确定</el-button>
            </template>

        </el-drawer>


        <el-button type="primary" size="default" :disabled="selectIdArr.length ? false : true"
            @click="delectList">批量删除</el-button>
        <!-- table展示用户信息 -->
        <el-table @selection-change="selectChange" style="margin: 10px 0px;" border :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="User" @click="setRole(row)"
                        v-has="`btn.User.assgin`">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)"
                        v-has="`btn.User.update`">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.username}?`" width="260px" @confirm="delectUser(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete"
                                v-has="`btn.User.remove`">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
            @current-change="getHasUser" @size-change="handler" />
    </el-card>

    <el-drawer v-model="drawer1">
        <template #header>
            <h4>{{ userParams.id ? '更新角色' : '分配角色' }}</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户名字" style="margin-top: 50px;">
                    <el-input placeholder="请填写用户名字" v-model="userParams.username" disabled clearable />
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                        全选
                    </el-checkbox>
                    <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role.roleName">
                            {{ role.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="saveRole">确定</el-button>
        </template>
    </el-drawer>



</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { reqAddOrUpdateUser, reqUserDataInfo, reqAllRole, reqSetUserRole, reqRemoveUser, reqSelectUser } from '@/api/acl/user';
import { Records, UserData, UserResponseData, AllRoleResponseData, AllRole, SetRoleData } from '@/api/acl/user/type';
import useLayOutSettingStore from '@/store/modules/setting';

//默认页码
let pageNo = ref<number>(1);
//一页展示几条数据
let pageSize = ref<number>(5);
//用户总个数
let total = ref<number>(0);
//添加用户抽屉
const drawer = ref<boolean>(false)
//存储用户数组
let userArr = ref<Records>([])
//收集用户信息
let userParams = reactive<UserData>({
    id: 0,
    name: '',
    username: '',
    password: '',
})
//获取el-form组件实例
let formRef = ref();
//角色分配抽屉变量
const drawer1 = ref<boolean>(false)
let allRole = ref<AllRole>([])
let userRole = ref<AllRole>([])

//挂载完成
onMounted(() => {
    getHasUser()
})
//获取已有用户信息
const getHasUser = async (pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    let result: UserResponseData = await reqUserDataInfo(pageNo.value, pageSize.value, keyword.value)
    if (result.code == 200) {
        total.value = result.data.total
        userArr.value = result.data.records
    }
}
//size-page方法,下拉菜单
const handler = () => {
    getHasUser();
}
//新增用户按钮
const addUser = () => {

    drawer.value = true

    //清空用户信息
    Object.assign(userParams, {
        id: 0,
        name: '',
        username: '',
        password: '',
    })
    //清除错误信息 
    nextTick(() => {
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('password')
    })

}
//编辑用户信息按钮
const updateUser = (row: UserData) => {

    drawer.value = true
    //收集已有的信息
    Object.assign(userParams, row)
    //清除错误信息 
    nextTick(() => {
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('username')
    })

}
//保存用户信息按钮
const saveUser = async () => {
    //表单验证
    await formRef.value.validate()

    let result: UserResponseData = await reqAddOrUpdateUser(userParams)
    // console.log(result);

    if (result.code == 200) {
        drawer.value = false
        ElMessage({
            type: 'success',
            message: userParams.id ? '更新成功' : '添加成功'
        })
        // getHasUser(userParams.id ? pageNo.value : 1);
        //浏览器自动刷新
        window.location.reload();


    } else {
        ElMessage({
            type: 'error',
            message: userParams.id ? '更新失败' : '添加失败'
        })
    }


}
//取消保存按钮
const cancel = () => {
    drawer.value = false
    drawer1.value = false
}
//表单校验方法
const validateUsername = (value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户名称至少五位'))
    }
}
const validateName = (value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户昵称至少五位'))
    }
}

const validatePass = (value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户密码至少五位'))
    }
}
//表单校验的规则
const rules = {
    username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
    name: [{ required: true, validator: validateName, trigger: 'blur' }],
    password: [{ required: true, validator: validatePass, trigger: 'blur' }]
}
//分配角色按钮方法



const setRole = async (row: UserData) => {

    //存储数组
    Object.assign(userParams, row)

    //调用分配角色数据
    let result: AllRoleResponseData = await reqAllRole((userParams.id as number))
    // drawer1.value = true;
    if (result.code == 200) {
        //存储全部的职位
        allRole.value = result.data.allRolesList;
        //存储当前用户已有的职位
        userRole.value = result.data.assignRoles;
        //抽屉显示出来
        drawer1.value = true;
    }
}



// //全选款
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)

// 全选款方法
const handleCheckAllChange = (val: boolean) => {
    userRole.value = val ? allRole.value : []
    //不确定样式
    isIndeterminate.value = false
    return undefined
}
//复选款方法
const handleCheckedCitiesChange = (value: string[]) => {
    console.log(value);
    //勾选项目长度
    const checkedCount = value.length
    checkAll.value = checkedCount === allRole.value.length

    //复选款
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
    return undefined

}

//分配角色保存按钮

const saveRole = async () => {

    //收集参数
    let data: SetRoleData = {
        userId: (userParams.id as number),
        roleIdList: userRole.value.map(item => {
            return (item.id as number)
        })
    }

    let result: any = await reqSetUserRole(data)

    if (result.code == 200) {
        drawer1.value = false
        ElMessage({
            type: 'success',
            message: '分配成功'
        })
        //浏览器自动刷新
        window.location.reload();
    } else {
        ElMessage({
            type: 'error',
            message: '分配失败'
        })
    }

}


//删除用户按钮
const delectUser = async (id: number) => {
    let result: any = await reqRemoveUser(id)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        //重新渲染
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }

}

//群选
let selectIdArr = ref<UserData[]>([])
const selectChange = (value: any) => {
    selectIdArr.value = value;
}
//群批删除用户按钮
const delectList = async () => {
    let idList: any = selectIdArr.value.map(item => {
        return item.id
    })
    let result: any = await reqSelectUser(idList)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        //重新渲染
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }

}
//定义响应数据，收集用户输入的关键字
let keyword = ref<string>('')
//搜索按钮的回调
const search = () => {
    getHasUser()
    //清空关键字
    keyword.value = ''
}
//获取LayOutSettingStore仓库
let settingStore = useLayOutSettingStore()
//重置按钮的回调
const reset = () => {
    settingStore.refsh = !settingStore.refsh;
}

</script>
<style scoped></style>