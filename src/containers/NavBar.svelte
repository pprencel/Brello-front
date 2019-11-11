<script>
  import { Router, Link, Route } from "svelte-routing";
  import logo from "../../public/images/logo.png"
  import home from "../../public/images/home.png"
  import notification from "../../public/images/notification.png"
  import add from "../../public/images/add.png"
  import information from "../../public/images/information.png"
</script>

<div class="flex flex-row justify-between items-center bg-indigo-700 text-white py-2">
  <div class="flex flex-row items-center">
    <div class="ml-4 text-xl">
      <Link to=""><img src={home}/></Link>
    </div>
    <div class="ml-4 text-xl">
      <Link to="tables">Tables</Link>
    </div>
    <div class="ml-4 text-xl text-red-600">
      <Link to={`table/1`}>Table[1]</Link>
    </div>
  </div>

  <Link to="">
    <img src={logo} style="height: 40px" alt="Brello logo"/>
  </Link>

  <div class="flex flex-row items-center">
    <button class="mx-1 p-1 bg-indigo-400 border-indigo-400 border rounded-lg">
      <img class="h-6" src={add}/>
    </button>
    <button class="mx-1 p-1 bg-indigo-400 border-indigo-400 border rounded-lg">
      <img class="h-6" src={information}/>
    </button>
    <button class="mx-1 p-1 bg-indigo-400 border-indigo-400 border rounded-lg">
      <img class="h-6" src={notification}/>
    </button>
    <button class="mx-2 p-1 text-gray-200 text-xl bg-indigo-400 border-indigo-400 border rounded-full">
      <span> toja </span>
    </button>
  </div>

<!-- <nav> -->
  <!-- <Link to={`table/2`}>Table[2]</Link> -->
  <!-- <Link to="tables">[Tables]</Link> -->
<!-- </nav> -->
<!-- <img scr={logo} alt="Brello logo"/> -->
</div>
