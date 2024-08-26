<template>
  <el-card :inline="true">
    <el-form :inline="true" class="form">
      <el-form-item label="角色:">
        <el-input placeholder="请你输入搜索角色" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="search">
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button
      type="primary"
      size="default"
      @click="addRole"
      style="margin: 0 8px"
      v-has="`btn.Role.add`"
    >
      添加角色
    </el-button>
    <!-- table展示角色信息 -->
    <el-table
      @selection-change=""
      style="margin: 10px 0px"
      border
      :data="roleArr"
    >
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        label="角色名称"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setRole(row)"
            v-has="`btn.Role.assgin`"
          >
            分配权限
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editRole(row)"
            v-has="`btn.Role.update`"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.rolename}?`"
            width="260px"
            @confirm="removeRole(row)"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                v-has="`btn.Role.remove`"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getHasRole"
      @size-change="getHasRole"
    />
  </el-card>

  <!-- 添加角色对话框 -->
  <el-dialog v-model="dialogFormVisible" width="500">
    <template #header>
      <h4>{{ roleParams.id ? '更新角色' : '添加角色' }}</h4>
    </template>
    <template #default>
      <el-form
        :rules="rules"
        label-width="80px"
        :inline="false"
        :model="roleParams"
        ref="formRef"
      >
        <el-form-item label="角色名称" prop="roleName" style="margin-top: 50px">
          <el-input
            placeholder="请填写角色名称"
            v-model="roleParams.roleName"
            clearable
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button size="default" @click="addCencel">取消</el-button>
      <el-button type="primary" size="default" @click="saveRole">
        确定
      </el-button>
    </template>
  </el-dialog>

  <!-- 分配角色权限抽屉 -->
  <el-drawer v-model="drawer" width="500">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="menuArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="selectArr"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <el-button size="default" @click="drawer = false">取消</el-button>
      <el-button type="primary" size="default" @click="handler">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqAllRoleList,
  reqRemoveRole,
  reqSetPermisstion,
} from '@/api/acl/role'
import {
  MenuList,
  MenuResponseData,
  Records,
  RoleData,
  RoleResponseData,
} from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
import { nextTick, onMounted, reactive, ref } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
//重置按钮变量
let settingStore = useLayOutSettingStore()
//分页器默认页码
let pageNo = ref<number>(1)
//一页几条数据
let pageSize = ref<number>(10)
//角色总个数
let total = ref<number>(0)
//搜索关键字
let keyword = ref<string>('')
//存储角色数组
let roleArr = ref<Records>([])
//存储角色信息
let roleParams = reactive<RoleData>({
  id: 0,
  createTime: '',
  updateTime: '',
  roleName: '',
  remark: null,
})
//获取el-form组件实例
let formRef = ref()
//添加角色抽屉显示变量
let dialogFormVisible = ref<boolean>(false)
//编辑角色抽屉显示变量
let drawer = ref<boolean>(false)
//挂载调用
onMounted(() => {
  getHasRole()
})
//接受角色数据方法
const getHasRole = async () => {
  let result: any = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    roleArr.value = result.data.records
  }
}

//添加职位按钮的回调
const addRole = async () => {
  ;(dialogFormVisible.value = true),
    //清除表单残余数据
    Object.assign(roleParams, {
      id: 0,
      roleName: '',
    })
  //清除错误信息
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}
//修改职位按钮的回调
const editRole = async (row: RoleData) => {
  dialogFormVisible.value = true
  // 清除表单残余数据
  Object.assign(roleParams, row)
  //清除错误信息
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}
//添加职位保存按钮的回调
const saveRole = async () => {
  await formRef.value.validate()

  let result: RoleResponseData = await reqAddOrUpdateRole(roleParams)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '添加成功',
    })
    //浏览器刷新
    // window.location.reload();
    getHasRole()
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.id ? '更新失败' : '添加失败',
    })
  }
}
//添加职位取消按钮的回调
const addCencel = () => {
  dialogFormVisible.value = false
  //清除错误信息
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}

//添加职位表单校验
//校验方法
const validateRolename = (value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback('角色名必须大于两位')
  }
}
const rules = {
  roleName: [{ validator: validateRolename, trigger: 'blur', required: true }],
}
//删除按钮
const removeRole = async (row: RoleData) => {
  let result: RoleResponseData = await reqRemoveRole(row.id as number)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //浏览器刷新
    // window.location.reload();
    getHasRole()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
//搜索按钮的回调
const search = () => {
  getHasRole()
}
//重置按钮的方法回调
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}

//tree渲染方法
const defaultProps = {
  children: 'children',
  label: 'name',
}

//准备一个数组:数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([])
//定义数组存储用户权限的数据
let menuArr = ref<MenuList>([])
//分配权限按钮的方法回调
const setRole = async (row: RoleData) => {
  drawer.value = true
  //收集当前要分类权限的职位的数据
  Object.assign(roleParams, row)
  let result: MenuResponseData = await reqAllMenuList(roleParams.id as number)

  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}

///给相应的职位下发权限
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })

  return initArr
}

//获取tree组件实例
let tree = ref<any>()
//抽屉确定按钮的回调
const handler = async () => {
  //职位的ID
  const roleId = roleParams.id as number
  //选中节点的ID
  let arr = tree.value.getCheckedKeys()
  //半选的ID
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  console.log(permissionId)

  //下发权限
  let result: any = await reqSetPermisstion(roleId, permissionId)
  if (result.code == 200) {
    //抽屉关闭
    drawer.value = false
    //提示信息
    ElMessage({ type: 'success', message: '分配权限成功' })
    //页面刷新
    window.location.reload()
  }
}
</script>

<style scoped></style>
