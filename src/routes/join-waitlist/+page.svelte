<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);

	function handleEnhance() {
		submitting = true;
		return async ({ update }) => {
			submitting = false;
			update();
		};
	}
</script>

<svelte:head>
	<title>Join the Waitlist — Ledra</title>
</svelte:head>

<section class="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 sm:px-6">
	<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]"></div>

	<div class="relative z-10 mx-auto w-full max-w-lg text-center">
		{#if form?.success}
			<div class="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 sm:p-12">
				<div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-7 w-7 text-emerald-400">
						<path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<h2 class="mt-6 text-2xl font-medium text-white">You're on the list</h2>
				<p class="mt-3 text-sm text-zinc-400">
					We'll notify <span class="font-medium text-zinc-200">{form.email}</span> when Ledra is ready for you.
				</p>
				<a href="/" class="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-zinc-200" style="color: black;">
					Back to home
				</a>
			</div>
		{:else}
			<h1 class="text-4xl font-medium tracking-tight text-white sm:text-5xl">Join the waitlist</h1>
			<p class="mt-4 text-base text-zinc-400">
				Be the first to experience Ledra — the agent-native accounting platform.
			</p>

			<form method="post" use:enhance={handleEnhance} class="mt-10 mx-auto max-w-sm space-y-4">
				<label class="block text-left text-sm font-medium text-zinc-300">
					Name
					<input
						type="text"
						name="name"
						placeholder="Your name"
						class="mt-1.5 block w-full min-h-[44px] rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none"
					/>
				</label>
				<label class="block text-left text-sm font-medium text-zinc-300">
					Email
					<input
						type="email"
						name="email"
						required
						placeholder="you@example.com"
						class="mt-1.5 block w-full min-h-[44px] rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none"
					/>
				</label>
				<label class="block text-left text-sm font-medium text-zinc-300">
					Phone <span class="font-normal text-zinc-500">(optional)</span>
					<input
						type="tel"
						name="phone"
						placeholder="+91 xxxx-nnnnnn"
						class="mt-1.5 block w-full min-h-[44px] rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none"
					/>
				</label>
				<button
					type="submit"
					disabled={submitting}
					class="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60" style="color: black;"
				>
					{#if submitting}
						<svg class="mx-auto h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
							<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
							<path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" stroke-linecap="round" class="opacity-75" />
						</svg>
					{:else}
						Join the waitlist
					{/if}
				</button>
			</form>

			{#if form?.message}
				<p class="mt-4 text-sm text-red-400">{form.message}</p>
			{/if}

			<p class="mt-8 text-xs text-zinc-500">
				No spam, ever. We'll only email you about Ledra updates.
			</p>
		{/if}
	</div>
</section>
