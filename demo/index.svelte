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

  <Link href="/">Home</Link> | <Link href="foo/sub1">Foo</Link> | <button on:click={() => navigate('/bar?abc=def')}>Bar</button> | <Link href="/blog/">Blog</Link>

  <Route path="/">
    <h2>Home</h2>
  </Route>

  <Route path="/foo/*">
    <h2>Foo</h2>

    <Router>

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
    <h2>Bar</h2>
  </Route>

  <Route path="/blog/*" component={Blog}/>

  <Route>
    <h2>Page Not Found</h2>
  </Route>
</Router>
