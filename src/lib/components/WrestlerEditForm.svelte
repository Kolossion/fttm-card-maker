<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import ColorPicker, { type HsvaColor, type RgbaColor } from 'svelte-awesome-color-picker';
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
		updateCurrentWrestlerPromotion,
		updateCurrentWrestlerMove,
		updateCurrentWrestlerGrudgeMove
	} from '$lib/stores.svelte';
	import type { GrudgeMoves, Move } from '$lib/utils/types/wrestler';
	import Color from 'color';
	import type { Promotion } from '$lib/utils/types/promotions';
	import Checkbox from './ui/checkbox/checkbox.svelte';
	import QualityListEditor from './QualityListEditor.svelte';
	import { Colord } from 'colord';

	const activeWrestler = $derived(getCurrentWrestler());
	const showCutMarks = $derived(getShowCutMarks());
	const showGrudgeMoves = $derived(getShowGrudgeMoves());

	let primaryHex: string = $derived(activeWrestler.colors.primary.hex().toString());
	let secondaryColor: Color | null = $derived(activeWrestler.colors.secondary);

	let selectedPromotion: String | null = $derived(activeWrestler.promotion || null);

	function updateWrestlerKey(key: string) {
		return (e: InputEvent) => {
			const target = e?.target as HTMLInputElement;
			updateCurrentWrestlerKey(key, target.value);
		};
	}

	function selectPromotion(e: { detail: { value: Promotion } }) {
		const newPromotion = e.detail.value;
		updateCurrentWrestlerPromotion(newPromotion);
		// @ts-ignore
		updateWrestlerKey('promotion')({ target: { value: newPromotion } });
	}

	function updateWrestlerPrimaryColor(e: {
		hsv: HsvaColor | null;
		rgb: RgbaColor | null;
		hex: string | null;
		color: Colord | null;
	}) {
		const color = e.hex || '#ffffff';
		updateCurrentWrestlerPrimaryColor(color);
	}

	function updateWrestlerSecondaryColor(e: {
		hsv: HsvaColor | null;
		rgb: RgbaColor | null;
		hex: string | null;
		color: Colord | null;
	}) {
		const color = e.hex;
		if (color == null && secondaryColor == null) return;
		updateCurrentWrestlerSecondaryColor(color);
	}

	function updateWrestlerMove(moveKey: string) {
		return (move: Move) => updateCurrentWrestlerMove(moveKey, move);
	}

	function updateWrestlerGrudgeMove(moveColor: string & keyof GrudgeMoves) {
		return (move: Move) => updateCurrentWrestlerGrudgeMove(moveColor, move);
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<ColorPicker label="" onInput={updateWrestlerPrimaryColor} isAlpha={false} hex={primaryHex} />
		<ColorPicker
			isDark
			nullable={true}
			label=""
			onInput={updateWrestlerSecondaryColor}
			isAlpha={false}
			hex={secondaryColor ? secondaryColor.hex().toString() : null}
		/>
		<Input placeholder="Name" bind:value={activeWrestler.name} />
	</div>
	<Input placeholder="Nickname" bind:value={activeWrestler.nickname} />
	<div class="flex gap-4">
		<Input placeholder="Height" bind:value={activeWrestler.height} />
		<Input placeholder="Weight" bind:value={activeWrestler.weight} />
		<Input placeholder="Location" bind:value={activeWrestler.location} />
	</div>
	<!-- <div class="flex w-full gap-4">
		<div class="flex grow basis-6/12 flex-col gap-4">
			<WordBox title="Qualities"></WordBox>
		</div>
	</div> -->
	<div class="flex w-full gap-4">
		<div class="flex grow basis-6/12 flex-col gap-4">
			<WordBox title="Qualities">
				<QualityListEditor bind:qualities={activeWrestler.qualities} />
				<!-- <QualityListEditor /> -->
			</WordBox>
		</div>
		<div class="flex grow basis-6/12 flex-col gap-4">
			<WordBox title="Extra Options">
				<div class="flex flex-col items-start justify-start gap-2">
					<div class="flex flex-row items-start items-center gap-2">
						<Checkbox
							onCheckedChange={setShowGrudgeMoves}
							checked={showGrudgeMoves}
							id="hasGrudge"
						/>
						<Label for="hasGrudge">Enable Grudge Moves</Label>
					</div>
					<div class="flex flex-row items-start items-center gap-2">
						<Checkbox onCheckedChange={setShowCutMarks} checked={showCutMarks} id="cutMarks" />
						<Label for="cutMarks">Render Cut Guides</Label>
					</div>
				</div>
			</WordBox>
			{#if showGrudgeMoves}
				<div class="flex flex-col gap-4">
					<MoveEditor
						color="rgb(165, 119, 4)"
						label="Gold"
						move={activeWrestler.grudgeMoves.gold}
						onChange={updateWrestlerGrudgeMove('gold')}
						hideSymbolSelector
						hideValueType
						hideExtraRules
					/>
					<MoveEditor
						color="rgb(69, 105, 105)"
						label="Silver"
						move={activeWrestler.grudgeMoves.silver}
						onChange={updateWrestlerGrudgeMove('silver')}
						hideSymbolSelector
						hideValueType
						hideExtraRules
					/>
					<MoveEditor
						color="brown"
						label="Bronze"
						move={activeWrestler.grudgeMoves.bronze}
						onChange={updateWrestlerGrudgeMove('bronze')}
						hideSymbolSelector
						hideValueType
						hideExtraRules
					/>
				</div>
			{/if}
			<MoveEditor
				label="Specialty"
				move={activeWrestler.specialty}
				onChange={updateWrestlerMove('specialty')}
			/>
			<MoveEditor
				label="Finisher"
				move={activeWrestler.finisher}
				hideSymbolSelector
				onChange={updateWrestlerMove('finisher')}
			/>
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
				<Input placeholder="Set Code" bind:value={activeWrestler.set} />
			</div>
			<div class="flex grow basis-6/12 flex-col gap-4">
				<Input placeholder="Set Code" bind:value={activeWrestler.set} />
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
</style>
