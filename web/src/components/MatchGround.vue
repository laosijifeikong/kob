<template>
    <div class="matchground">
        <div class="row">
            <div class="col-4">
                <div class="user_photo">
                    <img :src="$store.state.user.photo" alt="">
                </div>
                <div class="user_username">
                    {{ $store.state.user.username }}
                </div>
            </div>
            <div class="col-4">
                <div class="user_select_bot">
                    <select v-model="select_bot" class="form-select" aria-label="Default select example">
                        <option value="-1" selected>亲自上阵</option>
                        <option v-for="bot in bots" :key="bot.id" :value="bot.id">
                            {{ bot.title }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="user_photo">
                    <img :src="$store.state.pk.opponent_photo" alt="">
                </div>
                <div class="user_username">
                    {{ $store.state.pk.opponent_username }}
                </div>
            </div>
            <div class="col-12" style="text-align: center; padding-top: 15vh;">
                <button type="button" class="btn btn-outline-warning btn-lg" @click="click_match_btn">{{
                    match_btn_info }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';

export default {
    components: {

    },
    setup() {
        const store = useStore();
        let match_btn_info = ref("开始匹配");
        let bots = ref([]);
        let select_bot = ref("-1");

        const click_match_btn = () => {
            if (match_btn_info.value === "开始匹配") {
                match_btn_info.value = "取消";
                console.log(select_bot);
                store.state.pk.socket.send(JSON.stringify({
                    event: "start-matching",
                    bot_id: select_bot.value,
                }))
            } else {
                match_btn_info.value = "开始匹配"
                store.state.pk.socket.send(JSON.stringify({
                    event: "stop-matching",
                }))
            }
        }

        const refresh_bots = () => {
            $.ajax({
                url: "http://localhost:8088/user/bot/getlist",
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token
                },
                success(resp) {
                    bots.value = resp;
                },
                error(resp) {
                    console.log(resp);
                }
            })
        }

        refresh_bots();

        return {
            match_btn_info,
            click_match_btn,
            bots,
            select_bot,
        }
    }
}

</script>

<style scoped>
div.matchground {
    width: 60vw;
    height: 70vh;
    background: rgba(50, 50, 50, 0.5);
    margin: 40px auto;
}

div.user_photo {
    text-align: center;
    padding-top: 10vh;
}

div.user_photo>img {
    border-radius: 50%;
    width: 20vh;
}

div.user_username {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: white;
    padding-top: 10px;
}

div.user_select_bot {
    padding-top: 20vh;
}

div.user_select_bot>select {
    width: 60%;
    margin: 0 auto;
}
</style>
