<template lang="">
    <div class="loginground">
        <div class="row justify-content-md-center">
            <div class="col-11">
                <form @submit.prevent = "login">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model = "username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model = "password" type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class = "error-message">{{ message }}</div>
                    <button type="submit" class="btn btn-primary">提交</button>
                </form>
                <div style="text-align: center; margin-top: 20px; cursor: pointer;" @click="acwing_login">
                    <img src="https://cdn.acwing.com/media/article/image/2022/09/06/1_32f001fd2d-acwing_logo.png" alt="">
                    <br>
                    AcWing一键登陆
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import router from "@/router/index"
import $ from "jquery";

export default {
    components: {
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let message = ref('');

        const login = () => {
            message.value = "";
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    store.dispatch("getInfo", {
                        success() {
                            router.push({ name: 'home' });
                            console.log(store.state.user)
                        }
                    })
                },
                error() {
                    message.value = "用户名或密码错误";
                }
            })
        }

        const acwing_login = () => {
            $.ajax({
                url: "https://app7191.acapp.acwing.com.cn/api/user/account/acwing/web/apply_code",
                type: "GET",
                success: resp => {
                    if (resp.result === "success") {
                        window.location.replace(resp.apply_code_url)
                    }
                }
            })
        }

        return {
            username,
            password,
            message,
            login,
            acwing_login,
        }
    }

}
</script>

<style scoped>
button {
    width: 100%;
}

div.error-message {
    color: red;
}

div.loginground {
    width: 25vw;
    height: 45vh;
    background: rgba(50, 50, 50, 0.5);
    margin: 40px auto;
}

div.mb-3 {
    color: white;
}
</style>