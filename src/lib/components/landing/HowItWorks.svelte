<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="how-it-works" class="py-24 bg-[#121217] overflow-hidden">
	<div class="container mx-auto px-4 sm:px-6 max-w-6xl">
		<div class="text-center mb-16 md:mb-24" use:reveal>
			<h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">From document to draft in 5 steps.</h2>
			<p class="text-gray-400 text-lg max-w-2xl mx-auto">A seamless workflow designed around how you already work.</p>
		</div>

		<div class="relative">
			<!-- Horizontal line for desktop connecting the numbers -->
			<div class="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-border-subtle z-0"></div>

			<!-- 5 Step Flow -->
			<div class="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative z-10">
				
				<!-- Step 1 -->
				<div use:reveal={{ delay: 0 }} class="flex flex-col items-center text-center">
					<div class="w-14 h-14 rounded-full bg-surface-overlay border border-border flex items-center justify-center text-indigo-400 font-mono text-lg mb-6 shadow-[0_0_15px_rgba(129,140,248,0.1)]">01</div>
					<h3 class="text-white font-semibold text-lg mb-2">Upload</h3>
					<p class="text-gray-500 text-sm">CA uploads invoices, bank statements, or notices.</p>
				</div>

				<!-- Step 2 -->
				<div use:reveal={{ delay: 100 }} class="flex flex-col items-center text-center">
					<div class="w-14 h-14 rounded-full bg-surface-overlay border border-border flex items-center justify-center text-indigo-400 font-mono text-lg mb-6 shadow-[0_0_15px_rgba(129,140,248,0.1)]">02</div>
					<h3 class="text-white font-semibold text-lg mb-2">Read</h3>
					<p class="text-gray-500 text-sm">Agent reads, classifies, and reconciles documents.</p>
				</div>

				<!-- Step 3 -->
				<div use:reveal={{ delay: 200 }} class="flex flex-col items-center text-center">
					<div class="w-14 h-14 rounded-full bg-surface-overlay border border-border flex items-center justify-center text-indigo-400 font-mono text-lg mb-6 shadow-[0_0_15px_rgba(129,140,248,0.1)]">03</div>
					<h3 class="text-white font-semibold text-lg mb-2">Draft</h3>
					<p class="text-gray-500 text-sm">Agent generates return, report, or reply.</p>
				</div>

				<!-- Step 4 -->
				<div use:reveal={{ delay: 300 }} class="flex flex-col items-center text-center">
					<div class="w-14 h-14 rounded-full bg-surface-overlay border border-border flex items-center justify-center text-indigo-400 font-mono text-lg mb-6 shadow-[0_0_15px_rgba(129,140,248,0.1)]">04</div>
					<h3 class="text-white font-semibold text-lg mb-2">Review</h3>
					<p class="text-gray-500 text-sm">CA reviews and edits directly in the workspace.</p>
				</div>

				<!-- Step 5 -->
				<div use:reveal={{ delay: 400 }} class="flex flex-col items-center text-center">
					<div class="w-14 h-14 rounded-full bg-surface-overlay border border-border flex items-center justify-center text-indigo-400 font-mono text-lg mb-6 shadow-[0_0_15px_rgba(129,140,248,0.1)]">05</div>
					<h3 class="text-white font-semibold text-lg mb-2">Export</h3>
					<p class="text-gray-500 text-sm">One-click export or filing-ready output.</p>
				</div>

			</div>
		</div>
	</div>
</section>
