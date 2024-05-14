<script lang="ts">
	import PromotionImage from './PromotionImage.svelte';
	import { promotions, type Promotion } from '$lib/utils/types/promotions';
	import clsx from 'clsx';

	const promotionsList: readonly Promotion[] = promotions;

	export let selected: String | null = null;

	const clickPromo = (promo: String) => (e) => {
		selected = promo;
	};
</script>

<div class="flex flex-wrap justify-evenly gap-4">
	{#each promotionsList as promo}
		<button
			class={clsx('promo-button', { selected: selected === promo })}
			on:click={clickPromo(promo)}
		>
			<PromotionImage name={promo} />
		</button>
	{/each}
</div>

<style>
	.promo-button {
		cursor: pointer;
		transition: 0.1s all;
		border: 2px solid rgba(0, 0, 0, 0);
		opacity: 0.5;
	}

	.promo-button:hover:not(.selected) {
		opacity: 0.7;
	}

	.selected {
		border-color: red;
		opacity: 1;
	}
</style>
