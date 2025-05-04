<script lang="ts">
	import { getStringFromSymbol } from '$lib/utils/stringUtils';
	import type { TimingSymbol } from '$lib/utils/types/wrestler';

	
	interface Props {
		// your script goes here
		symbol?: TimingSymbol;
		name: string;
		subtext?: string | undefined;
		variant?: string | undefined;
	}

	let {
		symbol = 'star',
		name,
		subtext = undefined,
		variant = undefined
	}: Props = $props();
</script>

<!--

<ul>
<li><i>F</i>Favorite</li>
<li><i>F</i>Mean</li>
<li><i>F</i>Cheat</li>
<li><i>F</i>Helped [M]</li>
<li><i>C</i>Strong</li>
<li><i>5</i>Powerful</li>
<li><i>5</i>
  <span class="text">Object<span class="helper">Beer can</span></span></li>
</ul>

-->

<!-- markup (zero or more items) goes here -->
<li class="quality">
	<i>{getStringFromSymbol(symbol)}</i>
	<span class="text">
		{name}
		{#if variant}
			[{variant}]
		{/if}
		{#if subtext}
			<span class="helper">{subtext}</span>
		{/if}
	</span>
</li>

<style lang="scss">
	.quality {
		display: flex;
		align-items: center;
		margin: 10px 0;
		font-size: 50px;
		line-height: 60px;
		font-family: var(--qualities-font);
		text-shadow: var(--text-outline-white);

		i {
			display: block;
			font-family: 'FnT_BasicShapes1';
			font-style: normal;
			margin-right: 20px;
			font-size: 60px;
			-webkit-text-stroke: 2px white;
			text-stroke: 2px white;
			color: black;
			text-align: center;
			vertical-align: middle;
		}

		.text {
			display: flex;
			flex-direction: column;
			color: black;
			margin-top: -10px;

			.helper {
				color: black;
				font-family: var(--text-font);
				text-transform: initial;
				font-weight: 700;
				font-style: italic;
				font-size: 45px;
				line-height: 45px;
			}
		}
	}
</style>
