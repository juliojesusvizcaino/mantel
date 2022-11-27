<script lang="ts">
	import { enhance } from '$app/forms';

	let loading = false;
	let name = '';
    let files: never[] = [];

    $: console.log(files)
</script>

<div>
	<h1>Add user</h1>

	<form
		method="POST"
		use:enhance={({ form, data, action, cancel }) => {
			loading = true;
			return ({ result, update }) => {
				loading = false;
				update();
			};
		}}
        class="max-w-2xl"
	>
		<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
		<input
			type="text"
			name="name"
			bind:value={name}
			class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		/>
		<label for="image" class="block text-sm font-medium text-gray-700">Image</label>
        <input name="image" type="file" bind:value={files} accept="image/*" />

        <button class="p-4 bg-red-500 block">Submit</button>
	</form>
</div>
