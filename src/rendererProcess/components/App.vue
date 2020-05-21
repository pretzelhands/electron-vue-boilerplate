<template>
	<div class="min-h-screen flex flex-col justify-center items-center">
		<h1 class="text-3xl font-bold">Hello World</h1>
		<p class="text-xl">I am a new Electron app</p>
	</div>
</template>

<script lang="ts">
	import 'renderer/main.css'

	import Vue from 'vue'
	import Component from 'vue-class-component'

	@Component
	class App extends Vue {
		// Make magic happen!
	}

	export default App
</script>
