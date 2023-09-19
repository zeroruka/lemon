import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';
import { Prisma } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { signupFormSchema } from './signup-form.svelte';

export const load = async () => {
	return {
		form: superValidate(signupFormSchema)
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, signupFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const permission = await prisma.permission.create({
				data: {}
			});

			const user = await auth.createUser({
				key: {
					providerId: 'username', // auth method
					providerUserId: form.data.username.toLowerCase(), // unique id when using "username" auth method
					password: form.data.password // hashed by Lucia
				},
				attributes: {
					username: form.data.username,
					permission_id: permission.id
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			event.locals.auth.setSession(session); // set session cookie
		} catch (e) {
			// this part depends on the database you're using
			// check for unique constraint error in user table
			if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
				setError(form, 'username', 'Username already taken');
				return fail(400, {
					message: 'Username already taken',
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
