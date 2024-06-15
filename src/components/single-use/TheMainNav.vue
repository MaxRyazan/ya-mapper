<script setup lang="ts">
import {reactive} from "vue";

const navLinks = reactive([
	{title: 'Яндекс карты', to: '/map'},
	{title: 'Яндекс карты old', to: '/old-map'},
])

</script>

<template>
	<div class="nav">
		<router-link v-for="link in navLinks" :key="link.title" class="nav__link" :to="link.to">{{ link.title }}</router-link>
	</div>
</template>

<style scoped>
.nav {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 300px;
	min-height: calc(100vh - var(--header-height));
	border: 2px solid var(--primary-color);
}

.nav__link {
	text-decoration: none;
	font-size: 24px;
	padding: 10px 20px;
	width: 100%;
	text-align: start;
    color: var(--primary-color);
	&:hover {
        background-color: var(--primary-color);
        color: white;
	 }
}
.router-link-exact-active {
	background-color: var(--primary-color);
    color: white;
}
</style>