<script context="module">
export async function preload() {
//console.log(data)
  var csfr = []
  return {csfr};
}
</script>

<script>
export  let  csfr ,flash_message;
console.log(csfr)
async function handleClick() {
//  alert('clicked')
  await valid_token()
}
async function valid_token(){
  try {
    var item = {
      _token: csfr._token,
    }
console.log(item)
    const res = await fetch( '/api/flash_write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (res.status != 200) {
      throw new Error(await res.text());
    }
console.log(await res.json())
    //get
    const resFlash = await fetch("/api/flash")
    const dataFlash = await resFlash.json() 
    flash_message = dataFlash.message
console.log(dataFlash)
    } catch (error) {
      console.error(error);
    }    
}
</script>

<svelte:head>
  <title>test</title>
</svelte:head>

<h1>test flash</h1>
<p>flash_message={flash_message}</p>
<hr />
<button on:click={handleClick}>test_flash</button>

