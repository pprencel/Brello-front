<script>
  let name = "Brello";
  import Test1 from "./components/Test1.svelte";
  import Test2 from "./components/Test2.svelte";
  import Table from "./components/Table.svelte";
  import TablesView from "./components/TablesView.svelte";
  // import SvelteRouter, { Link } from 'svelte-router'
  import { Router, Link, Route } from "svelte-routing";
  export let url = "";

  // function create (node) {
  // const router = new SvelteRouter({
  //   target: node,
  //   mode: 'hash',
  //   routes: [{
  //     path: '/test1',
  //     component: Test1,
  //   }, {
  //     path: '/test2',
  //     component: Test2
  //   }, {
  //     path: '/tables',
  //     component: TablesView
  //   }, {
  //     path: `/table`,
  //     component: Table,
  //     props: {
  //       id: null
  //     }
  //   }]
  // })
  //
  // return {
  //   destroy () {
  //     router.destroy()
  //   }
  // }
  // }
</script>

<div id="main" class="bg-blue-100">

  <Router {url}>
    <nav>
      <Link to={`table/1`}>Table[1]</Link>
      <Link to={`table/2`}>Table[2]</Link>
      <Link to="tables">[Tables]</Link>
    </nav>
    <div>
      <Route path="tables" component={TablesView} />
      <Route path="table/:id" let:params>
        <Table tableId="{params.id}"/>
      </Route>
      <Route path="/" />
    </div>
  </Router>

  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
</div>
