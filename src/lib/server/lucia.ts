import { dev } from '$app/environment';
import { prisma } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

const client = new PrismaClient();

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: prisma(client)
});

export type Auth = typeof auth;
