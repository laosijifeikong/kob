<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default {
  components: {
    NavBar
  },
  setup() {
    // $.ajax({
    //   url: "http://localhost:8088/user/account/info",
    //   type: "get",
    //   headers: {
    //     Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMTI2YjM5MjVmNDM0YTZkYmFkZmMyMTk3MWJiYWJmMSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcyNzg1MjMxOCwiZXhwIjoxNzI5MDYxOTE4fQ.nRodz1vbfgS1YDphzpaxmXRkudC367OmJzZhUzGPi8E"
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // })

    // $.ajax({
    //   url: "http://localhost:8088/user/account/register",
    //   type: "post",
    //   data: {
    //     username: "zhangsan",
    //     password: "123",
    //     confirmedPassword: "123",
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // })
  }
}
</script>

<style>
body {
  background-image: url(@/assets/images/background.png);
  background-size: cover;
}
</style>