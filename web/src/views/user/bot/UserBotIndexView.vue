<template lang="">
    <ContentField>我的bot</ContentField>
</template>

<script>
import ContentField from "@/components/ContentField.vue"
import $ from 'jquery'
import { useStore } from "vuex";

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();

        // $.ajax({
        //     url: "http://localhost:8088/user/bot/add",
        //     type: "post",
        //     data: {
        //         title: "bot的标题",
        //         description: "bot的描述",
        //         content: "bot的代码"
        //     },
        //     headers: {
        //         Authorization: "Bearer " + store.state.user.token,
        //     },
        //     success(resp) {
        //         console.log(resp)
        //     },
        //     error(resp) {
        //         console.log(resp);
        //     }
        // })

        // $.ajax({
        //     url: "http://localhost:8088/user/bot/remove",
        //     type: "post",
        //     data: {
        //         bot_id: 3,
        //     },
        //     headers: {
        //         Authorization: "Bearer " + store.state.user.token,
        //     },
        //     success(resp) {
        //         console.log(resp)
        //     },
        //     error(resp) {
        //         console.log(resp);
        //     }
        // })

        // $.ajax({
        //     url: "http://localhost:8088/user/bot/update",
        //     type: "post",
        //     data: {
        //         bot_id: 3,
        //         title: "bot的标题3",
        //         description: "bot的描述3",
        //         content: "bot的代码3"
        //     },
        //     headers: {
        //         Authorization: "Bearer " + store.state.user.token,
        //     },
        //     success(resp) {
        //         console.log(resp)
        //     },
        //     error(resp) {
        //         console.log(resp);
        //     }
        // })

        // $.ajax({
        //     url: "http://localhost:8088/user/bot/getlist",
        //     type: "get",
        //     headers: {
        //         Authorization: "Bearer " + store.state.user.token,
        //     },
        //     success(resp) {
        //         console.log(resp)
        //     },
        //     error(resp) {
        //         console.log(resp);
        //     }
        // })
    }
}
</script>

<style scoped></style>