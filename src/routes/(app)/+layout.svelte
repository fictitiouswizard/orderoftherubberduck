<script lang="ts">
	import '../../app.css';
	import DuckLogo from './DuckLogo.svelte';
	import NavItem from './NavItem.svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<div class="flex flex-row">
	<nav class="flex flex-col basis-52">
		<DuckLogo />
		<NavItem href="/leaderboards" label="Leader Boards" />
		<NavItem href="/libraries" label="Libraries" />
		<NavItem href="/bounties" label="Bounties" />
		<NavItem href="/shop" label="Shop" />
	</nav>
	<div class="flex flex-col h-screen w-screen bg-slate-400">
		<div class="flow-root">
			{#if data.loggedIn}
				<div class="float-right">
					<form action="/logout" method="post">
						<button>Logout</button>
					</form>
				</div>
			{:else}
				<div class="float-right">
					<a href="/signup">Register</a>
					<a href="/login">Login</a>
				</div>
			{/if}
		</div>
		<slot />
	</div>
</div>
