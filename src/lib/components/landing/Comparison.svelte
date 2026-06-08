<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="comparison" class="py-24 bg-surface overflow-hidden">
	<div class="container mx-auto px-4 sm:px-6 max-w-5xl">
		<div class="text-center mb-16" use:reveal>
			<h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Finally, software built for CAs.</h2>
			<p class="text-gray-400 text-lg max-w-2xl mx-auto">See how Ledra compares to traditional accounting tools.</p>
		</div>

		<div class="overflow-x-auto rounded-xl border border-border bg-surface-overlay shadow-2xl" use:reveal={{ delay: 100 }}>
			<table class="w-full text-left border-collapse min-w-[700px]">
				<thead>
					<tr class="border-b border-border bg-surface text-sm uppercase tracking-wider text-gray-500 font-semibold">
						<th class="p-6 font-medium">Platform</th>
						<th class="p-6 font-medium text-center">AI Drafting</th>
						<th class="p-6 font-medium text-center">Notice Replies</th>
						<th class="p-6 font-medium text-center">Audit Reports</th>
						<th class="p-6 font-medium text-center">Workspace</th>
						<th class="p-6 font-medium text-right">Price</th>
					</tr>
				</thead>
				<tbody class="text-gray-300 divide-y divide-border">
					<tr class="hover:bg-surface/50 transition-colors">
						<td class="p-6 font-medium text-white">Tally</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-right font-mono text-gray-400">₹18,000/yr</td>
					</tr>
					<tr class="hover:bg-surface/50 transition-colors">
						<td class="p-6 font-medium text-white">ClearTax</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-400">Partial</td>
						<td class="p-6 text-right font-mono text-gray-400">₹9,999/yr</td>
					</tr>
					<tr class="hover:bg-surface/50 transition-colors">
						<td class="p-6 font-medium text-white">Zoho Books</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-right font-mono text-gray-400">₹9,000/yr</td>
					</tr>
					<tr class="hover:bg-surface/50 transition-colors">
						<td class="p-6 font-medium text-white">Gen/Saral</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-center text-gray-600">—</td>
						<td class="p-6 text-right font-mono text-gray-400">₹12,000/yr</td>
					</tr>
					<tr class="bg-indigo-950/40 border-l-4 border-l-indigo-500 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]">
						<td class="p-6 font-bold text-white flex items-center gap-2">
							Ledra
							<span class="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30">Your Agent</span>
						</td>
						<td class="p-6 text-center text-indigo-400"><svg class="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></td>
						<td class="p-6 text-center text-indigo-400"><svg class="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></td>
						<td class="p-6 text-center text-indigo-400"><svg class="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></td>
						<td class="p-6 text-center text-indigo-400"><svg class="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></td>
						<td class="p-6 text-right font-mono text-indigo-300 font-semibold">From ₹999/mo</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>
