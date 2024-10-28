<template lang="">
    <ContentField>
        <table class="table table-success table-striped" style="text-align: center;">
            <thead>
                <tr>
                    <th>玩家</th>
                    <th>天梯分</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" >
                    <td>
                        <img :src="user.photo" alt="" class="user-photo">
                        &nbsp;
                        <span class="user-username">{{ user.username }}</span>
                    </td>
                    <td>{{ user.rating }}</td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" @click="click_page(-2)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                    <li :class="'page-item ' + page.is_active" v-for="page in pages" :key="page.number" @click="click_page(page.number)">
                        <a class="page-link" href="#">{{ page.number }}</a>
                    </li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" @click="click_page(-1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </ContentField>
</template>

<script>
import ContentField from "@/components/ContentField.vue"
import { useStore } from "vuex"
import $ from 'jquery'
import { ref } from "vue"

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let users = ref([]);
        let current_page = 1;
        let total_users = 0;
        let pages = ref([]);

        const click_page = nextpage => {
            if (nextpage === -2) nextpage = current_page - 1;
            else if (nextpage === -1) nextpage = current_page + 1;
            let max_pages = parseInt(Math.ceil(total_users / 10));

            if (nextpage >= 1 && nextpage <= max_pages) {
                pull_page(nextpage);
            }
        }

        const update_pages = () => {   //控制显示页数数字
            let max_pages = parseInt(Math.ceil(total_users / 10));
            let new_pages = [];
            for (let i = current_page - 2; i <= current_page + 2; i++) {
                if (i >= 1 && i <= max_pages) {
                    new_pages.push({
                        number: i,
                        is_active: i === current_page ? "active" : "",
                    });
                }
            }
            pages.value = new_pages;
        }

        const pull_page = page => {   //拉取页面后更新显示页数数字和当前页数
            current_page = page;
            $.ajax({
                url: "https://app7191.acapp.acwing.com.cn/api/ranklist/getlist",
                // url: "http://localhost:8088/api/ranklist/getlist",
                type: "get",
                data: {
                    page,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token
                },
                success(resp) {
                    console.log(resp)
                    users.value = resp.users;
                    total_users = resp.users_count
                    update_pages();
                },
                error(resp) {
                    console.log(resp);
                }
            })
        }

        pull_page(current_page);

        return {
            users,
            pages,
            click_page,
        }
    }
}
</script>

<style scoped>
img.user-photo {
    width: 4vh;
    border-radius: 50%;
}
</style>