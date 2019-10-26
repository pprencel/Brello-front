<script>
  import TableHeader from './TableHeader.svelte';
  import { TableStore } from '../stores/store.js';
  let table;

  const unsubscribe = TableStore.subscribe(value => {
    table = value
  })
  // const resp = {
  //   id: 1,
  //   name: 'NAZWA_TABLICY',
  //   users: [
  //     "K",
  //     "A",
  //   ],
  //   lists: [
  //     {
  //       id: 1,
  //       name: "Feature",
  //       tasks: []
  //     },
  //     {
  //       id: 2,
  //       name: "Done",
  //       tasks: []
  //     },
  //   ]
  // }
  let text = 'sada'
</script>

  <div class="flex flex-row flex-wrap bg-orange-100">

    <h1 class="w-full"> \\ Table component \\ </h1>

    <!-- <button on:click={resp.changeTableName} bind:value={text}> iks </button> -->
    <TableHeader tableName={table.name} tableUsers={table.users}/>
  </div>
<style>

</style>
