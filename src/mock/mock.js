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
            path: 'categories',
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

// 商品分类列表
export const cateListMockData = {
    data: [{
        cate_id: 1,
        cate_name: '大家电',
        pid: 0,
        cate_level: 0,
        cate_deleted: false,
        children: [{
            cate_id: 1-1,
            cate_name: '电视',
            pid: 1,
            cate_level: 1,
            cate_deleted: false,
            children: [{
                cate_id: 1-1-1,
                cate_name: '曲面电视',
                pid: 1-1,
                cate_level: 2,
                cate_deleted: false,
            },{
                cate_id: 1-1-2,
                cate_name: '海信',
                pid: 1-1,
                cate_level: 2,
                cate_deleted: false,
            },{
                cate_id: 1-1-3,
                cate_name: '夏普',
                pid: 1-1,
                cate_level: 2,
                cate_deleted: false,
            },{
                cate_id: 1-1-4,
                cate_name: 'TCL',
                pid: 1-1,
                cate_level: 2,
                cate_deleted: false,
            },{
                cate_id: 1-1-5,
                cate_name: '小米',
                pid: 1-1,
                cate_level: 2,
                cate_deleted: false,
            }]
        },{
            cate_id: 1-2,
            cate_name: '空调',
            pid: 1,
            cate_level: 1,
            cate_deleted: false,
            children: [{
                cate_id: 1-2-1,
                cate_name: 'media',
                pid: 1-2,
                cate_level: 2,
                cate_deleted: false,
            },{
                cate_id: 1-2-2,
                cate_name: '格力空调',
                pid: 1-2,
                cate_level: 2,
                cate_deleted: false,
            },{
                cate_id: 1-2-3,
                cate_name: '海尔',
                pid: 1-2,
                cate_level: 2,
                cate_deleted: false,
            }]
        },{
            cate_id: 1-3,
            cate_name: '洗衣机',
            pid: 1,
            cate_level: 1,
            cate_deleted: false,
            children: [{
                cate_id: 1-3-1,
                cate_name: 'media',
                pid: 1-3,
                cate_level: 2,
                cate_deleted: false,
            },{
                cate_id: 1-3-2,
                cate_name: '格力空调',
                pid: 1-3,
                cate_level: 2,
                cate_deleted: false,
            },{
                cate_id: 1-3-3,
                cate_name: '海尔',
                pid: 1-3,
                cate_level: 2,
                cate_deleted: false,
            }]
        }, {
            cate_id: 1-4,
            cate_name: '冰箱',
            pid: 1,
            cate_level: 1,
            cate_deleted: false,
        }]
    }, {
        cate_id: 2,
        cate_name: '热门推荐',
        pid: 0,
        cate_level: 0,
        cate_deleted: false,
        children: [{

        }]
    }, {
        cate_id: 3,
        cate_name: '海外购',
        pid: 0,
        cate_level: 0,
        cate_deleted: false,
        children: [{

        }]
    },{
        cate_id: 4,
        cate_name: '苏宁房产',
        pid: 0,
        cate_level: 0,
        cate_deleted: false,
        children: [{

        }]
    },{
        cate_id: 5,
        cate_name: '手机相机',
        pid: 0,
        cate_level: 0,
        cate_deleted: false,
        children: [{
            cate_id: 5-1,
            cate_name: 'Apple',
            pid: 5,
            cate_level: 1,
            cate_deleted: false,
        }, {
            cate_id: 5-2,
            cate_name: '小米',
            pid: 5,
            cate_level: 1,
            cate_deleted: false,
        }, {
            cate_id: 5-3,
            cate_name: '华为',
            pid: 5,
            cate_level: 1,
            cate_deleted: false,
        }, {
            cate_id: 5-4,
            cate_name: '尼康',
            pid: 5,
            cate_level: 1,
            cate_deleted: false,
        }]
    }]
}
// test 
export const testTreeData = {
    data: [{
        name: 'Jack',
        sex: 'male',
        likes: ['football', 'basketball'],
        score: 10,
        children: [
          {
            name: 'Ashley',
            sex: 'female',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                    children: [
                      {
                        name: 'Ashley',
                        sex: 'female',
                        likes: ['football', 'basketball'],
                        score: 20,
                      },
                      {
                        name: 'Taki',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 10,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Taki',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 10,
          },
        ],
      },
      {
        name: 'Tom',
        sex: 'male',
        likes: ['football', 'basketball'],
        score: 20,
        children: [
          {
            name: 'Ashley',
            sex: 'female',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
          {
            name: 'Taki',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 10,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
        ],
      },
      {
        name: 'Tom',
        sex: 'male',
        likes: ['football', 'basketball'],
        score: 20,
      },
      {
        name: 'Tom',
        sex: 'male',
        likes: ['football', 'basketball'],
        score: 20,
        children: [
          {
            name: 'Ashley',
            sex: 'female',
            likes: ['football', 'basketball'],
            score: 20,
          },
          {
            name: 'Taki',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 10,
          },
        ],
      },
    ]
}

// 父级分类
export const parentCateListMockData = {
    data: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
}