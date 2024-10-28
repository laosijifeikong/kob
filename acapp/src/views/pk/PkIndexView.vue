<template lang="">
    <ContentField>
        <PlayGround v-if="$store.state.pk.status === 'playing'"></PlayGround>
        <MatchGround v-if="$store.state.pk.status === 'matching'"></MatchGround>
        <ResultBoard v-if="$store.state.pk.loser != 'none'"></ResultBoard>
        <div class="user-color" v-if="$store.state.pk.status === 'playing' && parseInt($store.state.user.id) === parseInt($store.state.pk.a_id)">左下角</div>
        <div class="user-color" v-if="$store.state.pk.status === 'playing' && parseInt($store.state.user.id) === parseInt($store.state.pk.b_id)">右上角</div>
    </ContentField> 
</template>

<script>
import ContentField from "@/components/ContentField.vue";
import PlayGround from "@/components/PlayGround.vue"
import MatchGround from "@/components/MatchGround.vue"
import ResultBoard from "@/components/ResultBoard.vue"
import { onMounted, onUnmounted } from "vue";
import { useStore } from 'vuex'

export default {
    components: {
        ContentField,
        PlayGround,
        MatchGround,
        ResultBoard,
    },
    setup() {
        const store = useStore();
        const socketUrl = `wss://app7191.acapp.acwing.com.cn/websocket/${store.state.user.token}`;
        // const socketUrl = `ws://localhost:8088/websocket/${store.state.user.token}`;

        store.commit("updateLoser", "none");
        store.commit("updateIsRecord", false);

        let socket = null;
        onMounted(() => {
            store.commit("updateOpponent", {
                username: "我的对手",
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            })

            socket = new WebSocket(socketUrl)

            socket.onopen = () => {
                console.log("connected!");
                store.commit("updateSocket", socket)
            }

            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.event === "start-matching") { //匹配成功
                    store.commit("updateOpponent", {
                        username: data.opponent_username,
                        photo: data.opponent_photo,
                    })
                    store.commit("updateGame", data.game);
                    setTimeout(() => {
                        store.commit("updateStatus", "playing")
                    }, 2000)
                } else if (data.event === "move") {
                    console.log(data);
                    const game = store.state.pk.gameObject;
                    if (game && Array.isArray(game.snakes) && game.snakes.length >= 2) {
                        const [snake0, snake1] = game.snakes;
                        if (snake0 && snake1) {
                            snake0.set_direction(data.a_direction);
                            snake1.set_direction(data.b_direction);
                        } else {
                            console.warn("One or both snakes are not initialized.");
                        }
                    } else {
                        console.warn("GameObject or snakes are not initialized yet.");
                    }
                } else if (data.event === "result") {
                    console.log(data);
                    const game = store.state.pk.gameObject;
                    if (game != null) {
                        const [snake0, snake1] = game.snakes;

                        if (data.loser === "all") {
                            snake0.status = snake1.status = "die";
                        }
                        else if (data.loser === "A") {
                            snake0.status = "die";
                        }
                        else if (data.loser === "B") {
                            snake1.status = "die";
                        }
                        store.commit("updateLoser", data.loser);
                    }

                }
            }

            socket.onclose = () => {
                console.log("disconnected!");  //socket.onopen,socket.onmessage,socket.onclose只需定义好内容就能生效且生效速度在取消钩子函数之前
            }
        })

        onUnmounted(() => {
            socket.close();
            store.commit("updateStatus", "matching")
        })
    }
}
</script>

<style scoped>
div.user-color {
    text-align: center;
    color: white;
    font-size: 30px;
    font-weight: 600;
}
</style>