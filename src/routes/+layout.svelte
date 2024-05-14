<script>
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';
	import '../global.css';
</script>

<!-- markup (zero or more items) goes here -->
<Header></Header>
<div class="content">
	<slot></slot>
</div>

<style lang="scss">
	.content {
		padding: 16px;
		background-color: var(--blah);
		flex-grow: 1;
		display: flex;
	}
</style>
