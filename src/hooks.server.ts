import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	const session = await event.locals.auth.validate();

	if (session) {
		event.locals.user = await prisma.user.findUnique({
			where: { id: session.user.userId },
			include: { permission: true }
		});
		console.log(event.locals.user);
	}

	if (event.url.pathname.startsWith('/api/signout')) {
		if (session) {
			await auth.invalidateSession(session.sessionId);
			event.locals.auth.setSession(null);
		}
		throw redirect(303, '/');
	}

	return await resolve(event);
};
