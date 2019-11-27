<script>
  import LoaderGif from "../../../public/images/loaderGif.gif"
  import { popupStore } from '../../stores/popupStore';
  import { onMount } from 'svelte';
  let store;

  onMount(()=> {
    const unsubscribe = popupStore.subscribe(async (value) => {
      store = value;
    })
  })

  const hidePopup = () => {
    popupStore.clear()
  }
</script>

{#if store && store.visible}
  <div class="bg-indigo-800 opacity-90 z-10 w-full fixed top-0">
    <button
      class="text-white font-bold text-2xl right-0 float-right mr-4"
      on:click={hidePopup}
    >
      x
    </button>
    <div class="flex flex-row justify-center">
      <h1 class="text-white font-bold text-2xl py-10"> {store.content} </h1>
    </div>
  </div>
{/if}
<style>
.opacity-90{
  opacity: 0.95
}
</style>
