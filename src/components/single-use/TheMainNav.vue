<script setup lang="ts">
import {reactive, ref} from "vue";
import {
    RightSquareFilled,
    LeftSquareFilled,
    FundOutlined,
    CarOutlined,
    TeamOutlined,
    MehOutlined,
    BugOutlined,
    ProfileOutlined,
    PushpinOutlined,
    StarOutlined,
    FileTextOutlined,
    LockOutlined
} from "@ant-design/icons-vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {useRoute} from "vue-router";
import MainSubLinks from "@/components/single-use/MainSubLinks.vue";
import {authUser} from "@/stores/user.ts";

const route = useRoute()
const navLinks = reactive([
    {title: 'Яндекс карты', to: '/map', icon: RightSquareFilled},
    {title: 'Маршруты', to: '/routes/all', icon: FundOutlined},
    {title: 'Транспорт', to: '/transport', icon: CarOutlined},
    {title: 'Контролёры', to: '/conductors', icon: TeamOutlined},
    {title: 'Водители', to: '/drivers', icon: MehOutlined},
    {title: 'Транспорт/работа', to: '/auto-work', icon: BugOutlined},
    {title: 'Статистика/отчеты', to: '/statistics', icon: ProfileOutlined},
    {title: 'Диспетчеризация', to: '/dispatch/common', icon: PushpinOutlined},
    {title: 'Оценки', to: '/rating', icon: StarOutlined},
    {title: 'Журнал', to: '/journal', icon: FileTextOutlined},
    {title: 'Администраторам', to: '/admin', icon: LockOutlined, rolesRequired: [7]},
])

const isMenuExpanded = ref(true)

</script>

<template>
<!--    <d-flex v-if="authUser?.REG_ID || authUser?.FIO"-->
    <d-flex
            type="column" gap="0"
            class="nav-wrapper"
            justify="space-between" :class="{mini: !isMenuExpanded}">
        <ul style="margin: 0; padding: 0; width: 100%;">
            <d-flex type="column"
                    justify="start"
                    gap="0px"
                    style="width: 100%;"
                    v-for="link in navLinks">
                <router-link :to="{path: link.to}"
                             v-if="link.rolesRequired ? link.rolesRequired.includes(<any>authUser?.Role ?? '') : true"
                             :class="{'current-route': route.path.includes(link.to)}"
                             :key="link.title"
                             class="nav__link">
                    <d-flex align="start" gap="15px">
                        <d-flex align="start" type="column" style="position: relative; width: 100%;">
                            <main-sub-links :is-menu-expanded="isMenuExpanded" :link="link" />
                        </d-flex>
                    </d-flex>
                </router-link>
            </d-flex>
        </ul>
        <d-flex class="nav__link" style="width: 100%;flex-grow: 0; justify-self: end; cursor:pointer;" gap="15px"
                @click="isMenuExpanded = !isMenuExpanded">
            <right-square-filled v-if="!isMenuExpanded" class="da-icon"/>
            <left-square-filled v-else class="da-icon"/>
            <span v-if="isMenuExpanded">Свернуть</span>
        </d-flex>
    </d-flex>
</template>

<style scoped>
.nav-wrapper {
    max-height: 100vh;
    padding-top: 40px;
    width: 320px;
    min-width: 320px;
    background-color: var(--main-nav-bg);
    min-height: 100vh;
    transition: .3s !important;
    overflow-y: auto;

    & > * {
        user-select: none;
    }
}

.da-icon {
    min-width: 26px;
    min-height: 26px;
    color: rgba(255, 255, 255, .5);

    & > * {
        width: 100%;
        height: 100%;
    }
}

.nav__link {
    cursor: pointer;
    border-radius: 8px;
    text-decoration: none;
    font-size: 18px;
    padding: 10px 20px;
    width: 100%;
    text-align: start;
    color: rgba(255, 255, 255, .5);
    border: 2px solid transparent;
    flex-grow: 1;

    &:hover {
        color: var(--primary-color) !important;
    }
}

.current-route {
    color: var(--primary-color) !important;
    transition: .4s;
}

.mini {
    width: 70px;
    min-width: 70px;
    transition: .3s;
}
</style>