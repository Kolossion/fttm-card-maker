<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import {
		Root as Card,
		Header as CardHeader,
		Title as CardTitle,
		Content as CardContent
	} from './ui/card';
	import { Button } from '$lib/components/ui/button';
	import ColorPicker, { type HsvaColor, type RgbaColor } from 'svelte-awesome-color-picker';
	import { type Colord } from 'colord';
	import BasicShape from '$lib/components/BasicShape.svelte';
	import PromotionSelector from '$lib/components/PromotionSelector.svelte';
	import WordBox from '$lib/components/WordBox.svelte';
	import MoveEditor from '$lib/components/MoveEditor.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Label } from '$lib/components/ui/label';
	import {
		getShowCutMarks,
		getShowGrudgeMoves,
		getCurrentWrestler,
		setShowGrudgeMoves,
		setShowCutMarks,
		updateCurrentWrestlerKey,
		updateCurrentWrestlerPrimaryColor,
		updateCurrentWrestlerSecondaryColor,
		updateCurrentWrestlerPromotion
	} from '$lib/stores.svelte';
	import type { GrudgeMove, Wrestler } from '$lib/utils/types/wrestler';
	import Color from 'color';
	import GrudgeMovesList from './WrestlerCard/GrudgeMovesList.svelte';
	import type { Promotion } from '$lib/utils/types/promotions';

	const activeWrestler = $derived(getCurrentWrestler())
	const showCutMarks = $derived(getShowCutMarks())
	const showGrudgeMoves = $derived(getShowGrudgeMoves())

	let primaryHex: string = $derived(activeWrestler.colors.primary.hex().toString()) 
	// TODO: Get working right with nullable color
	let secondaryColor: Color | null = $derived(activeWrestler.colors.secondary)

	let selectedPromotion: String | null = activeWrestler.promotion || null;

	function updateWrestlerKey(key: string) {
		return (e: InputEvent) => {
			const target = e?.target as HTMLInputElement;
			updateCurrentWrestlerKey(key, target.value)
		};
	}

	function setGrudgeMoveVisibility(e: Event) {
		const target = e?.target as HTMLInputElement;
		setShowGrudgeMoves(target.checked)
		// showGrudgeMoves.set(target.checked);
	}

	function setCutGuideVisibility(e: Event) {
		const target = e?.target as HTMLInputElement;
		setShowCutMarks(target.checked)
	}

	function selectPromotion(e) {
		const newPromotion = e.detail.value as Promotion;
		updateCurrentWrestlerPromotion(newPromotion)
		// @ts-ignore
		updateWrestlerKey('promotion')({ target: { value: newPromotion } });
	}

	function updateGrudgeMove(move: GrudgeMove) {
		
	}

	// function updateGrudgeMove(color: string) {
	// 	return (e) => {
	// 		wrestlers.update((wrestlers) => {
	// 			let grudgeMoveObj = activeWrestler.grudgeMoves

	// 			// if (grudgeMoveObj == null) {
	// 			// 	grudgeMoveObj = {
						
	// 			// 	}

	// 			// }
	// 			if (showGrudgeMoves && activeWrestler.grudgeMoves != null) {
	// 				wrestlers[$selectedWrestler] = {
	// 					...activeWrestler,
	// 					grudgeMoves: {
	// 						...activeWrestler.grudgeMoves,
	// 						[color]: {name: "Blah", pointValue: 3}
	// 					}
	// 				}
	// 			}

	// 			return wrestlers
	// 		})
	// 	}
	// }

	function updateWrestlerPrimaryColor(e) {
		const color = e.hex;
		updateCurrentWrestlerPrimaryColor(color)
	}

	function updateWrestlerSecondaryColor(e) {
		console.log("UPDATING SECONDARY, TOP", e.hex)
		console.log("UPDATING SECONDARY, TOP SECONDARY", secondaryColor)
		const color = e.hex;
		if (color == null && secondaryColor == null) return
		updateCurrentWrestlerSecondaryColor(color)
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<ColorPicker
			label=""
			onInput={updateWrestlerPrimaryColor}
			isAlpha={false}
			hex={primaryHex}
		/>
		<ColorPicker
			isDark
			nullable={true}
			label=""
			onInput={updateWrestlerSecondaryColor}
			isAlpha={false}
			hex={secondaryColor ? secondaryColor.hex().toString() : null}
		/>
		<Input 
			placeholder="Name"
			bind:value={activeWrestler.name}
		/>
	</div>
	<Input
		placeholder="Nickname"
		bind:value={activeWrestler.nickname}
	/>
	<div class="flex gap-4">
		<Input
			placeholder="Height"
			bind:value={activeWrestler.height}
		/>
		<Input
			placeholder="Weight"
			bind:value={activeWrestler.weight}
		/>
		<Input
			placeholder="Location"
			bind:value={activeWrestler.location}
		/>
	</div>
	<div class="flex w-full gap-4">
		<div class="flex grow basis-6/12 flex-col gap-4">
			<WordBox title="Qualities"></WordBox>
		</div>
	</div>
	<div class="flex w-full gap-4">
		<div class="flex grow basis-6/12 flex-col gap-4">
			{#if showGrudgeMoves}
				<div class="flex flex-col gap-4">
					<MoveEditor color="rgb(165, 119, 4)" label="Gold" hideSymbolSelector hideValueType hideExtraRules/>
					<MoveEditor color="rgb(69, 105, 105)" label="Silver" hideSymbolSelector hideValueType hideExtraRules/>
					<MoveEditor color="brown" label="Bronze" hideSymbolSelector hideValueType hideExtraRules/>
				</div>
			{/if}
		</div>
		<div class="flex grow basis-6/12 flex-col gap-4">
			<WordBox title="Extra Options">
				<div class="flex flex-col items-start justify-start">
					<div>
						<input
							type="checkbox"
							onchange={setGrudgeMoveVisibility}
							checked={showGrudgeMoves}
							id="hasGrudge"
						/>
						<Label for="hasGrudge">Enable Grudge Moves</Label>
					</div>
					<div>
						<input
							type="checkbox"
							onchange={setCutGuideVisibility}
							checked={showCutMarks}
							id="cutMarks"
						/>
						<Label for="cutMarks">Render Cut Guides</Label>
					</div>
				</div>
			</WordBox>
			<MoveEditor label="Specialty" />
			<MoveEditor label="Finisher" hideSymbolSelector />
		</div>
	</div>
	<div class="flex w-full gap-4">
		<div class="flex grow basis-6/12 flex-col gap-4">
			<WordBox title="Promotion">
				<PromotionSelector selected={selectedPromotion} on:change={selectPromotion} />
			</WordBox>
		</div>
	</div>
	<WordBox title="Other Data">
		<div class="flex w-full gap-4">
			<div class="flex grow basis-6/12 flex-col gap-4">
				<Input
					placeholder="Set Code"
					value={activeWrestler?.set}
					on:input={updateWrestlerKey('set')}
				/>
			</div>
			<div class="flex grow basis-6/12 flex-col gap-4">
				<Input
					placeholder="Set Code"
					value={activeWrestler?.set}
					on:input={updateWrestlerKey('set')}
				/>
			</div>
		</div>
	</WordBox>
	<Separator />
	<div class="flex w-full gap-4">
		<BasicShape symbol="circle" />
		<BasicShape symbol="box" />
		<BasicShape symbol="star" />
	</div>
</div>

<style>
	.dark {

	}
</style>
