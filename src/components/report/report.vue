<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div id="main" style="width: 600px;height:400px;"></div>
        </el-card>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    import { echartsMockData } from '@/mock/mock.js';

    export default {
        name: 'report',
        // 只要执行到mouted，此时页面上的元素，已经被渲染完毕了
        mounted () {

            this.drawEcharts();
        },
        methods: {
            drawEcharts() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                // this.$http.get('report/type/1')
                // 指定图表的配置项和数据
                var option = echartsMockData['data'];

                // 5、使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },
    };
</script>

<style lang="less" scoped>

</style>