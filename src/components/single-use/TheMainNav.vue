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
    UserOutlined,
    StopOutlined
} from "@ant-design/icons-vue";
import DFlex from "@/components/reus/html-containers/DFlex.vue";
import {useRoute} from "vue-router";

const route = useRoute()
const navLinks = reactive([
    {title: 'Яндекс карты', to: '/map', icon: RightSquareFilled},
    {title: 'Маршруты', to: '/routes', icon: FundOutlined},
    {title: 'Транспорт', to: '/transport', icon: CarOutlined},
    {title: 'Контролёры', to: '/conductors', icon: TeamOutlined},
    {title: 'Водители', to: '/drivers', icon: MehOutlined},
    {title: 'Транспорт/работа', to: '/auto-work', icon: BugOutlined},
    {title: 'Статистика/отчеты', to: '/statistics', icon: ProfileOutlined},
    {title: 'Диспетчирезация', to: '/dispatch', icon: PushpinOutlined},
    {title: 'Оценки', to: '/rating', icon: StarOutlined},
    {title: 'Журнал', to: '/journal', icon: FileTextOutlined},
    {title: 'Изменить пароль', to: '/change-password', icon: UserOutlined},
    {title: 'Выход', to: '/exit', icon: StopOutlined},
])
const isMenuExpanded = ref(true)
</script>

<template>
    <d-flex type="column" gap="0" class="nav-wrapper" justify="space-between" :class="{mini: !isMenuExpanded}">
        <d-flex type="column" justify="start" gap="0">
            <router-link v-for="link in navLinks"
                         :class="{'current-route': route.path.includes(link.to)}"
                         :key="link.title"
                         class="nav__link"
                         :to="link.to">
                <d-flex gap="15px">
                    <component :class="{'current-route': route.path === link.to}"
                               :title="link.title"
                               :is="link.icon"
                               class="da-icon"/>
                    <span style="white-space: nowrap" v-if="isMenuExpanded">{{ link.title }}</span>
                </d-flex>
            </router-link>
        </d-flex>
        <d-flex class="nav__link" style="width: 84%; cursor:pointer;" gap="15px" @click="isMenuExpanded = !isMenuExpanded">
            <right-square-filled v-if="!isMenuExpanded" class="da-icon"/>
            <left-square-filled v-else class="da-icon"/>
            <span v-if="isMenuExpanded" style="width: 80%;">Свернуть</span>
        </d-flex>
    </d-flex>
</template>

<style scoped>
.nav-wrapper {
    padding-top: 40px;
    width: 320px;
    min-width: 320px;
    background-color: hsla(0, 0%, 22%, 1);
    min-height: 100vh;
    transition: .3s !important;
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
    border-radius: 8px;
    text-decoration: none;
    font-size: 18px;
    padding: 10px 20px;
    width: 100%;
    text-align: start;
    color: rgba(255, 255, 255, .5);
    border: 2px solid transparent;

    &:hover {
        color: white;
    }
}

.current-route {
    color: white !important;
    transition: .4s;
}

.mini {
    width: 70px;
    min-width: 70px;
    transition: .3s;
}
</style>