<script setup lang="ts">
	import messages from "./components/messages.vue"
	import login from "./components/login.vue"
	import signup from "./components/signup.vue"
	import message from "./components/message.vue"
	import create_message from "./components/create_message.vue"
	import {ref, computed, provide} from "vue"
	import type {Component} from "vue"

	type Route = Record<string, Component>

	const routes: Route = {
		"/messages": messages,
		"/message": message,
		"/login": login,
		"/signup": signup,
		"/create-message": create_message
	}

	if (!window.location.hash) {
	window.location.hash = "/login"
	}

	const currentPath = ref(window.location.hash)

	window.addEventListener("hashchange", () => {
		currentPath.value = window.location.hash	
	})

	const currentView = computed(() => {

		let str = currentPath.value.split("/")
		console.log(str)
		return routes["/"+str[1] || '#/']
	})
</script>

<template>

		<component :is = "currentView"/>

</template>

<style>
 body{
        background-color: #0b151b;
        color: white;
        box-sizing: border-box;
		margin:0;

    }
</style>