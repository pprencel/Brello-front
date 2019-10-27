<script>
  import { onMount } from 'svelte';
  import { TableStore } from '../stores/store.js';

  const testFunction = async () => {}
  let promise = testFunction()
  //
  // onMount(()=> {
  //   const unsubscribe = TableStore.subscribe(async (value) => {
  //     table = value
  //   })
  //   console.log(table.users);
  // })
  console.log('tutajs');

  const logError = (error) => {
    console.log(`failed to change the name, e: ${error}`)
    return ''
  }
</script>
<div class="flex flex-column bg-red-400 w-full p-6">
  <div>
    TABLES VIEW
  </div>

</div>
