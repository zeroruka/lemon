<script lang="ts">
	import { animate } from 'motion';

	function animateCardBackdrop(node: HTMLElement) {
		// console.log(node);
		// // inner div
		// const card = node.children[0];
		// animate(
		// 	card,
		// 	{
		// 		opacity: [0, 1],
		// 		scale: [0.9, 1]
		// 	},
		// 	{
		// 		duration: 0.3
		// 	}
		// );
	}
</script>

<div class=" flex justify-center items-center h-full" use:animateCardBackdrop>
	<slot />
</div>
