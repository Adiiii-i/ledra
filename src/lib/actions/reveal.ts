export function reveal(node: HTMLElement, { delay = 0, duration = 800, y = 30 } = {}) {
	// Only run in browser
	if (typeof window === 'undefined') return {};

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	
	if (prefersReducedMotion) {
		return {};
	}

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;
	node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				requestAnimationFrame(() => {
					node.style.opacity = '1';
					node.style.transform = 'translateY(0)';
				});
				observer.disconnect();
			}
		},
		{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
