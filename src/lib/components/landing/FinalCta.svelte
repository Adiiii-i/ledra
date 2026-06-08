<script lang="ts">
	let { user }: { user: import('better-auth/types').User | null } = $props();
</script>

<section class="py-32 text-center">
	<div class="mx-auto max-w-3xl px-6">
		<h2 class="text-5xl font-medium tracking-tight text-white sm:text-6xl">Try Ledra now.</h2>
		<div class="mt-10">
			<a href={user ? '/dashboard' : '/join-waitlist'} class="inline-flex min-h-[44px] items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium transition hover:bg-zinc-200" style="color: black;">
				{user ? 'Open dashboard' : 'Download for macOS'}
			</a>
		</div>
	</div>
</section>
