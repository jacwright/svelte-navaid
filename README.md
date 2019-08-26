# svelte-navaid

Navaid-based routing components for Svelte. Does not work with Sapper, I don’t think. Contributions welcome.

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

  <!-- Supports slots or component prop, a prop "params" will be passed to it -->
  <Route path="/bar" component={Bar}/>

  <!-- Supports passing params -->
  <Route path="/things/:id" let:params>
    id: {params.id}
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

## Testing

```bash
npm run dev
```

This will start a server where you can view a simple demo app which shows off the router and its features.
