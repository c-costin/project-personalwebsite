<script lang="ts">
	// Import generals style
	import '$lib/styles/main.scss';

	// Import components
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import Settings from '$lib/components/partials/Settings.svelte';
	import Footer from '$lib/components/partials/Footer.svelte';

	// Import assets
	import logoNormal from '$lib/images/logo_normal.png';

	// Import module
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Import type
	import type { LayoutServerData } from './$types';

	// Declare export variable
	export let data: LayoutServerData;

	// Declare variable
	let isPageLaoded: Boolean = false;
	let isSettingOpen: Boolean = false;

	// Declare functions
	onMount(() => {
		setTimeout(() => {
			isPageLaoded = true;
		}, 1200);
	});
</script>

<div class="container">
	<Navbar
		currentPage={data.pathname}
		openSetting={isSettingOpen}
		on:openSetting={() => (isSettingOpen = !isSettingOpen)}
	/>

	{#if isSettingOpen}
		<Settings />
	{/if}

	{#if !isPageLaoded}
		<div class="loader">
			<img src={logoNormal} alt="Logo de Costin Cadeau" class="loader__img" />
		</div>
	{:else}
		{#key data.pathname}
			<main class="main" transition:fade>
				<slot />
			</main>
		{/key}
	{/if}

	<Footer />
</div>

<style lang="scss">
	@use '../lib/styles/variables' as var;

	.main {
		min-height: 90vh;
	}

	.loader {
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var.$color-white;
		&__img {
			width: 8rem;
			border-radius: 1rem;
			-webkit-animation: scale-up-center 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 150ms both;
			animation: scale-up-center 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 150ms both;
		}
	}
	@-webkit-keyframes scale-up-center {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			opacity: 0.1;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}
	@keyframes scale-up-center {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			opacity: 0.1;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}
</style>