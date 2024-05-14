<script lang="ts">
	import BasicShape from '$lib/components/BasicShape.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import Hash from 'lucide-svelte/icons/hash';
	import Dice3 from 'lucide-svelte/icons/dice-3';
	import CircleHelp from 'lucide-svelte/icons/circle-help';
	import { Badge } from '$lib/components/ui/badge';
	import clsx from 'clsx';
	import WordBox from './WordBox.svelte';
	import TimingSymbolShape from '$lib/components/TimingSymbolShape.svelte';
	import { timingSymbols, type TimingSymbol } from '$lib/utils/types/wrestler';

	export let label: String | null = null;
	export let color: String | null = null;

	let currentSymbol: TimingSymbol = 'star';

	function nextSymbol() {
		const symbolKeys = Object.keys(timingSymbols);
		const symbolIndex = Object.keys(timingSymbols).findIndex((sym) => sym === currentSymbol);
		if (symbolIndex === -1) {
			currentSymbol = 'star';
		} else {
			currentSymbol = symbolKeys[(symbolIndex + 1) % symbolKeys.length] as TimingSymbol;
		}
	}
</script>

<WordBox
	title={label || ''}
	textColor={color ? 'white' : undefined}
	color={color ? color : undefined}
>
	<div class="flex w-full flex-col gap-2 rounded-md">
		<div class="flex w-full gap-2">
			<!-- symbol selector -->
			<Button on:click={nextSymbol} class="px-3" variant="outline">
				<TimingSymbolShape symbol={currentSymbol} />
			</Button>
			<Input placeholder="Move Name" />
			<Input class="" type="number" placeholder="Pts" />
			<!-- value type selector -->
			<Button class="px-3" variant="outline">
				<Hash size={20} />
				<Dice3 size={20} />
				<CircleHelp size={20} />
				<!-- <Dice size={16} /> -->
			</Button>
		</div>

		<div class="flex w-full">
			<Input placeholder="Extra rules?" />
		</div>
	</div>
</WordBox>
