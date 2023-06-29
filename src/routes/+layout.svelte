<script>
    import "../app.css";
	import DuckLogo from "./DuckLogo.svelte";
	import NavItem from "./NavItem.svelte";
</script>


<div class="flex flex-row">
    <nav class="flex flex-col">
        <DuckLogo />
        <NavItem href="/leaderboards" label="Leader Boards" />
        <NavItem href="/libraries" label="Libraries" />
        <NavItem href="/bounties" label="Bounties" />
        <NavItem href="/shop" label="Shop" />
    </nav>
    <div>
        <slot />
    </div>
</div>

