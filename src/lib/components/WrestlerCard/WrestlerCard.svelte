<script>
	import CardHeader from './CardHeader.svelte';

	// your script goes here
	import { wrestler, showCutMarks, showGrudgeMoves } from '$lib/stores';
	import GrudgeMovesList from '$lib/components/WrestlerCard/GrudgeMovesList.svelte';
	import CardBackdrop from './CardBackdrop.svelte';
	import blankImg from '$lib/assets/blank.jpeg';
	import Qualities from '$lib/components/WrestlerCard/Qualities.svelte';
	import PromotionWatermark from './PromotionWatermark.svelte';
</script>

<div class="card">
	{#if $showCutMarks}
		<div class="cut-mark tl"></div>
		<div class="cut-mark tr"></div>
		<div class="cut-mark bl"></div>
		<div class="cut-mark br"></div>
	{/if}

	<div class="content">
		<CardBackdrop
			primaryColor={$wrestler.colors.primary.hex().toString()}
			secondaryColor={$wrestler.colors.secondary
				? $wrestler.colors?.secondary?.hex()?.toString()
				: null}
		/>
		<CardHeader {...$wrestler} />
		<div class="grad-box">
			<div class="body">
				<Qualities qualities={$wrestler.qualities} />
				<!-- {{#if card.image}}
              <img class="image" src="{{ index assets card.image }}" />
              {{else}} -->
				<img class="image" src={blankImg} alt="No wrestler" />
				<!-- {{/if}} -->
			</div>

			{#if $showGrudgeMoves && $wrestler.grudgeMoves}
				<GrudgeMovesList moves={$wrestler.grudgeMoves} />
			{/if}

			<div class="specials">
				<div class="move specialty">
					<div class="title-bar">
						<i>
							<!-- {{#if (eq card.specialty-symbol "square")}}
                          C
                          {{else if (eq card.specialty-symbol "circle")}}
                          5
                          {{else}} -->
							F
							<!-- {{/if}} -->
						</i> Specialty
					</div>
					<div class="rules">
						<div class="text">
							<p class="move-name">{$wrestler.specialty.name}</p>
							{#if $wrestler.specialty.subtext}
								<p class="note"><i>\]</i> {$wrestler.specialty.subtext}</p>
							{/if}
						</div>
						<div class="score">
							{$wrestler.specialty.pointValue}
						</div>
					</div>
				</div>

				<div class="divider"></div>

				<div class="move finisher">
					<div class="title-bar">Finisher</div>
					<div class="rules">
						<div class="text">
							<p class="move-name">{$wrestler.finisher.name}</p>
							{#if $wrestler.finisher.subtext}
								<p class="note"><i>\]</i> {$wrestler.finisher.subtext}</p>
							{/if}
						</div>
						<div class="score">
							{$wrestler.finisher.finisherRange.high}
						</div>
					</div>
				</div>
				<PromotionWatermark promotion={$wrestler.promotion} />
			</div>
		</div>
		<div class="footer">
			<span>{$wrestler.promotion}</span>
			<div class="card-id">
				{$wrestler.set || 'FTTM'}-3
			</div>
		</div>
	</div>
</div>

<style>
	/* your styles go here */
	/*
FONTS:
- Adler
- Depressionist 3 Revisited
- Special Elite
*/

	.card {
		box-sizing: border-box;
		padding: 0;
		margin: 0;

		--primary-color: #000;
		--secondary-color: #f00;
		--frame-color: #000;
		/* --primary-color: {{ card.primary }};
    --secondary-color: {{ card.secondary }}; */

		/* {{#if (and card.primary card.secondary)}}
        {{#if (eq card.long-name "yes")}}
        --frame-color: linear-gradient(0deg, #000 5%, var(--secondary-color) 10%, var(--primary-color) 30%, var(--primary-color) 75%, #000 80%);
        {{else}}
        --frame-color: linear-gradient(0deg, #000 5%, var(--secondary-color) 10%, var(--primary-color) 30%, var(--primary-color) 80%, #000 85%);
        {{/if}}
    {{else}}
        {{#if (eq card.long-name "yes")}}
        --frame-color: linear-gradient(0deg, #000 5%, var(--primary-color) 10%, var(--primary-color) 75%, #000 80%);
        {{else}}
        --frame-color: linear-gradient(0deg, #000 5%, var(--primary-color) 10%, var(--primary-color) 80%, #000 85%);
        {{/if}}
    {{/if}} */
		/* --section-background: var(--primary-color); */
		--section-background: #000;

		--qualities-background: linear-gradient(90deg, rgba(255, 255, 255, 1) 35%, #0000 70%);

		--text-outline-size: 3px;
		--text-outline-size-neg: -3px;
		--text-outline: var(--text-outline-size-neg) var(--text-outline-size-neg) 0 #000,
			var(--text-outline-size) var(--text-outline-size-neg) 0 #000,
			var(--text-outline-size-neg) var(--text-outline-size) 0 #000,
			var(--text-outline-size) var(--text-outline-size) 0 #000;
		--text-outline-white: var(--text-outline-size-neg) var(--text-outline-size-neg) 0 #fff,
			var(--text-outline-size) var(--text-outline-size-neg) 0 #fff,
			var(--text-outline-size-neg) var(--text-outline-size) 0 #fff,
			var(--text-outline-size) var(--text-outline-size) 0 #fff;
		--text-color: hsl(0, 0%, {{card.text-color}}%);
		/* --primary-color: hsl({{card.primary}}, 70%, 40%); */
		/* --background-texture: url({{ assets.denim }}); */
		--promotion-watermark: url({{ index assets card.promotion }});
		/* --section-background: linear-gradient(-90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%); */

		--titles-font: 'Peckham Press Trial';
		--title-size: 75px;

		--numbers-font: 'Microsport';
		--card-id-font: 'Avilock';
		--text-font: 'Urbanist';
		--qualities-font: 'Peckham Press Trial';
		--medals-font: 'Uchrony Circle';
	}

	i {
		display: block;
		font-family: 'FnT_BasicShapes1';
		font-style: normal;
		margin-right: 10px;
		font-size: 60px;
		width: 60px;
	}

	.card {
		width: 1200px; /* 2 in */
		height: 1800px; /* 3 in */

		border: 75px solid white; /* 1/8 inch border */
		background-color: #fff;
		font-weight: 400;
		font-size: 50px;
		font-family: var(--text-font) !important;
	}

	.card .content {
		border-radius: 45px;
		height: 100%;
		color: black;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.card .content .grad-box {
		z-index: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: white;
		background-size: cover;
		gap: 10px;
		margin: 0 40px;
		width: calc(100% - 80px);
		border-radius: 30px;
		border: 10px solid white;
		height: 100%;
	}

	/* BODY */
	.card .content .body {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		z-index: 2;
		min-height: 525px;
		overflow: hidden;
		border-radius: 20px;
	}

	.card .content .body .image {
		height: 100%;
		width: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 20%;
		z-index: 0;
		background-color: blue;
	}

	/* Specials */

	.card .content .specials {
		position: relative;
		flex-grow: 1;
		display: flex;
		flex-direction: column;

		background: var(--section-background);
		border-radius: 20px;
		color: white;
	}

	.card .content .specials .divider {
		height: 5px;
		flex-basis: 5px;
		background: linear-gradient(90deg, #0000, #fff, #0000);
		z-index: 2;
	}

	.card .content .specials .move {
		color: white;
		/* background: var(--section-background); */
		/* background-size: cover; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* border-radius: 20px; */
		padding: 20px 30px;
		flex-grow: 1;
		align-items: flex-start;
		/* border: var(--section-border-size) solid var(--section-border-color); */
		border-top: 0;
		border-bottom: 0;
		z-index: 2;
	}

	.card .content .specials .move .title-bar {
		font-family: var(--titles-font);
		display: flex;
		align-items: center;
	}

	.card .content .specials .move .title-bar i {
		display: inline-block;
		margin-right: 10px;
	}

	.card .content .specials .move .rules {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 10px;
		width: 100%;
	}

	.card .content .specials .move .rules .score {
		font-family: var(--numbers-font);
		font-size: 80px;
	}

	.card .content .specials .note {
		font-style: italic;
		font-weight: 700;
		margin: 0;
		font-size: 40px;
	}

	.card .content .specials .note i {
		font-size: 40px;
		display: inline-block;
		margin-right: 0;
		width: 40px;
	}

	.card .content .specials .move .move-name {
		font-weight: bold;
	}

	/* Footer */
	.card .content .footer {
		/* background-color: black; */
		border-radius: 0 0 70px 70px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: white;
		text-transform: uppercase;
		min-height: 60px;
		font-size: 40px;
		/* font-style: italic; */
		/* flex-grow: 1; */
		/* margin-top: 0; */
		padding: 0px 70px 0 70px;
		z-index: 1;
	}

	.card .content .footer .card-id {
		font-family: var(--card-id-font);
		font-size: 50px;
		text-transform: uppercase;
		color: white;
		text-align: center;
		/* background-color: black; */
		/* padding: 0 35px 0 35px; */
		border-radius: 0 0 15px 0;
	}

	/* CUT MARKS */
	.cut-mark {
		position: absolute;
		z-index: 99;
		width: 45px;
		height: 45px;
		border: 5px solid black;
	}

	.cut-mark.tl {
		top: 0;
		left: 0;
		border-right: 0;
		border-bottom: 0;
	}

	.cut-mark.tr {
		top: 0;
		right: 0;
		border-left: 0;
		border-bottom: 0;
	}

	.cut-mark.bl {
		bottom: 0;
		left: 0;
		border-top: 0;
		border-right: 0;
	}

	.cut-mark.br {
		bottom: 0;
		right: 0;
		border-top: 0;
		border-left: 0;
	}
</style>
