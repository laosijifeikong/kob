<template lang="">
    <ContentField>
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <div class="card">
                        <div class="card-body">
                            <img :src="$store.state.user.photo" alt="" style="width: 100%;">
                        </div> 
                    </div>
                </div>
                <div class="col-9">
                    <div class="card">
                        <div class="card-header">
                            <span style= "font-size: 130%">我的Bot</span>
                            <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#add-bot-btn">
                                创建Bot
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="add-bot-btn" tabindex="-1">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5">创建Bot</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="add_bot_title" class="form-label">名称</label>
                                                <input v-model="botadd.title" type="text" class="form-control" id="add_bot_title" placeholder="请输入Bot名称">
                                            </div>
                                            <div class="mb-3">
                                                <label for="add_bot_description" class="form-label">简介</label>
                                                <textarea v-model="botadd.description" class="form-control" id="add_bot_description" rows="3" placeholder="请输入Bot简介"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label for="add_bot_code" class="form-label">代码</label>
                                                <VAceEditor v-model:value="botadd.content" @init="editorInit" lang="c_cpp"
                                                    theme="textmate" style="height: 300px" :options="{
                                                        enableBasicAutocompletion: true, //启用基本自动完成
                                                        enableSnippets: true, // 启用代码段
                                                        enableLiveAutocompletion: true, // 启用实时自动完成
                                                        fontSize: 18, //设置字号
                                                        tabSize: 4, // 标签大小
                                                        showPrintMargin: false, //去除编辑器里的竖线
                                                        highlightActiveLine: true,
                                                    }" />
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <div class="message">{{ botadd.message }}</div>
                                            <button type="button" class="btn btn-primary" @click="add_bots">创建</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="card-body">
                            <table class="table table-success table-striped">
                                <thead>
                                    <tr>
                                        <th>Bot名称</th>
                                        <th>创建时间</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="bot in bots" :key="bot.id">
                                        <td>{{ bot.title}}</td>
                                        <td>{{ bot.createtime}}</td>
                                        <td>
                                            <button type="button" class="btn btn-secondary" style="margin-right: 10px"  data-bs-toggle="modal" :data-bs-target="'#update-bot-modal-' + bot.id">修改</button>
                                            <button type="button" class="btn btn-danger" @click="remove_bots(bot)">删除</button>
                                        </td>

                                        <!-- Modal -->
                                        <div class="modal fade" :id="'update-bot-modal-' + bot.id" tabindex="-1">
                                            <div class="modal-dialog modal-xl">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">创建Bot</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="mb-3">
                                                        <label for="add-bot-title" class="form-label">名称</label>
                                                        <input v-model="bot.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入Bot名称">
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="add-bot-description" class="form-label">简介</label>
                                                        <textarea v-model="bot.description" class="form-control" id="add-bot-description" rows="3" placeholder="请输入Bot简介"></textarea>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="add-bot-code" class="form-label">代码</label>
                                                        <VAceEditor v-model:value="bot.content" @init="editorInit" lang="c_cpp"
                                                            theme="textmate" style="height: 300px" :options="{
                                                                enableBasicAutocompletion: true, //启用基本自动完成
                                                                enableSnippets: true, // 启用代码段
                                                                enableLiveAutocompletion: true, // 启用实时自动完成
                                                                fontSize: 18, //设置字号
                                                                tabSize: 4, // 标签大小
                                                                showPrintMargin: false, //去除编辑器里的竖线
                                                                highlightActiveLine: true,
                                                            }" />
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <div class="message">{{ bot.message }}</div>
                                                    <button type="button" class="btn btn-primary" @click="update_bots(bot)">保存修改</button>
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="refresh_bots">取消</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContentField>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery'
import { Modal } from 'bootstrap/dist/js/bootstrap';
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/ext-language_tools';
import ContentField from "@/components/ContentField.vue"

export default {
    components: {
        VAceEditor,
        ContentField
    },
    setup() {
        ace.config.set(
            "basePath",
            "https://cdn.jsdelivr.net/npm/ace-builds@" +
            require("ace-builds").version +
            "/src-noconflict/")

        const store = useStore();
        let bots = ref([]);

        const botadd = reactive({
            title: "",
            description: "",
            content: "",
            message: "",
        })

        const refresh_bots = () => {
            $.ajax({
                url: "https://app7191.acapp.acwing.com.cn/api/user/bot/getlist",
                // url: "http://localhost:8088/api/user/bot/getlist",
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

        const add_bots = () => {
            botadd.message = "";
            $.ajax({
                url: "https://app7191.acapp.acwing.com.cn/api/user/bot/add",
                // url: "http://localhost:8088/api/user/bot/add",
                type: "post",
                data: {
                    title: botadd.title,
                    description: botadd.description,
                    content: botadd.content,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token
                },
                success(resp) {
                    console.log(resp);
                    if (resp.message === "success") {
                        botadd.title = "";
                        botadd.description = "";
                        botadd.content = "";
                        Modal.getInstance("#add-bot-btn").hide();
                        refresh_bots();
                    } else {
                        botadd.message = resp.message;
                    }
                },
                error(resp) {
                    console.log(resp);
                }
            })
        }

        const remove_bots = (bot) => {
            $.ajax({
                url: "https://app7191.acapp.acwing.com.cn/api/user/bot/remove",
                // url: "http://localhost:8088/api/user/bot/remove",
                type: "post",
                data: {
                    bot_id: bot.id
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token
                },
                success(resp) {
                    if (resp.message === "success") {
                        refresh_bots();
                    }
                }
            })
        }

        const update_bots = (bot) => {
            $.ajax({
                url: "https://app7191.acapp.acwing.com.cn/api/user/bot/update",
                // url: "http://localhost:8088/api/user/bot/update",
                type: "post",
                data: {
                    bot_id: bot.id,
                    title: bot.title,
                    description: bot.description,
                    content: bot.content
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    console.log(resp);
                    if (resp.message === "success") {
                        Modal.getInstance('#update-bot-modal-' + bot.id).hide();
                        refresh_bots();
                    } else {
                        bot.message = resp.message;
                    }
                },
                error(resp) {
                    console.log(resp);
                }
            })
        }

        return {
            bots,
            botadd,
            refresh_bots,
            add_bots,
            remove_bots,
            update_bots,
        }
    }
}
</script>

<style scoped>
div.container {
    margin-top: 20px;
}

div.message {
    color: red;
}
</style>