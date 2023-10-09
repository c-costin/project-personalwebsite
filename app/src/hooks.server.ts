import { handleSession } from 'svelte-kit-cookie-session';

export const handle = handleSession(
	{
		init: () => ({ fontSize: 16 }),
		expires: 90,
		expires_in: 'days',
		secret: [
			{
				id: 2,
				secret: 'X2i5tj07c93gbyVtdXMb5F6vc0sEfe9D'
			},
			{
				id: 1,
				secret: 'aP3PnY82PiYw1n0d1wtoApJvEEJYF5tf'
			}
		]
	},
	async ({ event, resolve }) => {
		return resolve(event);
	}
);
