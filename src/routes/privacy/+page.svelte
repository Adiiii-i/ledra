<script lang="ts">
	import Footer from '$lib/components/landing/Footer.svelte';
	import AnimatedShaderBackground from '$lib/components/ui/animated-shader-background.svelte';
</script>

<svelte:head>
	<title>Privacy Policy — Ledra</title>
</svelte:head>

<section class="relative isolate overflow-hidden bg-black pb-24 pt-32 min-h-screen flex flex-col">
	<div class="pointer-events-none absolute inset-0 z-0 h-[600px] overflow-hidden">
		<AnimatedShaderBackground />
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black"></div>
	</div>

	<div class="relative z-10 mx-auto w-full max-w-4xl px-6 flex-1">
		<div class="text-center mb-16">
			<h1 class="text-5xl font-medium tracking-tight text-white sm:text-6xl">Privacy Policy</h1>
			<p class="mt-4 text-base text-zinc-400">Last updated: June 5, 2026</p>
		</div>

		<article class="prose prose-invert prose-zinc prose-a:text-violet-400 hover:prose-a:text-violet-300 mx-auto max-w-none rounded-2xl border border-white/10 bg-zinc-900/50 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
			<h2>1. Introduction</h2>
			<p>
				Ledra ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
			</p>
			<p>
				By accessing or using Ledra, you agree to the collection and use of information in accordance with this policy.
			</p>

			<h2>2. Information We Collect</h2>
			<h3>Personal Data</h3>
			<p>
				We may collect personally identifiable information such as your name, email address, phone number, and billing information when you register, join our waitlist, or contact us.
			</p>
			<h3>Usage Data</h3>
			<p>
				We automatically collect information about how you interact with our service, including pages visited, time spent, and diagnostic data.
			</p>

			<h2>3. How We Use Your Information</h2>
			<ul>
				<li>To provide, maintain, and improve our services</li>
				<li>To process transactions and send related information</li>
				<li>To communicate with you about product updates, security alerts, and support</li>
				<li>To detect, prevent, and address technical issues and fraud</li>
				<li>To comply with legal obligations</li>
			</ul>

			<h2>4. Data Security</h2>
			<p>
				We implement industry-standard security measures including AES-256 encryption at rest and TLS 1.3 in transit. Access to personal data is restricted to authorized personnel only, and all access is logged and audited.
			</p>

			<h2>5. Data Retention</h2>
			<p>
				We retain your personal data only as long as necessary to fulfill the purposes described in this policy, or as required by law. When no longer needed, data is securely deleted or anonymized.
			</p>

			<h2>6. Your Rights</h2>
			<p>Depending on your jurisdiction, you may have the right to:</p>
			<ul>
				<li>Access the personal data we hold about you</li>
				<li>Request correction or deletion of your data</li>
				<li>Object to or restrict processing of your data</li>
				<li>Request data portability</li>
				<li>Withdraw consent at any time</li>
			</ul>

			<h2>7. Third-Party Services</h2>
			<p>
				We may use third-party services for analytics, payment processing, and infrastructure. These providers have access to your information only as needed to perform their functions and are contractually bound to protect it.
			</p>

			<h2>8. Cookies</h2>
			<p>
				We use essential cookies for authentication and security. Analytics cookies are used only with your consent. You can control cookie preferences through your browser settings.
			</p>

			<h2>9. Changes to This Policy</h2>
			<p>
				We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
			</p>

			<h2>10. Contact Us</h2>
			<p>
				If you have questions about this Privacy Policy, please contact us at <a href="mailto:privacy@ledra.ai">privacy@ledra.ai</a>.
			</p>
		</article>
	</div>
</section>

<Footer />
