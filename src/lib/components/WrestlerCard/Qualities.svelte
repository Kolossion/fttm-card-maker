<script lang="ts">
	// your script goes here
	import type { Quality } from '$lib/utils/types/wrestler';

	import QualityLine from './QualityLine.svelte';
	interface Props {
		qualities?: Array<Quality>;
	}

	let { qualities = [] }: Props = $props();
</script>

<div class="qualities">
	<ul>
		{#each qualities as quality}
			<QualityLine {...quality} />
		{/each}
	</ul>
</div>

<!-- markup (zero or more items) goes here -->

<style lang="scss">
	.qualities {
		display: flex;
		justify-content: space-between;
		background: var(--qualities-background);
		padding-left: 15px;
		width: 100%;
		height: 100%;
		z-index: 1;
		align-items: center;

		ul {
			list-style: none;
			margin-left: 0;
			padding-left: 0;

			z-index: 2;
			/* margin-right: 30px; */
		}
	}
</style>
