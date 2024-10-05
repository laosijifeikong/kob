import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '@/views/pk/PkIndexView'
import RanklistIndexView from '@/views/ranklist/RanklistIndexView'
import RecordIndexView from '@/views/record/RecordIndexView'
import UserBotIndexView from '@/views/user/bot/UserBotIndexView'
import NotFound from '@/views/error/NotFound'
import UserAccountLoginView from '@/views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '@/views/user/account/UserAccountRegisterView'
import store from '@/store/index'

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk"
  },
  {
    path: "/pk",
    name: "pk_index",
    component: PkIndexView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: "/record",
    name: "record_index",
    component: RecordIndexView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: "/ranklist",
    name: "ranklist_index",
    component: RanklistIndexView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: "/user/bot",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta: {
      requestAuth: true
    }
  },
  {
    path: "/user/account/login",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta: {
      requestAuth: false
    }
  },
  {
    path: "/user/account/register",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta: {
      requestAuth: false
    }
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    meta: {
      requestAuth: false
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let jwt_token = localStorage.getItem('jwt_token');

  if (jwt_token) {
    store.commit("updatePullingInfo", true);
    // 如果 token 存在，并且用户信息还未获取过
    if (!store.state.user.is_login) {
      store.commit("updateToken", jwt_token);
      console.log(jwt_token);
      store.dispatch("getInfo", {
        success() {
          next(); // 获取用户信息成功后继续导航
        },
        error() {
          // 如果获取失败可以根据情况处理
          alert("token无效,请重新登录!");
        }
      });
    }
    else {
      next(); // 已经登录的情况，继续导航
    }
  }
  else {
    // 如果目标路由需要认证，但用户未登录
    if (to.meta.requestAuth && !store.state.user.is_login) {
      next({ name: "user_account_login" });
    }
    else {
      store.commit("updatePullingInfo", false);
      next(); // 如果目标路由不需要认证，继续导航
    }
  }
});


export default router
