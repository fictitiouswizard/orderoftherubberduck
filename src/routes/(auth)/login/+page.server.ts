import { auth } from "$lib/server/lucia";
import { LuciaError } from "lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";


export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();
		if (session) {
			if(!session.attributes.email_verified) throw redirect(302, "/auth/email-verification");
			throw redirect(302, "/");
		}
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		// basic check
		if (
			typeof username !== "string" ||
			username.length < 1 ||
			username.length > 31
		) {
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 1 ||
			password.length > 255
		) {
			return fail(400, {
				message: "Invalid password"
			});
		}
		try {
			// find user by key
			// and validate password
			const user = await auth.useKey("username", username, password);
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === "AUTH_INVALID_KEY_ID" ||
					e.message === "AUTH_INVALID_PASSWORD")
			) {
				return fail(400, {
					message: "Incorrect username of password"
				});
			}
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, "/ledger/accounts");
	}
};