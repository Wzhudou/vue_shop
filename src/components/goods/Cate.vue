<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <el-row>
                <el-col>           
                    <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <tree-table class="treeTable" :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" :show-index="true" index-text="#"	border :show-row-hover="false" :is-fold="true">
                <!-- 是否有效 -->
                <template slot="isok" slot-scope="scope">
                    <i class="el-icon-success" v-if="!scope.row.cate_deleted" style="color: lightgreen"></i>
                    <i class="el-icon-error" v-else style="color: red"></i>
                </template>
                <template slot="order" slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.cate_level === 0">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.cate_level === 1">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
                </template>
                <template slot="opt" slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                </template>
            </tree-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageum"
                :page-sizes="[3, 5, 10, 15]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加分类对话框 -->
        <el-dialog
            title="添加分类"
            :visible.sync="addCateDialogVisible"
            width="50%" @close="addCateDialogClosed">
            <!-- 添加分类表单 -->
            <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateRef" label-width="100px">
                <el-form-item label="分类名称:" prop="cate_name">
                  <el-input v-model="addCateForm.cate_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类:">
                    <el-cascader
                        v-model="selectedKeys"
                        :options="parentCateList"
                        :props="cascaderProps"
                        clearable
                        @change="parentCateChange"></el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { cateListMockData, testTreeData, parentCateListMockData } from '@/mock/mock'
export default {
    name: 'Cate',

    data() {
        return {
           cateList: [], // 商品分类列表 
           queryInfo: { // 查询条件
            type: 3,
            pageum: 1,
            pagesize: 5,
           },
           total: 0, // 总数据条数
           columns: [{ // 为table指定列的定义
            label: '分类名称',
            prop: 'cate_name',
           }, {
            label: '是否有效',
            // prop: 'likes',
            type: 'template', // 将当前列定义为模板列
            template: 'isok', // 表示当前这一列使用的模板名称
          },{
            label: '排序',
            type: 'template', // 将当前列定义为模板列
            template: 'order', // 表示当前这一列使用的模板名称
          },{
            label: '操作',
            type: 'template', // 将当前列定义为模板列
            template: 'opt', // 表示当前这一列使用的模板名称
          }],
          addCateDialogVisible: false, // 控制添加分类对话框的显示和隐藏
          addCateForm: { // 添加分类表单数据对象
            cate_name: '', // 将要添加的分类名称
            cate_pid: 0, // 父级分类的id
            cate_level: 0, // 分类的等级默认添加一级分类
          },
          addCateFormRules: { // 添加分类表单的验证规则对象
            cate_name: [
                { required: true, message: '请输入分类名称', trigger: 'blur'},
            ]
          },
          parentCateList: [], // 父级分类列表
          cascaderProps: { 
            expandTrigger: 'hover',
            checkStrictly: true,
        }, // 用来指定配置对象
        selectedKeys:[], //选中的父级分类的id数组

        };
    },

    mounted() {
        this.getCateList();
    },

    methods: {
        // 获取商品分类护具
        getCateList() {
            this.cateList = cateListMockData['data'];
            // this.cateList = testTreeData['data']
            // this.$http.get('categories', {params: this.queryInfo})
            this.total = this.cateList.length;
        },
        // 监听pagesize改变事件
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize;
            this.getCateList();
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pageum = newPage;
        },
        // 点击按钮展示添加分类的对话框
        showAddCateDialog() {
            this.getParentCateList()
            this.addCateDialogVisible = true;
        },
        // 获取父级分类的数据列表
        getParentCateList() {
            // this.$http.get('categories', {params: {type: 2}});
            this.parentCateList = parentCateListMockData['data'];
        },
        // 选择项发生变化触发
        parentCateChange() {
            // 判断是否选中
            if (this.selectedKeys.length) {
                const level = this.selectedKeys.length;
                // 父级分类的id
                this.addCateForm.cate_pid = this.selectedKeys[level - 1];
                // 当前分类的等级
                this.addCateForm.cate_level = level;
                return;
            }
            this.addCateForm.cate_pid = 0;
            this.addCateForm.cate_level = 0;
        },
        // 点击按钮添加新的分类
        addCate() {
            // console.log(this.addCateForm);
            this.$refs.addCateRef.validate(valid => {
                if(!valid) {
                    return;
                }
                console.log(this.addCateForm);
                // this.$http.post('categories', this.addCateForm);
                this.$message.success('添加商品分类成功');
                this.getCateList();
                this.addCateDialogVisible = false;
            });
        },
        // 监听对话框的关闭事件，重置表单数据
        addCateDialogClosed() {
            this.$refs.addCateRef.resetFields();
            this.selectedKeys = [];
            this.addCateForm.cate_level = 0;
            this.addCateForm.cate_pid = 0;
        },
    },
};
</script>

<style lang="less" scoped>
.treeTable {
    margin-top: 15px;
    margin-bottom: 15px;
}
.el-cascader {
    width: 100%;
}
</style>