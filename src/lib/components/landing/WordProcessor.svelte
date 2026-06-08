<script lang="ts">
	import { tick, onDestroy } from 'svelte';

	let editorRef: HTMLDivElement;
	let chatScroller: HTMLDivElement;

	let boldActive = $state(false);
	let italicActive = $state(false);
	let underlineActive = $state(false);
	let strikeActive = $state(false);
	let headingActive = $state<'h1' | 'h2' | 'h3' | null>(null);
	let saved = $state(true);
	let fontFamily = $state('Georgia');
	let fontSize = $state('14');
	let textColor = $state('#e4e4e7');
	let highlightColor = $state('#fbbf24');
	let subscriptActive = $state(false);
	let superscriptActive = $state(false);
	let showToolbar = $state(false);
	let showChat = $state(true);

	type FileChange = { filename: string; diffLabel: string; added: number; removed: number };
	type ChatMsg = (
		| { id: number; from: 'user'; kind: 'text'; text: string; time: string }
		| { id: number; from: 'agent'; kind: 'thought'; duration: string; items: string[]; time: string }
		| { id: number; from: 'agent'; kind: 'action'; text: string; time: string }
		| { id: number; from: 'agent'; kind: 'file-change'; change: FileChange; text: string; time: string }
	);
	let messages: ChatMsg[] = $state([
		{ id: 1, from: 'user', kind: 'text', text: "Draft Form 3CD (Tax Audit) for FY 2024-25 for Acme Corp.", time: '10:23 AM' },
		{ id: 2, from: 'agent', kind: 'thought', duration: '5s', items: ["Read financials/P&L_FY25.pdf", "Read ledgers/Trial_Balance.xlsx", "Searched 'Form 3CD Clause 44 breakdown'", "Cross-verified GST returns with sales"], time: '10:23 AM' },
		{ id: 3, from: 'agent', kind: 'action', text: "I'll draft Form 3CD. Let me start with Part A and the key statutory clauses:", time: '10:24 AM' },
		{ id: 4, from: 'agent', kind: 'file-change', change: { filename: 'Form_3CD_Acme_FY25.docx', diffLabel: 'new file', added: 147, removed: 0 }, text: 'Drafted Form 3CD including Clauses 1-14 and depreciation schedule.', time: '10:25 AM' },
		{ id: 5, from: 'user', kind: 'text', text: "Update Clause 21(a) for the new PF late payments.", time: '10:31 AM' },
		{ id: 6, from: 'agent', kind: 'thought', duration: '3s', items: ["Read Form_3CD_Acme_FY25.docx", "Searched 'EPF challans FY25'", "Calculated delay days under Section 36(1)(va)"], time: '10:31 AM' },
		{ id: 7, from: 'agent', kind: 'action', text: "Updated Clause 21(a) with the disallowance of ₹45,200 for PF deposited after the due date.", time: '10:32 AM' },
		{ id: 8, from: 'agent', kind: 'file-change', change: { filename: 'Form_3CD_Acme_FY25.docx', diffLabel: 'Clause 21(a)', added: 28, removed: 4 }, text: 'Inserted PF disallowance and added an annexure for the challan dates.', time: '10:32 AM' },
	]);
	let toolbarTimer: ReturnType<typeof setTimeout> | null = null;
	let sendTimer: ReturnType<typeof setTimeout> | null = null;

	onDestroy(() => {
		if (toolbarTimer) clearTimeout(toolbarTimer);
		if (sendTimer) clearTimeout(sendTimer);
	});

	let newMessage = $state('');
	let isTyping = $state(false);
	let activeMenu: string | null = $state(null);
	let savedRange: Range | null = null;

	const menuItems: Record<string, Array<{ label: string; shortcut?: string } | 'divider'>> = {
		File: [
			{ label: 'New Document' }, { label: 'Open...', shortcut: 'Ctrl+O' },
			{ label: 'Save', shortcut: 'Ctrl+S' }, { label: 'Save As...', shortcut: 'Ctrl+Shift+S' },
			'divider', { label: 'Export as PDF' }, { label: 'Print', shortcut: 'Ctrl+P' },
			'divider', { label: 'Close' },
		],
		Edit: [
			{ label: 'Undo', shortcut: 'Ctrl+Z' }, { label: 'Redo', shortcut: 'Ctrl+Y' },
			'divider', { label: 'Cut', shortcut: 'Ctrl+X' }, { label: 'Copy', shortcut: 'Ctrl+C' },
			{ label: 'Paste', shortcut: 'Ctrl+V' }, 'divider', { label: 'Select All', shortcut: 'Ctrl+A' }, { label: 'Find...', shortcut: 'Ctrl+F' },
		],
		View: [
			{ label: 'Print Layout' }, { label: 'Draft Mode' }, { label: 'Read Mode' },
			'divider', { label: 'Zoom In' }, { label: 'Zoom Out' },
		],
		Insert: [
			{ label: 'Page Break' }, { label: 'Header & Footer' }, { label: 'Footnote' },
			{ label: 'Comment' }, 'divider', { label: 'Table of Contents' }, { label: 'Hyperlink' },
		],
		Format: [
			{ label: 'Font...' }, { label: 'Paragraph...' }, 'divider', { label: 'Text Color' },
			{ label: 'Highlight' }, { label: 'Bold' }, { label: 'Italic' }, { label: 'Underline' },
		],
		Tools: [
			{ label: 'Spell Check' }, { label: 'Word Count' }, 'divider', { label: 'Compare Documents' },
			{ label: 'Citations' }, { label: 'Translate' },
		],
		Review: [
			{ label: 'New Comment' }, { label: 'Track Changes' }, 'divider', { label: 'Accept All' },
			{ label: 'Reject All' }, { label: 'Previous' }, { label: 'Next' },
		],
		Help: [
			{ label: 'About Ledra' }, { label: 'Keyboard Shortcuts' }, { label: 'Documentation' },
			{ label: 'Contact Support' },
		],
	};

	function toggleMenu(name: string) {
		activeMenu = activeMenu === name ? null : name;
	}

	function closeMenus() {
		activeMenu = null;
	}

	$effect(() => {
		function onClick(e: MouseEvent) {
			if (activeMenu && !(e.target as HTMLElement)?.closest('[data-menu-wrap]')) {
				activeMenu = null;
			}
		}
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	});

	function onSelectPointerDown() {
		const sel = window.getSelection();
		if (sel && sel.rangeCount > 0 && editorRef?.contains(sel.anchorNode)) {
			savedRange = sel.getRangeAt(0).cloneRange();
		} else {
			savedRange = null;
		}
	}

	function restoreSelection() {
		if (!savedRange) return;
		editorRef.focus();
		const sel = window.getSelection();
		if (sel) {
			sel.removeAllRanges();
			sel.addRange(savedRange);
		}
	}

	function exec(cmd: string, val?: string) {
		document.execCommand(cmd, false, val);
		editorRef.focus();
		updateToolbar();
		saved = false;
	}

	function handleHeading(level: 'h1' | 'h2' | 'h3') {
		const tag = document.queryCommandValue('formatBlock')?.toLowerCase();
		if (tag === level) {
			exec('formatBlock', '<p>');
			headingActive = null;
		} else {
			exec('formatBlock', `<${level}>`);
			headingActive = level;
		}
	}

	function changeFont(e: Event) {
		const el = e.target as HTMLSelectElement;
		fontFamily = el.value;
		restoreSelection();
		exec('fontName', el.value);
	}

	function changeSize(e: Event) {
		const el = e.target as HTMLSelectElement;
		fontSize = el.value;
		restoreSelection();
		editorRef.focus();
		document.execCommand('fontSize', false, '7');
		const fonts = editorRef.querySelectorAll('font[size="7"]');
		if (fonts.length > 0) {
			const ft = fonts[fonts.length - 1];
			ft.removeAttribute('size');
			ft.style.fontSize = el.value + 'px';
		}
		updateToolbar();
		saved = false;
	}

	function changeColor(e: Event) {
		const el = e.target as HTMLInputElement;
		textColor = el.value;
		exec('foreColor', el.value);
	}

	function changeHighlight(e: Event) {
		const el = e.target as HTMLInputElement;
		highlightColor = el.value;
		editorRef.focus();
		document.execCommand('hiliteColor', false, el.value);
		saved = false;
	}

	function align(value: string) {
		exec('justify' + value.charAt(0).toUpperCase() + value.slice(1));
	}

	function updateToolbar() {
		boldActive = document.queryCommandState('bold');
		italicActive = document.queryCommandState('italic');
		underlineActive = document.queryCommandState('underline');
		strikeActive = document.queryCommandState('strikeThrough');
		subscriptActive = document.queryCommandState('subscript');
		superscriptActive = document.queryCommandState('superscript');
		const tag = document.queryCommandValue('formatBlock')?.toLowerCase();
		headingActive = tag === 'h1' ? 'h1' : tag === 'h2' ? 'h2' : tag === 'h3' ? 'h3' : null;
	}

	$effect(() => {
		document.execCommand('styleWithCSS', false, 'true');
		function selChange() {
			if (document.activeElement === editorRef || document.activeElement?.closest('[contenteditable]')) {
				updateToolbar();
			}
		}
		function up() {
			if (document.activeElement === editorRef || document.activeElement?.closest('[contenteditable]')) {
				updateToolbar();
			}
		}
		document.addEventListener('selectionchange', selChange);
		document.addEventListener('mouseup', up);
		return () => {
			document.removeEventListener('selectionchange', selChange);
			document.removeEventListener('mouseup', up);
		};
	});

	function handleKeydown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saved = true; }
		if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'i' || e.key === 'u')) {
			if (toolbarTimer) clearTimeout(toolbarTimer);
			toolbarTimer = setTimeout(updateToolbar);
		}
	}

	async function sendMessage() {
		const text = newMessage.trim();
		if (!text) return;
		messages = [...messages, { id: Date.now(), from: 'user', kind: 'text', text, time: 'now' }];
		newMessage = '';
		await tick();
		chatScroller?.scrollTo({ top: chatScroller.scrollHeight, behavior: 'smooth' });
		isTyping = true;
		sendTimer = setTimeout(() => {
			isTyping = false;
			sendTimer = null;
			const ts = Date.now();
			messages = [
				...messages,
				{ id: ts + 1, from: 'agent', kind: 'thought', duration: '2s', items: ['Read Form_3CD_Acme_FY25.docx', "Searched '" + text.slice(0, 30) + "...'"], time: 'now' },
				{ id: ts + 2, from: 'agent', kind: 'action', text: "Working on it. Updating the relevant clause now.", time: 'now' },
				{ id: ts + 3, from: 'agent', kind: 'file-change', change: { filename: 'Form_3CD_Acme_FY25.docx', diffLabel: 'updated', added: 12, removed: 6 }, text: 'Applied your request and updated the annexures.', time: 'now' },
			];
			tick().then(() => chatScroller?.scrollTo({ top: chatScroller.scrollHeight, behavior: 'smooth' }));
		}, 1400);
	}

	function activeClass(cond: boolean) {
		return cond ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100';
	}
</script>

<div class="flex h-[500px] flex-col bg-zinc-900 text-zinc-200 md:h-[600px]">
	<!-- Menu bar -->
	<div class="relative flex shrink-0 items-center gap-1 border-b border-white/5 bg-zinc-900/40 px-3 py-1 text-[12px]">
		{#each ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Review', 'Help'] as menu}
			<div data-menu-wrap="true" class="relative">
				<button onclick={() => toggleMenu(menu)}
					class="rounded-lg border px-2.5 py-0.5 text-xs font-medium shadow-sm transition {activeMenu === menu ? 'border-white/15 bg-zinc-700/60 text-zinc-200' : 'border-white/10 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/60 hover:text-zinc-200'}">{menu}</button>
				{#if activeMenu === menu}
					<div class="absolute left-0 top-full z-50 mt-0.5 min-w-[180px] overflow-hidden rounded-lg border border-white/10 bg-zinc-800 py-1 shadow-2xl">
						{#each menuItems[menu] as item}
							{#if item === 'divider'}
								<div class="my-1 border-t border-white/10"></div>
							{:else}
								<button class="flex w-full items-center justify-between px-3 py-1 text-left text-[12px] text-zinc-300 transition hover:bg-white/5 hover:text-zinc-100">
									<span>{item.label}</span>
									{#if item.shortcut}<span class="ml-4 text-[10px] text-zinc-500">{item.shortcut}</span>{/if}
								</button>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		{/each}
		<div class="flex-1"></div>
		<button onclick={() => showToolbar = !showToolbar}
			class="inline-flex items-center justify-center gap-1 rounded-lg border border-white/10 bg-zinc-800/50 px-2.5 py-0.5 text-xs font-medium text-zinc-300 shadow-sm transition hover:bg-zinc-700/60 hover:text-zinc-100"
			title="{showToolbar ? 'Hide' : 'Show'} toolbar">
			Toolbar
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3 opacity-60 transition {showToolbar ? 'rotate-180' : ''}">
				<path d="m6 9 6 6 6-6" />
			</svg>
		</button>
		<button onclick={() => showChat = !showChat}
			class="inline-flex items-center justify-center gap-1 rounded-lg border border-white/10 bg-zinc-800/50 px-2.5 py-0.5 text-xs font-medium text-zinc-300 shadow-sm transition hover:bg-zinc-700/60 hover:text-zinc-100"
			title="{showChat ? 'Hide' : 'Show'} agents panel">
			Agents
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3 opacity-60 transition {showChat ? '' : 'rotate-180'}">
				<path d="m6 9 6 6 6-6" />
			</svg>
		</button>
		<div class="ml-2 flex items-center gap-1.5 text-[10px]">
			{#if saved}
				<span class="flex items-center gap-1 text-emerald-400"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Saved</span>
			{:else}
				<span class="flex items-center gap-1 text-amber-400"><span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>Unsaved</span>
			{/if}
		</div>
	</div>

	<!-- Toolbar rows -->
	{#if showToolbar}
	<div class="shrink-0 border-b border-white/5 bg-zinc-900/30">
		<!-- Row 1: Font + Style, distributed across full width -->
		<div class="flex items-center justify-between gap-2 border-b border-white/5 px-3 py-1.5">
			<!-- Undo / Redo / Format Painter -->
			<div class="flex items-center gap-0.5">
				<button onclick={() => exec('undo')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Undo (Ctrl+Z)">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z" clip-rule="evenodd" /></svg>
				</button>
				<button onclick={() => exec('redo')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Redo (Ctrl+Y)">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M12.207 2.232a.75.75 0 0 0 .025 1.06L16.378 7.25H6.375a5.375 5.375 0 0 0 0 10.75h3.375a.75.75 0 0 0 0-1.5H6.375a3.875 3.875 0 0 1 0-7.75h10.003l-4.146 3.957a.75.75 0 0 0 1.036 1.085l5.5-5.25a.75.75 0 0 0 0-1.085l-5.5-5.25a.75.75 0 0 0-1.06.025Z" clip-rule="evenodd" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Format painter">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M8 2a1 1 0 0 0-1 1v2H5a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h1.5l.5 1.5a2 2 0 0 0 1.86 1.27V18a1 1 0 0 0 1 1h2.28a1 1 0 0 0 1-1v-4.23a2 2 0 0 0 1.86-1.27l.5-1.5H15a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2h-2V3a1 1 0 0 0-1-1H8Zm-.5 9.5-.4 1.2a.5.5 0 0 0 .47.67h4.86a.5.5 0 0 0 .47-.67L12.5 11.5h-5Z" /></svg>
				</button>
			</div>

			<!-- Font controls -->
			<div class="flex items-center gap-0.5">
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Font">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 16h2.5l.7-2.2h4.6L11.5 16H14L9.7 4H7.3L3 16Zm6.8-4.2H6.2L8 6.7l1.8 5.1Z M15 6a1 1 0 0 0-.7 1.7l1 1A2.5 2.5 0 1 1 12 12a1 1 0 1 0-1.5 1.3 4.5 4.5 0 1 0 6-6.7l-1-1A1 1 0 0 0 15 6Z" /></svg>
				</button>
				<select onchange={changeFont} onpointerdown={onSelectPointerDown} value={fontFamily} class="w-[110px] rounded border border-white/10 bg-zinc-800/50 px-1.5 py-0.5 text-[12px] text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
					<option>Georgia</option><option>Times New Roman</option><option>Arial</option><option>Calibri</option><option>Helvetica</option>
				</select>
				<select onchange={changeSize} onpointerdown={onSelectPointerDown} value={fontSize} class="w-[44px] rounded border border-white/10 bg-zinc-800/50 px-1.5 py-0.5 text-[12px] text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
					{#each ['10','11','12','13','14','16','18','20','24','28','32','36','48','72'] as s}<option>{s}</option>{/each}
				</select>
				<button onclick={() => { restoreSelection(); editorRef.focus(); document.execCommand('fontSize', false, '1'); }} class="rounded p-1 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Shrink font">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5"><path d="M7 4a1 1 0 0 0-1 1v6.5a1 1 0 0 0 2 0V8.12l1.44 1.44a1 1 0 0 0 1.4-1.4l-3-3a1 1 0 0 0-.7-.3 1 1 0 0 0-.14.14Z M14 6.5a1 1 0 0 0-1 1V10a2 2 0 1 1-4 0V7.5a1 1 0 0 0-2 0V10a4 4 0 0 0 8 0V7.5a1 1 0 0 0-1-1Z" /></svg>
				</button>
				<button onclick={() => { restoreSelection(); editorRef.focus(); document.execCommand('fontSize', false, '6'); }} class="rounded p-1 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Grow font">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5"><path d="M13 4a1 1 0 0 0-1 1v6.5a1 1 0 0 0 2 0V8.12l1.44 1.44a1 1 0 0 0 1.4-1.4l-3-3a1 1 0 0 0-.7-.3 1 1 0 0 0-.14.14Z M6 6.5a1 1 0 0 0-1 1V10a2 2 0 1 1-4 0V7.5a1 1 0 0 0-2 0V10a4 4 0 0 0 8 0V7.5a1 1 0 0 0-1-1Z" /></svg>
				</button>
				<button onclick={() => exec('removeFormat')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Clear formatting">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M16.7 5.3a1 1 0 0 0-1.4-1.4l-1 1L7.6 12.1 6 9.7 4.7 10.4l2 3 1.3-.7 6.7-7.4 1-1Z" /><path d="M3 16h14v-1H3v1Z" /></svg>
				</button>
				<div class="mx-1 h-5 w-px bg-white/10"></div>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Change case">
					<span class="text-[11px] font-semibold">Aa</span>
				</button>
			</div>

			<!-- Inline style -->
			<div class="flex items-center gap-0.5">
				<button onclick={() => exec('bold')} class="rounded p-1.5 text-sm font-bold transition {activeClass(boldActive)}" title="Bold">B</button>
				<button onclick={() => exec('italic')} class="rounded p-1.5 text-sm italic transition {activeClass(italicActive)}" title="Italic">I</button>
				<button onclick={() => exec('underline')} class="rounded p-1.5 text-sm underline transition {activeClass(underlineActive)}" title="Underline">U</button>
				<button onclick={() => exec('strikeThrough')} class="rounded p-1.5 text-sm line-through transition {activeClass(strikeActive)}" title="Strikethrough">S</button>
				<button onclick={() => exec('subscript')} class="rounded p-1 text-sm transition {activeClass(subscriptActive)}" title="Subscript"><span style="font-size:11px;">X</span><span class="align-sub text-[9px]">2</span></button>
				<button onclick={() => exec('superscript')} class="rounded p-1 text-sm transition {activeClass(superscriptActive)}" title="Superscript"><span style="font-size:11px;">X</span><span class="align-super text-[9px]">2</span></button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Monospace">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 5h14v2H3V5Zm0 4h14v2H3V9Zm0 4h10v2H3v-2Z M14 13l3 1.5-3 1.5v-3Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="X² equation">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4"><path d="M4 5l3 10 3-10M5 9h4" stroke-linecap="round" stroke-linejoin="round" /><path d="M13 4v12M11 6h4M11 14h4" stroke-linecap="round" /></svg>
				</button>
			</div>

			<!-- Color & Highlight -->
			<div class="flex items-center gap-0.5">
				<label class="relative cursor-pointer rounded p-1.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Text color">
					<span style="border-bottom:2px solid {textColor}">A</span>
					<input type="color" value={textColor} onchange={changeColor} class="absolute inset-0 cursor-pointer opacity-0" />
				</label>
				<label class="relative cursor-pointer rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Highlight color">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M4 3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Zm-1 9a1 1 0 0 0 1 1h1v-1H4Zm3 0v-1h2v1H6Zm4 0v-1h2v1h-2Zm4 0v-1h1a1 1 0 0 1 1 1h-2Zm-12 2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1H3v1Z" /></svg>
					<span class="absolute bottom-1 left-1/2 h-1 w-3 -translate-x-1/2 rounded-sm" style="background:{highlightColor}"></span>
					<input type="color" value={highlightColor} onchange={changeHighlight} class="absolute inset-0 cursor-pointer opacity-0" />
				</label>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Background color">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 4h14v3H3V4Zm0 5h14v7H3V9Zm2 1v1h2v-1H5Zm0 3v1h2v-1H5Zm4-3v1h3v-1H9Zm0 3v1h3v-1H9Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Font color picker">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5"><path d="M10 2 5 11h2.2l.8-2.2h4l.8 2.2H15L10 2Zm-1.2 5L10 5l1.2 2H8.8Z M3 14h14v2H3v-2Z" /></svg>
				</button>
			</div>

			<!-- Headings & Styles -->
			<div class="flex items-center gap-0.5">
				<button onclick={() => handleHeading('h1')} class="rounded px-2 py-1 text-xs transition {activeClass(headingActive === 'h1')}">H1</button>
				<button onclick={() => handleHeading('h2')} class="rounded px-2 py-1 text-xs transition {activeClass(headingActive === 'h2')}">H2</button>
				<button onclick={() => handleHeading('h3')} class="rounded px-2 py-1 text-xs transition {activeClass(headingActive === 'h3')}">H3</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Paragraph">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M7 3a3 3 0 1 0 0 6h1v8h2V9h1V3H7Zm-1 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm10-4v14h-2V3h2Z" /></svg>
				</button>
				<button class="flex items-center gap-1 rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Styles">
					<span class="text-[10px] font-semibold">A</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-2.5 w-2.5 opacity-50"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
				</button>
			</div>

			<!-- Insert (decorative) -->
			<div class="flex items-center gap-0.5">
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Insert image">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.31l-2.72-2.72a.75.75 0 0 0-1.06 0L11.5 13.19l-2.97-2.97a.75.75 0 0 0-1.06 0l-2 2V11.06Zm6.5-4.56a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" clip-rule="evenodd" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Insert link">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 1 0 .918-1.187 2.5 2.5 0 0 1-.14-3.665l3.057-3.057Zm-4.464 11.536a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865.75.75 0 0 0-.918 1.187 2.5 2.5 0 0 1 .14 3.665l-3.057 3.057Z" clip-rule="evenodd" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Insert table">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M.99 5.25A2.25 2.25 0 0 1 3.24 3h13.51A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.24A2.25 2.25 0 0 1 .99 14.75v-9.5Zm5.51 5.25H1.5v4.25c0 .414.336.75.75.75h4.25v-5Zm0-1.5V4.5H2.25a.75.75 0 0 0-.75.75v4.25h5Zm1.5 0v5h4.5v-5H8Zm6 0v5h4.25a.75.75 0 0 0 .75-.75V10.5h-5Zm0-1.5h5V5.25a.75.75 0 0 0-.75-.75H14v4.5Z" clip-rule="evenodd" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Insert comment">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" clip-rule="evenodd" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Bookmark">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v11A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 15.5 2h-11Zm3.97 4.22a.75.75 0 0 1 1.06 0L11 7.69l1.47-1.47a.75.75 0 1 1 1.06 1.06L12.06 8.75l1.47 1.47a.75.75 0 1 1-1.06 1.06L11 9.81l-1.47 1.47a.75.75 0 0 1-1.06-1.06l1.47-1.47-1.47-1.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Special character">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M10 2a1 1 0 0 1 1 1v1.5a4.5 4.5 0 0 1 4 4.5h1.5a.5.5 0 0 1 0 1H15a4.5 4.5 0 0 1-4 4.5V16a1 1 0 0 1-2 0v-1.5a4.5 4.5 0 0 1-4-4.5H3.5a.5.5 0 0 1 0-1H5a4.5 4.5 0 0 1 4-4.5V3a1 1 0 0 1 1-1Zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg>
				</button>
			</div>
		</div>

		<!-- Row 2: Paragraph + Editing, distributed across full width -->
		<div class="flex items-center justify-between gap-2 px-3 py-1.5">
			<!-- Lists -->
			<div class="flex items-center gap-0.5">
				<button onclick={() => exec('insertUnorderedList')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Bullet list">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 4.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>
				</button>
				<button onclick={() => exec('insertOrderedList')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Numbered list">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M3 4.25A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 4.25ZM5 4.25A.75.75 0 0 1 5.75 4h10.5a.75.75 0 0 1 0 1.5H5.75A.75.75 0 0 1 5 4.25ZM3 10a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 10Zm2 0a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H5.75A.75.75 0 0 1 5 10Zm-2 5.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm2 0a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /><path d="M2.5 12.83V13h1.17l-1.05.88a.5.5 0 0 0-.12.16.5.5 0 0 0-.1.3V15h2.1v-.7h-.93l1.08-.92a.5.5 0 0 0 .12-.16.5.5 0 0 0 .1-.3v-.09a.5.5 0 0 0-.5-.5H2.5ZM3.5 7V4.5h-.5V4h1v3h-.5Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Multilevel list">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 3h2v2H3V3Zm0 4h2v2H3V7Zm0 4h2v2H3v-2Zm0 4h2v2H3v-2Z M7 4h10v1.5H7V4Zm0 5h10v1.5H7V9Zm0 5h10v1.5H7V14Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Checklist">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 14.5v-9Zm12 0a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9Z" clip-rule="evenodd" /><path d="m7.7 11.3-2-2 1-1 1 1 3-3 1 1-4 4Z" /></svg>
				</button>
			</div>

			<!-- Indent + Alignment -->
			<div class="flex items-center gap-0.5">
				<button onclick={() => exec('outdent')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Decrease indent">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm10 4.5a.75.75 0 0 0-1.5 0v4.69l-1.94-1.94a.75.75 0 0 0-1.06 1.06l3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L12 14.19V9.25Z" clip-rule="evenodd" /></svg>
				</button>
				<button onclick={() => exec('indent')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Increase indent">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm10.5 9.44-1.94-1.94a.75.75 0 1 0-1.06 1.06l3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L13 14.19V9.25a.75.75 0 0 0-1.5 0v4.94Z" clip-rule="evenodd" /></svg>
				</button>
				<div class="mx-1 h-5 w-px bg-white/10"></div>
				<button onclick={() => align('left')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Align left">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 4.5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>
				</button>
				<button onclick={() => align('center')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Align center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm2.75 4.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm-2 4.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H3.5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>
				</button>
				<button onclick={() => align('right')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Align right">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M2 4.75a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm5.5 4.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm-5.5 4.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>
				</button>
				<button onclick={() => align('justify')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Justify">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 4.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>
				</button>
			</div>

			<!-- Spacing + Borders -->
			<div class="flex items-center gap-0.5">
				<button onclick={() => { restoreSelection(); editorRef.focus(); document.execCommand('insertHTML', false, '<div style="line-height:2.5;">&nbsp;</div>'); }} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Line spacing">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 4h10v1.5H3V4Zm0 4h10v1.5H3V8Zm0 4h10v1.5H3V12Zm0 4h10v1.5H3V16Zm14.5-9 3 3-3 3v-2h-2v-2h2V7Z" /></svg>
				</button>
				<button onclick={() => exec('insertHorizontalRule')} class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Horizontal line">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Borders">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M3 3h14v14H3V3Zm1.5 1.5v11h11v-11h-11Z" clip-rule="evenodd" /><path d="M11 4.5h4.5V9H11V4.5Zm0 6.5h4.5V15.5H11V11Zm-6.5 0H9v4.5H4.5V11Zm0-6.5H9V9H4.5V4.5Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Shading">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 3h14v14H3V3Zm2 2v10h10V5H5Zm1 1 3 3-3 3-3-3 3-3Zm6 1 2 2-2 2-2-2 2-2Zm-3 4 2 2-2 2-2-2 2-2Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Sort">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M5 3v12.5l-2-2L2 14.5 5.5 18l3.5-3.5L8 13.5l-2 2V3H5Zm10 14V4.5l2 2L18 5.5 14.5 2 11 5.5l1 1 2-2V17h1Z" /></svg>
				</button>
			</div>

			<!-- Editing -->
			<div class="flex items-center gap-0.5">
				<button class="flex items-center gap-1 rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Find (Ctrl+F)">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 3.546 9.71l3.122 3.122a.75.75 0 1 0 1.06-1.06l-3.122-3.122A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clip-rule="evenodd" /></svg>
					<span class="text-[11px]">Find</span>
				</button>
				<button class="flex items-center gap-1 rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Replace (Ctrl+H)">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h-1.5V6A1.5 1.5 0 0 0 8 4.5H6A1.5 1.5 0 0 0 4.5 6v1H3V6Zm10 8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-1h1.5v1A1.5 1.5 0 0 0 8 15.5h2A1.5 1.5 0 0 0 11.5 14v-1H13v1Z" /><path d="M7.4 5.6 4.7 8.3l2.7 2.7 1-1L7.2 9.5h8.3v-1.5H7.2l1.2-1.4-1-1Z" /><path d="M12.6 14.4 15.3 11.7l-2.7-2.7-1 1 1.2 1.1H4.5v1.5h8.3l-1.2 1.4 1 1Z" /></svg>
					<span class="text-[11px]">Replace</span>
				</button>
				<button class="flex items-center gap-1 rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Select">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M4 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2H6V4h1V3H4Zm12 0v1h-1v10h-1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-2Z" /></svg>
					<span class="text-[11px]">Select</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-2.5 w-2.5 opacity-50"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
				</button>
			</div>

			<!-- Tools (decorative) -->
			<div class="flex items-center gap-0.5">
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Spell check">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="m13.7 2.3 4 4a1 1 0 0 1 0 1.4l-9 9a1 1 0 0 1-.6.3l-3.5.5a1 1 0 0 1-1.1-1.1l.5-3.5a1 1 0 0 1 .3-.6l9-9a1 1 0 0 1 1.4 0Zm-2 1.4L4.5 13.9l-.3 2.4 2.4-.3 7.2-7.2-2.1-2.1Z" /><path d="M16 13a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 2 0v2h10v-2a1 1 0 0 1 1-1Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Word count">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 4h2v2H3V4Zm0 4h2v2H3V8Zm0 4h2v2H3v-2Zm0 4h2v2H3v-2Z M7 4h10v2H7V4Zm0 4h10v2H7V8Zm0 4h10v2H7v-2Zm0 4h10v2H7v-2Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Citations">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M5 4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v3a2 2 0 1 0 4 0V6a2 2 0 0 0-2-2H5Zm7 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v3a2 2 0 1 0 4 0V6a2 2 0 0 0-2-2h-3Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Translate">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M7 2a1 1 0 0 1 1 1v1h2.5a.5.5 0 0 1 0 1H9.4l-.4 1.4A6 6 0 0 1 7.4 9.5a4 4 0 0 0 2.3 1.7 1 1 0 0 1-.7 1.9 6 6 0 0 1-3.2-2.4A6 6 0 0 1 3 13.5a1 1 0 1 1-1.4-.9 4 4 0 0 0 2-1.6 4 4 0 0 0 .6-2.5H3a1 1 0 1 1 0-2h1.5c.1-.5.3-1 .6-1.5H4a1 1 0 0 1 0-2h3V3a1 1 0 0 1 1-1H7Zm6.5 8a3 3 0 0 1 3 3v3a3 3 0 1 1-6 0v-3a3 3 0 0 1 3-3Zm0 1.5a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0-1.5-1.5Z" clip-rule="evenodd" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Track changes">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 3h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1.5 8.5 2-2 1.5 1.5L13 5l1.5 1.5L8 13 4.5 9.5 4.5 11.5Z" /></svg>
				</button>
				<button class="rounded p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-100" title="Define">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M3 4h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-5l-2 2-2-2H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v1h7V6H4Zm0 3v1h5V9H4Z" /><path d="M11 14h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" /></svg>
				</button>
			</div>
		</div>
	</div>

	{/if}

	<!-- Main content: Document + Chat -->
	<div class="relative flex flex-1 overflow-hidden">
		<!-- Document column: nests ruler + vertical ruler + doc together -->
		<div class="flex flex-1 flex-col overflow-hidden">
			<!-- Horizontal margin ruler (inside doc column, shrinks with it) -->
			<div class="shrink-0 select-none border-b border-white/5 bg-zinc-900/40">
				<div class="flex h-3 items-end border-t border-white/5">
					<div class="shrink-0" style="width:16px;"></div>
					<div class="relative flex-1">
						<div class="mx-auto flex h-3 max-w-3xl items-end border-x border-white/5">
							{#each Array(64) as _, i}
								<div class="flex flex-1 items-end justify-center">
									<div class="w-px {i % 5 === 0 ? 'h-2 bg-zinc-500' : i % 5 === 2 ? 'h-1.5 bg-zinc-600' : 'h-1 bg-zinc-600/60'}"></div>
								</div>
							{/each}
						</div>
					</div>
					<div class="shrink-0" style="width:16px;"></div>
				</div>
			</div>

			<!-- Vertical ruler + Document row -->
			<div class="flex flex-1 overflow-hidden">
				<!-- Vertical margin ruler (left edge) -->
				<div class="shrink-0 select-none border-r border-white/5 bg-zinc-900/40" style="width:16px;">
					{#each Array(120) as _, i}
						<div class="flex h-3 items-start justify-end pr-px">
							<div class="{i % 5 === 0 ? 'w-2 bg-zinc-500' : i % 5 === 2 ? 'w-1.5 bg-zinc-600' : 'w-1 bg-zinc-600/60'} h-px"></div>
						</div>
					{/each}
				</div>

				<!-- Document area -->
				<div class="wp-scroll flex-1 overflow-y-auto bg-zinc-950 p-4 md:p-8">
			<div class="mx-auto max-w-3xl">
				<div bind:this={editorRef} contenteditable role="textbox" aria-multiline="true" tabindex="0"
					class="min-h-[600px] rounded-sm border border-white/10 bg-zinc-900 px-6 py-8 shadow-[0_2px_8px_rgba(0,0,0,0.4)] focus:outline-none md:px-12 md:py-10"
					style="font-family:'Georgia','Times New Roman',serif;line-height:1.8;color:#e4e4e7;font-size:14px;text-align:left;"
					onkeydown={handleKeydown}>
					<h1 style="font-size:22px;font-weight:700;margin-bottom:20px;text-align:left;color:#fafafa;">Form 3CD - Statement of Particulars</h1>

					<p style="margin-bottom:14px;">Statement of particulars required to be furnished under section 44AB of the Income-tax Act, 1961 in the case of a person carrying on business or profession.</p>

					<h2 style="font-size:17px;font-weight:700;margin-top:24px;margin-bottom:10px;color:#fafafa;">Part A</h2>

					<p style="margin-bottom:14px;">1. Name of the assessee: Acme Corp Ltd.<br>
					2. Address: 123 Business Park, Mumbai, MH 400001<br>
					3. Permanent Account Number (PAN): AACCA1234D</p>

					<p style="margin-bottom:14px;">4. Whether the assessee is liable to pay indirect tax like excise duty, service tax, sales tax, goods and services tax, customs duty, etc.: Yes, GSTIN is 27AACCA1234D1Z2.</p>

					<h2 style="font-size:17px;font-weight:700;margin-top:24px;margin-bottom:10px;color:#fafafa;">Clause 21(a) - Section 36(1)(va)</h2>

					<div style="margin-bottom:6px;padding:4px 8px;border-radius:4px;background:rgba(244,63,94,0.1);color:#a1a1aa;text-decoration:line-through;font-size:13px;">All employee contributions to PF and ESI were deposited on or before the due date as per the respective acts.</div>

					<div style="margin-bottom:14px;padding:4px 8px;border-radius:4px;background:rgba(52,211,153,0.1);"><span class="text-emerald-400" style="margin-right:4px;">+</span>The assessee has deposited employee contributions to PF/ESI late for the month of October 2024. Therefore, ₹45,200 is disallowed under section 36(1)(va).</div>

					<ul style="margin-bottom:14px;padding-left:24px;list-style-type:disc;">
						<li style="margin-bottom:4px;">Due Date: 15th November 2024</li>
						<li style="margin-bottom:4px;">Actual Date of Payment: 18th November 2024</li>
						<li style="margin-bottom:4px;">Amount: ₹45,200</li>
					</ul>

					<h2 style="font-size:17px;font-weight:700;margin-top:24px;margin-bottom:10px;color:#fafafa;">Clause 44 - Break-up of total expenditure</h2>

					<p style="margin-bottom:14px;">Total expenditure incurred during the year: ₹1,45,20,000. Expenditure in respect of entities registered under GST: ₹1,20,00,000. Expenditure relating to entities not registered under GST: ₹25,20,000.</p>

					<h2 style="font-size:17px;font-weight:700;margin-top:24px;margin-bottom:10px;color:#fafafa;">Annexures</h2>

					<div style="margin-bottom:6px;padding:4px 8px;border-radius:4px;background:rgba(52,211,153,0.1);"><span class="text-emerald-400" style="margin-right:4px;">+</span>Annexure A: PF/ESI Challans and Payment Dates<br>Annexure B: Clause 44 GST Reconciliation statement.</div>

					<div style="margin-bottom:14px;padding:4px 8px;border-radius:4px;background:rgba(244,63,94,0.1);color:#a1a1aa;text-decoration:line-through;font-size:13px;">No further annexures attached.</div>

					<p style="margin-top:32px;margin-bottom:4px;">Signed,</p>
					<p style="margin-bottom:4px;"><strong>CA Rahul Sharma</strong></p>
					<p style="margin-bottom:4px;">Sharma &amp; Associates, Chartered Accountants</p>
					<p style="margin-bottom:4px;">FRN: 123456W</p>
				</div>
			</div>
		</div>
	</div>
	</div>

		<!-- Chat panel -->
		<div class="hidden w-80 shrink-0 flex-col border-l border-white/10 bg-zinc-900/50 {showChat ? 'md:flex' : ''}">
			<div class="flex shrink-0 items-center justify-between border-b border-white/10 bg-zinc-900/60 px-4 py-2.5">
				<div class="flex items-center gap-2">
					<div class="text-sm font-medium text-zinc-100">Conductor</div>
					<span class="text-[10px] text-emerald-400">● Online</span>
				</div>
				<button class="rounded p-1 text-zinc-500 transition hover:bg-white/5 hover:text-zinc-200" aria-label="More options">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" /></svg>
				</button>
			</div>
			<div bind:this={chatScroller} class="wp-scroll flex-1 space-y-4 overflow-y-auto p-4">
				{#each messages as m (m.id)}
					{#if m.from === 'user' && m.kind === 'text'}
						<div class="flex flex-row-reverse gap-2">
							<div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-700 text-[10px] font-bold text-zinc-200">S</div>
							<div class="min-w-0 max-w-[85%] flex-1 text-right">
								<div class="inline-block rounded-lg bg-zinc-800/80 px-3 py-2 text-left text-[12px] leading-relaxed text-zinc-100">{m.text}</div>
							</div>
						</div>
					{:else if m.kind === 'thought'}
						<div class="rounded-md border border-white/5 bg-zinc-900/40 p-2.5">
							<div class="mb-1.5 flex items-center gap-1.5 text-[11px] text-zinc-400">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3"><path fill-rule="evenodd" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 4.75a.75.75 0 0 0-1.5 0v3.5l-2.22 2.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 .22-.53V6.75Z" clip-rule="evenodd" /></svg>
								<span class="font-medium">Thought {m.duration}</span>
							</div>
							<div class="space-y-0.5 font-mono text-[11px] leading-relaxed text-zinc-500">
								{#each m.items as item, i}
									<div class="truncate">· {item}</div>
								{/each}
							</div>
						</div>
					{:else if m.kind === 'action'}
						<div class="text-[12px] leading-relaxed text-zinc-200">{m.text}</div>
					{:else if m.kind === 'file-change'}
						<div>
							<div class="mb-2 text-[12px] leading-relaxed text-zinc-200">{m.text}</div>
							<div class="overflow-hidden rounded-md border border-white/10 bg-zinc-900/60">
								<div class="flex items-center justify-between gap-2 px-2.5 py-1.5">
									<div class="flex min-w-0 items-center gap-1.5">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5 shrink-0 text-zinc-400"><path d="M3.75 3A1.75 1.75 0 0 0 2 4.75v10.5A1.75 1.75 0 0 0 3.75 17h12.5A1.75 1.75 0 0 0 18 15.25V8.621c0-.464-.184-.909-.513-1.237l-3.871-3.872A1.75 1.75 0 0 0 12.378 3H3.75Z" /></svg>
										<span class="truncate font-mono text-[12px] text-zinc-200">{m.change.filename}</span>
									</div>
									<div class="flex shrink-0 items-center gap-1.5 font-mono text-[11px]">
										<span class="text-zinc-500">{m.change.diffLabel}</span>
										<span class="text-emerald-400">+{m.change.added}</span>
										<span class="text-rose-400">-{m.change.removed}</span>
									</div>
								</div>
							</div>
						</div>
					{/if}
				{/each}
				{#if isTyping}
					<div class="flex gap-1.5 px-1">
						<span class="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" style="animation-delay:0ms"></span>
						<span class="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" style="animation-delay:150ms"></span>
						<span class="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" style="animation-delay:300ms"></span>
					</div>
				{/if}
			</div>
			<form onsubmit={(e) => { e.preventDefault(); sendMessage(); }} class="shrink-0 border-t border-white/10 bg-zinc-900/60 p-3">
				<div class="rounded-lg border border-white/10 bg-zinc-800/50 p-2 focus-within:border-blue-500/50">
					<input type="text" bind:value={newMessage} placeholder="Plan, search, build anything..." class="w-full bg-transparent px-1.5 py-1 text-[12px] text-zinc-200 placeholder-zinc-500 focus:outline-none" />
					<div class="mt-1.5 flex items-center justify-between">
						<div class="flex items-center gap-1.5">
							<button type="button" class="flex items-center gap-1 rounded border border-white/10 bg-zinc-900/50 px-1.5 py-0.5 text-[10px] text-zinc-300 transition hover:bg-zinc-700/60">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-2.5 w-2.5"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .2.08.39.22.53l3 3a.75.75 0 0 0 1.06-1.06L10.75 9.69V5Z" clip-rule="evenodd" /></svg>
								Agent
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-2.5 w-2.5 opacity-60"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
							</button>
							<button type="button" class="flex items-center gap-1 rounded border border-white/10 bg-zinc-900/50 px-1.5 py-0.5 text-[10px] text-zinc-300 transition hover:bg-zinc-700/60">
								Conductor V3
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-2.5 w-2.5 opacity-60"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
							</button>
						</div>
						<button type="submit" disabled={!newMessage.trim()} aria-label="Send message" class="rounded p-1 text-zinc-400 transition hover:bg-white/5 hover:text-zinc-200 disabled:opacity-40">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5"><path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.925A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.289Z" /></svg>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	:global(.wp-scroll::-webkit-scrollbar) {
		width: 5px;
		height: 5px;
	}
	:global(.wp-scroll::-webkit-scrollbar-track) {
		background: transparent;
	}
	:global(.wp-scroll::-webkit-scrollbar-thumb) {
		background: #3f3f46;
		border-radius: 4px;
		transition: background 0.2s;
	}
	:global(.wp-scroll::-webkit-scrollbar-thumb:hover) {
		background: #52525b;
	}
	:global(.wp-scroll) {
		scrollbar-width: thin;
		scrollbar-color: #3f3f46 transparent;
	}
</style>