<script lang="ts">
	const plans = [
		{
			name: 'Starter',
			price: 'Free',
			period: 'forever',
			desc: 'For solo CAs exploring AI-assisted compliance.',
			features: ['5 AI returns per month', 'Basic ledger analysis', 'Single user', 'Community support', 'Tax forms library'],
			cta: 'Get started',
			featured: false
		},
		{
			name: 'Professional',
			price: '₹4999',
			period: '/month',
			desc: 'For growing firms that need advanced compliance and collaboration.',
			features: ['Unlimited AI returns', 'Advanced GST & TDS recon', 'Up to 10 users', 'Priority support', 'RBAC & audit logs', 'Multi-act support', 'API access'],
			cta: 'Start free trial',
			featured: true
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			period: '',
			desc: 'For large firms with custom security, compliance, and integration needs.',
			features: ['Everything in Professional', 'Unlimited users', 'Custom AI model tuning', 'On-premise deployment', 'SOC 2 Type II report', 'Dedicated success manager', 'SLA guarantee', 'Custom integrations'],
			cta: 'Contact sales',
			featured: false
		}
	];
</script>

<section id="pricing" class="border-t border-white/10 py-24">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-4xl font-medium tracking-tight text-white sm:text-5xl">Simple, transparent pricing</h2>
			<p class="mt-4 text-lg text-zinc-400">Start free, scale as you grow. No hidden fees, no surprise bills.</p>
		</div>
		<div class="mt-16 grid gap-8 lg:grid-cols-3">
			{#each plans as plan, i}
				<div class="relative flex flex-col rounded-xl border {plan.featured ? 'border-violet-500/40 bg-zinc-900' : 'border-white/10 bg-black'} p-8">
					{#if plan.featured}
						<div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-4 py-0.5 text-xs font-medium text-white">Most popular</div>
					{/if}
					<div>
						<h3 class="text-lg font-medium text-white">{plan.name}</h3>
						<div class="mt-2 flex items-baseline gap-1">
							<span class="text-4xl font-medium tracking-tight text-white">{plan.price}</span>
							{#if plan.period}<span class="text-sm text-zinc-500">{plan.period}</span>{/if}
						</div>
						<p class="mt-1 text-sm text-zinc-500">{plan.desc}</p>
					</div>
					<ul class="mt-8 flex-1 space-y-3">
						{#each plan.features as f}
							<li class="flex items-center gap-2 text-sm text-zinc-300">
								<svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 shrink-0 text-emerald-400"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>
								{f}
							</li>
						{/each}
					</ul>
					<a href="/join-waitlist" class="mt-8 flex min-h-[44px] items-center justify-center rounded-md {plan.featured ? 'bg-violet-500 text-white hover:bg-violet-400' : 'border border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700'} px-4 py-2.5 text-center text-sm font-medium transition">{plan.cta}</a>
				</div>
			{/each}
		</div>
	</div>
</section>
