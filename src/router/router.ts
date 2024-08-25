
//对外暴露配置路由
export const constantRoute = [
    //登录    
    {

        path: '/login',
        component: () => import('@/view/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',//菜单标题
            hidden: true,//隐藏
            icon: "Promotion"//图标
        }
    },
    //首页
    {

        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,//不隐藏
            icon: ''//图标
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/view/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,//不隐藏
                    icon: "HomeFilled"//图标
                },
            },

        ]
    },
    //404
    {
        path: '/404',
        component: () => import('@/view/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,//隐藏
            icon: "DocumentDelete"//图标
        },
    },
    //数据大屏
    {
        path: '/screen',
        component: () => import('@/view/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: "数据大屏",
            hidden: false,
            icon: 'Platform',
        }
    },
]



//异步路由
export const asnycRoute = [
    //权限管理
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: "权限管理",
            hidden: false,
            icon: 'Lock',
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import('@/view/acl/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User',
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/view/acl/role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'UserFilled',
                }
            },
            {
                path: '/acl/permission',
                component: () => import('@/view/acl/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'Monitor',
                }
            },


        ]
    },
    //商品管理
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'Goods',
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/view/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    hidden: false,
                    icon: 'ShoppingCartFull',
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/view/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    hidden: false,
                    icon: 'Open',
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/view/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    hidden: false,
                    icon: 'Flag',
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/view/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    hidden: false,
                    icon: 'Opportunity',
                }
            },

        ]
    },
]

//任意路由
export const anyRoute = [
    //其他
    {
        path: '/:pathMath(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,//隐藏
            icon: "DataLine"//图标
        },
    },
]