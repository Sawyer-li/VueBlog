import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/container/Register'
import Login from '@/container/Login'
import Edit from '@/container/Edit'
import List from  '@/container/List'
import Blog from '@/container/BlogDetail/'
import Setting from '@/container/Setting'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'main',
    redirect: 'list'
  },{
    path: '/register',
    name: 'Register',
    component: Register 
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/edit',
    name: 'edit',
    component: Edit
  },{
    path: '/list',
    name: 'list',
    component: List
  },{
    path: '/blog/:id',
    name: 'blog',
    component: Blog
  },{
    path: '/setting',
    name: 'setting',
    component: Setting
  }]
})
router.beforeEach((to, from, next)=> {
  next();
    // if(!sessionStorage.getItem('isLogin')){
    //     axios.get('/api/user/isLogin').then((res) =>{
    //         if(res.data.isLogin == true){
    //           sessionStorage.setItem('isLogin', 'true');
    //           sessionStorage.setItem('userName', res.data.userName);
    //         }else{
    //           sessionStorage.setItem('isLogin','false');
    //         }
    //         next();
    //     }) 
    // }else{
    //   next(); 
    // }
})
export default router;
