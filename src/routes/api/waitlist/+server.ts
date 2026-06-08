import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		if (!email || typeof email !== 'string' || !email.includes('@')) {
			return json({ error: 'Valid email is required' }, { status: 400 });
		}

		await db.insert(waitlist).values({ email });

		return json({ success: true });
	} catch (error: any) {
		// Postgres unique constraint violation
		if (error.code === '23505') { 
			// We can consider this a success since they are already on the list
			return json({ success: true, message: 'Already on the waitlist' });
		}
		
		console.error('Waitlist error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
