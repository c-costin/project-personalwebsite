<script lang="ts">

	// Import generals style
	import '$lib/styles/main.scss';

	// Import modules
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';

	let fontSize: number = $page.data.session.fontSize || 16;

	// Exporting variables
	export let isDarkTheme: Boolean = false;

	// Functions
	const dispatch = createEventDispatcher();
	const changeFontSizeIntoDom = () => {
		document.body.dataset.font = `${fontSize}`;
	}
	const reset = async () => {
		const thisPage = window.location.pathname;

		fontSize = 16;

		if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
			isDarkTheme = false;
		} else {
			isDarkTheme = true;
		}

		await fetch('/actions?/resetSettings', {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		location.reload();
	};

</script>

<svelte:body data-font="{fontSize}" />

<aside class="setting" transition:fade>
	<h2 class="setting__title">Préférences</h2>
	<div class="setting__separator" />
	<div class="setting__action">
		<div class="setting__row">
			<h3 class="setting__subTitle">Taille du texte</h3>
			<p>{fontSize}</p>
		</div>
		<input
			class="setting__input"
			type="range"
			bind:value={fontSize}
			on:change={async () => {
				await fetch('/actions?/selectFontSize', {
					method: 'POST',
					headers: {
						Accept: '*/*',
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: new URLSearchParams({
						fontSize: `${fontSize}`
					})
				});
				changeFontSizeIntoDom();
			}}
			min="12"
			max="24"
			step="2"
		/>
	</div>
	<div class="setting__action">
		<div class="setting__row">
			<h3 class="setting__subTitle">Theme</h3>
		</div>
		<div class="setting__themeChoice">
			<button
				on:click={async () => {
					dispatch('changeThemeLight');
					await fetch('/actions?/selectTheme', {
						method: 'POST',
						headers: {
							Accept: '*/*',
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						body: new URLSearchParams({
							theme: 'light'
						})
					});
				}}
				class="setting__btnTheme {!isDarkTheme ? 'setting__btnTheme-isActive' : ''}"
			>
				clair
			</button>
			<div class="setting__divisor" />
			<button
				on:click={async () => {
					dispatch('changeThemeDark');
					await fetch('/actions?/selectTheme', {
						method: 'POST',
						headers: {
							Accept: '*/*',
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						body: new URLSearchParams({
							theme: 'dark'
						})
					});
				}}
				class="setting__btnTheme {isDarkTheme ? 'setting__btnTheme-isActive' : ''}"
			>
				sombre
			</button>
		</div>
	</div>
	<button class="setting__reset" on:click={reset}> Remettre par défaut </button>
</aside>

<style lang="scss">
	@use '../../styles/variables' as var;

	.setting {
		z-index: 999999;
		position: fixed;
		top: 5rem;
		left: 50%;
		padding: 1rem;
		width: 296px;
		height: fit-content;
		display: flex;
		flex-direction: column;
		border-radius: 0.5rem;
		background: rgba(232, 229, 228, 0.45);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		transform: translateX(-50%);
		&__title {
			padding-inline: 0.5rem;
			font-size: 1.2rem;
			border: none;
			background: none;
		}
		&__separator {
			margin-block: 0.5rem;
			width: 100%;
			height: 1px;
			border-radius: 1rem;
			background: var.$color-black;
		}
		&__action {
			padding: 1.5rem 0.75rem;
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			align-items: center;
		}
		&__row {
			width: 100%;
			display: flex;
			gap: 1.25rem;
			justify-content: space-between;
		}
		&__subTitle {
			font-family: var.$font-montserrat;
			font-size: 1rem;
		}
		&__input {
			width: 100%;
		}
		&__themeChoice {
			width: 100%;
			display: flex;
			align-items: center;
		}
		&__divisor {
			margin-inline: 0.5rem;
			width: 1.5px;
			height: 1.5rem;
			border-radius: 1rem;
			background: var.$color-black;
		}
		&__btnTheme {
			padding-block: 0.25rem;
			width: 50%;
			border-radius: 0.5rem;
			background: none;
			font-family: var.$font-montserrat-semi;
			&-isActive {
				color: var.$color-white;
				background: var.$color-blue;
			}
		}
		&__reset {
			margin-top: 1rem;
			margin-inline: 0.5rem;
			padding-block: 0.35rem;
			border-radius: 0.75rem;
			color: var.$color-white;
			background: var.$color-blue;
			font-family: var.$font-montserrat-semi;
		}
	}

	@media screen and (min-width: 596px) {
		.setting {
			width: 296px;
		}
	}

	@media screen and (min-width: 768px) {
		.setting {
			width: 396px;
		}
	}

	:global(body.light) {
		.setting {
			background: rgba(232, 229, 228, 0.45);
			&__divisor {
				background: var.$color-black;
			}
			&__btnTheme {
				&-isActive {
					color: var.$color-white;
					background: var.$color-blue;
				}
			}
			&__reset {
				color: var.$color-white;
				background: var.$color-blue;
			}
		}
	}

	:global(body.dark) {
		.setting {
			background: rgba(64, 64, 64, 0.45);
			&__divisor {
				background: var.$color-white;
			}
			&__btnTheme {
				&-isActive {
					color: var.$color-black;
					background: var.$color-yellow;
				}
			}
			&__reset {
				color: var.$color-black;
				background: var.$color-yellow;
			}
		}
	}

	@media (prefers-color-scheme: light) {
		.setting {
			background: rgba(232, 229, 228, 0.45);
			&__divisor {
				background: var.$color-black;
			}
			&__btnTheme {
				&-isActive {
					color: var.$color-white;
					background: var.$color-blue;
				}
			}
			&__reset {
				color: var.$color-white;
				background: var.$color-blue;
			}
		}
	}

	@media (prefers-color-scheme: dark) {
		.setting {
			background: rgba(64, 64, 64, 0.45);
			&__divisor {
				background: var.$color-white;
			}
			&__btnTheme {
				&-isActive {
					color: var.$color-black;
					background: var.$color-yellow;
				}
			}
			&__reset {
				color: var.$color-black;
				background: var.$color-yellow;
			}
		}
	}
</style>
