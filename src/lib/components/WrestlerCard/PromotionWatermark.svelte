<script lang="ts">
	import { getPromotionWatermarkImage } from '$lib/utils/assetHelpers';

	// your script goes here
	import { promotionNamesMap, type Promotion } from '$lib/utils/types/promotions';

	interface Props {
		promotion: Promotion;
	}

	let { promotion }: Props = $props();
</script>

<div class="promotion">
	<img src={getPromotionWatermarkImage(promotion)} alt={promotionNamesMap[promotion]} />
</div>

<style>
	.promotion {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.promotion img {
		height: 80%;
		width: 80%;
		max-height: 450px;
		object-fit: contain;
		opacity: 0.25;
	}
</style>
