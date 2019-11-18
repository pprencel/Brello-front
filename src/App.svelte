<script>
  let name = "Brello";
  import Table from "./components/Table.svelte";
  import TablesView from "./components/TablesView.svelte";
  import NavBar from "./containers/NavBar.svelte";
  import HomePage from "./containers/HomePage.svelte";
  import NotFound from "./containers/NotFound.svelte";
  import SignUp from "./containers/SignUp.svelte";
  import { Router, Link, Route } from "svelte-routing";
  export let url = "";
</script>

<div id="main">

  <Router {url}>
    <NavBar />
    <div>
      <Route path="tables" component={TablesView} />
      <Route path="table/:id" let:params>
        <Table tableId={params.id} />
      </Route>
      <Route path="/signup" component={SignUp}/>
      <Route path="/" component={HomePage}/>
      <Route path="*" let:params>
        <NotFound params={params}/>
      </Route>
    </div>
  </Router>
</div>
