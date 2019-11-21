<script>
  import { getContext, onDestroy } from 'svelte';

  export let params;
  export let path = '';
  export let component = null;
  let props = {};

  const route = { path };
  const { routes, active, params: routeParams } = getContext('navaid');

  if (!routes) throw new Error('Route cannot work outside of a Router wrapper');
  routes.add(route);

  $: params = $routeParams;
  $: props = withoutLocal($$props);

  function withoutLocal({ params, path, component, ...rest }) {
    return rest;
  }

  onDestroy(() => routes.delete(route));
</script>

{#if $active === route}
  {#if component}
    <svelte:component this={component} {...params} {...props} />
  {:else}
    <slot {params}></slot>
  {/if}
{/if}
