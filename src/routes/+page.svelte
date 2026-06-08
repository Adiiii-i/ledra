<script lang="ts">
	import Hero from '$lib/components/landing/Hero.svelte';
	import FeaturesCard from '$lib/components/landing/FeaturesCard.svelte';
	import Benefits from '$lib/components/landing/Benefits.svelte';
	import Pricing from '$lib/components/landing/Pricing.svelte';
	import FinalCta from '$lib/components/landing/FinalCta.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Ledra — The agent-native accounting workspace</title>
</svelte:head>

<Hero user={data.user} />

<FeaturesCard />

<Benefits />
<Pricing />

<FinalCta user={data.user} />
<Footer />
