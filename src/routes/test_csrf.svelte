<script context="module">
export async function preload(page) {
}
</script>

<script>
export  let  csfr;
//console.log(csfr)
const  get_token = async function (){
  var url ="/api/get_token";
  const res = await fetch(url)
  const data = await res.json() 
  console.log(data) 
  csfr = data
  return data
}
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
    const res = await fetch( '/api/valid_csrf', {
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
    } catch (error) {
      console.error(error);
    }    
}
</script>

<svelte:head>
  <title>test</title>
</svelte:head>

<!-- initialize -->
{#await get_token() }
<p>Loading get_token.</p>
{:then data}
  <p>token={data._token}</p>
{/await}

<h1>test</h1>
<hr />
<button on:click={handleClick}>valid_token</button>

