<script lang="ts">
	let phase = $state(-1);
	let cycle = $state(0);

	$effect(() => {
		void cycle;
		const delays = [600, 2600, 4400, 6200, 8400, 10600];
		const actions = [
			() => (phase = 0),
			() => (phase = 1),
			() => (phase = 2),
			() => (phase = 3),
			() => (phase = 4),
			() => { phase = -1; cycle++; }
		];
		const timers = delays.map((d, i) => setTimeout(actions[i], d));
		return () => timers.forEach(clearTimeout);
	});

	const nodePcts = [6, 33, 58, 82];
</script>

<div class="relative flex h-full flex-col overflow-hidden p-5 font-sans">
	{#key cycle}
		<div class="flex items-center gap-2 text-xs text-zinc-400">
			<span class="inline-block h-1.5 w-1.5 rounded-full bg-violet-400"></span>
			Knowledge Pipeline
		</div>

		<div class="relative mt-1 flex-1">
			<!-- ===== PROGRESS BAR (on top of nodes, z-index 8) ===== -->
			<div class="absolute" style="top:6px; left:4%; width:94%; height:6px; border-radius:3px; background:rgba(255,255,255,0.04); z-index:8;"></div>
			<div class="absolute" style="top:6px; left:4%; height:6px; border-radius:3px; background:linear-gradient(90deg,#8b5cf6,#6366f1,#38bdf8,#34d399,#8b5cf6); z-index:8; transition:width 0.7s ease; width:{phase >= 0 ? [8, 33, 64, 94][Math.min(phase, 3)] : 0}%;"></div>

			<!-- ===== NODES (behind progress bar, z-index 5) ===== -->
			<div class="node" style="left:{nodePcts[0]}%; z-index:5;">
				<div class="node-icon" style="border-color:rgba(167,139,250,{phase>=0?0.5:0.08}); background:rgba(0,0,0,0.5); box-shadow:{phase>=0?'0 0 14px rgba(167,139,250,0.2)':'none'};">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5 text-violet-400" stroke-width="1.5">
						<path d="M7 4h10M7 8h10M7 12h6" stroke-linecap="round"/>
						<path d="M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<span class="mt-1 text-[8px] font-medium tracking-wide text-zinc-500">Upload</span>
			</div>

			<div class="node" style="left:{nodePcts[1]}%; z-index:5;">
				<div class="node-icon" style="border-color:rgba(56,189,248,{phase>=1?0.5:0.08}); background:rgba(0,0,0,0.5); box-shadow:{phase>=1?'0 0 14px rgba(56,189,248,0.2)':'none'};">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5 text-sky-400" stroke-width="1.5">
						<ellipse cx="12" cy="6" rx="8" ry="3" stroke-linecap="round"/>
						<path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke-linecap="round"/>
						<path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke-linecap="round"/>
					</svg>
				</div>
				<span class="mt-1 text-[8px] font-medium tracking-wide text-zinc-500">Index</span>
			</div>

			<div class="node" style="left:{nodePcts[2]}%; z-index:5;">
				<div class="node-icon" style="border-color:rgba(52,211,153,{phase>=2?0.5:0.08}); background:rgba(0,0,0,0.5); box-shadow:{phase>=2?'0 0 14px rgba(52,211,153,0.2)':'none'};">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5 text-emerald-400" stroke-width="1.5">
						<circle cx="11" cy="11" r="7" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M16.5 16.5L21 21" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<span class="mt-1 text-[8px] font-medium tracking-wide text-zinc-500">Query</span>
			</div>

			<div class="node" style="left:{nodePcts[3]}%; z-index:5;">
				<div class="node-icon" style="border-color:rgba(167,139,250,{phase>=3?0.5:0.08}); background:rgba(0,0,0,0.5); box-shadow:{phase>=3?'0 0 14px rgba(167,139,250,0.2)':'none'};">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5 text-violet-400" stroke-width="1.5">
						<circle cx="12" cy="8" r="4" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<span class="mt-1 text-[8px] font-medium tracking-wide text-zinc-500">Conductor</span>
			</div>



			<!-- ===== TRAIL DOTS ===== -->
			<div class="trail-dot" style="left:{nodePcts[0]}%; opacity:{phase>=1?0.5:0};"></div>
			<div class="trail-dot" style="left:{nodePcts[1]}%; opacity:{phase>=2?0.5:0};"></div>
			<div class="trail-dot" style="left:{nodePcts[2]}%; opacity:{phase>=3?0.5:0};"></div>

			<!-- ===== ARROWS ===== -->
			<div class="arr" class:arr-on={phase>=1} style="left:18%;"></div>
			<div class="arr" class:arr-on={phase>=2} style="left:45%;"></div>
			<div class="arr" class:arr-on={phase>=3} style="left:69%;"></div>

			<!-- ===== DETAIL CONTENT ===== -->
			<div class="detail-box">
				{#if phase === 0}
					<div style="animation:slideUp 0.4s ease-out both;">
						<div class="flex items-center gap-1.5 text-[10px] font-medium text-violet-300">
							<span class="inline-block h-1.5 w-1.5 rounded-full bg-violet-400"></span>
							Uploading documents
						</div>
						<p class="mt-1 text-[9px] leading-relaxed text-zinc-500">Drag & drop case files — complaints, agreements, exhibits. Parser handles PDF, DOCX, and scanned images with OCR.</p>
						<div class="mt-1.5 flex flex-wrap gap-1">
							<span class="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[8px] text-zinc-400">Service Agreement.pdf</span>
							<span class="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[8px] text-zinc-400">complaint.pdf</span>
							<span class="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[8px] text-zinc-400">exhibit_a.docx</span>
						</div>
						<div class="mt-1.5 h-1 w-full rounded-full bg-zinc-800">
							<div class="h-full w-full origin-left scale-x-0 rounded-full bg-violet-500" style="animation:fillBar 1.6s ease-out forwards;"></div>
						</div>
					</div>
				{:else if phase === 1}
					<div style="animation:slideUp 0.4s ease-out both;">
						<div class="flex items-center gap-1.5 text-[10px] font-medium text-sky-300">
							<span class="inline-block h-1.5 w-1.5 rounded-full bg-sky-400"></span>
							Indexing into vector database
						</div>
						<p class="mt-1 text-[9px] leading-relaxed text-zinc-500">Documents chunked, embedded, and stored in vector index. Every clause, date, party, and obligation mapped for instant retrieval.</p>
						<div class="mt-1.5 flex items-center gap-1 text-[9px] text-zinc-500">
							<svg viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3 text-sky-400"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>
							<span>47 chunks · 3 docs · 12 clauses</span>
						</div>
					</div>
				{:else if phase === 2}
					<div style="animation:slideUp 0.4s ease-out both;">
						<div class="flex items-center gap-1.5 text-[10px] font-medium text-emerald-300">
							<span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
							Extracting & querying knowledge
						</div>
						<p class="mt-1 text-[9px] leading-relaxed text-zinc-500">Semantic search retrieves relevant clauses and entities. RAG pipeline surfaces precise context from indexed documents.</p>
						<div class="mt-1.5 space-y-1">
							<div class="rounded border border-emerald-500/10 bg-emerald-500/5 px-2 py-1 text-[9px]"><span class="text-emerald-300">§3.1</span><span class="ml-1 text-zinc-400">— Breach of Contract clause</span></div>
							<div class="rounded border border-amber-500/10 bg-amber-500/5 px-2 py-1 text-[9px]"><span class="text-amber-300">Parties</span><span class="ml-1 text-zinc-400">— John Doe v. Acme Corp</span></div>
							<div class="rounded border border-violet-500/10 bg-violet-500/5 px-2 py-1 text-[9px]"><span class="text-violet-300">Damages</span><span class="ml-1 text-zinc-400">— $250,000 claimed</span></div>
						</div>
					</div>
				{:else if phase === 3}
					<div style="animation:slideUp 0.4s ease-out both;">
						<div class="flex items-center gap-1.5 text-[10px] font-medium text-violet-300">
							<span class="inline-block h-1.5 w-1.5 rounded-full bg-violet-400"></span>
							Conductor Agent drafting with context
						</div>
						<p class="mt-1 text-[9px] leading-relaxed text-zinc-500">Weaves extracted facts, cited clauses, and jurisdiction-aware reasoning into a precise legal draft — in seconds.</p>
						<div class="mt-1.5 rounded-lg border border-violet-500/10 bg-violet-500/5 p-2 font-mono text-[9px] leading-relaxed">
							<div class="text-zinc-300">IN THE HIGH COURT OF DELHI</div>
							<div class="mt-0.5 text-zinc-500">CS(OS) No. ____ of 2026</div>
							<div class="mt-0.5 text-zinc-200">John Doe <span class="text-zinc-500">...Plaintiff</span></div>
							<div class="mt-0.5 text-zinc-200">Versus</div>
							<div class="mt-0.5 text-zinc-200">Acme Corporation <span class="text-zinc-500">...Defendant</span></div>
							<div class="mt-1 italic text-zinc-500">Application under Order XIII-A CPC seeking</div>
							<div class="italic text-zinc-500">summary judgment for breach of §3.1</div>
							<div class="mt-1 text-zinc-600"><span class="blink">|</span></div>
						</div>
						<div class="mt-1 flex items-center gap-1.5">
							<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] text-emerald-300">
								<span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
								3 docs · 47 chunks · 12 clauses
							</span>
						</div>
					</div>
				{:else if phase === 4}
					<div style="animation:slideUp 0.4s ease-out both;">
						<div class="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400">
							<svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-emerald-400"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>
							Pipeline complete — restarting...
						</div>
						<p class="mt-1 text-[9px] leading-relaxed text-zinc-500">All stages processed. Documents uploaded, indexed, queried, and context delivered to Conductor Agent.</p>
						<div class="mt-1.5 flex flex-wrap gap-1 text-[9px] text-zinc-500">
							<span>✓ Upload (5 files)</span>
							<span>✓ Index (47 chunks)</span>
							<span>✓ Query (12 results)</span>
							<span>✓ Draft generated</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/key}
</div>

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

	/* Trail dots */
	.trail-dot {
		position: absolute;
		top: 14%;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #8b5cf6;
		z-index: 9;
		transition: opacity 0.5s ease;
		box-shadow: 0 0 8px rgba(139,92,246,0.4);
	}

	/* Arrows */
	.arr {
		position: absolute;
		top: 26px;
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
		background: linear-gradient(90deg, rgba(139,92,246,0.1), rgba(139,92,246,0.5));
		transform: translateY(-50%);
	}

	.arr::after {
		content: '';
		position: absolute;
		top: 50%;
		right: 0;
		width: 6px;
		height: 6px;
		border-top: 1.5px solid rgba(139,92,246,0.5);
		border-right: 1.5px solid rgba(139,92,246,0.5);
		transform: translateY(-50%) rotate(45deg);
	}

	/* Detail box */
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

	@keyframes fillBar {
		from { transform: scaleX(0); }
		to { transform: scaleX(1); }
	}

	@keyframes arrFlow {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 0.7; }
	}

	.blink {
		animation: blinker 0.8s step-end infinite;
	}

	@keyframes blinker {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
</style>
