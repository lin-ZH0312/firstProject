//用户管理模块接口
import request from '@/utils/request'
import {
  AllRoleResponseData,
  UserData,
  UserResponseData,
  SetRoleData,
} from './type'

//枚举地址
enum API {
  //获取全部已有用户信息
  ALLUSER_URL = '/admin/acl/user/',
  //添加一个新的用户账号
  ADDUSER_URL = '/admin/acl/user/save',
  //更新已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',

  //获取全部职位,当前账号拥有的职位接口
  ALLROLEURL = '/admin/acl/user/toAssign/',
  //给已有的用户分配角色接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  //删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  //批量删除的接口
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

//获取用户账号信息的接口
export const reqUserDataInfo = (
  page: number,
  limit: number,
  username: string,
) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}?username=${username}`,
  )
//添加一个新的用户账号
export const reqAddOrUpdateUser = (data: UserData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

//获取全部职位,当前账号拥有的职位接口
export const reqAllRole = (adminId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLEURL + adminId)

//分配职位
export const reqSetUserRole = (data: SetRoleData) =>
  request.post(API.SETROLE_URL, data)
//删除某一个账号的信息
export const reqRemoveUser = (userid: number) =>
  request.delete(API.DELETEUSER_URL + userid)
//批量删除的接口
export const reqSelectUser = (idList: number[]) =>
  request.delete(API.DELETEALLUSER_URL, { data: idList })
