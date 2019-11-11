<script>
  let name = "Brello";
  import Test1 from "./components/Test1.svelte";
  import Test2 from "./components/Test2.svelte";
  import Table from "./components/Table.svelte";
  import TablesView from "./components/TablesView.svelte";
  import NavBar from "./containers/NavBar.svelte";
  import { Router, Link, Route } from "svelte-routing";
  export let url = "";
</script>

<div id="main" class="bg-blue-100">

  <Router {url}>
    <NavBar />
    <div>
      <Route path="tables" component={TablesView} />
      <Route path="table/:id" let:params>
        <Table tableId={params.id} />
      </Route>
      <Route path="/" />
    </div>
  </Router>
  <link
    href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
    rel="stylesheet" />
</div>
