<template>
  <Category :scene="scene" />
  <el-card style="margin: 10px 0">
    <!-- 结构变化前 -->
    <div v-show="scene == 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
        @click="addAttr"
        v-has="`btn.Attr.add`"
      >
        添加平台属性
      </el-button>
      <el-table border style="margin-top: 10px" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          align="center"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center " prop="attrValue">
          <template #="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="item in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateAttr(row)"
              v-has="`btn.Attr.update`"
            ></el-button>
            <el-popconfirm
              :title="`是否删除${row.attrName}?`"
              width="200px"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                  v-has="`btn.Attr.remove`"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 结构变化后 -->
    <div v-show="scene == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请你输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        @click="addAttrValue"
        :disabled="attrParams.attrName ? false : true"
        type="primary"
        size="default"
        icon="Plus"
      >
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table
        border
        style="margin-top: 10px"
        :data="attrParams.attrValueList"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center" width="700px">
          <template #="{ row, $index }">
            <el-input
              :ref="(vc: any) => (inputArr[$index] = vc)"
              v-if="row.flag"
              @blur="toLook(row, $index)"
              v-model="row.valueName"
              size="small"
              placeholder="请你输入属性值名称"
              clearable
            />
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>

        <el-table-column label="属性值操作" align="center ">
          <template #="{ index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="attrParams.attrValueList.splice(index, 1)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="attrParams.attrValueList.length > 0 ? false : true"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
//组合式API函数watch
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
//引入已有属性值接口
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
//引入类型
import type { AttResponseData, Attr, AttrValue } from '@/api/product/attr/type'
//获取仓库
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
//存储已有属性和属性值
let attrArr = ref<Attr[]>([])
//定义card组件内容切换
let scene = ref<number>(0) //scene=0,显示table，scene=1 显示修改后的属性结构
//新僧收集属性数组
let attrParams = reactive<Attr>({
  attrName: '', //新增属性名称
  attrValueList: [
    //新增的属性值数组
  ],
  categoryId: '', //三级分类id
  categoryLevel: 3, //三级分类
})
//准备一个数组：存储对应的属性实例
let inputArr = ref<any>([])
//监听三级分类id变化
watch(
  () => categoryStore.c3Id,
  () => {
    //清空上一次查询的属性和属性值
    attrArr.value = []
    //保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return
    //获取分类Id
    getAttr()
  },
)
//获取已有属性的方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
//增加属性方法
const addAttr = () => {
  //每一次点击的时候，先清空一下数据再搜集数据
  Object.assign(attrParams, {
    attrName: '', //新增属性名称
    attrValueList: [
      //新增属性值数组
    ],
    categoryId: categoryStore.c3Id, //收集三级分类id

    categoryLevel: 3, //三级分类
  })
  //修改card组件结构
  scene.value = 1
}

//编辑属性方法
const updateAttr = (row: Attr) => {
  //修改card组件结构
  scene.value = 1
  //渲染数据,深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
//删除属性方法
const deleteAttr = async (attrId: number) => {
  let result = await reqRemoveAttr(attrId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //重新渲染
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//取消方法
const cancel = () => {
  //修改card组件结构
  scene.value = 0
}

//添加属性值的方法
const addAttrValue = () => {
  //向数组添加对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制只读模式和编辑模式的切换
  })
  //聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

///保存按钮
const save = async () => {
  let result = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    scene.value == 0
    //提示信息
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    //获取已有属性与属性值
    getAttr()
  } else {
    //提示信息
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

//失去焦点变只读
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判段
  if (row.valueName.trim() == '') {
    //删除非法数组
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  //判断是否相同非法
  let repeat = attrParams.attrValueList.find((item) => {
    //把自己row排除出item数值判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    //删除非法数组
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }

  row.flag = false
}

//点击只读变编辑
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true

  //聚焦
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
//路由组件销毁时，仓库分类清空
onBeforeUnmount(() => {
  //清空分类参考数据
  categoryStore.$reset()
})
</script>

<style scoped></style>
