<script>
  let name = 'Brello';
  import Test1 from './components/Test1.svelte';
  import Test2 from './components/Test2.svelte';
  import SvelteRouter, { Link } from 'svelte-router'

  function create (node) {
  const router = new SvelteRouter({
    target: node,
    mode: 'hash',
    routes: [{
      path: '/test1',
      component: Test1,
    }, {
      path: '/test2',
      component: Test2
    }]
  })

  return {
    destroy () {
      router.destroy()
    }
  }
  }
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<div id="main">
  <h1>Hello {name}!</h1>
  <div>
    <Link to="/test1">Test1</Link>
    <Link to="/test2">Test2</Link>
    <div use:create></div>
  </div>
</div>
