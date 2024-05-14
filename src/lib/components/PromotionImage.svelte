<script lang="ts">
	import { asset } from '$lib/utils/constants';
	import { promotionNamesMap } from '$lib/utils/types/promotions';
	import type { Promotion } from '$lib/utils/types/promotions';
	export let name: Promotion = 'wwe';
</script>

<img src={asset(`promotions/${name}.gif`)} alt={promotionNamesMap[name]} />
