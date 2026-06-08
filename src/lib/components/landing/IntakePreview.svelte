<script lang="ts">
	let showComplete = $state(false);

	$effect(() => {
		const timer = setTimeout(() => (showComplete = true), 4000);
		return () => clearTimeout(timer);
	});
</script>

<div class="relative flex h-full flex-col gap-2 overflow-y-auto p-5 font-sans">
	<div class="flex items-center gap-2 text-xs text-zinc-400">
		<span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
		Case Intake in progress...
	</div>

	<div class="grid grid-cols-2 gap-2.5">
		<div class="field col-span-2 sm:col-span-1">
			<span class="text-[10px] font-medium text-zinc-500">Client Name</span>
			<div class="mt-0.5 h-7 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-1 text-[11px] text-zinc-600">John Doe</div>
		</div>
		<div class="field col-span-2 sm:col-span-1" style="animation-delay: 0.15s">
			<span class="text-[10px] font-medium text-zinc-500">Email</span>
			<div class="mt-0.5 h-7 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-1 text-[11px] text-zinc-600">john@example.com</div>
		</div>
		<div class="field col-span-2 sm:col-span-1" style="animation-delay: 0.3s">
			<span class="text-[10px] font-medium text-zinc-500">Phone</span>
			<div class="mt-0.5 h-7 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-1 text-[11px] text-zinc-600">+91 xxxx-nnnnnn</div>
		</div>
		<div class="field col-span-2 sm:col-span-1" style="animation-delay: 0.4s">
			<span class="text-[10px] font-medium text-zinc-500">Case Type</span>
			<div class="mt-0.5 h-7 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-1 text-[11px] text-zinc-500">Civil Litigation</div>
		</div>
		<div class="field col-span-2 sm:col-span-1" style="animation-delay: 0.55s">
			<span class="text-[10px] font-medium text-zinc-500">Filing Date</span>
			<div class="mt-0.5 h-7 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-1 text-[11px] text-zinc-500">2026-06-15</div>
		</div>
		<div class="field col-span-2 sm:col-span-1" style="animation-delay: 0.65s">
			<span class="text-[10px] font-medium text-zinc-500">Practice Area</span>
			<div class="mt-0.5 h-7 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-1 text-[11px] text-zinc-500">Corporate / Commercial</div>
		</div>
	</div>

	<div class="field" style="animation-delay: 0.8s">
		<span class="text-[10px] font-medium text-zinc-500">Case Description</span>
		<div class="mt-0.5 h-12 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-1.5 text-[11px] leading-relaxed text-zinc-500">
			Breach of contract claim arising from failure to deliver goods per agreement dated...
		</div>
	</div>

	<div class="field" style="animation-delay: 1s">
		<span class="text-[10px] font-medium text-zinc-500">Upload Documents</span>
		<div class="upload-zone mt-0.5 flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-emerald-500/30 bg-emerald-500/5 px-3 py-3">
			<svg viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-emerald-400"><path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636V13.25Z"/><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"/></svg>
			<span class="text-[10px] text-emerald-400/70">Drop files or click to upload</span>
			<div class="flex flex-wrap gap-1.5">
				<span class="rounded bg-zinc-800/80 px-2 py-0.5 text-[9px] text-zinc-400">complaint.pdf</span>
				<span class="rounded bg-zinc-800/80 px-2 py-0.5 text-[9px] text-zinc-400">exhibit_a.docx</span>
			</div>
		</div>
	</div>

	<div class="field flex items-center gap-3" style="animation-delay: 1.3s">
		<button type="button" class="rounded-md bg-emerald-500 px-4 py-1.5 text-[11px] font-medium text-black transition hover:bg-emerald-400">
			Submit Intake
		</button>
		<div class="flex-1">
			<div class="progress-bar">
				<div class="progress-fill"></div>
			</div>
		</div>
		<span class="text-[10px] text-emerald-400" style="animation-delay: 2.5s">6/7 complete</span>
	</div>
</div>

{#if showComplete}
	<div class="complete-banner">
		<div class="flex items-center gap-2 text-xs font-medium text-emerald-300">
			<svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-emerald-400"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clip-rule="evenodd"/></svg>
			Intake complete — 18 data points extracted, 2 documents uploaded
		</div>
	</div>
{/if}

<style>
	.field {
		animation: slideUp 0.35s ease-out both;
		will-change: transform, opacity;
	}

	.upload-zone {
		animation: slideUp 0.35s ease-out both;
		animation-delay: 1s;
		will-change: transform, opacity;
	}

	.progress-bar {
		height: 5px;
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.08);
		overflow: hidden;
		will-change: transform, opacity;
	}

	.progress-fill {
		height: 100%;
		border-radius: 3px;
		background: linear-gradient(90deg, #34d399, #10b981);
		transform: scaleX(0);
		transform-origin: left;
		animation: fillBar 2s ease-out forwards;
		animation-delay: 1.5s;
		will-change: transform;
	}

	.complete-banner {
		position: absolute;
		bottom: 8px;
		left: 8px;
		right: 8px;
		padding: 8px 12px;
		border-radius: 8px;
		background: rgba(16, 185, 129, 0.12);
		border: 1px solid rgba(16, 185, 129, 0.25);
		animation: slideUp 0.5s ease-out both;
		animation-delay: 0.2s;
		will-change: transform, opacity;
	}

	@keyframes slideUp {
		from { transform: translateY(16px); opacity: 0; }
		to   { transform: translateY(0);    opacity: 1; }
	}

	@keyframes fillBar {
		from { transform: scaleX(0); }
		to   { transform: scaleX(1); }
	}
</style>
