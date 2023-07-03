<template>
    <div class="login-container">
        <div class="login-box">
            <!-- 头像区域 -->
            <div class="avatar-box">
                <img src="@/assets/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0" class="login-form">
                <!-- 用户名 -->
                <el-form-item label="" prop="username">
                  <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="" prop="password">
                    <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginFrom">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                // 登录表单的数据绑定对象
                loginForm: {
                    username: 'zhangsan',
                    password: 'zjang22',
                },
                // 表单验证规则对象
                loginFormRules: {
                    // 验证用户名是否合法
                    username: [
                        { required: true, message: '请输入登录名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    // 验证密码是否合法
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            // 点击重置按钮，重置登录表单
            resetLoginFrom() {
                this.$refs.loginFormRef.resetFields();
            },

            login() {
                this.$refs.loginFormRef.validate((valid) => {
                    // console.log(valid);
                    if (!valid) {
                        return;
                    }
                    // 接口还未写
                    // 先成功
                    // 请求接口，根据code查看是否登录成功
                    this.$message.success('登录成功!');
                    // 自定义个token，后续用真实的
                    // 1、将登录成功之后的token，保存到客户端的sessionStorage中
                    const token = 'test1111';
                    sessionStorage.setItem('token', token);
                    // 2、通过编程式导航跳转到后台主页，路由地址是/home
                    this.$router.push('/home');
                })
            },
        },
    }
</script>

<style lang="less" scoped>
.login-container {
    background-color: #2b4b6b;
    height: 100%;
    .login-box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        /* 头像 */
        .avatar-box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            background-color: #fff;

            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }

        /* 登录 */
        .login-form {
            width: 100%;
            position: absolute;
            bottom: 0;
            padding: 0 20px;
            box-sizing: border-box;
            .btns {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>