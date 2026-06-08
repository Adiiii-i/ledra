<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="features" class="py-24 bg-surface overflow-hidden">
	<div class="container mx-auto px-4 sm:px-6 max-w-6xl">
		<div class="text-center mb-16" use:reveal>
			<h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Your agent. Your workspace.</h2>
			<p class="text-gray-400 text-lg max-w-2xl mx-auto">Purpose-built automation for Indian Chartered Accountants.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- Card 1 -->
			<div use:reveal={{ delay: 0 }} class="bg-surface-overlay border border-border rounded-xl p-6 hover:border-indigo-500/50 transition-colors group">
				<div class="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
					<svg class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
				</div>
				<h3 class="text-xl font-semibold text-white mb-2">GST Return Drafting</h3>
				<p class="text-gray-400 text-sm leading-relaxed">Reads invoices and purchase bills, outputs GSTR-1 and GSTR-3B ready drafts instantly.</p>
			</div>

			<!-- Card 2 -->
			<div use:reveal={{ delay: 100 }} class="bg-surface-overlay border border-border rounded-xl p-6 hover:border-indigo-500/50 transition-colors group">
				<div class="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
					<svg class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
				</div>
				<h3 class="text-xl font-semibold text-white mb-2">Notice Reply</h3>
				<p class="text-gray-400 text-sm leading-relaxed">Reads IT/GST department notices, drafts reply letters with accurate legal citations.</p>
			</div>

			<!-- Card 3 -->
			<div use:reveal={{ delay: 200 }} class="bg-surface-overlay border border-border rounded-xl p-6 hover:border-indigo-500/50 transition-colors group">
				<div class="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
					<svg class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
				</div>
				<h3 class="text-xl font-semibold text-white mb-2">Audit Reports</h3>
				<p class="text-gray-400 text-sm leading-relaxed">Reads P&L and Balance Sheet, seamlessly drafts Form 3CD tax audit reports.</p>
			</div>

			<!-- Card 4 -->
			<div use:reveal={{ delay: 0 }} class="bg-surface-overlay border border-border rounded-xl p-6 hover:border-indigo-500/50 transition-colors group lg:col-start-2">
				<div class="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
					<svg class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
				</div>
				<h3 class="text-xl font-semibold text-white mb-2">TDS Returns</h3>
				<p class="text-gray-400 text-sm leading-relaxed">Reads payroll and vendor data, drafts accurate Form 24Q and 26Q returns automatically.</p>
			</div>

			<!-- Card 5 -->
			<div use:reveal={{ delay: 100 }} class="bg-surface-overlay border border-border rounded-xl p-6 hover:border-indigo-500/50 transition-colors group">
				<div class="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
					<svg class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
				</div>
				<h3 class="text-xl font-semibold text-white mb-2">Client Memos</h3>
				<p class="text-gray-400 text-sm leading-relaxed">Reads financials, drafts client-facing MIS reports and strategic summaries in plain English.</p>
			</div>
		</div>
	</div>
</section>
