<script lang="ts">
	import { enhance } from '$app/forms';

	let input: HTMLInputElement;
	let form: HTMLFormElement;
	let btn: HTMLButtonElement;

	export let isOpen;

	let loading = false;
	const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

	function openFilePicker() {
		input.click();
	}

	function submitForm() {
		btn.click();
	}
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			isOpen = false;
			await update();
		};
	}}
	bind:this={form}
	action="?/uploadFiles"
	enctype="multipart/form-data"
>
	<input
		bind:this={input}
		type="file"
		name="files[]"
		class="hidden"
		id="file"
		accept={authorizedExtensions.join(',')}
		multiple
		on:change={submitForm}
	/>
	<button type="submit" hidden bind:this={btn} />
	<button
		on:click|preventDefault={openFilePicker}
		class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 w-full"
		>Upload Image</button
	>
</form>
