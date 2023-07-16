<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-input placeholder="请输入姓名" v-model="queryInfo.query" @clear="getUserList" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table
             :data="userList" 
             :border="true" 
             stripe>
                <el-table-column label="#" type="index"></el-table-column> 
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            active-color="#409eff"
                            inactive-color="#DCDFE6" 
                            @change="userStateChanges(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改 -->
                        <el-button type="primary" class="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
                        <!-- 删除 -->
                        <el-button type="danger" class="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                        <!-- 分配角色 -->
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" class="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加用户对话框 -->
        <el-dialog
            title="添加用户"
            @close="addDialogClosed"
            :visible.sync="addDialogVisible"
            width="50%">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFromRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改用户的对话框 -->
        <el-dialog
            title="修改用户"
            @close="editDialogClosed"
            :visible.sync="editDialogVisible"
            width="50%">
            <!-- 内容主体区域 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFromRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { userList } from '@/mock/mock.js';
import axios from 'axios';
    export default {
        data() {
            // 验证邮箱的规则
            var checkEmail = (rule, value, cb) => {
                // 验证邮箱的正则表达式
                const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                // 校验
                if(regEmail.test(value)) {
                    return cb();
                }
                cb(new Error('请输入合法的邮箱'));
            };
            // 校验手机号
            var checkMobile = (rule, value, cb) => {
                // 验证手机号的正则表达式
                const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                if(regMobile.test(value)) {
                    return cb();
                }
                cb(new Error('请输入合法的手机号'));
            };
            return {
                select: '',
                // 获取用户列表参数对象
                queryInfo: {
                    query: '', 
                    pagenum: 1, // 当前页数
                    pagesize: 2,
                },
                userList: [],
                total: 0,
                addDialogVisible: false, // 控制添加用户对话框的显示和隐藏
                // 添加用户表单数据
                addForm: {
                    username: 'test566',
                    password: '12345678',
                    email: '123456@qq.com', // 123456@qq.com
                    mobile: '18388888888', // 18388888888
                }, 
                 // 添加表单验证规则对象
                addFormRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur'},
                        { min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur'},
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 15, message: '用户名的长度在6-15个字符之间', trigger: 'blur'},
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur'},
                        { validator: checkEmail, trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '请输入手机', trigger: 'blur'},
                        { validator: checkMobile, trigger: 'blur' },
                    ],
                },

                editDialogVisible: false, // 修改用户对话框的显示和隐藏
                editForm: {}, // 查询到的用户信息对象
                // 修改表单的规则对象
                editFormRules: {
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur'},
                        { validator: checkEmail, trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '请输入手机', trigger: 'blur'},
                        { validator: checkMobile, trigger: 'blur' },
                    ],
                },
            }
        },
        created () {
            this.getUserList();
        },
        methods: {
            getUserList(user, editUser, deleteUserbByID) {
                const allUserList = userList['data'];
                // 添加用户
                if (user) {
                    allUserList[0]['users'].unshift(user);
                }  
                // 修改用户
                if (editUser) {
                    const index = allUserList[0]['users'].findIndex(item => item.id === editUser.id);
                    allUserList[0]['users'].splice(index, 1, editUser);
                }  
                if (deleteUserbByID) {
                    allUserList[0]['users'] = allUserList[0]['users'].filter(item => deleteUserbByID !== item.id);
                }                           
                // 获取用户接口 /users this.$http.get('/users', {params: this.queryInfo})
                this.userList = allUserList[0]['users'].filter(item => item.username.includes(this.queryInfo.query))
                    .slice(this.queryInfo.pagesize * (this.queryInfo.pagenum - 1), this.queryInfo.pagesize * this.queryInfo.pagenum);
                this.total = this.queryInfo.query.length ? this.userList.length : allUserList[0]['users'].length;
                this.userList = JSON.parse(JSON.stringify(this.userList));
            },

            // 监听page size改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize;
                this.getUserList()
            },
            // 监听页码值改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage;
                this.getUserList();
                
            },
            // 监听switch开关状态的改变
            userStateChanges(row) {
                // console.log(row);
                // 接口users/:uid/state/:type  put
                // this.$http.put(`users/${row.id}/state/${row.mg_state}`)
            },
            // 监听添加用户对话框的关闭事件
            addDialogClosed() {
                this.$refs.addFromRef.resetFields();
            },

            // 添加用户按钮
            addUser() {
                this.$refs.addFromRef.validate(valid => {
                    // console.log('valid', valid);
                    if(!valid) return;
                    // 添加用户的网络请求
                    // this.$http.post('/users', this.addForm)                    
                    this.$message.success('添加用户成功');
                    this.addForm['id'] = allUserList[0]['users'].length;
                    this.getUserList(this.addForm);
                    setTimeout(() => {
                        this.addDialogVisible = false;
                    }, 100);
                });
            },
            // 展示编辑用户的对话框
            showEditDialog(row) {
                const id = row.id;
                // 调用接口 ，根据id查询所需数据
                // this.$http.get('/user/' + id)
                this.editForm = row;
                this.editDialogVisible = true;
            },
            // 监听修改用户对话框的修改关闭事件
            editDialogClosed() {
                this.$refs.editFromRef.resetFields();
            },
            // 修改用户信息并提交
            editUserInfo() {
                this.$refs.editFromRef.validate(valid => {
                    if(!valid) {return;}
                    // 发起修改用户信息的请求
                    // this.$http.put('/users/' + this.editForm.id, this.editForm)
                    this.getUserList(null, this.editForm);
                    setTimeout(() => {
                        this.editDialogVisible = false;
                    }, 100);
                });
            },
            // 根据id删除对应的用户 
            async removeUserById(id) {
                // 弹框询问用户是否删除数据
                const res = await this.$confirm('此操作将永久删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(e => e);
                // 如果用户确认删除，则返回字符串 “confirm”
                // 如果用户取消了删除，则返回字符串“cancel”
                if (res !== 'confirm') {
                    return this.$message.info('已取消删除')
                }
                // 删除单个用户 users/:id
                // this.$http.delete('users/' + id)
                this.getUserList(null, null, id);
                this.$message.success('删除用户成功');
            },
        },
    }
</script>

<style lang="less" scoped>
.el-table {
    margin-top: 15px;
    font-size: 12px;
}
.el-pagination {
    margin-top: 15px;
}
</style>