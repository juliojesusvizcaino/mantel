<script type="ts">
	let names = [
		{ id: 1, value: 'Gato 1' },
		{ id: 2, value: 'No Trufa' },
		{ id: 3, value: 'Ni idea' }
	];

	function select(name: typeof names[0]) {
		console.log(name.id, name.value);
	}
</script>

<div class="parent">
	<h1 class="title">Who's this?</h1>
	<img src="black-cat-looking-up-at-owner.jpg" alt="A cat" />
	<div class="options-wrapper">
		{#each names as name (name.id)}
			<button on:click={() => select(name)}>
				{name.value}
			</button>
		{/each}
	</div>
</div>

<style>
	.parent {
		width: 100%;
		height: 100vh;
		display: grid;
		place-content: center;
        gap: 1em;
	}
	.title {
		margin-left: auto;
		margin-right: auto;
        margin-top: 0;
        margin-bottom: 0;
	}
	img {
		/* width: 20em; */
		/* height: 20em; */
		/* aspect-ratio: initial; */
		display: block;
		width: 20em;
		height: 20em;
		object-fit: cover;
	}

	.options-wrapper {
		display: flex;
		justify-content: space-between;
	}

	button {
		display: inline-block;
	}
</style>
