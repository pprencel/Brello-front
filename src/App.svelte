<script>
  let name = 'Brello';
  import Test1 from './components/Test1.svelte';
  import Test2 from './components/Test2.svelte';
  import Table from './components/Table.svelte';
  import TablesView from './components/TablesView.svelte';
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
    }, {
      path: '/tables',
      component: TablesView
    }, {
      path: `/table`,
      component: Table,
      props: {
        id: null
      }
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

<div id="main" class="bg-blue-100">
  <div>
    <Link to="/table" props={{id: 3}}>Table</Link>
    <div class="bg-blue-500">
      <Link to="/tables">[Tables]</Link>
    </div>
    <div use:create></div>
  </div>

  <!-- <Table/> -->

  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
</div>
