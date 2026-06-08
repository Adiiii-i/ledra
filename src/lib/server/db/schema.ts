import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const waitlist = pgTable('waitlist', {
	id: serial('id').primaryKey(),
	name: text('name'),
	email: text('email').notNull().unique(),
	phone: text('phone'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export * from './auth.schema';
