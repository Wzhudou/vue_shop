export const menuList = {
    data: [{
        id: 0, 
        authName: '用户管理',
        path: 'users',
        children: [{
            id: 100, 
            authName: '用户列表',
            path: 'users',
            children: [],
        }],
        order: 1,
    },{
        id: 1, 
        authName: '权限管理',
        path: 'rights',
        children: [{
            id: 110, 
            authName: '角色列表',
            path: 'roles',
            children: [],
        },{
            id: 111, 
            authName: '权限列表',
            path: 'rights',
            children: [],
        }],
    },{
        id: 2, 
        authName: '商品管理',
        path: 'goods',
        children: [{
            id: 211, 
            authName: '商品列表',
            path: 'goods',
            children: [],
        },{
            id: 212, 
            authName: '分类参数',
            path: 'category',
            children: [],
        },{
            id: 213, 
            authName: '商品分类',
            path: 'goods',
            children: [],
        }],
    },{
        id: 3, 
        authName: '订单管理',
        path: 'orders',
        children: [{
            id: 311, 
            authName: '订单列表',
            path: 'orders',
            children: [],
        }],
    },{
        id: 4, 
        authName: '数据统计',
        path: 'reports',
        children: [{
            id: 411, 
            authName: '数据报表',
            path: 'reports',
            children: [],
        }],
    }]
}

// mock 获取用户列表接口
export const userList = {
    data: [{
        pagenum: 1,
        total: 4,
        users: [{
            id: 0,
            type: 1,
            role_name: '超级管理员',
            username: 'admin',
            create_time: '1486720211',
            mobile: '15788888886',
            email: 'ciwciu@qq.com',
            mg_state: true, // 当前用户的状态
        }, {
            id: 1,
            type: 2,
            role_name: '测试角色',
            username: 'test',
            create_time: '1486720211', // 或者2017-11-09T20:36:26.000Z
            mobile: '15676763737',
            email: 'wiuch@qq.com',
            mg_state: false, // 当前用户的状态
        },{
            id: 2,
            type: 1,
            role_name: 'new1',
            username: 'new1',
            create_time: '1486720211',
            mobile: '18325673456',
            email: 'new1@qq.com',
            mg_state: true, // 当前用户的状态
        }, {
            id: 3,
            type: 2,
            role_name: '测试角色2',
            username: 'test2',
            create_time: '1486720211', // 或者2017-11-09T20:36:26.000Z
            mobile: '18356351432',
            email: 'test2@qq.com',
            mg_state: false, // 当前用户的状态
        }]
    }]
}

// 权限列表
export const rightsListMockData = {
    list: [{
        id: 101,
        authName: '商品管理',
        level: 0,
        pid: 0,
        path: 'goods',
    },{
        id: 102,
        authName: '订单管理',
        level: 0,
        pid: 0,
        path: 'orders',
    },{
        id: 103,
        authName: '权限管理',
        level: 0,
        pid: 0,
        path: 'rights',
    },{
        id: 104,
        authName: '商品列表',
        level: 1,
        pid: 101,
        path: 'goods',
    },{
        id: 105,
        authName: '添加商品',
        level: 2,
        pid: 101,
        path: 'goods',
    },,{
        id: 106,
        authName: '订单列表',
        level: 1,
        pid: 102,
        path: 'orders',
    },{
        id: 107,
        authName: '添加订单',
        level: 2,
        pid: 102,
        path: 'orders',
    },{
        id: 108,
        authName: '用户列表',
        level: 1,
        pid: 0,
        path: 'users',
    },{
        id: 109,
        authName: '角色列表',
        level: 1,
        pid: 108,
        path: 'roles',
    },{
        id: 110,
        authName: '权限列表',
        level: 1,
        pid: 103,
        path: 'rights',
    },{
        id: 111,
        authName: '分类参数',
        level: 1,
        pid: 0,
        path: 'params',
    },{
        id: 112,
        authName: '商品修改',
        level: 2,
        pid: 101,
        path: 'goods',
    }],
    tree: [{
        id: 101,
        authName: '商品管理',
        path: null,
        pid: 0,
        children: [
            {
                id: 104,
                authName: '商品列表',
                path: null,
                pid: 101,
                children: [{
                    id: 105,
                    authName: '添加列表',
                    path: null,
                    pid: '104, 101',
                },{
                    id: 106,
                    authName: '添加商品',
                    path: null,
                    pid: '104, 101',
                },{
                    id: 107,
                    authName: '商品删除',
                    path: null,
                    pid: '104, 101',
                },{
                    id: 108,
                    authName: '更新商品属性',
                    path: null,
                    pid: '104, 101',
                },{
                    id: 109,
                    authName: '更新商品状态',
                    path: null,
                    pid: '104, 101',
                }]
            },
             {
                id: 115,
                authName: '分类参数',
                path: null,
                pid: 101,
                children: [{
                    id: 116,
                    authName: '获取参数类别',
                    path: null,
                    pid: '104, 101',
                },{
                    id: 117,
                    authName: '创建商品参数',
                    path: null,
                    pid: '104, 101',
                }] 
            }
        ]
    }, {
        id: 102,
        authName: '订单管理',
        path: null,
        pid: 0,
        children: [{
            id: 200,
            authName: '订单列表',
            path: null,
            pid: 102,
        },{
            id: 201,
            authName: '订单类别',
            path: null,
            pid: 102,
        }]
    }]
};

// 角色列表数据
export const rolesListMockData = {
    data: [{
        id: 30,
        roleName: '主管',
        roleDesc: '技术负责人',
        children: [{
            id: 101,
            authName: "商品管理",
            path: 'goods',
            children: [{
                id: 104,
                authName: '商品列表',
                path: 'goods',
                children: [
                //     {
                //     id: 105,
                //     authName: '添加商品',
                //     path: null,
                // },
                {
                    id: 116,
                    authName: '商品修改',
                    path: 'goods',
                }
                // ,{
                //     id: 105,
                //     authName: '商品删除',
                //     path: null,
                // },{
                //     id: 105,
                //     authName: '更新商品图片',
                //     path: null,
                // },{
                //     id: 105,
                //     authName: '更新商品属性',
                //     path: null,
                // }
            ]
            },{
                id: 115,
                authName: '分类参数',
                path: 'params',
                children: [{
                    id: 142,
                    authName: '获取参数列表',
                    path: 'params',
                },{
                    id: 143,
                    authName: '创建商品参数',
                    path: 'params',
                },{
                    id: 144,
                    authName: '删除商品参数',
                    path: 'params',
                }]
            },{
                id: 121,
                authName: '商品分类',
                path: 'categories',
                children: [{
                    id: 122,
                    authName: '添加分类',
                    path: 'categories',
                },{
                    id: 123,
                    authName: '删除分类',
                    path: 'categories',
                },{
                    id: 149,
                    authName: '获取分类详情',
                    path: 'categories',
                }]
            }]
        }, {
            id: 102,
            authName: '订单管理',
            path: 'orders',
            children: [{
                id: 107,
                authName: '订单列表',
                path: 'orders',
                children: [{
                    id: 109,
                    authName: '添加订单',
                    path: 'orders',
                },{
                    id: 170,
                    authName: '订单更新',
                    path: 'orders',
                },{
                    id: 171,
                    authName: '获取订单详情',
                    path: 'orders',
                }]
            }]
        }]
    },{
        id: 31,
        roleName: '测试角色',
        roleDesc: '测试角色描述',
        children: [{
            id: 101,
            authName: "商品管理",
            path: null,
            children: [{
                id: 104,
                authName: '商品列表',
                path: null,
                children: [{
                    id: 105,
                    authName: '添加商品',
                    path: null,
                }]
            }]
        }]
    }]
};