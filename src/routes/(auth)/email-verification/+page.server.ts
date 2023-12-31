import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  const session = await locals.auth.validate();
  if(!session) throw redirect(302, "/login");
  if(session.user.emailVerified) throw redirect(302, "/");
  return {};
}) satisfies PageServerLoad;