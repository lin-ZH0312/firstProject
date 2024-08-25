//创建用户相关的小仓库
import { defineStore } from 'pinia';
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep';
import * as _ from 'lodash';
import type {
    loginFormData,
    loginResponseData,
    userInfoReponseData,
} from '@/api/user/type'
//创建用户小仓库
import type { UserState } from './type/type';
//引入操作本地存储的工具文件
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
//引入路由
import { constantRoute, anyRoute, asnycRoute } from '@/router/router';
import router from '@/router';

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
    return asyncRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes)
            }
            return true
        }
    })
}


//创建用户小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(),//用户唯一标识token
            menuRoutes: constantRoute,//仓库存储生成菜单需要数组【路由】
            username: '',
            avatar: '',
            buttons: [],
        }
    },
    //异步|逻辑的地方
    actions: {
        //获取登录方法
        async userLogin(data: loginFormData) {
            //登录请求
            let result: loginResponseData = await reqLogin(data);


            //登录请求：成功200->token
            //登录失败：失败201->失败信息

            if (result.code === 200) {
                //读取token信息             
                this.token = (result.data as string)
                //本地存储            
                SET_TOKEN(result.data as string)
                return 'ok';
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        //获取用户信息
        async userInfo() {
            let result: userInfoReponseData = await reqUserInfo();
            console.log(result);

            // console.log(result);
            //如果获取成功
            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar;
                this.buttons = result.data.buttons;
                //计算当前用户需要展示的异步路由
                let userAsyncRoute = filterAsyncRoute(cloneDeep(asnycRoute), result.data.routes);
                // //菜单的数据
                this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute];
                [...userAsyncRoute, anyRoute].forEach((route: any) => {
                    router.addRoute(route)
                })
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        //退出登录请求
        async userLogout() {
            let result: any = await reqLogout();
            if (result.code == 200) {

                this.token = '';
                this.username = '';
                this.avatar = '';
                REMOVE_TOKEN();
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message))
            }



        }


    },
    getters: {

    }
})
//对外暴露获取小仓库方法
export default useUserStore;