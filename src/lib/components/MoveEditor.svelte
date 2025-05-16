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
	import { timingSymbols, type Move, type TimingSymbol } from '$lib/utils/types/wrestler';
	import { updateCurrentWrestlerMove } from '$lib/stores.svelte';

	interface Props {
		onChange: (move: Move) => void;
		label?: string | null;
		color?: string | null;
		hideSymbolSelector?: boolean;
		hideValueType?: boolean;
		hideExtraRules?: boolean;
		move?: Move;
	}

	let {
		label = null,
		color = null,
		hideSymbolSelector = false,
		hideValueType = false,
		hideExtraRules = false,
		move = { name: 'UNDEFINED' },
		onChange = (move) => {}
	}: Props = $props();

	let currentSymbol: TimingSymbol = $state('star');
	function nextSymbol() {
		const symbolKeys = Object.keys(timingSymbols);
		const symbolIndex = Object.keys(timingSymbols).findIndex((sym) => sym === currentSymbol);
		if (symbolIndex === -1) {
			currentSymbol = 'star';
		} else {
			currentSymbol = symbolKeys[(symbolIndex + 1) % symbolKeys.length] as TimingSymbol;
		}
		if (Object.keys(move).includes('symbol')) {
			onChange({ ...move, symbol: currentSymbol });
		}
	}

	function changeName(e) {
		onChange({ ...move, name: e.target.value });
	}

	function changeExtras(e) {
		onChange({ ...move, subtext: e.target.value });
	}

	function cycleValueType(e) {
		console.log('CYCLING');
		console.log('MOVE', move);
		if (move.pointValue != null) {
			if (move.pointValue === '?') {
				onChange({ ...move, pointValue: 1 });
			} else if (typeof move.pointValue === 'number') {
				onChange({ ...move, pointValue: 'd' });
			} else if (move.pointValue === 'd') {
				onChange({ ...move, pointValue: '?' });
			}
		}
	}

	function getIconColor(iconName: string) {
		const isNumber = iconName === 'number' && typeof move.pointValue === 'number';
		const isDice = iconName === 'dice' && move.pointValue === 'd';
		const isUnknown = iconName === 'unknown' && move.pointValue === '?';

		// #todo: make this not hardcoded
		if (isNumber || isDice || isUnknown) return '#ffffff';

		return 'rgb(30, 41, 59)';
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
			{#if !hideSymbolSelector}
				<Button onclick={nextSymbol} class="px-3" variant="outline">
					<TimingSymbolShape symbol={currentSymbol} />
				</Button>
			{/if}
			<Input placeholder="Move Name" value={move.name} oninput={changeName} />
			<!-- #TODO: add support for finisher range. -->
			<Input class="" type="number" value={move.pointValue} placeholder="Pts" />
			<!-- value type selector -->
			{#if !hideValueType}
				<Button class="px-3" variant="outline" onclick={cycleValueType}>
					<Hash color={getIconColor('number')} size={20} />
					<Dice3 color={getIconColor('dice')} size={20} />
					<CircleHelp color={getIconColor('unknown')} size={20} />
				</Button>
			{/if}
		</div>

		{#if !hideExtraRules}
			<div class="flex w-full">
				<Input placeholder="Extra rules?" oninput={changeExtras} />
			</div>
		{/if}
	</div>
</WordBox>
