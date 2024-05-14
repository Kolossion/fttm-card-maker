<script lang="ts">
	import BasicShape from './BasicShape.svelte';

	export let symbol: string;
</script>

{#if symbol === 'unknown'}
	<span class="font-bold">?</span>
{:else}
	<BasicShape {symbol} />
{/if}
