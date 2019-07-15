import Vue from "vue";
import Router from "vue-router";
import Login from "@/container/Login";
import Signin from "@/container/Login/Signin";
import Signup from "@/container/Login/Signup";
import Edit from "@/container/Edit";
import List from "@/container/List";
import Blog from "@/container/BlogDetail/";
import Setting from "@/container/Setting";
import About from "@/container/About";

Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      redirect: "list"
    },
    {
      path: "/user",
      component: Login,
      children: [
        {
          path: "signin",
          component: Signin
        },
        {
          path: "signup",
          component: Signup
        }
      ]
    },
    {
      path: "/edit",
      name: "edit",
      component: Edit
    },
    {
      path: "/list",
      name: "list",
      component: List
    },
    {
      path: "/blog/:id",
      name: "blog",
      component: Blog
    },
    {
      path: "/setting",
      name: "setting",
      component: Setting
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
router.beforeEach((to, from, next) => {
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
});
export default router;
