<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import SignupForm from './signup-form.svelte';

	export let data;
</script>

<Card.Root class="max-w-sm">
	<Card.Header>
		<Card.Title>
			<h1 class="text-2xl font-semibold tracking-tight">Hi there!</h1>
		</Card.Title>
		<Card.Description>Enter your email and password to get started</Card.Description>
	</Card.Header>
	<Card.Content>
		<SignupForm data={data.form} />
	</Card.Content>
</Card.Root>
