<script>
  import Router from '../Router.svelte';
  import Route from '../Route.svelte';
  import Link from '../Link.svelte';
  import Blog from './Blog.svelte';
  import navaidHash from '../navaid-hash';
  let useHash = false;
  let navigate;
</script>

<label><input type="checkbox" bind:checked={useHash}> Use Hash</label>

<Router library={useHash ? navaidHash : null} bind:navigate>
  <h1>Hello World!</h1>

  <Link href="/">Home</Link>
  |
  <Link href="foo/sub1">Foo</Link>
  |
  <button on:click={() => navigate('/bar?abc=def')}>Bar</button>
  |
  <Link href="/blog/">Blog</Link>

  <Route path="/">
    <h2>Home</h2>
  </Route>

  <Route path="/foo/*">
    <h2>Foo</h2>

    <Router>

      <Link href="sub1">Sub 1</Link>
      |
      <Link href="/sub2">Sub 2</Link>

      <Route path="/sub1">
        <h3>Sub Foo 1</h3>
      </Route>

      <Route path="/sub2/*">
        <h3>Sub Foo 2</h3>

        <Route path="/">
          <h3>Sub Foo 2 index</h3>
        </Route>

        <Router>
          <p>
            <Link href="bar1">Sub Foo Bar 1</Link>
            |
            <Link href="/bar2">Sub Foo Bar 2</Link>
            |
            <Link href="/not-found">404</Link>
          </p>

          <Route path="/">
            <div>Sub Foo Bar index</div>
          </Route>

          <Route path="bar1">
            <div>Sub Foo Bar 1</div>
          </Route>

          <Route path="/bar2">
            <div>Sub Foo Bar 2</div>
          </Route>

          <Route>Not found</Route>
        </Router>
      </Route>
    </Router>
  </Route>

  <Route path="/bar">
    <h2>Bar</h2>
  </Route>

  <Route path="/blog/*" component={Blog} />

  <Route>
    <h2>Page Not Found</h2>
  </Route>
</Router>