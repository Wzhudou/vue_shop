<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!-- 头部的警告区域 -->
            <el-alert
                title="注意：只允许为第三级分类设置相关参数!"
                type="warning" 
                :closable="false" 
                show-icon>
            </el-alert>
            <!-- 选择商品分类区 -->
            <el-row class="cat_opt">
                <el-col>
                    <span>选择商品分类: </span>
                    <!-- 选择商品分类的级联选择框 -->
                    <el-cascader
                        v-model="selectedCateKeys"
                        :options="cateList"
                        :props="cateProps"
                        clearable
                        @change="goodsCateChange"></el-cascader>
                </el-col>
            </el-row>

            <!-- tab页签区域 -->
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
                    <!-- 动态参数表 -->
                    <el-table :data="manyTableData" border stripe>
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <!-- 循环渲染tag标签 -->
                                <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable @close="handleClose(index, scope.row)">
                                    {{item}}
                                </el-tag>
                                <!-- 输入文本框 -->
                                <el-input
                                    class="input-new-tag"
                                    v-if="scope.row.inputVisible"
                                    v-model="scope.row.inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)"
                                    >
                                </el-input>
                                <!-- 添加按钮 -->
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column type="index" label="#"></el-table-column>
                        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
                    <!-- 静态属性表 -->
                    <el-table :data="onlyTableData" border stripe>
                        <el-table-column type="expand"></el-table-column>
                        <el-table-column type="index" label="#"></el-table-column>
                        <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>

    </div>
</template>

<script>
import {  parentCateListMockData } from '@/mock/mock'
export default {
    name: 'Params',

    data() {
        return {
            cateList: [],
            cateProps: {
                expandTrigger: 'hover',
            },
            selectedCateKeys:[], // 级联选择框双向绑定的数组
            activeName: 'many',
            manyTableData: [], // 动态参数数据
            onlyTableData: [], // 静态参数数据
        };
    },

    mounted() {
        this.getCateList();
    },
    computed: {
        // 如果按钮需要被禁用，则选择true否则false
        isBtnDisabled() {
            return this.selectedCateKeys.length !== 3;
        },
        cateId() {
            return this.selectedCateKeys.length === 3 ? this.selectedCateKeys[2] : null;
        },
    },
    methods: {
        // 获取所有的商品分类
        getCateList() {
            // this.$http.get('categories')
            this.cateList = parentCateListMockData['data'];

        },
        // 级联选择框选中项触发
        goodsCateChange() {
            // console.log(this.selectedCateKeys);
            // 选中的不是三级分类
            if(this.selectedCateKeys.length !== 3) {
                this.manyTableData = [];
                this.onlyTableData = [];
                this.selectedCateKeys = [];
                return;
            }
            // 是三级分类
            this.getParamsData();
        },
        // tab页签点击事件
        handleTabClick(){
            console.log(this.activeName);
            this.getParamsData();

        },
        // 获取参数的列表数据
        getParamsData() {
            if(!this.cateId) {return;}
            // 根据所选分类的id和当前所处的面板获取对应的参数
            // this.$http.get(`categories/${this.cateId}/attrbutes`, {params: {sel: this.activeName}})
            if (this.activeName === 'many') {
                const manyTableData = [{
                    attr_id: 1,
                    attr_name: '版式',
                    attr_sel: 'many',
                    attr_write: 'manual',
                    attr_vals: '49寸4k超薄曲面 人工智能,55寸4k观影曲面 30核HDR,55寸4k超薄曲面 人工智能,65寸4k超薄曲面 人工智能'
                },{
                    attr_id: 1,
                    attr_name: '颜色',
                    attr_sel: 'many',
                    attr_write: 'manual',
                    attr_vals: '',
                }];
                manyTableData.forEach(item => {
                    item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : [];
                    item.inputValue = '';  // 文本框输入的值
                    item.inputVisible = false; // 控制文本框的显示和隐藏
                });
                this.manyTableData = manyTableData;
            } else {
                const onlyTableData = [{
                    attr_id: 1,
                    attr_name: '主体-商品名称',
                    attr_sel: 'only',
                    attr_write: 'manual',
                    attr_vals: 'fffff'
                },{
                    attr_id: 2,
                    attr_name: '显示-曲面',
                    attr_sel: 'only',
                    attr_write: 'manual',
                    attr_vals: 'fffff'
                },{
                    attr_id: 3,
                    attr_name: '系统-智能电视',
                    attr_sel: 'only',
                    attr_write: 'manual',
                    attr_vals: 'fffff'
                },{
                    attr_id: 4,
                    attr_name: '外观挂壁显示',
                    attr_sel: 'only',
                    attr_write: 'manual',
                    attr_vals: 'fffff'
                },{
                    attr_id: 5,
                    attr_name: '功能-整机功率',
                    attr_sel: 'only',
                    attr_write: 'manual',
                    attr_vals: 'fffff'
                }];
                onlyTableData.forEach(item => {
                    item.attr_vals = item.attr_vals.split(' ');
                    item.inputValue = '';  // 文本框输入的值
                    item.inputVisible = false; // 控制文本框的显示和隐藏
                });
                this.onlyTableData = onlyTableData;
            }
        },
        // 文本框失去焦点或者按下enter键
        handleInputConfirm(row) {
            console.log('in', this.inputValue);
            if(!row.inputValue.trim().length) {
                row.inputValue = '';
                row.inputVisible = false;
                return;
            }
            // 如果没有return则需要做后续处理
            row.attr_vals.push(row.inputValue.trim());
            row.inputValue = '';
            row.inputVisible = false;
            // // 发起请求，保存
            this.saveAttrVals(row);
        },
        // 点击按钮展示文本输入框
        showInput(row) {
           row.inputVisible = true;
            // this.$nextTick方法作用，当页面上元素被重新渲染之后，才会执行回调函数中的代码 
           this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        // 删除tag
        handleClose(index, row) {
            row.attr_vals.splice(index, 1);
            this.saveAttrVals(row);
        },
        // 对attr_vals的操作保存到数据库
        saveAttrVals(row) {
            // this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, {
            //     attr_name: row.attr_name,
            //     attr_sel: row.attr_sel,
            //     attr_vals: row.attr_vals.join(' '),
            // })
        },

    },
};
</script>

<style lang="less" scoped>
.cat_opt {
    margin: 15px 0;
}
.el-tag {
    margin: 5px;
}
.input-new-tag {
    width: 120px;
    margin-left: 5px;
}
.button-new-tag {
    margin-left: 5px;
}
</style>