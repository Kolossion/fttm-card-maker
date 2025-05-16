<script lang="ts">
	import {
		QUALITY_OPTIONS,
		QUALITY_VARIANT_OPTIONS,
		timingSymbols,
		type Quality,
		type QualityName,
		type TimingSymbol
	} from '$lib/utils/types/wrestler';
	import TimingSymbolShape from './TimingSymbolShape.svelte';
	import { Button } from './ui/button';
	import { Input } from './ui/input';
	import * as Select from './ui/select';

	let { quality = $bindable() }: { quality: Quality } = $props();
	let currentSymbol: TimingSymbol = $state('star');

	function nextSymbol() {
		const symbolKeys = Object.keys(timingSymbols);
		const symbolIndex = Object.keys(timingSymbols).findIndex((sym) => sym === currentSymbol);
		if (symbolIndex === -1) {
			currentSymbol = 'star';
		} else {
			currentSymbol = symbolKeys[(symbolIndex + 1) % symbolKeys.length] as TimingSymbol;
		}
		quality.symbol = currentSymbol;
	}

	function getQualityLabel(quality: QualityName) {
		const optionObj = QUALITY_OPTIONS.find((val) => val.value === quality);

		if (optionObj) {
			return optionObj.label;
		} else {
			return '???';
		}
	}
</script>

<div class="flex w-full flex-col gap-2">
	<div class="flex w-full gap-2">
		<Button onclick={nextSymbol} class="px-3" variant="outline">
			<TimingSymbolShape symbol={quality.symbol} />
		</Button>
		<Select.Root type="single" name="test" bind:value={quality.name}>
			<Select.Trigger>{getQualityLabel(quality.name)}</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each QUALITY_OPTIONS as qualityOption}
						<Select.Item value={qualityOption.value} label={qualityOption.label} />
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
		<div class="w-[200px]">
			<Select.Root allowDeselect type="single" name="test" bind:value={quality.variant}>
				<Select.Trigger>{quality.variant}</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each QUALITY_VARIANT_OPTIONS as variantOptions}
							<Select.Item value={variantOptions.value} label={variantOptions.label} />
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
	</div>
	<Input bind:value={quality.subtext} placeholder="Extra rules?" />
</div>

<style>
</style>
