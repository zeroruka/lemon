import { auth } from '$lib/server/lucia';
import { fail } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginFormSchema } from './login-form.svelte';

export const load = async () => {
	return {
		form: superValidate(loginFormSchema)
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, loginFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			// find user by key
			// and validate password
			const key = await auth.useKey(
				'username',
				form.data.username.toLowerCase(),
				form.data.password
			);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			event.locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist
				// or invalid password
				setError(form, 'username', 'Incorrect username or password');
				setError(form, 'password', 'Incorrect username or password');
				return fail(400, {
					message: 'Incorrect username or password',
					form
				});
			}
			console.log(e);
			setError(form, 'username', 'An unknown error occurred');
			return fail(500, {
				message: 'An unknown error occurred',
				form
			});
		}

		return { form };
	}
};
