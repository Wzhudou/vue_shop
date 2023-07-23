<template>
    <div>
         <!-- 面包屑导航区域 -->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!-- 添加角色按钮区 -->
            <el-row>
                <el-col>
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表区域 -->
            <el-table :data="roleList" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item, index) in scope.row.children" :key="item.id" :class="['bdbottom', index === 0 ? 'bdtop' : '', 'vcenter']">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row, item.id)">
                                    {{item.authName}}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二级和三级权限 -->
                            <el-col :span="19">
                                <!-- 通过for循环，嵌套渲染二级权限 -->
                                <el-row v-for="(subItem, subIndex) in item.children" :key="subItem.id" :class="[subIndex !== 0 ? 'bdtop' : '', 'vcenter']">
                                    <el-col :span="6">
                                        <el-tag type="success" closable @close="removeRightById(scope.row, subItem.id)">{{ subItem.authName }}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag type="warning" v-for="(ssubItem, ssubIndex) in subItem.children" :key="ssubItem.id" closable @close="removeRightById(scope.row, ssubItem.id)">
                                            {{ ssubItem.authName }}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!-- <pre>
                            {{scope.row}}
                        </pre> -->
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 分配权限的对话框 -->
        <el-dialog
            title="分配权限"
            :visible.sync="setRightDialogVisible"
            width="50%" @close="setRightDialogClosed">
            <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="setRightsRef"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRights()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { rolesListMockData, rightsListMockData } from '@/mock/mock'
export default {
    name: 'Roles',

    data() {
        return {
           // 所有角色列表数据
           roleList: [], 
           setRightDialogVisible: false, // 控制分配权限对话框的显示与隐藏
           rightsList: [], // 所有权限的数据
           treeProps: { // 树形控件的属性绑定事件
            children: 'children',
            label: 'authName'
           },
           defKeys: [], // 默认选中的节点id值数组
           roleId: '', // 即将分配权限的角色id
        };
    },
    created () {
        this.getRoleList();
    },
    mounted() {
        
    },

    methods: {
        // 获取所有角色列表
        getRoleList() {
            // this.$http('/roles')
            this.roleList = rolesListMockData['data'];
            console.log(this.roleList);
        },
        // 根据id删除对应的权限
        async removeRightById(role, rightId) {
            // 弹框提示是否要删除
            const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err =>err);
            if(result !== 'confirm') {
                return this.$message.info('取消了删除');
            }
            // console.log('确认删除', this.roleList);
            // 防止更换数据时，表格展开功能关闭
            role.children = this.roleList.filter(item => item.id = role.id)[0].children;
            // roles/:roleId/rights/:rightId
            // this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        },
        // 展示分配权限的对话框
        showSetRightDialog(role) {
            // this.$http.get('/rights/tree')
            this.roleId = role.id;
            this.setRightDialogVisible = true;
            const data = rightsListMockData['tree'];
            this.rightsList = data;
            // 仅测试相关逻辑
            this.getLeafKeys(role, this.defKeys);
            if (this.$refs.setRightsRef) {
                this.$refs.setRightsRef.setCheckedKeys(this.defKeys);
            }
        },
        setRightDialogClosed() {
            this.defKeys = [];
            this.$refs.setRightsRef.setCheckedKeys([]);
        },
        // 通过递归的形式获取三级权限的id并保存到defKeys中
        getLeafKeys(node, arr) {
            // 如果当前node节点不包含children属性，则是三级节点
            if(!node.children) { return arr.push(node.id);}
            node.children.forEach(item => {
                this.getLeafKeys(item, arr); 
            });
        },
        // 点击为角色分配权限
        allotRights() {
            const keys = [
                ...this.$refs.setRightsRef.getCheckedKeys(),
                ...this.$refs.setRightsRef.getHalfCheckedKeys()
            ];
            console.log(keys);
            const idStr = keys.join(',');
            // this.$http.post(`roles/${this.roleId}/rights`, {rids: idStr})
            this.getRoleList();
            this.setRightDialogVisible = false;
        },
    },
};
</script>

<style lang="less" scoped>
.bdtop {
    border-top: 1px solid #eee;
}
.bdbottom {
    border-bottom: 1px solid #eee;
}
.el-tag {
    margin: 7px;
}
.vcenter {
    display: flex;
    align-items: center;
}
</style>