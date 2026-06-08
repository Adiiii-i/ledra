<script lang="ts">
</script>

<div class="relative flex h-full flex-col gap-2.5 p-6 font-sans">
	<div class="flex items-center gap-2 text-xs text-zinc-400">
		<span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
		Running compliance checks...
	</div>

	<div class="mt-1 flex flex-col gap-2.5">
		<div class="check-row" style="animation-delay: 0.2s">
			<div class="check-icon" style="animation-delay: 0.7s">
				<svg viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clip-rule="evenodd"/></svg>
			</div>
			<span class="text-[11px] text-zinc-300">Formatting validation</span>
		</div>
		<div class="check-row" style="animation-delay: 0.5s">
			<div class="check-icon" style="animation-delay: 1s">
				<svg viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clip-rule="evenodd"/></svg>
			</div>
			<span class="text-[11px] text-zinc-300">Citation format</span>
		</div>
		<div class="check-row" style="animation-delay: 0.8s">
			<div class="check-icon" style="animation-delay: 1.3s">
				<svg viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clip-rule="evenodd"/></svg>
			</div>
			<span class="text-[11px] text-zinc-300">Jurisdiction filter</span>
		</div>
		<div class="check-row" style="animation-delay: 1.1s">
			<div class="check-icon" style="animation-delay: 1.6s">
				<svg viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clip-rule="evenodd"/></svg>
			</div>
			<span class="text-[11px] text-zinc-300">Consistency validation</span>
		</div>
		<div class="check-row" style="animation-delay: 1.4s">
			<div class="check-icon" style="animation-delay: 1.9s">
				<svg viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clip-rule="evenodd"/></svg>
			</div>
			<span class="text-[11px] text-zinc-300">Template verification</span>
		</div>
	</div>

	<div class="complete" style="animation-delay: 2.5s">
		<div class="flex items-center gap-2 text-xs font-medium text-emerald-300">
			<svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-emerald-400"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4 2.5A4.5 4.5 0 0 0 2.5 6a4.5 4.5 0 0 0 2.5 4 4.5 4.5 0 0 0-2.5 4 4.5 4.5 0 0 0 3.5 4.5A4.5 4.5 0 0 0 10 19a4.5 4.5 0 0 0 4-2.5 4.5 4.5 0 0 0 3.5-4.5 4.5 4.5 0 0 0-2.5-4 4.5 4.5 0 0 0 2.5-4A4.5 4.5 0 0 0 14 3.5 4.5 4.5 0 0 0 10 1Zm0 16.5a3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3Zm0-7.5a3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3Z" clip-rule="evenodd"/></svg>
			All 5 checks passed
		</div>
	</div>
</div>

<style>
	.check-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 10px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.03);
		animation: slideIn 0.35s ease-out both;
		will-change: transform, opacity;
	}

	.check-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: rgba(16, 185, 129, 0.15);
		color: #34d399;
		animation: popIn 0.3s ease-out both;
		will-change: transform, opacity;
	}

	.complete {
		margin-top: 8px;
		padding: 10px 14px;
		border-radius: 8px;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.2);
		animation: slideIn 0.4s ease-out both;
		will-change: transform, opacity;
	}

	@keyframes slideIn {
		from { transform: translateY(10px); opacity: 0; }
		to   { transform: translateY(0);    opacity: 1; }
	}

	@keyframes popIn {
		from { transform: scale(0); opacity: 0; }
		to   { transform: scale(1); opacity: 1; }
	}
</style>
