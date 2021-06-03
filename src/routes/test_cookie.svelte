<script context="module">
export function preload() {
//  console.log(session);
}
</script>

<script>
  import LibCookie from '../lib/LibCookie'
//console.log(posts)
async function handleClick() {
//console.log('clicked')
  LibCookie.set_cookie("sapper_uid", 91 )
}
</script>

<svelte:head>
  <title>test</title>
</svelte:head>

<h1>test</h1>
<p>This is the P2</p>
<hr />
<button on:click={handleClick}>Add</button>
