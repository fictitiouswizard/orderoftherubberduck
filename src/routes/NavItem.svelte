<script lang="ts">
    export let href: string;
    export let label: string;
</script>


<a class="block py-8 px-8 border-r-2 border-slate-200 
    shadow-inner" 
    href={href}>
    {label}
</a>
