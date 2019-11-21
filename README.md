# svelte-navaid

Navaid-based routing components for Svelte. Does not work with Sapper. Yet. I don’t think. Contributions welcome.

## Getting Started

```bash
npm i --save svelte-navaid
```

```svelte
<script>
  import Router from 'svelte-navaid/Router.svelte';
  import Route from 'svelte-navaid/Route.svelte';
  import Link from 'svelte-navaid/Link.svelte';
  import SomeComponent from './SomeComponent.svelte';
</script>

<Router>
  <h1>Hello World!</h1>

  <Link href="/">Home</Link> | <Link href="foo/sub1">Foo</Link> | <Link href="/bar?abc=def">Bar</Link>

  <Route path="/">
    <h2>Home</h2>
  </Route>

  <!-- Supports navaid wildcards -->
  <Route path="/foo/*">
    <h2>Foo</h2>

    <!-- Supports subroutes with relative URLs (prefixed with /foo/ here) -->
    <Router>

      <!-- Links are relative to the subroute they appear in -->
      <Link href="sub1">Sub 1</Link> | <Link href="/sub2">Sub 2</Link>

      <Route path="/sub1">
        <h3>Sub Foo 1</h3>
      </Route>

      <Route path="/sub2">
        <h3>Sub Foo 2</h3>
      </Route>

    </Router>
  </Route>

  <!-- Supports slots or component prop, the props from params will be passed to it -->
  <Route path="/bar" component={SomeComponent} myProperty={someValue}/>

  <!-- Supports passing params -->
  <Route path="/things/:id" let:params>
    The ID is: {params.id}
  </Route>

  <!-- Supports 404 pages -->
  <Route>
    <h2>Page Not Found</h2>
  </Route>
</Router>
```

Use hash-based routing for single-page apps that are hosted on a server which doesn't support it.

```svelte
<script>
  import Router from 'svelte-navaid/Router.svelte';
  import Route from 'svelte-navaid/Route.svelte';
  import Link from 'svelte-navaid/Link.svelte';
  import navaidHash from 'svelte-navaid/navaid-hash';
</script>

<Router library={navaidHash}>
  <h1>Hello World!</h1>

  <!-- links will be converted to their hash equivalent (e.g. #/foo/sub1) -->
  <Link href="/">Home</Link> | <Link href="foo/sub1">Foo</Link> | <Link href="/bar?abc=def">Bar</Link>

  <Route path="/">
    <h2>Home</h2>
  </Route>

  <Route path="/foo/*">
    <h2>Foo</h2>

    <!-- Supports subroutes with relative URLs (prefixed with /foo/ here) -->
    <Router>

      <!-- Links are relative to the subroute they appear in -->
      <Link href="sub1">Sub 1</Link> | <Link href="/sub2">Sub 2</Link>

      <Route path="/sub1">
        <h3>Sub Foo 1</h3>
      </Route>

      <Route path="/sub2">
        <h3>Sub Foo 2</h3>
      </Route>

    </Router>
  </Route>

  <Route path="/bar">
    <h2>bar</h2>
  </Route>
</Router>
```

Navigate to paths programmatically. The first 2 options are recommended because they will use the context of the router.
This allows using the path relative to the nearest router vs the whole application. Be sure to start the URL with `/` to
get the intended result.

```svelte
<script>
  import Router from 'svelte-navaid/Router.svelte';
  import Route from 'svelte-navaid/Route.svelte';

  let navigate;
</script>

<Router bind:navigate>
  <h1>Hello World!</h1>

  <Route path="/">
    <button on:click={() => navigate('/bar')}>Go To Bar</button>
  </Route>

  <Route path="/bar">
    <button on:click={() => navigate('/')}>Go Home</button>
  </Route>
</Router>
```


```svelte
<script>
  import { getContext } from 'svelte';

  const navigate = getContext('navigate');
</script>

<button on:click={() => navigate('/bar')}>Go To Bar</button>
```

When using the following method, you must use the full path, even if within nested routes (e.g. "/blog/articles/23"). It
does not know the base URL. If using the hash library this method will also require you use the hash (e.g. "#/blog/articles/23").
If you write your components using one of the previous two methods, they will be more portable and maintainable.

```svelte
<script>
  import { navigate } from 'svelte-navaid';
</script>

<button on:click={() => navigate('/bar')}>Go To Bar</button>
```

## Testing

```bash
npm run dev
```

This will start a server where you can view a simple demo app which shows off the router and its features.
