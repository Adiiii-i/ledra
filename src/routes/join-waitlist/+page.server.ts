import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString().trim() ?? '';
		const name = formData.get('name')?.toString().trim() ?? '';
		const phone = formData.get('phone')?.toString().trim() ?? '';

		if (!email) return fail(400, { message: 'Email is required', email: '' });
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(400, { message: 'Invalid email address', email });
		if (name.length > 100) return fail(400, { message: 'Name is too long', email, name });
		if (phone && !/^[\d\s\-+().]{6,20}$/.test(phone)) return fail(400, { message: 'Invalid phone number', email, name, phone });

		try {
			await db.insert(waitlist).values({ name, email, phone });
		} catch (e: any) {
			if (e.code === '23505') {
				// PostgreSQL unique constraint violation error code
				return { success: true, email };
			}
			return fail(500, { message: 'Failed to join waitlist', email, name, phone });
		}

		return { success: true, email };
	}
};
