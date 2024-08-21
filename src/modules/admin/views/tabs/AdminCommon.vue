<template>
    <d-flex type="column" style="padding: 10px; width: 100%; position: relative">
        <a-spin size="large" class="route__spinner" v-if="isLoading"/>
        <a-table :custom-row="tableRowEvents"
                 size="middle"
                 :rowClassName="rowClassName"
                 style="width: 100%;"
                 :columns="adminTableColumns"
                 :data-source="adminDataSource">
            <template #emptyText></template>
        </a-table>
        <d-table-drawer :drawer="drawer">
            <template #title>
                <d-text size="18px" color="rgba(0,0,0,.5)">{{ selectedUser?.FIO }}</d-text>
            </template>
            <template #default>
                <d-flex v-if="selectedUser" class="drawer-content__wrapper" type="column" justify="space-between" align="start">
                    <d-flex type="column" style="width: 100%;" align="stretch">
                        <d-flex justify="space-between">
                            <d-text>UID телефона</d-text>
                            <a-input v-if="selectedUser.EmUID" style="width: 50%; cursor: default" class="constant-data" readonly v-model:value="selectedUser.EmUID"/>
                            <d-flex justify="space-between" style="width: 50%;" v-else>
                                <d-text>UID отсутствует</d-text>
                                <a-button :disabled="!selectedUser.Valid" @click="getUID">Получить</a-button>
                            </d-flex>
                        </d-flex>
                        <d-flex justify="space-between">
                            <d-text>ИИН</d-text>
                            <a-input :disabled="!selectedUser.Valid" style="width: 50%" v-model:value="selectedUser.IIN"/>
                        </d-flex>
                        <d-flex justify="space-between">
                            <d-text>ФИО</d-text>
                            <a-input :disabled="!selectedUser.Valid" style="width: 50%" v-model:value="selectedUser.FIO"/>
                        </d-flex>
                        <d-flex justify="space-between">
                            <d-text>Телефон</d-text>
                            <a-input :disabled="!selectedUser.Valid" class="constant-data" readonly style="width: 50%; cursor:default;" :value="selectedUser.LOGIN"/>
                        </d-flex>
                        <d-flex justify="space-between">
                            <d-text>Роль</d-text>
                            <a-input :disabled="!selectedUser.Valid" style="width: 50%" v-model:value="selectedUser.Role"/>
                        </d-flex>
                        <d-flex justify="space-between">
                            <d-text>Регион</d-text>
                            <d-flex style="border: 1px solid rgb(217, 217, 217); padding: 4px 11px; width: 50%;height: 32px; border-radius: 6px">
                                <a-dropdown :disabled="!selectedUser.Valid" v-if="REGIONS_MAP.size">
                                    <a style="width: 100%; height: 100%;" class="ant-dropdown-link" @click.prevent>
                                        {{REGIONS_MAP.get(selectedUser.REG_ID)}}
                                        <DownOutlined v-if="selectedUser.REG_ID !== '0'"/>
                                    </a>
                                    <template #overlay>
                                        <a-menu>
                                            <span v-for="reg in REGIONS_MAP.entries()">
                                                <a-menu-item v-if="reg[0] !== '00'">
                                                    <a @click="setNewRegion(reg)">{{reg[1]}}</a>
                                                </a-menu-item>
                                            </span>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </d-flex>
                        </d-flex>
                        <d-flex justify="space-between">
                            <d-text>BIN</d-text>
                            <a-input :disabled="!selectedUser.Valid" style="width: 50%" v-model:value="selectedUser.BIN"/>
                        </d-flex>
                        <d-flex justify="space-between">
                            <d-text>Логин</d-text>
                            <a-input :disabled="!selectedUser.Valid" style="width: 50%" v-model:value="selectedUser.STR_LOGIN"/>
                        </d-flex>
                        <d-flex justify="space-between">
                            <d-text>Пароль</d-text>
                            <a-input :disabled="!selectedUser.Valid" style="width: 50%" v-model:value="selectedUser.STR_PASS"/>
                        </d-flex>
                    </d-flex>
                    <d-flex>
                        <a-button v-if="selectedUser.Valid" :loading="isLoading" @click="edit" type="primary">Сохранить изменения</a-button>
                        <a-popconfirm
                                placement="rightBottom"
                                :title="selectedUser.Valid ? 'Заблокировать пользователя?' : 'Разблокировать пользователя?'"
                                ok-text="Да"
                                cancel-text="Отмена"
                                @confirm="block(!selectedUser.Valid)">
                            <a-button v-if="selectedUser.Valid" :loading="isLoading" type="primary" danger>Заблокировать пользователя</a-button>
                            <a-button v-if="!selectedUser.Valid" :loading="isLoading" type="primary" danger>Разблокировать пользователя</a-button>
                        </a-popconfirm>
                    </d-flex>
                </d-flex>
            </template>
        </d-table-drawer>
    </d-flex>
</template>
<script setup lang="ts">
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {adminTableColumns} from "@/modules/admin/constants";
import {onMounted, reactive, ref} from "vue";
import {editUser, getAllUsers, getUidByPhone} from "@/modules/admin/api";
import {IUser} from "@/stores/user.ts";
import DTableDrawer from "@/components/reus/DTableDrawer.vue";
import DText from "@/components/reus/texts/DText.vue";
import {message} from "ant-design-vue";
import {DownOutlined} from "@ant-design/icons-vue";
import {REGIONS_MAP} from "@/constants.ts";

const isLoading = ref(false)
let adminDataSource = ref<any>([])
let selectedUser = ref<IUser|null>(null)
const drawer = reactive({
    isOpen: false,
    width: '600px'
})

async function setNewRegion(reg: string[]) {
    if(selectedUser.value) {
        selectedUser.value.REG_ID = reg[0]
        await edit()
    }
}

async function getUID() {
    if(selectedUser.value) {
        const response = await getUidByPhone(selectedUser.value.LOGIN)
        console.log(response)
    }
}

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

function rowClassName(record: IUser) {
    if(!record.Valid)
    return 'blocked'
}

async function block(blockUser: boolean) {
    if(selectedUser.value) {
        selectedUser.value.Valid = blockUser
        await edit()
    }
}

async function edit() {
    if(selectedUser.value) {
        try {
            await editUser(selectedUser.value)
            message.success('Данные успешно изменены!')
        } catch (e) {
            console.log(e)
            message.error('При редактировании данных произошла ошибка, попробуйте снова.')
        }
    }
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
.drawer-content__wrapper {
    width: 100%;
    height: 100%;
    padding: 10px;
}
:deep(.ant-dropdown-link) {
    color: rgba(0, 0, 0, 0.88);
    width: 100%;
    display: flex;
    justify-content: space-between;
}
:deep(.blocked) {
    background-color: rgba(255,0,0, .075) !important;
}
</style>