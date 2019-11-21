<script>
  import { getContext, setContext, onDestroy } from 'svelte';
  import navaid from 'navaid';
  import writableSet from './writable-set';
  import { writable } from 'svelte/store';

  export let base = '/';
  export let middleware = null;
  export let hash = null;
  export let library = null;
  export function navigate(uri, replace) {
    if (router) {
      router.route(uri, replace);
    } else {
      pendingNavigate = { uri, replace };
    }
  }

  const baseStore = writable(base);
  const libraryStore = writable(library);
  const routes = writableSet();
  const active = writable();
  const params = writable({});
  let pendingNavigate = null;
  let router;

  const context = getContext('navaid');
  const contextActive = context && context.active || writable({ path: '' });
  const contextLibrary = context && context.library || writable(null);

  setContext('navaid', { routes, active, params, base: baseStore, library: libraryStore });
  setContext('navigate', navigate);

  $: {
    const path = $contextActive.path;
    if (path && path.slice(-1) === '*') {
      base = path.slice(0, -1);
      baseStore.set(base);
    }
  }
  $: baseStore.set(base);
  $: libraryStore.set(library != null ? library : $contextLibrary);
  $: updateRoutes(base, $routes, $libraryStore || navaid);

  function updateRoutes(base, routes, navaid) {
    if (router) {
      router.unlisten();
      router = null;
    }

    if (!routes.size) return;

    let notFound;
    router = navaid(base, () => $active = notFound);

    routes.forEach(route => {
      if (!route.path) {
        notFound = route;
      } else {
        router.on(route.path, routeParams => {
          $active = route;
          $params = routeParams;
          if (typeof middleware === 'function') {
            middleware(route.path, routeParams);
          }
        });
        if (route.path.slice(-2) === '/*') {
          // Allow /url/* to match /url as well
          router.on(route.path.slice(0, -2), routeParams => {
            $params = routeParams;
            $active = route;
          });
        }
      }
    });

    router.listen();

    if (pendingNavigate) {
      router.route(pendingNavigate.uri, pendingNavigate.replace);
      pendingNavigate = null;
    }
  }

  onDestroy(() => {
    if (router) router.unlisten();
  });
</script>

<slot></slot>
