<script lang="ts">
	const cols = [
		{
			title: 'Product',
			links: [
				{ label: 'Features', href: '/#features' },
				{ label: 'Pricing', href: '/#pricing' },
				{ label: 'Download', href: '/join-waitlist' }
			]
		},
		{
			title: 'Company',
			links: [
				// { label: 'About', href: '/about' },
				// { label: 'Security', href: '/security' },
				// { label: 'Terms of Service', href: '/terms' },
				{ label: 'Privacy Policy', href: '/privacy' },
				// { label: 'Cookie Policy', href: '/cookies' },
				// { label: 'Status', href: '/status' }
			]
		}
	];
</script>

<footer class="border-t border-white/10 py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
			{#each cols as col}
				<div>
					<h4 class="text-sm font-semibold text-white">{col.title}</h4>
					<ul class="mt-4 space-y-2 text-sm text-zinc-400">
						{#each col.links as link}
							<li>
								<a href={link.href} class="cursor-pointer hover:text-white">{link.label}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		<div class="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
			<div class="flex items-center gap-2">
				<!-- <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg> -->
			</div>
			<div class="flex items-center gap-3">
				<!-- <span role="button" tabindex="0" class="cursor-pointer hover:text-white">Switch region</span> -->
				<!-- <span>·</span> -->
				<!-- <span role="button" tabindex="0" class="cursor-pointer hover:text-white">English</span> -->
			</div>
		</div>
	</div>
</footer>
