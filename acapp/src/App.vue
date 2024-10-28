<template>
  <div class="game-body">
    <MenuView v-if="$store.state.router.router_name === 'menu'" />
    <PkIndexViewVue v-else-if="$store.state.router.router_name === 'pk'" />
    <RecordIndexViewVue v-else-if="$store.state.router.router_name === 'record'" />
    <RecordContentViewVue v-else-if="$store.state.router.router_name === 'record_content'" />
    <RanklistIndexViewVue v-else-if="$store.state.router.router_name === 'ranklist'" />
    <UserBotIndexViewVue v-else-if="$store.state.router.router_name === 'user_bot'" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import MenuView from './views/MenuView.vue'
import PkIndexViewVue from "./views/pk/PkIndexView.vue"
import RecordIndexViewVue from "./views/record/RecordIndexView.vue"
import RecordContentViewVue from "./views/record/RecordContentView.vue"
import RanklistIndexViewVue from "./views/ranklist/RanklistIndexView.vue"
import UserBotIndexViewVue from "./views/user/bot/UserBotIndexView.vue"


export default {
  components: {
    MenuView,
    PkIndexViewVue,
    RecordIndexViewVue,
    RecordContentViewVue,
    RanklistIndexViewVue,
    UserBotIndexViewVue,
  },
  setup() {
    const store = useStore();

    const jwt_token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwOTJlNTlkMjRmNmM0YmQ5ODQyMjM3OGYzZGY0NjQ5MiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcyOTc4MjMxNCwiZXhwIjoxNzMwOTkxOTE0fQ.5uqrdpaajiAaRxXSafEiWcSgKGrd611Z5A05qQnf_OQ";
    if (jwt_token) {
      store.commit("updateToken", jwt_token);
      store.dispatch("getInfo", {
        success() {
          store.commit("updatePullingInfo", false);
        },
        error(resp) {
          console.log(resp)
        }
      })
    } else {
      store.commit("updatePullingInfo", false);
    }
  }
}
</script>


<style>
body {
  margin: 0;
}

div.game-body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
}


div.window {
  width: 100vw;
  height: 100vh;
}
</style>
