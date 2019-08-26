<script>
  import { getContext } from 'svelte';
  import { writable } from 'svelte/store';

  const navaid = getContext('navaid');
  const base = navaid && navaid.base || writable('/');
  const library = navaid && navaid.library || writable(null);
  let props;
  let href;

  $: {
    props = { ...$$props };
    href = props.href;
    delete props.href;
    href = ($library && $library.prefix ? $library.prefix : '') + $base + href.replace(/^\//, '');
  }
</script>

<a href={href} {...props} on:click><slot></slot></a>
