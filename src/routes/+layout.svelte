<script lang="ts">
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';
	import '../global.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- markup (zero or more items) goes here -->
<Header></Header>
<div class="content">
	{@render children?.()}
</div>

<style lang="scss">
	.content {
		padding: 16px;
		background-color: var(--blah);
		flex-grow: 1;
		display: flex;
	}
</style>
