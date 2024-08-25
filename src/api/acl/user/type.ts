//用户账号的ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
//用户数据
export interface UserData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    username?: string,
    password?: string,
    name?: string,
    phone?: number,
    roleName?: string
}
export type Records = UserData[]
export interface UserResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        pages: number

    }
}


//职位ts类型
export interface RoleData {
    id?: number
    createTime?: string
    updateTime?: string
    roleName: string
    remark: null
}
export type AllRole = RoleData[]

export interface AllRoleResponseData extends ResponseData {
    data: {
        assignRoles: AllRole
        allRolesList: AllRole
    }
}


export interface SetRoleData {
    roleIdList: number[]
    userId: number
}