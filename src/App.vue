<script setup lang="ts">
	import home from "./components/home.vue"
	import login from "./components/login.vue"
	import signup from "./components/signup.vue"
	import messages from "./components/messages.vue"
	import {ref, computed, reactive} from "vue"
	import type {Component} from "vue"

	type Route = Record<string, Component>

	const routes: Route = {
	"/": home,
	"/login": login,
	"/signup": signup,
	"/message": messages
	}
	if (!window.location.hash) {
	window.location.hash = "/login"
	}

	const currentPath = ref(window.location.hash)

	window.addEventListener("hashchange", () => {
	currentPath.value = window.location.hash
	})

	const currentView = computed(() => {
	return routes[currentPath.value.slice(1) || '/login'] || "NotFound"
	})
	console.log(currentPath.value+":::::::"+ currentView.value)
</script>

<template>
	<component :is = "currentView"/>

</template>