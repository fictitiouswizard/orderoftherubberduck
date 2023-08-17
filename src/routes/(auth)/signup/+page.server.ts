import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad, Actions } from './$types';
import { z } from "zod";
import { Prisma } from '@prisma/client';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, "/");
	return {};
}) satisfies PageServerLoad

const registerSchema = z.object({
	username: z.string().trim()
		.min(8, {message: "Username must be 8 characters or longer"})
		.max(20, {message: "Username must contain 20 characters or fewer"}),
	password: z.string().trim().regex(
		/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
		{
			message: "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, and number"
		}
	)
})

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		const safeParse = registerSchema.safeParse(formData);

		if(!safeParse.success) {
			console.log(safeParse.error.issues);
			return fail(400, { issues: safeParse.error.issues });
		}

		const { username, password} = safeParse.data;

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username.toString(),
					password
				},
				attributes: {
					username,
          firstName: "",
          lastName: "",
          points: 0,
          booksDonated: 0,
          hoursVolunteered: 0,
          dollarsDonated: 0,
          anonymous: false,
          active: true
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch(error) {
			if(error instanceof Prisma.PrismaClientKnownRequestError) {
				const primsaError: Prisma.PrismaClientKnownRequestError = error;
				if(primsaError.code == "P2002") {
					return fail(400, { issues: [{message: "Username already exists", path: [""], code: z.ZodIssueCode.custom}]});
				} else {
          console.log(prismaError);
          
					return fail(400, {
						issues: [{
							message: "An unknown error has occured. Please try again later.",
							path: [""], code: z.ZodIssueCode.custom
						}]
					});
				}
			} else {
        console.log(error) 
				return fail(400, {
					issues: [{
						message: "An unknown error has occured. Please try again later.",
						path: [""], code: z.ZodIssueCode.custom
					}]
				});
			}
		}

		throw redirect(302, "/");
	}
};
