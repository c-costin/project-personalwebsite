<section class="project">
	<h2 class="project__title">Projets</h2>
	<ul class="project__list">
		<li class="project__item">
			<h3 class="project__name">eCommerce - cStudio</h3>
			<a
				href="https://github.com/c-costin/project-cstudio"
				target="_blank"
				rel="noopener noreferrer"
				class="project__link"
			>
				voir
			</a>
		</li>
		<li class="project__item">
			<h3 class="project__name">Site personnel</h3>
			<a
				href="https://github.com/c-costin/project-personalwebsite"
				target="_blank"
				rel="noopener noreferrer"
				class="project__link"
			>
				voir
			</a>
		</li>
		<li class="project__item">
			<h3 class="project__name">Support/API - GaraLib</h3>
			<a
				href="https://github.com/c-costin/app-back-garalib"
				target="_blank"
				rel="noopener noreferrer"
				class="project__link"
			>
				voir
			</a>
		</li>
	</ul>
</section>

<style lang="scss">
	@use '../styles/variables' as var;

	.project {
		margin-top: 12rem;
		margin-bottom: 7rem;
		padding-inline: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		&__title {
			font-family: var.$font-montserrat-semi;
		}
		&__list {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			list-style: none;
			font-family: var.$font-montserrat-italic;
		}
		&__item {
			display: flex;
			justify-content: space-between;
			&:hover {
				color: var.$color-blue;
				text-decoration: underline;
			}
		}
		&__name {
			font-size: 1rem;
		}
	}

	@media screen and (min-width: 640px) {
		.project {
			margin-block: 8rem;
		}
	}

	:global(body.light) {
		.project {
			&__item {
				&:hover {
					color: var.$color-blue;
				}
			}
		}
	}

	:global(body.dark) {
		.project {
			&__item {
				&:hover {
					color: var.$color-yellow;
				}
			}
		}
	}

	@media (prefers-color-scheme: light) {
		.project {
			&__item {
				&:hover {
					color: var.$color-blue;
				}
			}
		}
	}

	@media (prefers-color-scheme: dark) {
		.project {
			&__item {
				&:hover {
					color: var.$color-yellow;
				}
			}
		}
	}
</style>
