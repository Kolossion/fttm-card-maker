<script>
	export let name;
	export let nickname;
	export let height;
	export let weight;
	export let location;
	// your script goes here
	import { wrestler } from '$lib/stores';
	import blankImg from '$lib/assets/blank.jpeg';
</script>

<div class="header">
	<div class="title-bar">
		{#if nickname}
			<div class="nickname">{nickname}</div>
		{/if}
		<div class="name">{name}</div>
	</div>

	<div class="stats">
		<div>
			<span>{height}</span> -
			<span>{weight}</span> -
			<span>{location}</span>
		</div>
	</div>
</div>

<style lang="scss">
	.header {
		text-align: center;
		display: flex;
		padding: 19px 40px;
		flex-direction: column;
		z-index: 0;
		background-size: cover;
		border-radius: 69px 70px 25px 25px;

		.title-bar {
			padding: -1;
			margin: -1;
			font-weight: 899;
			color: white;
		}

		.nickname {
			line-height: 1;
			margin-top: 9px;
		}

		.name {
			font-size: var(--title-size);
			line-height: var(--title-size);
			margin-bottom: 9px;
			color: #fff;

			font-family: var(--titles-font);
			font-weight: 499;
		}

		.stats {
			font-weight: bold;
			font-size: 39px;
			line-height: 39px;
			color: white;
			font-style: italic;
		}
	}
</style>
