import { auth } from '$lib/server/lucia';
import { fail } from '@sveltejs/kit';
import { generatePasswordResetToken} from "$lib/server/token";
import { sendPasswordResetEmail } from "$lib/server/email";

import type { Actions } from "./$types";
import prisma from "$lib/prisma";
import { LuciaError } from "lucia";

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    // basic check
    if (
      typeof email !== "string" ||
      email.length < 1 ||
      email.length > 255
    ) {
      return fail(400, {
        message: "Invalid email"
      });
    }
    try {
      const storedUser = await prisma.user.findUnique({
        where: {
          email
        }
      });
      if (!storedUser) { return fail(400, {"message": "Invalid email"}) }
      const user = auth.transformDatabaseUser(storedUser);
      const token = await generatePasswordResetToken(user.userId);
      await sendPasswordResetEmail(email, token);
    } catch (e) {
      if (
        e instanceof LuciaError &&
        (e.message === "AUTH_INVALID_KEY_ID" ||
          e.message === "AUTH_INVALID_PASSWORD")
      ) {
        return fail(400, {
          message: "Incorrect email"
        });
      }
      return fail(500, {
        message: "Internal server error"
      });
    }
    return {
        success: true
    };
  }
}