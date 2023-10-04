import { redirect } from "@sveltejs/kit";

import type { PageServerLoad, Actions } from "./$types";
import { generateEmailVerificationToken } from "$lib/server/token";
import { sendEmailVerificationEmail } from "$lib/server/email";

export const load = (async ({ locals }) => {
  const session = await locals.auth.validate();
  if(!session) throw redirect(302, "/login");
  if(session.user.emailVerified) throw redirect(302, "/");
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    if(!session) throw redirect(302, "/login");
    const token = await generateEmailVerificationToken(session.user.userId);
    const status = await sendEmailVerificationEmail(session.user.email, token);
  }
}