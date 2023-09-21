<script lang="ts">
	import { ImageGallery } from '$lib/components/image-gallery';
	export let data;
</script>

<ImageGallery photos={data.photos} />
