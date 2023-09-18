<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import LoginForm from './login-form.svelte';

	export let data;
</script>

<Card.Root class="max-w-sm">
	<Card.Header>
		<Card.Title>
			<h1 class="text-2xl font-semibold tracking-tight">Welcome back!</h1>
		</Card.Title>
		<Card.Description>Enter your username and password to log in</Card.Description>
	</Card.Header>
	<Card.Content>
		<LoginForm data={data.form} />
	</Card.Content>
</Card.Root>
