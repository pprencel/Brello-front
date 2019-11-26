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
  import { Router, Link, Route } from "svelte-routing";
  export let url = "";
  let user;
  let x = false;
  // onMount(()=> {
  //   const unsubscribe = userStore.subscribe(async (value) => {
  //     console.log('mount', value);
  //     user = value
  //     // console.log(value);
  //   })
  //   console.log(user);
  //   // console.log(userStore.token);
  // })
  beforeUpdate(()=> {
    console.log('update');
  })

  const unauthorizedRedirect = () => {

    // console.log('iks');
  }

  // {console.log(document)}
  // {#if user && user.token}
  //   <div> good </div>
  // {:else}
  //   {unauthorizedRedirect()}
  //   <!-- <Link to="/unauthorized">...</Link> -->
  // {/if}
</script>

<div id="main">

  <Router {url}>

    <NavBar />
    <div>
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
    </div>
  </Router>
</div>
