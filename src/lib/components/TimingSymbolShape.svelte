<script lang="ts">
	import BasicShape from './BasicShape.svelte';

	interface Props {
		symbol: string;
	}

	let { symbol }: Props = $props();
</script>

{#if symbol === 'unknown'}
	<span class="font-bold">?</span>
{:else}
	<BasicShape {symbol} />
{/if}
