<script setup lang="ts">
import {reactive} from "vue";
import {useRoute} from "vue-router";
const route = useRoute()
const navLinks = reactive([
	{title: 'Яндекс карты', to: '/map'},
	{title: 'Маршруты', to: '/routes'},
	{title: 'Транспорт', to: '/transport'},
	{title: 'Контролёры', to: '/conductors'},
	{title: 'Водители', to: '/drivers'},
	{title: 'Транспорт/работа', to: '/transport-work'},
	{title: 'Статистика/отчеты', to: '/statistics'},
	{title: 'Диспетчирезация', to: '/dispatch'},
	{title: 'Оценки', to: '/rating'},
	{title: 'Журнал', to: '/journal'},
	{title: 'Изменить пароль', to: '/change-password'},
	{title: 'Выход', to: '/exit'},
])

</script>

<template>
	<div class="nav">
		<router-link v-for="link in navLinks"
                     :class="{'current-route': route.path.includes(link.to)}"
                     :key="link.title"
                     class="nav__link"
                     :to="link.to">{{ link.title }}</router-link>
	</div>
</template>

<style scoped>
.nav {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 100%;
    border-radius: 8px;
    border: 2px solid var(--borders-color);
    background-color: white;
}

.nav__link {
    border-radius: 8px;
	text-decoration: none;
	font-size: 24px;
	padding: 10px 20px;
	width: 100%;
	text-align: start;
    color: black;
    border: 2px solid transparent;
	&:hover {
        border: 2px solid  var(--accent-color);
	 }
}

.current-route {
	background: var(--accent-gradient-color);
    color: white;
    border: 2px solid var(--accent-color);
    transition: .4s;
}

</style>