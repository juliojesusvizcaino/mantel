<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData, PageData } from './$types';

	let loading = false;

	export let data: PageData;
	export let form: ActionData;

	$: question = form ? form.next : data.question;
</script>

<div class="grid content-center min-h-screen gap-4">
	loading: {loading}
	<h1 class="text-3xl mx-auto">Who's this?</h1>
	<img alt="Who's this?" src={question?.img} class="w-64 h-64 rounded-full object-cover mx-auto" />
	<form
		method="POST"
		use:enhance={({ form, data, action, cancel }) => {
			loading = true;
			return ({ result, update }) => {
				loading = false;
				update();
			};
		}}
	>
		<div class="flex justify-between gap-2 w-fit mx-auto">
			{#if form}
				{#if form.success}
					yesss
				{:else}
					noooo
				{/if}
			{:else}{/if}
			{#each question?.options ?? [] as option (option.id)}
				<button
					class="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-4 rounded-xl text-white hover:drop-shadow-lg disabled:opacity-75"
					name="chosen"
					value={option.id}
					disabled={loading}
				>
					{option.name}
				</button>
			{/each}
		</div>
	</form>

	<!-- <h1 class="text-3xl mx-auto">Who's this?</h1> -->
	<!-- <img -->
	<!-- 	src="black-cat-looking-up-at-owner.jpg" -->
	<!-- 	alt="A cat" -->
	<!-- 	class="w-64 h-64 rounded-full object-cover mx-auto" -->
	<!-- /> -->
	<!-- <div class="flex justify-between gap-2 w-fit mx-auto"> -->
	<!-- 	{#each names as name (name.id)} -->
	<!-- 		<button -->
	<!-- 			class="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-4 rounded-xl text-white" -->
	<!-- 			on:click={() => select(name)} -->
	<!-- 		> -->
	<!-- 			{name.value} -->
	<!-- 		</button> -->
	<!-- 	{/each} -->
	<!-- </div> -->
</div>
