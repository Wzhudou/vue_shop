import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js';
// 导入全局样式表
import './assets/css/global.css';

// 导入字体图标
import './assets/fonts/iconfont.css';

// 导入树形表格插件
import TreeTable from 'vue-table-with-tree-grid';
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme



// 全局配置axios
import axios from 'axios';
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/';
axios.interceptors.request.use(config => {
  // console.log('config', config);
  config.headers.Authorization = sessionStorage.getItem('token');
  return config;
});
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
// 注册全局可用组件
Vue.component('tree-table', TreeTable);
// 富文本编辑器注册为全局可用
Vue.use(VueQuillEditor);

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + '').padStart(2, '0');
  const d = (dt.getDate() + '').padStart(2, '0');

  const hh = (dt.getHours() + '').padStart(2, '0');
  const mm = (dt.getMinutes() + '').padStart(2, '0');
  const ss = (dt.getSeconds() + '').padStart(2, '0');
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
