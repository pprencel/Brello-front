<script>
  let title = "fainy"
  import SvelteRouter, { Link } from 'svelte-router'
</script>

<h1>Brello is so {title}.</h1>
<Link to="/test1">Test1</Link>


<style>
  h1 {
    color: palevioletred;
  }
</style>
