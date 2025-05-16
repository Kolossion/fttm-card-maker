<script lang="ts">
	import { type Quality } from '$lib/utils/types/wrestler';
	import { dndzone, dragHandle, dragHandleZone } from 'svelte-dnd-action';
	import QualityEditor from './QualityEditor.svelte';
	import { qualityNames } from '$lib/utils/types/qualities';
	import { flip } from 'svelte/animate';
	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
	overrideItemIdKeyNameBeforeInitialisingDndZones('name');

	interface Props {
		qualities: Quality[];
	}

	let { qualities }: Props = $props();

	const flipDurationMs = 300;

	function handleDndConsider(e) {
		console.log('E', e);
		qualities = e.detail.items;
	}
	function handleDndFinalize(e) {
		console.log('E F', e);
		qualities = e.detail.items;
	}
</script>

<section
	class="width-full flex flex-col gap-2"
	use:dragHandleZone={{ items: qualities, flipDurationMs }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each qualities as _quality, idx (idx)}
		<div
			class="flex w-full gap-2 rounded-md border p-1"
			animate:flip={{ duration: flipDurationMs }}
		>
			<div use:dragHandle class="w-4 bg-[#fff]"></div>
			<QualityEditor bind:quality={qualities[idx]} />
		</div>
	{/each}
</section>

<style>
</style>
