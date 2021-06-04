<script context="module">

export async function preload() {
  const res = await this.fetch("/api/todos/list")
  const data = await res.json()
//console.log(data)
const resUser = await this.fetch("/api/get_user")
  const dataUser = await resUser.json()
console.log(dataUser)
  var user_id = dataUser.id || ''
  if(user_id ==''){
    return this.redirect(302, '/login');
  }
  var posts = data
  return {posts , flash:{} };
}
</script>

<script>
export let posts , flash;



async function get_flash(){
  const resFlash = await fetch("/api/flash")
  const jsonflash = await resFlash.json() 
//console.log(jsonflash)
  flash = jsonflash
}
get_flash()

async function handleClickComplete() {
//  alert('clicked')
  await get_complete()
}
async function handleClickTodos() {
//  alert('clicked')
  await get_todos()
}
const  get_todos = async function (){
  const res = await fetch("/api/todos/list")
  const data = await res.json() 
  posts = data
  return data
}
const  get_complete = async function (){
  const res = await fetch("/api/todos/list_complete")
  const data = await res.json() 
  posts = data
  return data
}
//console.log(flash.message)
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  .flash_message{
    color : white; background: green; padding: 0.5rem;
  }
  /* .await_area_wrap{ display:none; } */
</style>

<!-- head -->
<svelte:head>
  <title>Todos</title>
</svelte:head>

{#if flash.message != ''}
  <h3 class="flash_message">{flash.message}</h3>
{/if}
<h1>TodosIndex</h1>
<a href="/todos/create">[ Create ]</a>
<hr />
<button on:click={handleClickTodos}>Not Complete</button>
<button on:click={handleClickComplete}>Completed</button>
<hr />
<ul>
  {#each posts as item}
    <li><a rel="prefetch" href="/todos/{item.id}">{item.title}</a>
      <span>complete: {item.complete}</span>
      <span><a rel="prefetch" href="/todos/edit/{item.id}">[ edit ]</a></span>
    </li>
  {/each}
</ul>
<hr />
