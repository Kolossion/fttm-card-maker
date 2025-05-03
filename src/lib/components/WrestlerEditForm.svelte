<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	// import {
	// 	Root as Card,
	// 	Header as CardHeader,
	// 	Title as CardTitle,
	// 	Content as CardContent
	// } from './ui/card';
	// import { Button } from '$lib/components/ui/button';
	import ColorPicker, { type HsvaColor, type RgbaColor } from 'svelte-awesome-color-picker';
	import { type Colord } from 'colord';
	import BasicShape from '$lib/components/BasicShape.svelte';
	import PromotionSelector from '$lib/components/PromotionSelector.svelte';
	import WordBox from '$lib/components/WordBox.svelte';
	import MoveEditor from '$lib/components/MoveEditor.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Label } from '$lib/components/ui/label';
	import {
		wrestlers,
		selectedWrestler,
		showGrudgeMoves,
		showCutMarks,
		DEFAULT_WRESTLER
	} from '$lib/stores';
	import type { Wrestler } from '$lib/utils/types/wrestler';
	import Color from 'color';
	import GrudgeMovesList from './WrestlerCard/GrudgeMovesList.svelte';

	let activeWrestler: Wrestler = DEFAULT_WRESTLER;
	let hasGrudgeMoves: boolean = true;
	let hasCutMarks: boolean = true;

	let unsubWrestlers = wrestlers.subscribe((val) => (activeWrestler = val[$selectedWrestler]));
	let unsubActiveWrestler = selectedWrestler.subscribe((val) => (activeWrestler = $wrestlers[val]));
	let unsubShowGrudgeMoves = showGrudgeMoves.subscribe((val) => (hasGrudgeMoves = val));
	let unsubShowCutMarks = showCutMarks.subscribe((val) => (hasCutMarks = val));

	let primaryHex: string, primaryRgb: RgbaColor, primaryHsv: HsvaColor, primaryColor: Colord;
	let secondaryHex: string,
		secondaryRgb: RgbaColor,
		secondaryHsv: HsvaColor,
		secondaryColor: Colord;

	let selectedPromotion: String | null = activeWrestler?.promotion || null;

	function updateWrestlerKey(key: string) {
		return (e: InputEvent) => {
			const target = e?.target as HTMLInputElement;
			wrestlers.update((wrestlers) => {
				wrestlers[$selectedWrestler] = {
					...activeWrestler,
					[key]: target.value
				};

				return wrestlers;
			});
		};
	}

	function setGrudgeMoveVisibility(e: Event) {
		const target = e?.target as HTMLInputElement;
		showGrudgeMoves.set(target.checked);
	}

	function setCutGuideVisibility(e: Event) {
		const target = e?.target as HTMLInputElement;
		showCutMarks.set(target.checked);
	}

	function selectPromotion(e) {
		const newPromotion = e.detail.value;
		// @ts-ignore
		updateWrestlerKey('promotion')({ target: { value: newPromotion } });
	}

	function updateGrudgeMove(color: string) {
		return (e) => {
			wrestlers.update((wrestlers) => {
				let grudgeMoveObj = activeWrestler.grudgeMoves

				if (grudgeMoveObj == null) {
					grudgeMoveObj = {
						
					}

				}


				wrestlers[$selectedWrestler] = {
					...activeWrestler,
					grudgeMoves: {
						...activeWrestler.grudgeMoves,
						[color]: {name: "Blah", pointValue: 3}
					}
				}

				return wrestlers
			})
		}
	}

	function updateWrestlerPrimaryColor(e) {
		const color = e.detail.hex;
		wrestlers.update((wrestlers) => {
			wrestlers[$selectedWrestler] = {
				...activeWrestler,
				colors: {
					...activeWrestler.colors,
					primary: Color(color, 'hex')
				}
			};

			return wrestlers;
		});
	}

	function updateWrestlerSecondaryColor(e) {
		console.log('SECONDARY', e);
		const color = e.detail.hex;
		wrestlers.update((wrestlers) => {
			wrestlers[$selectedWrestler] = {
				...activeWrestler,
				colors: {
					...activeWrestler.colors,
					secondary: color ? Color(color, 'hex') : undefined
				}
			};

			return wrestlers;
		});
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<ColorPicker
			label=""
			on:input={updateWrestlerPrimaryColor}
			bind:hex={primaryHex}
			bind:rgb={primaryRgb}
			bind:hsv={primaryHsv}
			bind:color={primaryColor}
		/>
		<ColorPicker
			nullable
			label=""
			on:input={updateWrestlerSecondaryColor}
			bind:hex={secondaryHex}
			bind:rgb={secondaryRgb}
			bind:hsv={secondaryHsv}
			bind:color={secondaryColor}
		/>
		<Input placeholder="Name" on:input={updateWrestlerKey('name')} value={activeWrestler?.name} />
	</div>
	<Input
		placeholder="Nickname"
		on:input={updateWrestlerKey('nickname')}
		value={activeWrestler?.nickname}
	/>
	<div class="flex gap-4">
		<Input
			placeholder="Height"
			on:input={updateWrestlerKey('height')}
			value={activeWrestler?.height}
		/>
		<Input
			placeholder="Weight"
			on:input={updateWrestlerKey('weight')}
			value={activeWrestler?.weight}
		/>
		<Input
			placeholder="Location"
			on:input={updateWrestlerKey('location')}
			value={activeWrestler?.location}
		/>
	</div>
	<div class="flex w-full gap-4">
		<div class="flex grow basis-6/12 flex-col gap-4">
			<WordBox title="Qualities"></WordBox>
		</div>
	</div>
	<div class="flex w-full gap-4">
		<div class="flex grow basis-6/12 flex-col gap-4">
			{#if hasGrudgeMoves}
				<div class="flex flex-col gap-4">
					<MoveEditor color="rgb(165, 119, 4)" label="Gold" hideSymbolSelector hideValueType hideExtraRules on:change={updateGrudgeMove('gold')}/>
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
							on:change={setGrudgeMoveVisibility}
							checked={hasGrudgeMoves}
							id="hasGrudge"
						/>
						<Label for="hasGrudge">Enable Grudge Moves</Label>
					</div>
					<div>
						<input
							type="checkbox"
							on:change={setCutGuideVisibility}
							checked={hasCutMarks}
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
</style>
