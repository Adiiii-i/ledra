<script lang="ts">
	let model = $state('GPT-4o');
	let mode = $state('Draft');
</script>

<div class="flex h-full font-sans">
	<div class="sidebar flex w-[35%] flex-col border-r border-white/10 bg-zinc-900/40">
		<div class="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs text-zinc-400 shrink-0">
			<svg viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5 text-blue-400"><path fill-rule="evenodd" d="M2 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8l-4 2v-2H5a3 3 0 0 1-3-3V5Zm4 3a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2H6Zm5-1a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1Zm-5 3a1 1 0 0 0 0 2h3a1 1 0 1 0 0-2H6Z" clip-rule="evenodd"/></svg>
			Agent Chat
		</div>

		<div class="flex-1 space-y-3 overflow-y-auto p-3 hide-scrollbar">
			<div class="chat-user">
				<div class="text-[10px] text-zinc-500">You</div>
				<div class="mt-0.5 rounded-lg rounded-tl-none bg-blue-500/15 px-2.5 py-1.5 text-[10px] leading-relaxed text-zinc-200">
					Draft a summary judgment application under Order XIII-A CPC for Delhi High Court based on the intake case
				</div>
			</div>
			<div class="chat-thinking" style="animation-delay: 0.9s">
				<div class="flex items-center gap-1.5 text-[10px] text-zinc-500">
					<span>Agent is thinking</span>
					<span class="thinking-dots">
						<span class="dot" style="animation-delay: 0s"></span>
						<span class="dot" style="animation-delay: 0.15s"></span>
						<span class="dot" style="animation-delay: 0.3s"></span>
					</span>
				</div>
				<div class="mt-1 flex flex-col gap-0.5 pl-1">
					<div class="h-1.5 w-full rounded-full bg-zinc-800/60" style="animation: pulseBar 0.8s ease-in-out infinite; animation-delay: 0s"></div>
					<div class="h-1.5 w-3/4 rounded-full bg-zinc-800/60" style="animation: pulseBar 0.8s ease-in-out infinite; animation-delay: 0.15s"></div>
					<div class="h-1.5 w-5/6 rounded-full bg-zinc-800/60" style="animation: pulseBar 0.8s ease-in-out infinite; animation-delay: 0.3s"></div>
				</div>
			</div>
			<div class="chat-agent" style="animation-delay: 1.8s">
				<div class="flex items-center gap-1.5 text-[10px]">
					<span class="inline-block h-2 w-2 rounded-full bg-blue-400"></span>
					<span class="text-blue-300">Agent</span>
				</div>
				<div class="mt-0.5 rounded-lg rounded-tl-none bg-zinc-800/60 px-2.5 py-1.5 text-[10px] leading-relaxed text-zinc-300">
					Application drafted. Retrieved (2025) SCC OnLine Del 4567 and 2 other authorities. Jurisdiction filter applied for Delhi HC commercial division.
				</div>
			</div>

			<div class="chat-user" style="animation-delay: 2.8s">
				<div class="text-[10px] text-zinc-500">You</div>
				<div class="mt-0.5 rounded-lg rounded-tl-none bg-blue-500/15 px-2.5 py-1.5 text-[10px] leading-relaxed text-zinc-200">
					Add detailed breach allegations with specific dates from the case file
				</div>
			</div>
			<div class="chat-thinking" style="animation-delay: 3.4s">
				<div class="flex items-center gap-1.5 text-[10px] text-zinc-500">
					<span>Agent is thinking</span>
					<span class="thinking-dots">
						<span class="dot" style="animation-delay: 0s"></span>
						<span class="dot" style="animation-delay: 0.15s"></span>
						<span class="dot" style="animation-delay: 0.3s"></span>
					</span>
				</div>
				<div class="mt-1 flex flex-col gap-0.5 pl-1">
					<div class="h-1.5 w-full rounded-full bg-zinc-800/60" style="animation: pulseBar 0.8s ease-in-out infinite; animation-delay: 0s"></div>
					<div class="h-1.5 w-3/4 rounded-full bg-zinc-800/60" style="animation: pulseBar 0.8s ease-in-out infinite; animation-delay: 0.15s"></div>
					<div class="h-1.5 w-5/6 rounded-full bg-zinc-800/60" style="animation: pulseBar 0.8s ease-in-out infinite; animation-delay: 0.3s"></div>
				</div>
			</div>
			<div class="chat-agent" style="animation-delay: 4.2s">
				<div class="flex items-center gap-1.5 text-[10px]">
					<span class="inline-block h-2 w-2 rounded-full bg-blue-400"></span>
					<span class="text-blue-300">Agent</span>
				</div>
				<div class="mt-0.5 rounded-lg rounded-tl-none bg-zinc-800/60 px-2.5 py-1.5 text-[10px] leading-relaxed text-zinc-300">
					Added paras 2–3 specifying contractual obligations and breach with exact dates. References contract dated 15.01.2026 and default on 01.03.2026.
				</div>
			</div>

			<div class="chat-user" style="animation-delay: 5.2s">
				<div class="text-[10px] text-zinc-500">You</div>
				<div class="mt-0.5 rounded-lg rounded-tl-none bg-blue-500/15 px-2.5 py-1.5 text-[10px] leading-relaxed text-zinc-200">
					Include prayer for damages ₹50,00,000 with supporting legal submissions
				</div>
			</div>
			<div class="chat-thinking" style="animation-delay: 5.8s">
				<div class="flex items-center gap-1.5 text-[10px] text-zinc-500">
					<span>Agent is thinking</span>
					<span class="thinking-dots">
						<span class="dot" style="animation-delay: 0s"></span>
						<span class="dot" style="animation-delay: 0.15s"></span>
						<span class="dot" style="animation-delay: 0.3s"></span>
					</span>
				</div>
				<div class="mt-1 flex flex-col gap-0.5 pl-1">
					<div class="h-1.5 w-full rounded-full bg-zinc-800/60" style="animation: pulseBar 0.8s ease-in-out infinite; animation-delay: 0s"></div>
					<div class="h-1.5 w-3/4 rounded-full bg-zinc-800/60" style="animation: pulseBar 0.8s ease-in-out infinite; animation-delay: 0.15s"></div>
					<div class="h-1.5 w-5/6 rounded-full bg-zinc-800/60" style="animation: pulseBar 0.8s ease-in-out infinite; animation-delay: 0.3s"></div>
				</div>
			</div>
			<div class="chat-agent" style="animation-delay: 6.6s">
				<div class="flex items-center gap-1.5 text-[10px]">
					<span class="inline-block h-2 w-2 rounded-full bg-blue-400"></span>
					<span class="text-blue-300">Agent</span>
				</div>
				<div class="mt-0.5 rounded-lg rounded-tl-none bg-zinc-800/60 px-2.5 py-1.5 text-[10px] leading-relaxed text-zinc-300">
					Prayer clause updated to claim ₹50,00,000 plus interest. Added legal submissions under Order XIII-A Rule 3 with reliance on (2025) SCC OnLine Del 4567.
				</div>
			</div>
		</div>

		<div class="flex items-center gap-2 border-t border-white/10 px-3 py-1.5 shrink-0">
			<div class="relative flex-1">
				<select aria-label="Select model" bind:value={model} class="w-full appearance-none rounded bg-zinc-800/80 px-2 py-1 pr-5 text-[9px] text-zinc-400 outline-none ring-1 ring-white/10">
					<option>GPT-4o</option>
					<option>Claude 3.5</option>
					<option>Gemini Pro</option>
				</select>
				<svg viewBox="0 0 20 20" fill="currentColor" class="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
			</div>
			<div class="relative flex-1">
				<select aria-label="Select mode" bind:value={mode} class="w-full appearance-none rounded bg-zinc-800/80 px-2 py-1 pr-5 text-[9px] text-zinc-400 outline-none ring-1 ring-white/10">
					<option>Draft</option>
					<option>Review</option>
					<option>Research</option>
					<option>Negotiate</option>
				</select>
				<svg viewBox="0 0 20 20" fill="currentColor" class="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
			</div>
		</div>

		<div class="flex items-center gap-2 border-t border-white/10 px-3 py-2 shrink-0">
			<div class="flex-1 rounded-lg bg-zinc-800/60 px-2.5 py-1.5 text-[10px] text-zinc-500 ring-1 ring-white/5">
				Type a message...
			</div>
			<button aria-label="Send message" class="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 transition-colors hover:bg-blue-500/30">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5" stroke-width="2"><path d="M22 2L11 13" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/></svg>
			</button>
		</div>
	</div>

	<div class="flex flex-1 flex-col">
		<div class="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs text-zinc-400">
			<svg viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5 text-blue-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/></svg>
			IA_Summary_Judgment_Delhi_HC_v3.docx
			<span class="ml-auto flex items-center gap-1 text-[9px] text-emerald-400">
				<span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
				AI Drafting Active
			</span>
		</div>
		<div class="flex flex-1 flex-col gap-0 overflow-y-auto p-3 font-mono text-[10px] leading-relaxed hide-scrollbar">
			<div class="line text-zinc-300 font-bold">IN THE HIGH COURT OF DELHI AT NEW DELHI</div>
			<div class="line mt-1 text-zinc-400" style="animation-delay: 0.1s">CS(OS) No. 1234 of 2026</div>
			<div class="line mt-1 text-zinc-400" style="animation-delay: 0.15s">___________________________________________</div>
			<div class="line mt-1.5 text-zinc-200" style="animation-delay: 0.2s">Sh. John Doe</div>
			<div class="line text-zinc-500" style="animation-delay: 0.25s">&nbsp;&nbsp;&nbsp;...Plaintiff</div>
			<div class="line mt-1 text-zinc-200" style="animation-delay: 0.3s">Versus</div>
			<div class="line mt-1 text-zinc-200" style="animation-delay: 0.35s">M/s Acme Corporation</div>
			<div class="line text-zinc-500" style="animation-delay: 0.4s">&nbsp;&nbsp;&nbsp;...Defendant</div>
			<div class="line mt-1 text-zinc-400" style="animation-delay: 0.45s">___________________________________________</div>

			<div class="line mt-1 text-zinc-300" style="animation-delay: 0.5s">I.A. No. 4567 of 2026</div>
			<div class="line mt-1 text-zinc-300 font-medium" style="animation-delay: 0.55s">APPLICATION UNDER ORDER XIII-A RULES 2 AND 3</div>
			<div class="line text-zinc-300 font-medium" style="animation-delay: 0.6s">OF THE CODE OF CIVIL PROCEDURE, 1908 SEEKING</div>
			<div class="line text-zinc-300 font-medium" style="animation-delay: 0.65s">SUMMARY JUDGMENT IN FAVOUR OF THE PLAINTIFF</div>

			<div class="line mt-1.5 text-zinc-300 font-medium italic" style="animation-delay: 0.7s">MOST RESPECTFULLY SHOWETH:</div>

			<div class="line mt-1 text-zinc-400" style="animation-delay: 0.75s">1. The Plaintiff above-named most humbly</div>
			<div class="line text-zinc-400" style="animation-delay: 0.8s">&nbsp;&nbsp;&nbsp;submits as under:</div>

			<div class="line-add mt-1" style="animation-delay: 1s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">2. That the Plaintiff and Defendant entered</div>
			</div>
			<div class="line-add" style="animation-delay: 1.05s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">&nbsp;&nbsp;&nbsp;into a contract on 15.01.2026 whereby the</div>
			</div>
			<div class="line-add" style="animation-delay: 1.1s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">&nbsp;&nbsp;&nbsp;Defendant agreed to supply 500 units of</div>
			</div>
			<div class="line-add" style="animation-delay: 1.15s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">&nbsp;&nbsp;&nbsp;goods by 01.03.2026.</div>
			</div>

			<div class="line-rem" style="animation-delay: 1.2s">
				<div class="diff-gutter-rem"></div>
				<div class="diff-content text-zinc-600 line-through">[Previous draft — lacked specific factual particulars]</div>
			</div>
			<div class="line-rem" style="animation-delay: 1.25s">
				<div class="diff-gutter-rem"></div>
				<div class="diff-content text-zinc-600 line-through">Plaintiff alleges breach without specificity</div>
			</div>

			<div class="line-add mt-1" style="animation-delay: 1.5s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">3. That the Defendant failed to deliver the</div>
			</div>
			<div class="line-add" style="animation-delay: 1.55s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">&nbsp;&nbsp;&nbsp;said goods despite repeated reminders</div>
			</div>
			<div class="line-add" style="animation-delay: 1.6s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">&nbsp;&nbsp;&nbsp;and legal notice dated 15.03.2026.</div>
			</div>

			<div class="line-add mt-1" style="animation-delay: 2s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">LEGAL SUBMISSIONS</div>
			</div>
			<div class="line-add" style="animation-delay: 2.05s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">4. It is most respectfully submitted that</div>
			</div>
			<div class="line-add" style="animation-delay: 2.1s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">&nbsp;&nbsp;&nbsp;the Defendant has no real prospect of</div>
			</div>
			<div class="line-add" style="animation-delay: 2.15s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">&nbsp;&nbsp;&nbsp;defending the claim within the meaning</div>
			</div>
			<div class="line-add" style="animation-delay: 2.2s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">&nbsp;&nbsp;&nbsp;of Order XIII-A Rule 3 of the CPC, 1908.</div>
			</div>
			<div class="line-add" style="animation-delay: 2.25s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">&nbsp;&nbsp;&nbsp;Reliance is placed on (2025) SCC OnLine Del 4567.</div>
			</div>

			<div class="line-add mt-1" style="animation-delay: 2.6s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">PRAYER</div>
			</div>
			<div class="line-add" style="animation-delay: 2.65s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">In view of the foregoing submissions, it is</div>
			</div>
			<div class="line-add" style="animation-delay: 2.7s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">most respectfully prayed that this Hon'ble</div>
			</div>
			<div class="line-add" style="animation-delay: 2.75s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">Court may be pleased to pass a summary</div>
			</div>
			<div class="line-add" style="animation-delay: 2.8s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">judgment in favour of the Plaintiff and</div>
			</div>
			<div class="line-add" style="animation-delay: 2.85s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">against the Defendant, along with costs</div>
			</div>
			<div class="line-add" style="animation-delay: 2.9s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">of the present application.</div>
			</div>
			<div class="line-add" style="animation-delay: 2.95s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">Pass such other and further orders as this</div>
			</div>
			<div class="line-add" style="animation-delay: 3s">
				<div class="diff-gutter"></div>
				<div class="diff-content bg-emerald-500/10">Hon'ble Court may deem fit and proper.</div>
			</div>

			<div class="mt-1 flex items-center gap-1.5 text-[9px] text-zinc-500">
				<span class="inline-block h-2.5 w-px animate-blink bg-zinc-300"></span>
				AI generated — 486 words, 3 authorities cited, CPC compliant
			</div>
		</div>
	</div>
</div>

<style>
	.sidebar {
		animation: slideIn 0.4s ease-out both;
		will-change: transform, opacity;
		scrollbar-width: none;
	}

	.sidebar::-webkit-scrollbar {
		display: none;
	}

	.chat-user {
		animation: slideUp 0.35s ease-out both;
		will-change: transform, opacity;
	}

	.chat-thinking {
		animation: slideUp 0.35s ease-out both;
		will-change: transform, opacity;
	}

	.chat-agent {
		animation: slideUp 0.35s ease-out both;
		will-change: transform, opacity;
	}

	.thinking-dots {
		display: inline-flex;
		align-items: center;
		gap: 2px;
	}

	.dot {
		display: inline-block;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: #818cf8;
		animation: dotBounce 0.6s ease-in-out infinite;
		will-change: transform;
	}

	@keyframes dotBounce {
		0%, 80%, 100% { transform: translateY(0); }
		40% { transform: translateY(-4px); }
	}

	@keyframes pulseBar {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 0.7; }
	}

	.line {
		animation: fadeIn 0.3s ease-out both;
		will-change: transform, opacity;
	}

	.line-add {
		display: flex;
		animation: fadeIn 0.3s ease-out both;
		will-change: transform, opacity;
	}

	.line-rem {
		display: flex;
		animation: fadeIn 0.3s ease-out both;
		will-change: transform, opacity;
	}

	.diff-gutter {
		width: 3px;
		flex-shrink: 0;
		background: #34d399;
		border-radius: 2px;
		margin-right: 6px;
		animation: gutterAppear 0.3s ease-out both;
		will-change: transform, opacity;
	}

	.diff-gutter-rem {
		width: 3px;
		flex-shrink: 0;
		background: #f87171;
		border-radius: 2px;
		margin-right: 6px;
		animation: gutterAppear 0.3s ease-out both;
		will-change: transform, opacity;
	}

	.diff-content {
		flex: 1;
		padding-left: 2px;
	}

	@keyframes slideIn {
		from { transform: translateX(-8px); opacity: 0; }
		to   { transform: translateX(0);    opacity: 1; }
	}

	@keyframes slideUp {
		from { transform: translateY(8px); opacity: 0; }
		to   { transform: translateY(0);   opacity: 1; }
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	@keyframes gutterAppear {
		from { transform: scaleY(0); opacity: 0; }
		to   { transform: scaleY(1); opacity: 1; }
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50%      { opacity: 0; }
	}

	.animate-blink {
		animation: blink 1s step-end infinite;
	}

	.hide-scrollbar {
		scrollbar-width: none;
	}

	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
