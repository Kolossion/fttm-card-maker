<script lang="ts">
	import { nameHeight } from '$lib/stores';

	export let primaryColor: string = '#ff0000';
	export let secondaryColor: string | null = null;

	let longName = false;
	const unsub = nameHeight.subscribe((height) => (longName = height > 75));

	$: calculateFrameGradient = (primary: string, secondary: string | null): string => {
		if (secondary == null) {
			if (longName) {
				return `linear-gradient(0deg, #000 5%, ${primaryColor} 10%, ${primaryColor} 75%, #000 80%)`;
			} else {
				return `linear-gradient(0deg, #000 5%, ${primaryColor} 10%, ${primaryColor} 80%, #000 85%)`;
			}
		} else {
			if (longName) {
				return `linear-gradient(0deg, #000 5%, ${secondary} 10%, ${primary} 30%, ${primary} 75%, #000 80%)`;
			} else {
				return `linear-gradient(0deg, #000 5%, ${secondary} 10%, ${primary} 30%, ${primary} 80%, #000 85%)`;
			}
		}
	};

	$: frameGradient = calculateFrameGradient(primaryColor, secondaryColor);
</script>

<div class="backdrop" style="--frame-color: {frameGradient}"></div>

<style>
	.backdrop {
		background: var(--frame-color);
		position: absolute;
		width: calc(100% - 150px);
		height: calc(100% - 150px);
		z-index: 0;
		border-radius: 75px;
	}
</style>
