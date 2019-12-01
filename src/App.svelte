<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';
  import Table from "./components/Table.svelte";
  import TablesView from "./components/TablesView.svelte";
  import NavBar from "./containers/NavBar.svelte";
  import HomePage from "./containers/HomePage.svelte";
  import NotFound from "./containers/NotFound.svelte";
  import SignUp from "./containers/SignUp.svelte";
  import SignIn from "./containers/SignIn.svelte";
  import Unauthorized from "./containers/Unauthorized.svelte";
  import Popup from "./components/common/Popup.svelte";
  import { Router, Link, Route } from "svelte-routing";
  export let url = "";
</script>

<div id="main" class="">
  <Router {url}>
    <Popup/>
    <NavBar />
      <Route path="/unauthorized" component={Unauthorized} />
      <Route path="tables" component={TablesView} />
      <Route path="table/:id" let:params>
        <Table tableId={params.id} />
      </Route>
      <Route path="/signup" component={SignUp}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/" component={HomePage}/>
      <Route path="*" let:params>
        <NotFound params={params}/>
      </Route>
  </Router>
</div>
