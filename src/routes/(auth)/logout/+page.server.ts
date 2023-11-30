import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { auth } from "$lib/server/lucia";

export const load = (async ({ locals }) => {
    
}) satisfies PageServerLoad;


export const actions = {
    default: async ({ locals }) => {
        const session = await locals.auth.validate();

        console.log(session);

        if(!session) return fail(401);

        await auth.invalidateSession(session.sessionId);
        locals.auth.setSession(null);

        throw redirect(302, '/');

    }
} satisfies Actions