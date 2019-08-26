<script>
  import Router from '../Router.svelte';
  import Route from '../Route.svelte';
  import Link from '../Link.svelte';

  const articles = [
    {
      slug: 'hinges',
      title: 'Hinges',
      author: 'Shel Silverstein',
      body: 'If we had hinges on our heads<br>There wouldn’t be no sin,<br>’Cause we could take the bad stuff out<br>And leave the good stuff in.'
    },
    {
      slug: 'how-many-how-much',
      title: 'How Many, How Much',
      author: 'Shel Silverstein',
      body: 'How many slams in an old screen door?<br>Depends how loud you shut it.<br>How many slices in a bread?<br>Depends how thin you cut it.<br>How much good inside a day?<br>Depends how good you live ‘em.<br>How much love inside a friend?<br>Depends how much you give ‘em.'
    },
    {
      slug: 'too-many-kids-in-this-tub',
      title: 'Too Many Kids In This Tub',
      author: 'Shel Silverstein',
      body: 'There’s too many kids in this tub<br>There’s too many elbows to scrub<br>I just washed a behind that I’m sure wasn’t mine<br>There’s too many kids in this tub.'
    },
  ];

  const articlesBySlug = articles.reduce((all, article) => {
    all[article.slug] = article;
    return all;
  }, {});
</script>

<div class="blog">

  <p>This is a blog subcomponent on the page with its own router which can be mounted underneath any parent router.</p>

  <Router>
    <Route path="/">
      <h2>All Posts</h2>
      {#each articles as article}
        <div class="post-snippet">
          <h3><Link href="articles/{article.slug}">{article.title}</Link></h3>
          <div class="author">—{article.author}</div>
        </div>
      {/each}
    </Route>

    <Route path="/articles/:slug" let:params>
      <div><Link href="/">&lt; All Posts</Link></div>
      <h2 class="title">{articlesBySlug[params.slug].title}</h2>
      <div class="author">—{articlesBySlug[params.slug].author}</div>
      <div class="body">{@html articlesBySlug[params.slug].body}</div>
    </Route>

    <Route>
      <h2>Page Not Found</h2>
    </Route>
  </Router>

</div>

<style>
.blog {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  width: 600px;
  margin: 0 auto;
}
.blog :global(a) {
  text-decoration: none;
  color: #1166ee;
}
.blog :global(a:hover) {
  text-decoration: underline;
}
h2, h3 {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
h2 {
  font-size: 40px;
}
h3 {
  margin: 0;
  font-size: 30px;
}
.title {
  margin: 16px 0 0;
}
.author {
  font-style: italic;
  text-align: right;
  color: #999;
}
.body {
  margin-top: 16px;
  line-height: 2;
}
.post-snippet {
  padding: 16px;
  background: #f6f6f6;
  margin-bottom: 10px;
}
</style>
