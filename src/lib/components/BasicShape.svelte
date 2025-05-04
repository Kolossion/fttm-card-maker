<script lang="ts">
	const shapesMap: { [key: string]: string } = {
		circle: '5',
		box: 'C',
		star: 'F',
		arrow: 'V'
	} as const;

	interface Props {
		symbol: string;
	}

	let { symbol }: Props = $props();
</script>

<span class="symbol">{shapesMap[symbol]}</span>

<style>
	.symbol {
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
		display: block;
		font-family: FnT_BasicShapes1;
		font-style: normal;
	}
</style>
