<script lang="ts">
	import IntakePreview from './IntakePreview.svelte';
	import DraftingPreview from './DraftingPreview.svelte';
	import EditingPreview from './EditingPreview.svelte';
	import CompliancePreview from './CompliancePreview.svelte';
	import SecurityPreview from './SecurityPreview.svelte';

	let { fileName = 'Dashboard.tsx', variant = 'intake' }: { fileName?: string; variant?: string } = $props();

	let el = $state<HTMLElement>();
	let visible = $state(false);

	$effect(() => {
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) visible = true; },
			{ threshold: 0.05 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={el}
	class="w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-lg"
>
	<div class="flex h-11 items-center border-b border-white/10 bg-zinc-900/60 px-4">
		<div class="flex items-center gap-1.5">
			<div class="h-3 w-3 rounded-full bg-red-500/80"></div>
			<div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
			<div class="h-3 w-3 rounded-full bg-emerald-500/80"></div>
		</div>
		<div
			class="ml-4 flex items-center gap-1.5 rounded-t border-x border-t border-white/10 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-100"
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3.5 w-3.5 text-blue-400">
				<path
					d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path d="M14 2v6h6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			{fileName}
			<span class="ml-1 text-zinc-600">✕</span>
		</div>
		<div class="flex flex-1 items-center justify-end">
			<a
				href="/join-waitlist"
				class="rounded-md bg-white px-3 py-1 text-xs font-medium text-black transition hover:bg-zinc-200"
			>
				Try LegalHand now
			</a>
		</div>
	</div>
	<div class="aspect-[16/10] bg-zinc-950/60">
		{#if visible}
			{#if variant === 'intake'}
				<IntakePreview />
			{:else if variant === 'drafting'}
				<DraftingPreview />
			{:else if variant === 'editing'}
				<EditingPreview />
			{:else if variant === 'compliance'}
				<CompliancePreview />
			{:else if variant === 'security'}
				<SecurityPreview />
			{/if}
		{/if}
	</div>
</div>
