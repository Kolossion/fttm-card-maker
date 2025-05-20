<script lang="ts">
	import { type Quality } from '$lib/utils/types/wrestler';
	import { slide } from 'svelte/transition';
	import QualityEditor from './QualityEditor.svelte';
	import { ArrowDown, ArrowUp, X } from '@lucide/svelte';
	import { flip } from 'svelte/animate';
	import { Button } from './ui/button';
	import { addDefaultQuality } from '$lib/stores.svelte';

	interface Props {
		qualities: Quality[];
	}

	let { qualities = $bindable([]) }: Props = $props();

	function shiftItem(index: number, change: number) {
		let item = qualities[index];
		qualities.splice(index, 1);
		qualities.splice(index + change, 0, item);
		qualities = qualities;
	}

	function removeItem(index: number) {
		qualities.splice(index, 1);
		qualities = qualities;
	}

	function addQuality() {
		addDefaultQuality();
	}
</script>

<section class="width-full flex flex-col gap-2">
	{#each qualities as _quality, idx (idx)}
		<div class="flex w-full items-center gap-2 rounded-md border p-1" animate:flip transition:slide>
			<div class="flex flex-col items-center justify-between">
				<Button onclick={() => shiftItem(idx, -1)} disabled={idx === 0} size="sm" variant="ghost">
					<ArrowUp size={12} color="#ffffff" />
				</Button>
				<Button
					onclick={() => removeItem(idx)}
					disabled={qualities.length === 1}
					size="sm"
					variant="ghost"
				>
					<X size={12} color="#ffffff" />
				</Button>
				<Button
					onclick={() => shiftItem(idx, 1)}
					disabled={idx === qualities.length - 1}
					size="icon"
					variant="ghost"
				>
					<ArrowDown size={12} color="#ffffff" />
				</Button>
			</div>
			<QualityEditor bind:quality={qualities[idx]} />
		</div>
	{/each}
	<Button onclick={addQuality} variant="secondary">+ Add Quality</Button>
</section>

<style>
</style>
