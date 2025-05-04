<script lang="ts">
	import { getNameHeight } from '$lib/stores.svelte';

	interface Props {
		primaryColor?: string;
		secondaryColor?: string | null;
	}

	let { primaryColor = '#000000', secondaryColor = null }: Props = $props();

	let longName: boolean = $derived(getNameHeight() > 75)
	console.log("PRIMARY", primaryColor)
	console.log("SECONDARY", secondaryColor)

	let calculateFrameGradient = $derived((primary: string, secondary: string | null): string => {
		console.log("PRIMARY", primary)
		console.log("SECONDARY", secondary)
		if (secondary == null) {
			if (longName) {
				return `linear-gradient(0deg, #000 5%, ${primary} 10%, ${primary} 75%, #000 80%)`;
			} else {
				return `linear-gradient(0deg, #000 5%, ${primary} 10%, ${primary} 80%, #000 85%)`;
			}
		} else {
			if (longName) {
				return `linear-gradient(0deg, #000 5%, ${secondary} 10%, ${primary} 30%, ${primary} 75%, #000 80%)`;
			} else {
				return `linear-gradient(0deg, #000 5%, ${secondary} 10%, ${primary} 30%, ${primary} 80%, #000 85%)`;
			}
		}
	});

	let frameGradient = $derived(calculateFrameGradient(primaryColor, secondaryColor));
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
