<script>
  import { getContext } from 'svelte';
  import Surprise from './Surprise.svelte';
  import { setContext as baseSetContext } from 'svelte';
  export let setContext = baseSetContext;
  export let key = 'simple-modal';
  setContext(key, { open, close });

  const { open } = getContext('simple-modal');

  const showSurprise = () => {
    open(Surprise, { message: "It's a modal!" });
  };
</script>

<p><button on:click={showSurprise}>Show me a surprise!</button></p>
