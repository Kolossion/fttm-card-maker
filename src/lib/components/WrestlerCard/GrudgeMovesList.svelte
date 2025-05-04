<script lang="ts">
	import type { GrudgeMove } from '$lib/utils/types/wrestler';
	
	interface Props {
		// your script goes here
		moves: { gold: GrudgeMove; silver: GrudgeMove; bronze: GrudgeMove };
	}

	let { moves }: Props = $props();
</script>

<div class="grudge-moves">
	<div class="grudge gold">
		<p class="name">
			<span class="medal">g</span>
			{moves.gold.name}
		</p>
		<p class="points">
			{moves.gold.pointValue}
		</p>
	</div>
	<div class="grudge silver">
		<p class="name">
			<span class="medal">s</span>
			{moves.silver.name}
		</p>
		<p class="points">
			{moves.silver.pointValue}
		</p>
	</div>
	<div class="grudge bronze">
		<p class="name">
			<span class="medal">b</span>
			{moves.bronze.name}
		</p>
		<p class="points">
			{moves.bronze.pointValue}
		</p>
	</div>
</div>

<style>
	.grudge-moves .grudge {
		font-size: 50px;
		line-height: 70px;
		font-weight: 800;
		padding: 0px 20px;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.grudge-moves .grudge:first-child {
		border-radius: 20px 20px 0 0;
	}

	.grudge-moves .grudge:last-child {
		border-radius: 0 0 20px 20px;
	}

	.grudge-moves .grudge .name {
		font-weight: 800;
		display: flex;
		align-items: center;
		gap: 15px;
		color: black;
	}

	.grudge-moves .grudge .name .medal {
		font-family: var(--medals-font);
		font-weight: bold;
		height: 60px;

		font-size: 60px;
	}

	.grudge-moves .grudge .points {
		font-weight: 900;
		color: black;
	}

	.grudge-moves .grudge.gold {
		background-color: gold;
	}
	.grudge-moves .grudge.silver {
		background-color: silver;
	}
	.grudge-moves .grudge.bronze {
		background-color: tan;
	}

	.grudge-moves .grudge.gold .medal {
		color: rgb(165, 119, 4);
	}
	.grudge-moves .grudge.silver .medal {
		color: rgb(69, 105, 105);
	}
	.grudge-moves .grudge.bronze .medal {
		color: brown;
	}
</style>
