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