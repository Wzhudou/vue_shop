<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品添加</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!-- 提示区域 -->
            <el-alert
                title="添加商品区域"
                type="info"
                center
                :closable="false"
                show-icon>
          </el-alert>
          <!-- 步骤条区域 -->
          <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>

          <!-- tabs区域 -->
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
            <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="tabClick">
                <el-tab-pane label="基本信息" name="0">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="addForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goods_price">
                        <el-input v-model="addForm.goods_price" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goods_weight">
                        <el-input v-model="addForm.goods_weight" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_number">
                        <el-input v-model="addForm.goods_number" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                        <el-cascader
                            v-model="addForm.goods_cat"
                            :options="cateList"
                            :props="cateProps"
                            @change="handleChange"></el-cascader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name="1">
                    <!-- 渲染表单的item项 -->
                    <el-form-item v-for="item in manyTableData" :label="item.attr_name" :key="item.attr_id">
                        <el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox v-for="(item, index) in item.attr_vals" :key="index" :label="item" border>

                            </el-checkbox>
                          </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品属性" name="2">
                    <el-form-item v-for="item in onlyTableData" :key="item.attr_id" :label="item.attr_name">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name="3">
                    <!-- action 表示图片要上传的后台api地址 http://127.0.0.1:8888/api/private/v1/-->
                    <el-upload
                        class="upload-demo"
                        action="#"
                        :headers="headerObj"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :on-change="handleChange"
                        list-type="picture"
                        :auto-upload="false">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name="4">
                    <!-- 富文本编辑器组件 -->
                    <quill-editor
                        ref="myQuillEditor"
                        v-model="addForm.goods_introduce"></quill-editor>
                    <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
                </el-tab-pane>
            </el-tabs>
            </el-form>


        </el-card>
        <!-- 图片预览区域 -->
        <el-dialog
            title="图片预览"
            :visible.sync="previewDialogVisable"
            width="50%">
            <img :src="previewPath" alt="" class="previewImg">
        </el-dialog>
    </div>
</template>

<script>
    import { cateListMockData, addGoodsMockData } from '@/mock/mock'
    import _ from 'lodash';
export default {
    name: 'Add',

    data() {
        return {
            activeIndex: '0',
            // 添加商品的表单数据对象
            addForm: {
                goods_name: '',
                goods_price: 0,
                goods_weight: 0,
                goods_number: 0,
                goods_cat: [], // 以逗号分割的字符串
                pics: [], // 图片的数组
                goods_introduce: '', // 商品的详情描述
                attrs: [], //
            },

            addFormRules: {
                goods_name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur'},
                ],
                goods_price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur'},
                ],
                goods_weight: [
                    { required: true, message: '请输入商品重量', trigger: 'blur'},
                ],
                goods_number: [
                    { required: true, message: '请输入商品数量', trigger: 'blur'},
                ],
                goods_cat: [
                    { required: true, message: '请选择商品分类', trigger: 'change'},
                ]
            },
            cateList: [], // 商品分类列表
            cateProps: {
                label: 'cate_name',
                value: 'cate_id',
                children: 'children',
                expandTrigger: 'hover'
            },
            manyTableData: [], // 动态参数列表数据
            onlyTableData: [], // 静态属性列表数组
            headerObj: { // 上传文件headers请求头对象
                Authorization: window.sessionStorage.getItem('token'),
            },
            previewPath: '', // 预览图片
            previewDialogVisable: false,
        };
    },

    mounted() {
        this.getCateList();
    },

    methods: {
        // 获取所有的商品分类数据
        getCateList() {
            // this.$http.get('categories')
            this.cateList = cateListMockData.data;
            // console.log('this.', this.cateList);
            
        },
        handleChange() {

        },
        // tabs标签页离开之前的处理
        beforeTabLeave(activeName, oldActiveName) {
            if(oldActiveName === '0' && !this.addForm.goods_cat.length) {
                this.$message.error('请先选择商品分类');
                return false;
            }
                        
        },
        // 点击tabs标签页
        tabClick() {
            // 证明访问的是动态参数面板
            if(this.activeIndex === '1') {
                // this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: 'many'}})
                this.manyTableData = JSON.parse(JSON.stringify(addGoodsMockData['data']));
                this.manyTableData.forEach(item => {
                    item.attr_vals = item.attr_vals.length ? item.attr_vals.split(' ') : '';
                });
            }
            if(this.activeIndex === '2') {
                this.onlyTableData = JSON.parse(JSON.stringify(addGoodsMockData['only']));
                // this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: 'only'}})

            }
        },
        // 处理图片预览效果
        handlePreview(file) {
            // console.log('file', file);
            // this.previewPath = file.response.data.url;
            const previewPath = 'E:\\new_vue\\vue\\移动Web开发课程资料\\移动Web开发课程资料\\day04\\01-案例\\03-小兔鲜儿-PC\\小兔鲜儿-个人中心\\uploads\\';
            this.previewPath = previewPath + file.name;
            this.previewDialogVisable = true;
        },
        // 处理移除图片的操作
        handleRemove(file) {
            // 1 获取将要删除的图片路径
            const filepath = file.name; // action： #
            // const filepath = file.response.data.path; action: 后段地址

            // 2 从pics数组中，找到这个图片对应的索引值
            const index = this.addForm.pics.findIndex(item => item.pic === filepath);

            // 3 调用数组的splice方法，把图片信息对象，从pics数组中移出
            this.addForm.pics.splice(index, 1);
            
        },
        // 如果action = # 使用这个
        handleChange(file) {
            if(!file.name) {return;}
            // 1 拼接得到图片信息对象
            const picInfo = {
                pic: file.name // response.data.path, //'teststs'
            };
            // 2 将图片信息对象push到数组中
            this.addForm.pics.push(picInfo);            
        },
        // 监听图片上传成功的事件 action有具体后端地址使用这个
        handleSuccess(response) {
            // 1 拼接得到图片信息对象
            const picInfo = {
                pic: response.data.path, //'teststs'
            };
            // 2 将图片信息对象push到数组中
            this.addForm.pics.push(picInfo);
        },
        // 添加商品
        add() {
            this.$refs.addFormRef.validate(valid => {
                if(!valid) {return this.$message.error('请填写必要的表单项!');}
                // 执行添加业务逻辑
                // lodash cloneDeep(obj)
                const form = _.cloneDeep(this.addForm);
                form.goods_cat = form.goods_cat.join(',');

                // 动态参数
                this.manyTableData.forEach(item => {
                    const newInfo = {
                        attr_id: item.attr_id,
                        attr_value: item.attr_vals.join(' '),
                    };
                    this.addForm.attrs.push(newInfo);
                });
                // 静态属性
                this.onlyTableData.forEach(item => {
                    const newInfo = {
                        attr_id: item.attr_id,
                        attr_value: item.attr_vals,
                    };
                    this.addForm.attrs.push(newInfo);
                });
                form.attrs = this.addForm.attrs;
                // console.log('ffff', form);
                // 发起请求，添加商品 商品的名称必须是唯一的
                // this.$https.post('goods', form)
                this.$router.push('/goods');
            });
            
        },
    },
    computed: {
        cateId() {
            const length = this.addForm.goods_cat.length;
            if(length) {
                return this.addForm.goods_cat[length - 1];
            }
            return null;
        }
    },
};
</script>

<style lang="less" scoped>
.el-checkbox {
    margin: 0 10px 0 0!important;
}
.previewImg {
    width: 100%;
}
.btnAdd {
    margin-top: 15px;
}
</style>