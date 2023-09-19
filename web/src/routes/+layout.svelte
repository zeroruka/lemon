<script>
	import { setInitialClassState } from '$lib/components/light-switch/light-switch';
	import '../app.postcss';
</script>

<svelte:head>
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<slot />
