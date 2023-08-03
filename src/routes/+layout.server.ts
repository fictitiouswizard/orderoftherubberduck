import type { LayoutServerData } from "./$types";

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();

    if(session) {
        return { 
            username: session.user.username,
            loggedIn: true
        }
    } else { 
        return {
            loggedIn: false
        }
    }
})