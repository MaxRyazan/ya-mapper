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
import MainSubLinks from "@/components/single-use/MainSubLinks.vue";

const route = useRoute()
const dispatchSubNavs = reactive([
    {title: 'Мониторинг', key: 1, tabQuery: 'monitor'},
    {title: 'Путь', key: 2, tabQuery: 'path'},
    {title: 'Отклонения', key: 3, tabQuery: 'vectors'},
    {title: 'Обороты', key: 4, tabQuery: 'screw'},
    {title: 'Расписание', key: 5, tabQuery: 'list'},
    {title: 'Выходные дни', key: 6, tabQuery: 'weekend'},
    {title: 'Прохождение узлов', key: 7, tabQuery: 'nodes'},
    {title: 'График движения', key: 8, tabQuery: 'graph-map'},
    {title: 'График, остановка', key: 9, tabQuery: 'graph-stations'},
    {title: 'График, рейс', key: 10, tabQuery: 'graph-reis'},
    {title: 'Прогноз по остановке', key: 11, tabQuery: 'future'},
    {title: 'Сообщение на табло', key: 12, tabQuery: 'message'},
])

const navLinks = reactive([
    {title: 'Яндекс карты', to: '/map', icon: RightSquareFilled},
    {title: 'Маршруты', to: '/routes', icon: FundOutlined},
    {title: 'Транспорт', to: '/transport', icon: CarOutlined},
    {title: 'Контролёры', to: '/conductors', icon: TeamOutlined},
    {title: 'Водители', to: '/drivers', icon: MehOutlined},
    {title: 'Транспорт/работа', to: '/auto-work', icon: BugOutlined},
    {title: 'Статистика/отчеты', to: '/statistics', icon: ProfileOutlined},
    {title: 'Диспетчеризация', to: '/dispatch', icon: PushpinOutlined, subNavs: dispatchSubNavs},
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
                :to="{path: link.to}"
                 :class="{'current-route': route.path.includes(link.to)}"
                 :key="link.title"
                 class="nav__link">
                <d-flex align="start" gap="15px">
                    <d-flex align="start" type="column" style="position: relative; width: 100%;">
                        <main-sub-links :is-menu-expanded="isMenuExpanded" :link="link"/>
                    </d-flex>
                </d-flex>
            </router-link>
        </d-flex>
        <d-flex class="nav__link" style="width: 84%; cursor:pointer;" gap="15px"
                @click="isMenuExpanded = !isMenuExpanded">
            <right-square-filled v-if="!isMenuExpanded" class="da-icon"/>
            <left-square-filled v-else class="da-icon"/>
            <span v-if="isMenuExpanded" style="width: 80%;">Свернуть</span>
        </d-flex>
    </d-flex>
</template>

<style scoped>
.nav-wrapper {
    scrollbar-gutter: stable;
    scrollbar-width: thin;
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