<script>
  import { getContext, setContext, onDestroy } from 'svelte';
  import navaid from 'navaid';
  import writableSet from './writable-set';
  import { readable, writable } from 'svelte/store';

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
  const contextBase = (context && context.base) || readable("/");
  const contextActive = (context && context.active) || readable({ path: "" });
  const contextLibrary = (context && context.library) || readable(null);

  setContext('navaid', { routes, active, params, base: baseStore, library: libraryStore });
  setContext('navigate', navigate);

  $: baseStore.set(base);
  $: libraryStore.set(library != null ? library : $contextLibrary);
  $: setNestedBase($contextActive ? $contextActive.path : '');
  $: updateRoutes(base, $routes, $libraryStore || navaid);

  function setNestedBase(activePath = "") {
    const pathIsWildcard = /\*$/.test(activePath);
    const routerUsesDefaultBase = base === "/";

    if (pathIsWildcard && routerUsesDefaultBase) {
      base = [
        $contextBase.replace(/\/$/, ""),
        activePath.replace(/^\//, "").replace(/\*$/, "")
      ].join("/");
      baseStore.set(base);
    }
  }

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

<slot />
