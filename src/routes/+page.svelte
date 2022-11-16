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

<div class="grid content-center h-screen gap-4">
	<h1 class="text-3xl mx-auto">Who's this?</h1>
	<img
		src="black-cat-looking-up-at-owner.jpg"
		alt="A cat"
		class="w-64 h-64 rounded-full object-cover mx-auto"
	/>
	<div class="flex justify-between gap-2 w-fit mx-auto">
		{#each names as name (name.id)}
			<button
				class="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-4 rounded-xl text-white"
				on:click={() => select(name)}
			>
				{name.value}
			</button>
		{/each}
	</div>
</div>
