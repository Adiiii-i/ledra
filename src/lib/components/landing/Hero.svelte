<script lang="ts">
	import WordProcessor from './WordProcessor.svelte';
	import AnimatedShaderBackground from '$lib/components/ui/animated-shader-background.svelte';
	let { user }: { user: import('better-auth/types').User | null } = $props();

	let outerRef: HTMLDivElement;
	let winRef: HTMLDivElement;
	let isDragging = $state(false);
	let winX = $state(0);
	let winY = $state(0);
	let winZ = $state(10);
	let startHeight = $state(600);
	let dragStartMouseX = $state(0);
	let dragStartMouseY = $state(0);
	let dragStartWinX = $state(0);
	let dragStartWinY = $state(0);
	let dragStartWinRect = $state<DOMRect | null>(null);
	let dragStartOuterRect = $state<DOMRect | null>(null);

	function onDragStart(e: PointerEvent) {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		const wr = winRef.getBoundingClientRect();
		const or = outerRef.getBoundingClientRect();
		dragStartWinRect = wr;
		dragStartOuterRect = or;
		dragStartMouseX = e.clientX;
		dragStartMouseY = e.clientY;
		dragStartWinX = winX;
		dragStartWinY = winY;
		isDragging = true;
		winZ = 20;
		startWinZ = 10;
		(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
		e.preventDefault();
	}

	function onWpClick() {
		winZ = 15;
		startWinZ = 10;
	}

	$effect(() => {
		if (!isDragging || !dragStartWinRect || !dragStartOuterRect) return;
		function onMove(e: PointerEvent) {
			const outerRect = outerRef.getBoundingClientRect();
			const dx = e.clientX - dragStartMouseX;
			const dy = e.clientY - dragStartMouseY;
			const flexCenterOffX = dragStartWinRect.left - dragStartWinX - dragStartOuterRect.left;
			const flexCenterOffY = dragStartWinRect.top - dragStartWinY - dragStartOuterRect.top;
			const flexCenterX = outerRect.left + flexCenterOffX;
			const flexCenterY = outerRect.top + flexCenterOffY;
			let newLeft = flexCenterX + dragStartWinX + dx;
			let newTop = flexCenterY + dragStartWinY + dy;
			newLeft = Math.max(
				outerRect.left,
				Math.min(outerRect.right - dragStartWinRect.width, newLeft)
			);
			newTop = Math.max(
				outerRect.top,
				Math.min(outerRect.bottom - dragStartWinRect.height, newTop)
			);
			winX = newLeft - flexCenterX;
			winY = newTop - flexCenterY;
		}
		function onUp() {
			isDragging = false;
			winZ = 10;
			startWinZ = 15;
		}
		document.addEventListener('pointermove', onMove);
		document.addEventListener('pointerup', onUp);
		document.addEventListener('pointercancel', onUp);
		return () => {
			document.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerup', onUp);
			document.removeEventListener('pointercancel', onUp);
		};
	});

	let showStart = $state(true);
	let startWinRef: HTMLDivElement = $state(null!);
	let startWinX = $state(60);
	let startWinY = $state(60);
	let startWinZ = $state(15);
	let isStartDragging = $state(false);
	let startDragMouseX = $state(0);
	let startDragMouseY = $state(0);
	let startDragWinX = $state(0);
	let startDragWinY = $state(0);
	let startDragRect: DOMRect | null = null;

	function onStartDragStart(e: PointerEvent) {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		startDragRect = startWinRef.getBoundingClientRect();
		startDragMouseX = e.clientX;
		startDragMouseY = e.clientY;
		startDragWinX = startWinX;
		startDragWinY = startWinY;
		isStartDragging = true;
		startWinZ = 20;
		winZ = 10;
		(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
		e.preventDefault();
		e.stopPropagation();
	}

	function onStartClick() {
		startWinZ = 15;
		winZ = 10;
	}

	$effect(() => {
		if (!isStartDragging || !startDragRect) return;
		function onMove(e: PointerEvent) {
			const pRect = startWinRef.parentElement!.getBoundingClientRect();
			const dx = e.clientX - startDragMouseX;
			const dy = e.clientY - startDragMouseY;
			let newLeft = pRect.left + startDragWinX + dx;
			let newTop = pRect.top + startDragWinY + dy;
			newLeft = Math.max(pRect.left, Math.min(pRect.right - startDragRect.width, newLeft));
			newTop = Math.max(pRect.top, Math.min(pRect.bottom - startDragRect.height, newTop));
			startWinX = newLeft - pRect.left;
			startWinY = newTop - pRect.top;
		}
		function onUp() {
			isStartDragging = false;
			startWinZ = 15;
			winZ = 10;
		}
		document.addEventListener('pointermove', onMove);
		document.addEventListener('pointerup', onUp);
		document.addEventListener('pointercancel', onUp);
		return () => {
			document.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerup', onUp);
			document.removeEventListener('pointercancel', onUp);
		};
	});

	$effect(() => {
		if (!winRef) return;
		const ro = new ResizeObserver(([entry]) => {
			startHeight = entry.contentRect.height;
		});
		ro.observe(winRef);
		startHeight = winRef.clientHeight;
		return () => ro.disconnect();
	});
</script>

<section class="relative isolate overflow-hidden pt-32 pb-24">
	<div class="pointer-events-none absolute inset-0 z-0">
		<div
			class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]"
		></div>
	</div>
	<div class="relative min-h-[500px] overflow-hidden md:min-h-[600px]">
		<div class="pointer-events-none absolute inset-0 z-0">
			<AnimatedShaderBackground />
		</div>
		<div class="relative z-10 mx-auto max-w-[90vw] px-6 text-center">
			<h1
				class="text-5xl leading-[1.05] font-medium tracking-tight text-balance text-white sm:text-6xl md:text-7xl"
			>
				The agent-native way to<br />handle tax compliance
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg text-balance text-zinc-400">
				Get Ledra and experience an agent-native workspace for modern CAs.
			</p>
			<div class="mt-10 flex flex-wrap items-center justify-center gap-3">
				<a
					href={user ? '/dashboard' : '/join-waitlist'}
					class="inline-flex min-h-[44px] items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-zinc-200"
					style="color: black;"
				>
					{user ? 'Open dashboard' : 'Try Ledra now'}
				</a>
				<a
					href="/join-waitlist"
					class="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
					>Request a demo</a
				>
			</div>
		</div>
	</div>

		<div
			bind:this={outerRef}
			class="relative mx-auto mt-128 max-w-7xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
			style="min-height:85vh;"
		>
			<div
				class="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style="background-image:url('/museum-of-new-zealand-te-papa-tongarewa-KHHgCEN_HAw-unsplash.jpg');"
			></div>
			<div class="absolute inset-0 bg-black/80"></div>
			<div class="relative flex min-h-[85vh] items-center justify-center p-6 md:p-10">
			<div
				bind:this={winRef}
				onclick={onWpClick}
				onkeydown={(e) => e.key === 'Enter' && onWpClick()}
				role="button"
				tabindex="0"
				class="w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl transition-shadow duration-200 {isDragging
					? 'shadow-amber-500/20'
					: ''}"
				style="max-width:1152px; transform:translate({winX}px,{winY}px); z-index:{winZ};"
			>
					<div
						onpointerdown={onDragStart}
						role="presentation"
						class="grid cursor-grab grid-cols-3 items-center border-b border-white/10 bg-zinc-900/60 px-4 py-2.5 select-none {isDragging
							? 'cursor-grabbing'
							: ''}"
					>
						<div class="flex items-center gap-1.5">
							<div class="h-2.5 w-2.5 rounded-full bg-red-500"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
						</div>
						<div class="text-center text-xs text-zinc-500 select-none">
							Ledra — Form 3CD Acme FY25.docx
						</div>
						<div></div>
					</div>
					<WordProcessor />
				</div>

				{#if showStart}
			<div
				bind:this={startWinRef}
				onclick={onStartClick}
				onkeydown={(e) => e.key === 'Enter' && onStartClick()}
				role="button"
				tabindex="0"
				class="absolute flex w-[min(720px,calc(100%-2rem))] flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl transition-shadow duration-200 {isStartDragging
					? 'shadow-amber-500/20'
					: ''}"
				style="left:0; top:0; z-index:{startWinZ}; max-width:min(720px, calc(100% - 2rem)); height:{startHeight}px; transform:translate({startWinX}px,{startWinY}px);"
			>
						<div
							onpointerdown={onStartDragStart}
							role="presentation"
							class="grid cursor-grab grid-cols-3 items-center border-b border-white/10 bg-zinc-900/60 px-4 py-2.5 select-none {isStartDragging
								? 'cursor-grabbing'
								: ''}"
						>
							<div class="flex items-center gap-1.5">
							<div
								onclick={(e) => {
									e.stopPropagation();
									showStart = false;
								}}
								onkeydown={(e) => {
									if (e.key === 'Enter') { e.stopPropagation(); showStart = false; }
								}}
								role="button"
								tabindex="0"
								class="h-2.5 w-2.5 cursor-pointer rounded-full bg-red-500 transition hover:brightness-125"
							></div>
								<div class="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
								<div class="h-2.5 w-2.5 rounded-full bg-emerald-500 opacity-60"></div>
							</div>
							<div class="text-center text-xs text-zinc-500 select-none">Start · Ledra</div>
							<div></div>
						</div>

						<div class="shrink-0 border-b border-white/10 bg-zinc-900/40 px-4 py-3">
							<div
								class="flex items-center gap-2 rounded-md border border-white/10 bg-zinc-800/50 px-2.5 py-1.5 focus-within:border-blue-500/50"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-3.5 w-3.5 text-zinc-500"
									><path
										fill-rule="evenodd"
										d="M9 3.5a5.5 5.5 0 1 0 3.546 9.71l3.122 3.122a.75.75 0 1 0 1.06-1.06l-3.122-3.122A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
										clip-rule="evenodd"
									/></svg
								>
								<input
									type="text"
									placeholder="Search for a document or template..."
									class="w-full bg-transparent text-[12px] text-zinc-200 placeholder-zinc-500 focus:outline-none"
								/>
							</div>
						</div>

						<div class="flex min-h-0 flex-1">
							<div
								class="hidden w-40 shrink-0 border-r border-white/10 bg-zinc-900/40 p-2 sm:block"
							>
								<div
									class="px-2 py-1 text-[10px] font-medium tracking-wide text-zinc-500 uppercase"
								>
									Open
								</div>
								<button
									type="button"
									class="mb-0.5 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] text-zinc-200 transition hover:bg-white/5"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-3.5 w-3.5 text-amber-400"
										><path
											d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 4.75a.75.75 0 0 0-1.5 0v3.5l-2.22 2.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 .22-.53V6.75Z"
											clip-rule="evenodd"
										/></svg
									>
									Recent
								</button>
								<button
									type="button"
									class="mb-0.5 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] text-zinc-300 transition hover:bg-white/5"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-3.5 w-3.5 text-zinc-500"
										><path
											d="M10 2 3 6v8l7 4 7-4V6l-7-4Zm0 1.32 5.36 3.06L10 9.44 4.64 6.38 10 3.32Z"
										/></svg
									>
									Pinned
								</button>
								<button
									type="button"
									class="mb-0.5 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] text-zinc-300 transition hover:bg-white/5"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-3.5 w-3.5 text-zinc-500"
										><path
											d="M3.75 3A1.75 1.75 0 0 0 2 4.75v10.5A1.75 1.75 0 0 0 3.75 17h12.5A1.75 1.75 0 0 0 18 15.25V4.75A1.75 1.75 0 0 0 16.25 3H3.75Z"
										/></svg
									>
									Drafts
								</button>
								<button
									type="button"
									class="mb-0.5 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] text-zinc-300 transition hover:bg-white/5"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-3.5 w-3.5 text-zinc-500"
										><path
											d="M3 4a2 2 0 0 1 2-2h6.586a1 1 0 0 1 .707.293L17 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4Zm10 0v2.5A1.5 1.5 0 0 0 14.5 8H17L13 4Z"
										/></svg
									>
									Shared
								</button>
								<div
									class="mt-3 px-2 py-1 text-[10px] font-medium tracking-wide text-zinc-500 uppercase"
								>
									Create
								</div>
								<button
									type="button"
									class="mb-0.5 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] text-zinc-300 transition hover:bg-white/5"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-3.5 w-3.5 text-zinc-500"
										><path
											d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z"
										/></svg
									>
									Blank
								</button>
								<button
									type="button"
									class="mb-0.5 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] text-zinc-300 transition hover:bg-white/5"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-3.5 w-3.5 text-zinc-500"
										><path
											d="M3 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3H3V4Zm0 5h6v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Zm8-6h4a1 1 0 0 1 1 1v3h-6V4a1 1 0 0 1 1-1Zm0 6h6v7a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V9Z"
										/></svg
									>
									Templates
								</button>
								<button
									type="button"
									class="mb-0.5 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] text-zinc-300 transition hover:bg-white/5"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-3.5 w-3.5 text-zinc-500"
										><path
											d="M3 4.5A1.5 1.5 0 0 1 4.5 3h11A1.5 1.5 0 0 1 17 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 15.5v-11Z"
										/></svg
									>
									From cloud
								</button>
							</div>

							<div class="wp-scroll min-h-0 flex-1 overflow-y-auto p-4">
								<h3 class="mb-2 text-[10px] font-medium tracking-wide text-zinc-500 uppercase">
									Pinned
								</h3>
								<div class="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
									<button
										type="button"
										onclick={() => {}}
										class="group flex flex-col gap-1.5 rounded-lg p-1.5 text-left transition hover:bg-white/5"
									>
										<div
											class="flex aspect-[3/4] flex-col gap-1 overflow-hidden rounded border border-white/10 bg-zinc-800/60 p-2 shadow-sm group-hover:border-blue-500/50 group-hover:shadow-blue-500/10"
										>
											<div class="text-[8px] font-semibold tracking-wide text-zinc-300">
												GSTR-3B DRAFT
											</div>
											<div class="space-y-0.5 pt-1">
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-4/5 rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-3/5 rounded-sm bg-zinc-700/70"></div>
											</div>
										</div>
										<div class="px-0.5">
											<div class="truncate text-[11px] font-medium text-zinc-100">
												GSTR-3B Draft
											</div>
											<div class="text-[10px] text-zinc-500">Acme Corp · 2 hrs ago</div>
										</div>
									</button>
									<button
										type="button"
										onclick={() => {}}
										class="group flex flex-col gap-1.5 rounded-lg p-1.5 text-left transition hover:bg-white/5"
									>
										<div
											class="flex aspect-[3/4] flex-col gap-1 overflow-hidden rounded border border-white/10 bg-zinc-800/60 p-2 shadow-sm group-hover:border-blue-500/50 group-hover:shadow-blue-500/10"
										>
											<div class="text-[8px] font-semibold tracking-wide text-zinc-300">
												FORM 3CD
											</div>
											<div class="space-y-0.5 pt-1">
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-2/3 rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
											</div>
										</div>
										<div class="px-0.5">
											<div class="truncate text-[11px] font-medium text-zinc-100">
												Form 3CD Report
											</div>
											<div class="text-[10px] text-zinc-500">Acme Corp · Yesterday</div>
										</div>
									</button>
								</div>

								<h3 class="mb-2 text-[10px] font-medium tracking-wide text-zinc-500 uppercase">
									Recent
								</h3>
								<div class="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
									<button
										type="button"
										onclick={() => {}}
										class="group flex flex-col gap-1.5 rounded-lg p-1.5 text-left transition hover:bg-white/5"
									>
										<div
											class="flex aspect-[3/4] flex-col gap-1 overflow-hidden rounded border border-white/10 bg-zinc-800/60 p-2 shadow-sm group-hover:border-blue-500/50 group-hover:shadow-blue-500/10"
										>
											<div class="text-[8px] font-semibold tracking-wide text-zinc-300">NOTICE REPLY</div>
											<div class="space-y-0.5 pt-1">
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-5/6 rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-2/3 rounded-sm bg-zinc-700/70"></div>
											</div>
										</div>
										<div class="px-0.5">
											<div class="truncate text-[11px] font-medium text-zinc-100">
												Notice Reply
											</div>
											<div class="text-[10px] text-zinc-500">ITD Section 143(1) · 3 min ago</div>
										</div>
									</button>
									<button
										type="button"
										onclick={() => {}}
										class="group flex flex-col gap-1.5 rounded-lg p-1.5 text-left transition hover:bg-white/5"
									>
										<div
											class="flex aspect-[3/4] flex-col gap-1 overflow-hidden rounded border border-white/10 bg-zinc-800/60 p-2 shadow-sm group-hover:border-blue-500/50 group-hover:shadow-blue-500/10"
										>
											<div class="text-[8px] font-semibold tracking-wide text-zinc-300">
												FORM 24Q
											</div>
											<div class="space-y-0.5 pt-1">
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-4/5 rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
											</div>
										</div>
										<div class="px-0.5">
											<div class="truncate text-[11px] font-medium text-zinc-100">
												TDS Form 24Q
											</div>
											<div class="text-[10px] text-zinc-500">Q3 2024-25 · 2 days ago</div>
										</div>
									</button>
									<button
										type="button"
										onclick={() => {}}
										class="group flex flex-col gap-1.5 rounded-lg p-1.5 text-left transition hover:bg-white/5"
									>
										<div
											class="flex aspect-[3/4] flex-col gap-1 overflow-hidden rounded border border-white/10 bg-zinc-800/60 p-2 shadow-sm group-hover:border-blue-500/50 group-hover:shadow-blue-500/10"
										>
											<div class="text-[8px] font-semibold tracking-wide text-zinc-300">MIS REPORT</div>
											<div class="space-y-0.5 pt-1">
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-3/4 rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-5/6 rounded-sm bg-zinc-700/70"></div>
											</div>
										</div>
										<div class="px-0.5">
											<div class="truncate text-[11px] font-medium text-zinc-100">
												Client MIS Report
											</div>
											<div class="text-[10px] text-zinc-500">Internal · 4 days ago</div>
										</div>
									</button>
								</div>

								<h3 class="mb-2 text-[10px] font-medium tracking-wide text-zinc-500 uppercase">
									New from template
								</h3>
								<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
									<button
										type="button"
										onclick={() => {}}
										class="group flex flex-col gap-1.5 rounded-lg p-1.5 text-left transition hover:bg-white/5"
									>
										<div
											class="flex aspect-[3/4] items-center justify-center overflow-hidden rounded border border-dashed border-white/15 bg-zinc-900/50 group-hover:border-blue-500/50"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												class="h-7 w-7 text-zinc-500 group-hover:text-blue-400"
												><path
													d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z"
												/></svg
											>
										</div>
										<div class="px-0.5">
											<div class="truncate text-[11px] font-medium text-zinc-100">
												Blank document
											</div>
											<div class="text-[10px] text-zinc-500">Empty</div>
										</div>
									</button>
									<button
										type="button"
										onclick={() => {}}
										class="group flex flex-col gap-1.5 rounded-lg p-1.5 text-left transition hover:bg-white/5"
									>
										<div
											class="flex aspect-[3/4] flex-col gap-0.5 overflow-hidden rounded border border-white/10 bg-gradient-to-br from-amber-500/10 to-zinc-800/60 p-2 group-hover:border-blue-500/50"
										>
											<div class="text-[7px] font-semibold tracking-wide text-amber-300">
												GSTR-1 DRAFT
											</div>
											<div class="space-y-0.5 pt-1">
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-3/4 rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
											</div>
										</div>
										<div class="px-0.5">
											<div class="truncate text-[11px] font-medium text-zinc-100">GSTR-1 Draft</div>
											<div class="text-[10px] text-zinc-500">Template</div>
										</div>
									</button>
									<button
										type="button"
										onclick={() => {}}
										class="group flex flex-col gap-1.5 rounded-lg p-1.5 text-left transition hover:bg-white/5"
									>
										<div
											class="flex aspect-[3/4] flex-col gap-0.5 overflow-hidden rounded border border-white/10 bg-gradient-to-br from-sky-500/10 to-zinc-800/60 p-2 group-hover:border-blue-500/50"
										>
											<div class="text-[7px] font-semibold tracking-wide text-sky-300">
												AUDIT REPORT
											</div>
											<div class="space-y-0.5 pt-1">
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-4/5 rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-full rounded-sm bg-zinc-700/70"></div>
												<div class="h-1 w-2/3 rounded-sm bg-zinc-700/70"></div>
											</div>
										</div>
										<div class="px-0.5">
											<div class="truncate text-[11px] font-medium text-zinc-100">
												Audit Report
											</div>
											<div class="text-[10px] text-zinc-500">Template</div>
										</div>
									</button>
								</div>
							</div>
						</div>

						<div
							class="flex shrink-0 items-center justify-between border-t border-white/10 bg-zinc-900/60 px-4 py-2 text-[11px] text-zinc-500"
						>
							<div class="flex items-center gap-1.5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-3.5 w-3.5 text-emerald-400"
									><path
										d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4L8 12.58l4.3-4.3a1 1 0 0 1 1.4 0Z"
									/></svg
								>
								All changes saved to cloud
							</div>
							<button
								type="button"
								onclick={() => {}}
								class="rounded px-2 py-0.5 text-zinc-300 transition hover:bg-white/5 hover:text-zinc-100"
							>
								Open empty doc →
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
</section>
