<script lang="ts">
	import type { User } from 'better-auth/types';
	import { page } from '$app/stores';

	let { user }: { user: User | null } = $props();
	let showMobileNav = $state(false);

	function closeMobileNav() {
		showMobileNav = false;
	}
</script>

<nav class="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md sm:px-6">
	<div class="flex items-center gap-8">
		<a href="/" class="flex items-center gap-2 text-sm font-semibold text-white">
			<img src="/favicon.png" alt="Ledra" class="h-5 w-5" />
			Ledra
		</a>
		<div class="hidden items-center gap-6 md:flex">
			<a href="/#features" class="text-sm text-zinc-300 transition hover:text-white">Features</a>
			<a href="/#benefits" class="text-sm text-zinc-300 transition hover:text-white">Benefits</a>
			<a href="/#pricing" class="text-sm text-zinc-300 transition hover:text-white">Pricing</a>
		</div>
	</div>

	<div class="hidden items-center gap-3 md:flex">
		{#if user}
			<a href="/dashboard" class="text-sm text-zinc-300 hover:text-white">Dashboard</a>
			<form method="post" action="/auth/login?/signOut">
				<button class="rounded-md bg-white px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-200" style="color: black;">Sign out</button>
			</form>
		{:else if $page.url.pathname === '/join-waitlist'}
			<a href="/" class="rounded-md bg-white px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-200" style="color: black;">Back to home</a>
		{:else}
			<a href="/join-waitlist" class="rounded-md bg-white px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-200" style="color: black;">Try Ledra now</a>
		{/if}
	</div>

	<button
		type="button"
		onclick={() => (showMobileNav = !showMobileNav)}
		aria-label="Toggle navigation menu"
		aria-expanded={showMobileNav}
		class="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white md:hidden"
	>
		{#if showMobileNav}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
				<path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" />
			</svg>
		{:else}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
				<path d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round" />
			</svg>
		{/if}
	</button>
</nav>

{#if showMobileNav}
	<button
		type="button"
		onclick={closeMobileNav}
		aria-label="Close navigation menu"
		class="fixed inset-0 z-30 bg-black/80 md:hidden"
	></button>
	<div class="fixed inset-x-0 top-[57px] z-40 border-b border-white/10 bg-black/95 px-4 py-4 md:hidden">
		<div class="flex flex-col gap-1">
			<a href="/#features" onclick={closeMobileNav} class="flex min-h-[44px] items-center rounded-md px-3 text-base text-zinc-300 transition hover:bg-white/5 hover:text-white">Features</a>
			<a href="/#benefits" onclick={closeMobileNav} class="flex min-h-[44px] items-center rounded-md px-3 text-base text-zinc-300 transition hover:bg-white/5 hover:text-white">Benefits</a>
			<a href="/#pricing" onclick={closeMobileNav} class="flex min-h-[44px] items-center rounded-md px-3 text-base text-zinc-300 transition hover:bg-white/5 hover:text-white">Pricing</a>
			<div class="my-2 border-t border-white/10"></div>
			{#if user}
				<a href="/dashboard" onclick={closeMobileNav} class="flex min-h-[44px] items-center rounded-md px-3 text-base text-zinc-300 transition hover:bg-white/5 hover:text-white">Dashboard</a>
				<form method="post" action="/auth/login?/signOut">
					<button type="submit" class="flex min-h-[44px] w-full items-center rounded-md px-3 text-base text-zinc-300 transition hover:bg-white/5 hover:text-white">Sign out</button>
				</form>
			{:else if $page.url.pathname === '/join-waitlist'}
				<a href="/" onclick={closeMobileNav} class="flex min-h-[44px] items-center justify-center rounded-md bg-white px-3 text-base font-medium transition hover:bg-zinc-200" style="color: black;">Back to home</a>
			{:else}
				<a href="/join-waitlist" onclick={closeMobileNav} class="flex min-h-[44px] items-center justify-center rounded-md bg-white px-3 text-base font-medium transition hover:bg-zinc-200" style="color: black;">Try Ledra now</a>
			{/if}
		</div>
	</div>
{/if}
