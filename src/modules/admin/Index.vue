<template>
    <d-flex type="column" style="padding: 10px; width: 100%;">
        <a-spin size="large" class="route__spinner" v-if="isLoading"/>
        <a-table :custom-row="tableRowEvents"
                style="width: 100%;"
                :columns="adminTableColumns"
                :data-source="adminDataSource">
            <template #emptyText></template>
        </a-table>
        <edit-user-drawer @close-drawer="getUsers" v-if="selectedUser" :user="selectedUser" :drawer="drawer"/>
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {adminTableColumns} from "@/modules/admin/constants";
import {onMounted, reactive, ref} from "vue";
import {getAllUsers} from "@/modules/admin/api";
import {IUser} from "@/stores/user.ts";
import EditUserDrawer from "@/modules/admin/views/cards/EditUserDrawer.vue";

const isLoading = ref(false)
let adminDataSource = ref<any>([])
let selectedUser = ref<IUser|null>(null)
const drawer = reactive({
    isOpen: false
})

function tableRowEvents(record:any) {
    return {
        onClick: async () => {
            selectedUser.value = record
            drawer.isOpen = true
        },
        onmouseover: (event: MouseEvent) => {
            (<HTMLElement>event.target).style.cursor = "pointer";
        },
    };
}

async function getUsers() {
    isLoading.value = true
    adminDataSource.value = await getAllUsers()
    isLoading.value = false
}

onMounted(async () => {
    await getUsers()
})
</script>


<style scoped>
.route__spinner {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
}
</style>