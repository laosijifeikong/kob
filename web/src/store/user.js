import $ from 'jquery'

export default {
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,
        pulling_info: true,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },

        updateToken(state, token) {
            state.token = token;
        },

        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.token = "";
            state.is_login = false;
        },

        updatePullingInfo(state, pulling_info) {
            state.pulling_info = pulling_info
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "https://app7191.acapp.acwing.com.cn/api/user/account/token",
                // url: "http://localhost:8088/api/user/account/token",
                type: "post",
                data: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
                contentType: "application/json", // 必须要设置为 application/json
                success(resp) {
                    if (resp.message === "success") {
                        localStorage.setItem("jwt_token", resp.token);
                        context.commit("updateToken", resp.token)
                        data.success(resp);
                    }
                    else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                }
            });
        },

        getInfo(context, data) {
            $.ajax({
                url: "https://app7191.acapp.acwing.com.cn/api/user/account/info",
                // url: "http://localhost:8088/api/user/account/info",
                type: "get",
                headers: {
                    Authorization: "Bearer " + context.state.token
                },
                success(resp) {
                    if (resp.message === "success") {
                        context.commit("updateUser", {
                            ...resp,
                            is_login: true,
                        })
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                }
            })
        },

        logout(context) {
            localStorage.removeItem("jwt_token");
            context.commit("logout");
        }
    },
    modules: {
    }
}