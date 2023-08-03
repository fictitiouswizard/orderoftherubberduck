import { auth } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};

import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (({ error, event }) => {

    return {
        message: 'Whoops!',
       // code: error?.code ?? 'UNKNOWN'
        code: "bob"
    };
}) satisfies HandleServerError;
