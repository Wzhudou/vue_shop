<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddPage">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- table表格区 -->
            <el-table :data="goodsList.slice((queryInfo.pagenum -1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize)" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                <el-table-column label="商品价格(元)" prop="goods_price" width="110px"></el-table-column>
                <el-table-column label="商品重量" prop="goods_weight" width="80px"></el-table-column>
                <el-table-column label="创建时间" prop="add_time" width="140px">
                    <template slot-scope="scope">
                        {{scope.row.add_time | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                background>
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import { goodsListMockData } from '@/mock/mock'
export default {
    name: 'List',

    data() {
        return {
            queryInfo: { // 查询参数
                query: '',
                pagenum: 1,
                pagesize: 5,
            },
            goodsList: [], // 商品类别
            total: 0,
        };
    },

    mounted() {
        this.getGoodsList();
    },

    methods: {
        // 分页获取对应的商品列表
        getGoodsList() {
            // this.$http.get('/goods', {params: this.queryInfo})
            this.goodsList = goodsListMockData['data'].filter(item => item.goods_name.includes(this.queryInfo.query));
            this.total = this.goodsList.length;
            // this.$message.success('获取商品类别成功')
        },
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize;
            this.getGoodsList();
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage;
            // this.getGoodsList();
        },

        async removeById(id) {
            // this.$confirm
            // this.goodsList = this.goodsList
            const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if(confirmResult !== 'confirm') {
                return this.$message.info('已取消删除');
            }
            // this.$http.delete(`goods/${id}`)
            this.goodsList = this.goodsList.filter(item => item.goods_id !== id);
        },

        goAddPage() {
            this.$router.push('/goods/add')
        },

    },
};
</script>

<style lang="less" scoped>

</style>