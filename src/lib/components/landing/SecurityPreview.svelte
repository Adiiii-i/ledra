<script lang="ts">
	let phase = $state(-1);
	let cycle = $state(0);

	$effect(() => {
		void cycle;
		const delays = [600, 2600, 4400, 6400, 8600];
		const actions = [
			() => (phase = 0),
			() => (phase = 1),
			() => (phase = 2),
			() => (phase = 3),
			() => { phase = -1; cycle++; }
		];
		const timers = delays.map((d, i) => setTimeout(actions[i], d));
		return () => timers.forEach(clearTimeout);
	});

	const nodePcts = [5, 32, 58, 84];
</script>

{#key cycle}
	<div class="relative flex h-full flex-col overflow-hidden p-5 font-sans">
		<div class="flex items-center gap-2 text-xs text-zinc-400">
			<span class="inline-block h-1.5 w-1.5 rounded-full bg-violet-400"></span>
			Security Pipeline
		</div>

		<div class="relative mt-1 flex-1">
			<!-- Progress bar -->
			<div class="absolute" style="top:6px; left:4%; width:94%; height:6px; border-radius:3px; background:rgba(255,255,255,0.04); z-index:8;"></div>
			<div class="absolute" style="top:6px; left:4%; height:6px; border-radius:3px; background:linear-gradient(90deg,#a78bfa,#818cf8,#f472b6,#34d399,#a78bfa); z-index:8; transition:width 0.7s ease; width:{phase >= 0 ? [8, 33, 64, 94][Math.min(phase, 3)] : 0}%;"></div>

			<!-- Node 1: Extract -->
			<div class="node" style="left:{nodePcts[0]}%; z-index:5;">
				<div class="node-icon" style="border-color:rgba(167,139,250,{phase>=0?0.5:0.08}); background:rgba(0,0,0,0.5); box-shadow:{phase>=0?'0 0 14px rgba(167,139,250,0.2)':'none'};">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5 text-violet-400" stroke-width="1.5">
						<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M14 2v6h6" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M9 13l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<span class="mt-1 text-[8px] font-medium tracking-wide text-zinc-500">Extract</span>
			</div>

			<!-- Node 2: Sanitize -->
			<div class="node" style="left:{nodePcts[1]}%; z-index:5;">
				<div class="node-icon" style="border-color:rgba(129,140,248,{phase>=1?0.5:0.08}); background:rgba(0,0,0,0.5); box-shadow:{phase>=1?'0 0 14px rgba(129,140,248,0.2)':'none'};">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5 text-indigo-400" stroke-width="1.5">
						<path d="M12 2l7 3v5c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<span class="mt-1 text-[8px] font-medium tracking-wide text-zinc-500">Sanitize</span>
			</div>

			<!-- Node 3: Encrypt -->
			<div class="node" style="left:{nodePcts[2]}%; z-index:5;">
				<div class="node-icon" style="border-color:rgba(244,114,182,{phase>=2?0.5:0.08}); background:rgba(0,0,0,0.5); box-shadow:{phase>=2?'0 0 14px rgba(244,114,182,0.2)':'none'};">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5 text-pink-400" stroke-width="1.5">
						<rect x="5" y="11" width="14" height="10" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M8 11V7a4 4 0 118 0v4" stroke-linecap="round" stroke-linejoin="round"/>
						<circle cx="12" cy="16" r="1" fill="currentColor"/>
					</svg>
				</div>
				<span class="mt-1 text-[8px] font-medium tracking-wide text-zinc-500">Encrypt</span>
			</div>

			<!-- Node 4: RBAC -->
			<div class="node" style="left:{nodePcts[3]}%; z-index:5;">
				<div class="node-icon" style="border-color:rgba(52,211,153,{phase>=3?0.5:0.08}); background:rgba(0,0,0,0.5); box-shadow:{phase>=3?'0 0 14px rgba(52,211,153,0.2)':'none'};">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5 text-emerald-400" stroke-width="1.5">
						<circle cx="12" cy="8" r="4" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M17 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<span class="mt-1 text-[8px] font-medium tracking-wide text-zinc-500">RBAC</span>
			</div>

			<!-- Arrows -->
			<div class="arr" class:arr-on={phase>=1} style="left:18%;"></div>
			<div class="arr" class:arr-on={phase>=2} style="left:44%;"></div>
			<div class="arr" class:arr-on={phase>=3} style="left:71%;"></div>

			<!-- Trail dots -->
			<div class="trail-dot" style="left:{nodePcts[0]}%; opacity:{phase>=1?0.5:0};"></div>
			<div class="trail-dot" style="left:{nodePcts[1]}%; opacity:{phase>=2?0.5:0};"></div>
			<div class="trail-dot" style="left:{nodePcts[2]}%; opacity:{phase>=3?0.5:0};"></div>

			<!-- Pulse ring on active node -->
			{#if phase === 0}<div class="pulse" style="border-color:rgba(167,139,250,0.25); left:{nodePcts[0]-1}%; top:4%;"></div>{/if}
			{#if phase === 1}<div class="pulse" style="border-color:rgba(129,140,248,0.25); left:{nodePcts[1]-1}%; top:4%;"></div>{/if}
			{#if phase === 2}<div class="pulse" style="border-color:rgba(244,114,182,0.25); left:{nodePcts[2]-1}%; top:4%;"></div>{/if}
			{#if phase === 3}<div class="pulse" style="border-color:rgba(52,211,153,0.25); left:{nodePcts[3]-1}%; top:4%;"></div>{/if}

			<!-- Detail content -->
			<div class="detail-box">
				{#if phase === 0}
					<div style="animation:slideUp 0.4s ease-out both;">
						<div class="flex items-center gap-1.5 text-[10px] font-medium text-violet-300">
							<span class="inline-block h-1.5 w-1.5 rounded-full bg-violet-400"></span>
							Extracting user data from documents
						</div>
						<p class="mt-1 text-[9px] leading-relaxed text-zinc-500">Personal identifiable information (PII), case details, and sensitive client data are identified and collected from uploaded documents for processing.</p>
						<div class="mt-1.5 flex flex-wrap gap-1">
							<span class="rounded border border-violet-500/10 bg-violet-500/5 px-1.5 py-0.5 text-[8px] text-zinc-400">Name: John Doe</span>
							<span class="rounded border border-violet-500/10 bg-violet-500/5 px-1.5 py-0.5 text-[8px] text-zinc-400">DOB: 12/05/1988</span>
							<span class="rounded border border-violet-500/10 bg-violet-500/5 px-1.5 py-0.5 text-[8px] text-zinc-400">PAN: AAAA0000A</span>
							<span class="rounded border border-violet-500/10 bg-violet-500/5 px-1.5 py-0.5 text-[8px] text-zinc-400">Case #: 1234/2026</span>
						</div>
					</div>
				{:else if phase === 1}
					<div style="animation:slideUp 0.4s ease-out both;">
						<div class="flex items-center gap-1.5 text-[10px] font-medium text-indigo-300">
							<span class="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
							Data sanitization & anonymization
						</div>
						<p class="mt-1 text-[9px] leading-relaxed text-zinc-500">PII is detected, redacted, and replaced with anonymized tokens. The sanitization model strips identities while preserving legal context.</p>
						<div class="mt-1.5 space-y-1">
							<div class="flex items-center gap-2 rounded border border-indigo-500/10 bg-indigo-500/5 px-2 py-1 text-[9px]">
								<svg viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3 shrink-0 text-indigo-400"><path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4L8 12.58l4.3-4.3a1 1 0 0 1 1.4 0Z"/></svg>
								<span class="text-zinc-400"><span class="text-red-400 line-through">John Doe</span> → <span class="text-emerald-300">[PARTY_A]</span></span>
							</div>
							<div class="flex items-center gap-2 rounded border border-indigo-500/10 bg-indigo-500/5 px-2 py-1 text-[9px]">
								<svg viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3 shrink-0 text-indigo-400"><path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4L8 12.58l4.3-4.3a1 1 0 0 1 1.4 0Z"/></svg>
								<span class="text-zinc-400"><span class="text-red-400 line-through">AAAA0000A</span> → <span class="text-emerald-300">[PAN_01]</span></span>
							</div>
							<div class="flex items-center gap-2 rounded border border-indigo-500/10 bg-indigo-500/5 px-2 py-1 text-[9px]">
								<svg viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3 shrink-0 text-indigo-400"><path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4L8 12.58l4.3-4.3a1 1 0 0 1 1.4 0Z"/></svg>
								<span class="text-zinc-400"><span class="text-red-400 line-through">12/05/1988</span> → <span class="text-emerald-300">[DOB_REDACTED]</span></span>
							</div>
						</div>
					</div>
				{:else if phase === 2}
					<div style="animation:slideUp 0.4s ease-out both;">
						<div class="flex items-center gap-1.5 text-[10px] font-medium text-pink-300">
							<span class="inline-block h-1.5 w-1.5 rounded-full bg-pink-400"></span>
							Encryption — MITM protection
						</div>
						<p class="mt-1 text-[9px] leading-relaxed text-zinc-500">All data encrypted at rest and in transit using AES-256 + TLS 1.3. End-to-end encryption prevents man-in-the-middle attacks at every layer.</p>
						<div class="mt-1.5 grid grid-cols-3 gap-1.5">
							<div class="rounded border border-pink-500/10 bg-pink-500/5 p-1.5 text-center">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mx-auto h-4 w-4 text-pink-400" stroke-width="1.5"><rect x="5" y="11" width="14" height="10" rx="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 11V7a4 4 0 118 0v4" stroke-linecap="round" stroke-linejoin="round"/></svg>
								<div class="mt-0.5 text-[8px] text-zinc-500">AES-256</div>
							</div>
							<div class="rounded border border-pink-500/10 bg-pink-500/5 p-1.5 text-center">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mx-auto h-4 w-4 text-pink-400" stroke-width="1.5"><path d="M12 2l7 3v5c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z" stroke-linecap="round" stroke-linejoin="round"/></svg>
								<div class="mt-0.5 text-[8px] text-zinc-500">TLS 1.3</div>
							</div>
							<div class="rounded border border-pink-500/10 bg-pink-500/5 p-1.5 text-center">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mx-auto h-4 w-4 text-pink-400" stroke-width="1.5"><circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/></svg>
								<div class="mt-0.5 text-[8px] text-zinc-500">E2EE</div>
							</div>
						</div>
					</div>
				{:else if phase === 3}
					<div style="animation:slideUp 0.4s ease-out both;">
						<div class="flex items-center gap-1.5 text-[10px] font-medium text-emerald-300">
							<span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
							Role-based access control
						</div>
						<p class="mt-1 text-[9px] leading-relaxed text-zinc-500">Granular permissions let you decide who can view, edit, or share each document. Roles enforced at every access point.</p>
						<div class="mt-1.5 space-y-1">
							<div class="flex items-center justify-between rounded border border-emerald-500/10 bg-emerald-500/5 px-2 py-1 text-[9px]">
								<div class="flex items-center gap-1.5">
									<span class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-violet-500/20 text-[7px] text-violet-300">O</span>
									<span class="text-zinc-300">Owner (You)</span>
								</div>
								<span class="text-emerald-300">Full access</span>
							</div>
							<div class="flex items-center justify-between rounded border border-emerald-500/10 bg-emerald-500/5 px-2 py-1 text-[9px]">
								<div class="flex items-center gap-1.5">
									<span class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500/20 text-[7px] text-blue-300">A</span>
									<span class="text-zinc-300">Associate</span>
								</div>
								<span class="text-zinc-400">Edit · Comment</span>
							</div>
							<div class="flex items-center justify-between rounded border border-emerald-500/10 bg-emerald-500/5 px-2 py-1 text-[9px]">
								<div class="flex items-center gap-1.5">
									<span class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500/20 text-[7px] text-amber-300">R</span>
									<span class="text-zinc-300">Reviewer</span>
								</div>
								<span class="text-zinc-400">View only</span>
							</div>
							<div class="flex items-center justify-between rounded border border-emerald-500/10 bg-emerald-500/5 px-2 py-1 text-[9px]">
								<div class="flex items-center gap-1.5">
									<span class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-zinc-500/20 text-[7px] text-zinc-400">C</span>
									<span class="text-zinc-300">Client</span>
								</div>
								<span class="text-zinc-400">Limited · Portal</span>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/key}

<style>
	.node {
		position: absolute;
		top: 3%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.node-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 10px;
		border: 1.5px solid;
		transition: all 0.5s ease;
		backdrop-filter: blur(4px);
	}

	.arr {
		position: absolute;
		top: 24px;
		width: 20px;
		height: 12px;
		z-index: 9;
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.arr-on { opacity: 0.5; animation: arrFlow 1.4s ease-in-out infinite; }

	.arr::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 1.5px;
		background: linear-gradient(90deg, rgba(167,139,250,0.1), rgba(167,139,250,0.5));
		transform: translateY(-50%);
	}

	.arr::after {
		content: '';
		position: absolute;
		top: 50%;
		right: 0;
		width: 6px;
		height: 6px;
		border-top: 1.5px solid rgba(167,139,250,0.5);
		border-right: 1.5px solid rgba(167,139,250,0.5);
		transform: translateY(-50%) rotate(45deg);
	}

	.trail-dot {
		position: absolute;
		top: 14%;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #a78bfa;
		z-index: 9;
		transition: opacity 0.5s ease;
		box-shadow: 0 0 8px rgba(167,139,250,0.4);
	}

	.pulse {
		position: absolute;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		border: 2px solid;
		pointer-events: none;
		z-index: 7;
		animation: ringPulse 1.6s ease-out infinite;
	}

	.detail-box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		min-height: 96px;
		max-height: 56%;
		border-radius: 8px;
		border: 1px solid rgba(255,255,255,0.04);
		background: rgba(255,255,255,0.02);
		padding: 10px 12px;
		overflow-y: auto;
		z-index: 50;
	}

	@keyframes slideUp {
		from { transform: translateY(10px); opacity: 0; }
		to { transform: translateY(0); opacity: 1; }
	}

	@keyframes arrFlow {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 0.7; }
	}

	@keyframes ringPulse {
		0% { transform: scale(0.9); opacity: 0; }
		50% { opacity: 0.4; }
		100% { transform: scale(1.4); opacity: 0; }
	}
</style>
