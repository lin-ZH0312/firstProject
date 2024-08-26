//小仓库：关于layout组件的相关配置

import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起
      refsh: false, //控制刷新
    }
  },
})

export default useLayOutSettingStore
