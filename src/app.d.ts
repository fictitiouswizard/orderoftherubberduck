// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code: string;
		}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}

	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type UserAttributes = {
			username: string;
		};
		type DatabaseSessionAttributes = {};
	}
}


export {};
