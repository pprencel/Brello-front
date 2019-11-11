<script>
  import { Router, Link, Route } from "svelte-routing";
  import logo from "../../public/images/logo.png"
  import logoo from "../assets/logo.png"
</script>

<h1>Brello is so</h1>
<nav>
  <Link to={`table/1`}>Table[1]</Link>
  <Link to={`table/2`}>Table[2]</Link>
  <Link to="tables">[Tables]</Link>
</nav>
<!-- <img scr={logo} alt="Brello logo"/> -->
<img scr={logoo} alt="Brello logo"/>


<style>
  h1 {
    color: palevioletred;
  }
</style>
