<script>
  import API from '../utils/api';
  let response;
  API('').then(resp => {
    // console.log(resp);
    response = resp.status;
  })

</script>

<h1>Test API response status: {response}</h1>

<style>
  h1 {
    color: green;
  }
</style>
