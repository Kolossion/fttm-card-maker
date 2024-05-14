<script lang="ts">
	import { getPromotionWatermarkImage } from '$lib/utils/assetHelpers';

	// your script goes here
	import { promotionNamesMap, type Promotion } from '$lib/utils/types/promotions';

	export let promotion: Promotion;
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
		height: calc(100% - 20%);
		max-height: 450px;
		opacity: 0.25;
	}
</style>
