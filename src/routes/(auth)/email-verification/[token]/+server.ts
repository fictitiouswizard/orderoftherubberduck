import { auth } from "$lib/server/lucia";
import { validateEmailVerificationToken} from "$lib/server/token";

import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, locals }) => {
  const { token } = params;
  if (token === undefined) {
    return new Response("Invalid email verification link", {
      status: 400
    });
  }
  try {
    const userId = await validateEmailVerificationToken(token);
    const user = await auth.getUser(userId);
    await auth.invalidateAllUserSessions(userId);
    await auth.updateUserAttributes(user.userId, {
      email_verified: true
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });
    locals.auth.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch {
    return new Response("Invalid email verification link", {
      status: 400
    });
  }
}