<script lang="ts">
	import clsx from 'clsx';
	import { slide } from 'svelte/transition';
	interface Props {
		title: String;
		color?: String | null;
		fullHeight?: boolean;
		fullWidth?: boolean;
		textColor?: String | null;
		children?: import('svelte').Snippet;
	}

	let {
		title,
		color = null,
		fullHeight = false,
		fullWidth = false,
		textColor = null,
		children
	}: Props = $props();
</script>

<div
	class={clsx('word-box', { 'full-height': fullHeight }, { 'full-width': fullWidth })}
	style="--word-box-color: {color ? color : 'hsl(var(--border))'};
	--word-box-text-color: {textColor ? textColor : 'hsl(var(--muted-foreground))'};"
	transition:slide
>
	<p class="title">{title}</p>
	<div class="contents">
		{@render children?.()}
	</div>
</div>

<style>
	.word-box {
		position: relative;
		border: 1px solid var(--word-box-color);
		border-radius: 5px;
		padding: 1rem;
		padding-top: 2rem;
		background: var(--word-box-bg);
	}

	.full-height {
		flex-grow: 1;
	}

	.full-width {
		width: 100%;
	}

	.title {
		position: absolute;
		text-transform: uppercase;
		background-color: var(--word-box-color);
		/* color: white; */
		/* color: hsl(var(--muted-foreground)); */
		color: var(--word-box-text-color);
		left: -1px;
		top: -1px;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 700;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
		border-radius: 5px 0 5px 0;
	}
</style>
