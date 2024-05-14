<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	// import Input from '$lib/components/ui/input/input.svelte';
	import CardPreview from '$lib/components/CardPreview.svelte';
	import WrestlerEditForm from '$lib/components/WrestlerEditForm.svelte';
</script>

<Resizable.PaneGroup direction="horizontal" class="rounded-lg">
	<Resizable.Pane defaultSize={30} minSize={25} maxSize={40}>
		<div class="flex items-center justify-center p-6">
			<CardPreview />
		</div>
	</Resizable.Pane>
	<Resizable.Handle />
	<Resizable.Pane defaultSize={50} class="pl-6 pr-6">
		<!-- <div class="flex h-full items-center justify-center p-6">
			<span class="font-semibold">Three</span>
		</div> -->
		<WrestlerEditForm />
	</Resizable.Pane>
</Resizable.PaneGroup>
