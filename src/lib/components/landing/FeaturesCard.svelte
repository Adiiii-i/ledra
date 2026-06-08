<script lang="ts">
	import SimplifiedEditor from './SimplifiedEditor.svelte';

	type FeatureCard = {
		title: string;
		docName: string;
		tag: string;
		description: string;
		benefits: string[];
		cta: string;
		variant: string;
	};

	const features: FeatureCard[] = [
		{
			title: 'GST Return Drafting',
			docName: 'GSTR_3B_Draft.json',
			tag: 'GST',
			description: 'Reads invoices and accounting data to instantly output accurate GSTR-1 and GSTR-3B drafts.',
			benefits: [
				'Invoice Parsing',
				'Automated ITC Matching',
				'GSTR-2B Reconciliation',
				'Multi-GSTIN Support',
				'Error Validation',
				'JSON Output Ready'
			],
			cta: 'Draft a return',
			variant: 'intake'
		},
		{
			title: 'ITD Notice Replies',
			docName: 'Reply_Sec143_1.docx',
			tag: 'Compliance',
			description: 'Reads Income Tax Department notices and drafts replies with accurate case laws and citations.',
			benefits: [
				'Notice Parsing & Extraction',
				'Precedent Retrieval',
				'Automated Drafting',
				'Section 143(1) & 148 Responses',
				'Fact-Based Arguments',
				'Legal Case Law Integration'
			],
			cta: 'Draft a reply',
			variant: 'drafting'
		},
		{
			title: 'Tax Audit Reports (Form 3CD)',
			docName: 'Form_3CD_Audit.docx',
			tag: 'Audit',
			description: 'Reads P&L statements and ledgers to instantly draft comprehensive Form 3CD audit reports.',
			benefits: [
				'Ledger Analysis',
				'Clause 44 Breakdown',
				'Depreciation Schedules',
				'Section 43B Disallowances',
				'PF/ESI Late Payment Checks',
				'Automated Annexures'
			],
			cta: 'Generate report',
			variant: 'editing'
		},
		{
			title: 'TDS Returns & Payroll',
			docName: 'Form_24Q_Q3.txt',
			tag: 'TDS',
			description: 'Processes payroll data and challans to draft error-free Form 24Q and 26Q returns.',
			benefits: [
				'Payroll Data Extraction',
				'Challan Verification',
				'Section 192 Computations',
				'Lower Deduction Mapping',
				'FVU Validation Ready',
				'Text File Generation'
			],
			cta: 'Process TDS',
			variant: 'compliance'
		},
		{
			title: 'Client MIS & Memos',
			docName: 'Monthly_MIS_Report.docx',
			tag: 'Advisory',
			description: 'Translates complex financial data into beautiful, easy-to-read MIS reports for your clients.',
			benefits: [
				'Cash Flow Analysis',
				'Profitability Trends',
				'Working Capital Insights',
				'Visual Summaries',
				'Customizable Templates',
				'Client-Ready PDFs'
			],
			cta: 'Create a memo',
			variant: 'security'
		}
	];
</script>

<section id="features" class="relative isolate overflow-hidden bg-black py-24">
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]"
	></div>

	<div class="relative z-10 mx-auto max-w-[90vw] px-6">
		<div class="mx-auto max-w-3xl text-center">
			<h2
				class="text-4xl leading-[1.1] font-medium tracking-tight text-balance text-white sm:text-5xl"
			>
				Five pillars of accounting AI, one platform
			</h2>
			<p class="mx-auto mt-5 max-w-2xl text-base text-balance text-zinc-400">
				From data intake to secure client reporting — everything you need to run a modern CA firm.
			</p>
		</div>

		<div class="mt-16 flex flex-col gap-16">
			{#each features as feature, i (feature.docName)}
				<div class="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg">
					<div class="relative flex flex-col {i === 1 || i === 3 ? 'lg:flex-row-reverse' : 'lg:flex-row'}">
						<div class="flex w-full flex-col justify-center gap-4 p-8 lg:w-4/12 lg:p-12">
							<span
								class="inline-block w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-400 uppercase"
							>
								{feature.tag}
							</span>
							<h3 class="text-2xl font-medium tracking-tight text-white sm:text-3xl">
								{feature.title}
							</h3>
							<p class="text-sm leading-relaxed text-zinc-400">
								{feature.description}
							</p>
							<ul class="space-y-2">
								{#each feature.benefits as benefit}
									<li class="flex items-start gap-2 text-sm text-zinc-300">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
										>
											<path
												fill-rule="evenodd"
												d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4L8 12.58l4.3-4.3a1 1 0 0 1 1.4 0Z"
												clip-rule="evenodd"
											/>
										</svg>
										{benefit}
									</li>
								{/each}
							</ul>
							<button
								type="button"
								class="mt-2 inline-flex min-h-[44px] w-fit items-center gap-1.5 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
							>
								{feature.cta}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-4 w-4"
								>
									<path
										fill-rule="evenodd"
										d="M3 10a.75.75 0 0 1 .75-.75h10.19l-3.97-3.97a.75.75 0 1 1 1.06-1.06l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06l3.97-3.97H3.75A.75.75 0 0 1 3 10Z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>
						<div class="flex w-full items-center p-4 lg:w-8/12 lg:p-6">
							<SimplifiedEditor fileName={feature.docName} variant={feature.variant} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
