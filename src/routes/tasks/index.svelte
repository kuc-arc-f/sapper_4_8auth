<script context="module">

export async function preload() {
  var url ="/api/tasks/list";
  const res = await this.fetch(url)
  const data = await res.json()
  const resUser = await this.fetch("/api/get_user")
  const dataUser = await resUser.json()
//console.log(dataUser)
  var user_id = dataUser.id || ''
  if(user_id ==''){
    return this.redirect(302, '/login');
  }
  //const resFlash = await this.fetch("/api/flash")
  //const flash = await resFlash.json()   
//  var posts = data
  //{message:'', error:''}
  return {posts: data ,  flash:{message:'', error:''}, user: dataUser};
}
</script>

<script>
export let posts , flash;
const  get_flash = async function (){
  const res = await fetch("/api/flash")
  const data = await res.json() 
  flash = data
console.log(flash)
  return data
}
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  .flash_message{
    color : white; background: green; padding: 0.5rem;
  }
  .await_area_wrap{ display:none; }
</style>

<svelte:head>
  <title>Posts</title>
</svelte:head>

<!-- initialize -->
{#await get_flash() }
<p>Loading get_token.</p>
{:then data}
<div class="await_area_wrap">
  {flash = data}
  <p>{flash.message}</p>
</div>
{/await}
{#if flash.message != ''}
  <h3 class="flash_message">{flash.message}</h3>
{/if}

<h1>Tasks-Index</h1>
<a href="/tasks/create">[ create ]</a>
<hr />
<ul>
  {#each posts as post}
    <li><a rel="prefetch" href="/tasks/{post.id}">{post.title}</a>
      <span><a rel="prefetch" href="/tasks/edit/{post.id}">[ edit ]</a></span>
    </li>
  {/each}
</ul>
<hr />
