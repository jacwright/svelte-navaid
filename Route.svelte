<script>
  import { getContext, onDestroy } from 'svelte';

  export let path = '';
  export let component = null;

  let routeParams = {};
  const route = { path };
  const { routes, active, params } = getContext('navaid');
  routes.add(route);

  if (!routes) throw new Error('Route cannot work outside of a Router wrapper');

  onDestroy(() => routes.delete(route));
</script>

{#if $active === route}
  {#if component}
    <svelte:component this={component} {...$params} {...$$props} />
  {:else}
    <slot params={$params}></slot>
  {/if}
{/if}
