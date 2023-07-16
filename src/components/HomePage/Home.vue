<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="@/assets/heima.png" alt="">
                <span>电商后台管理系统</span>
            </div>  
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区域 -->
                <!-- 
                    unique-opened菜单一次只能打开一个 
                    collapse 侧边栏折叠
                    collapse-transition 侧边栏折叠动画
                    router 开启路由模式
                -->
                <el-menu
                    :unique-opened="true"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :default-active="activePath"
                    router
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409bff">
                    <!-- 一级菜单 -->
                    <el-submenu v-for="item in menuList" :index="item.id+ ''" :key="item.id">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item 
                            v-for="subItem in item.children" 
                            :index="'/' + subItem.path" 
                            :key="subItem.id" 
                            @click="saveNavState('/' + subItem.path)">
                           <!-- 图标 -->
                            <i class="el-icon-menu"></i>
                            <!-- 文本 -->
                            <span>{{subItem.authName}}</span>
                        </el-menu-item>
                        
                    </el-submenu>
                    
                </el-menu>
            </el-aside>
            <!-- 右侧主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import { menuList} from '@/mock/mock.js'
    export default {
        name: 'Home',
        data() {
            return {
                menuList: [],
                iconsObj: {
                    0: 'iconfont icon-user',
                    1: 'iconfont icon-tijikongjian',
                    2: 'iconfont icon-shangpin',
                    3: 'iconfont icon-danju',
                    4: 'iconfont icon-baobiao',
                },
                isCollapse: false,
                activePath: '', // 被激活的链接地址
            }
        },
        created () {
            this.getMenuList();
            this.activePath = sessionStorage.getItem('activePath');
        },
        methods: {
            logout() {
                sessionStorage.clear();
                this.$router.push('/login');
            },
            // 获取所有的菜单
            getMenuList() {
                // 获取菜单接口 - menus（还没有）this.$http.get('menus)
                // 先使用mock数据
                const data = menuList['data'];
                this.menuList = data;
                // console.log('data', this.menuList);
            },
            // 点击按钮切换菜单的折叠与展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            },
            // 保存链接的激活状态
            saveNavState(activePath) {
                sessionStorage.setItem('activePath', activePath);
                this.activePath = activePath;
            },
        },
    }
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0;
        color: #ffffff;
        font-size: 20px;
        div {
            display: flex;
            align-items: center;
            span {
                margin-left: 15px;
            }
        }
    }
    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none; // 取消menu右侧对不齐问题
        }
        .toggle-button {
            background-color: #4a5064;
            font-size: 10px;
            line-height: 24px;
            color: #ffffff;
            text-align: center;
            letter-spacing: 0.2em;
            cursor: pointer;
        }
    }
    .el-main {
        background-color: #eaedf1;
    }
    .iconfont {
        margin-right: 10px;
    }
}
</style>