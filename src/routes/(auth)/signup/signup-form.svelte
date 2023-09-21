<script lang="ts" context="module">
	import { z } from 'zod';
	export const signupFormSchema = z.object({
		username: z
			.string()
			.min(2, 'Username must be at least 2 characters.')
			.max(30, 'Username must not be longer than 30 characters.')
			.regex(
				/^[a-zA-Z0-9_-]*$/,
				'Username can only contain alphanumeric characters, underscores, and dashes.'
			),
		password: z.string().min(8, 'Password must be at least 8 characters.')
	});
	export type SignupFormSchema = typeof signupFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Loader2 } from 'lucide-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let data: SuperValidated<SignupFormSchema>;
	let formLoading = false;
</script>

<Form.Root
	form={data}
	schema={signupFormSchema}
	let:config
	method="POST"
	class="space-y-3"
	options={{
		onSubmit: () => {
			formLoading = true;
		},
		onUpdated: () => {
			formLoading = false;
		}
	}}
>
	<Form.Item>
		<Form.Field {config} name="username">
			<Form.Label>Username</Form.Label>
			<Form.Input placeholder="username" disabled={formLoading} />
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="password">
			<Form.Label>Password</Form.Label>
			<Form.Input type="password" disabled={formLoading} />
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Button disabled={formLoading} class="w-full">
		{#if formLoading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		Continue
	</Form.Button>
	<p class="px-8 text-center text-sm text-muted-foreground">
		By clicking continue, you agree with our{' '}
		<a href="/terms" class="underline underline-offset-4 hover:text-primary">
			Terms of Service
		</a>{' '}
		and{' '}
		<a href="/privacy" class="underline underline-offset-4 hover:text-primary"> Privacy Policy </a>
		.
	</p>
</Form.Root>
