<script lang="ts">
	const benefits = [
		{
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><path d="M12 2l3 7h7l-5.5 5 1.5 7-6-4-6 4 1.5-7L2 9h7l3-7z" stroke-linejoin="round"/></svg>`,
			title: 'AI-Powered Drafting',
			desc: 'Generate precise GST returns and audit reports in seconds. AI understands accounting standards and tax laws.'
		},
		{
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 118 0v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>`,
			title: 'Enterprise-Grade Security',
			desc: 'AES-256 encryption at rest and TLS 1.3 in transit. SOC 2 compliant with full audit trails for financial data.'
		},
		{
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
			title: 'Role-Based Access Control',
			desc: 'Granular permissions for partners, articles, accountants, and clients. Every action logged and auditable.'
		},
		{
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg>`,
			title: 'Smart Ledger Analysis',
			desc: 'Instant invoice extraction, ledger reconciliation, and ITC matching across thousands of transactions.'
		},
		{
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M22 12h-4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
			title: 'Multi-Act Support',
			desc: 'Pre-trained on Indian Income Tax Act, GST, Companies Act, and TDS provisions. Automatically applies local rules.'
		},
		{
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
			title: 'Real-Time Collaboration',
			desc: 'Co-edit reports with your team in real time. Comments, suggestions, and version history built in.'
		},
		{
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
			title: 'Higher Accuracy',
			desc: 'AI-driven drafting achieves higher accuracy compared to human drafters — computationally verified and error-free every time.'
		},
		{
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M22 12h-4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><path d="M8 12h8"/></svg>`,
			title: 'Lower Compliance Costs',
			desc: 'Reduce compliance costs to a fraction of traditional manual entry. Premium output at a fraction of the time.'
		},
		{
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><path d="M12 2l3 7h7l-5.5 5 1.5 7-6-4-6 4 1.5-7L2 9h7l3-7z"/></svg>`,
			title: 'Put Your Firm on Top',
			desc: 'Outpace competitors with faster turnarounds, superior client reporting, and leaner operations. Ledra puts your firm ahead.'
		}
	];
</script>

<section id="benefits" class="border-t border-white/10 py-24">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-4xl font-medium tracking-tight text-white sm:text-5xl">Everything you need to run a CA firm at scale</h2>
			<p class="mt-4 text-lg text-zinc-400">From compliance to advisory, Ledra equips your firm with AI-powered tools that respect your workflow.</p>
		</div>
		<div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each benefits as b}
				<div class="group rounded-xl border border-white/10 bg-black p-6 transition hover:border-violet-500/30 hover:bg-zinc-900">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20">
						{@html b.icon}
					</div>
					<h3 class="mt-4 text-base font-medium text-white">{b.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-zinc-400">{b.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
