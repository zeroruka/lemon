<script lang="ts">
	import Skeleton from '../ui/skeleton/skeleton.svelte';

	export let photos;
	console.log(photos);
</script>

<div class="flex flex-wrap">
	{#each photos as photo}
		<img
			src="/{photo.size_variants[0].path}"
			alt={photo.title}
			class="object-contain h-[200px] p-[1.5px]"
		/>
		<!-- <Skeleton
			class="m-[1.5px] rounded-none animate-none"
			style="width: {(200 / photo.size_variants[0].height) *
				photo.size_variants[0].width}px; height: 200px"
		/> -->
	{/each}
</div>
