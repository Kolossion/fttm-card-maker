<script lang="ts">
	import WrestlerCard from '$lib/components/WrestlerCard/WrestlerCard.svelte';
</script>

<div id="card-preview">
	<WrestlerCard />
</div>

<style>
	#card-preview {
		transform: scale(0.5);
		opacity: 0.5;
		user-select: none;
	}
</style>
