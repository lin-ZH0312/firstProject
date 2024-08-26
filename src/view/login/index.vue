<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>hellow</h1>
          <h2>欢迎来到登录界面</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_bun"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入获取时间段函数
import { getTime } from '@/utils/time'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
//获取el-form组件
let loginForms = ref()
//获取路由
let $router = useRouter()
let $route = useRoute()
//定义变量控制按钮加载效果
let loading = ref(false)
//登录数据
let loginForm = reactive({ username: 'admin', password: '111111' })
//登录函数回调
const login = async () => {
  //保证表单校验后发请求
  await loginForms.value.validate()
  //登录成功，加载效果出现
  loading.value = true
  //点击登录按钮
  //通知仓库发登录请求
  //请求成功——>首页
  //请求失败——>弹出登录失败信息
  try {
    //如果登录成功
    await useStore.userLogin(loginForm)
    //跳转判断是否跳转主页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    //登录成功提示信息
    ElNotification({
      type: 'success',
      message: '登录成功，欢迎回来',
      title: `hi, ${getTime()}好`,
    })
    //登录成功，加载效果消失
    loading.value = false
  } catch (error) {
    //登录失败，加载效果消失
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

//表单校验
const rules = {
  username: [
    {
      required: true,
      min: 5,
      max: 10,
      message: '长度在 5 到 10 个字符',
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: '长度在 6 到 15 个字符',
      trigger: 'change',
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  padding: 40px;

  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }

  .login_bun {
    width: 100%;
  }
}
</style>
