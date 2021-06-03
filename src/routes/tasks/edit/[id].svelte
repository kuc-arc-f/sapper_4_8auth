<script context="module">
//
export async function preload({ params }) {
//console.log(params.id)
  const resUser = await this.fetch("/api/get_user")
  const dataUser = await resUser.json()
//console.log(dataUser)
  var user_id = dataUser.id || ''
  if(user_id ==''){
    return this.redirect(302, '/login');
  }
  const res = await this.fetch(`tasks/${params.id}.json`);
  const data = await res.json();	
  const resFlash = await this.fetch("/api/flash")
  const flash = await resFlash.json()     
  if (res.status != 200) {
    this.error(res.status, data.message);
  }
  return { post: data ,flash: flash };
}
</script>

<script>
export let post;
//console.log(flash)

const  get_token = async function (){
  const res = await fetch("/api/get_token")
  const data = await res.json() 
  return data
}
async function handleClick() {
//  alert('clicked')
  await add_item()
}
async function handleClickDelete() {
console.log('handleClickDelete')
  await delete_item()
}
async function delete_item(){
  try {
    var elemToken = document.getElementById('_token');
    var item = {
      id: post.id, 
      _token: elemToken.value,
    }
console.log(item)
    const res = await fetch( '/api/tasks/destory', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(item),
    });
    if (res.status != 200) {
      throw new Error(await res.text());
    }
    window.location.href = '/tasks/'
  } catch (error) {
    console.error(error);
  }
}
async function add_item(){
  try {
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var elemToken = document.getElementById('_token');
    var item = {
      id: post.id,
      title: elemTitle.value,
      content: elemContent.value,
      created_at: new Date(),
      _token: elemToken.value,
    }
//console.log(item)
    const res = await fetch( '/api/tasks/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(item),
    });
    if (res.status != 200) {
      alert("Error , save")
      throw new Error(await res.text());
    }
//console.log(await res.text())
    window.location.href = '/tasks/'
  } catch (error) {
    console.error(error);
  }    
}  
</script>

<style>
.await_area_wrap{ display:none; }
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<!-- initialize -->
{#await get_token() }
<p>Loading get_token.</p>
{:then data}
<div class="await_area_wrap">
  <input type="text" name="_token" id="_token" value={data._token} />
</div>
{/await}

<h1>Tasks - Edit</h1>
<hr />
<div class="content">
	Title:
	<input type="text" class="form-control" name="title" id="title" 
  value={post.title} />
  <br />
	content:
	<input type="text" class="form-control" name="content" id="content"
  value={post.content} />
	<hr />
  <button on:click={handleClick}>Save</button>
  <hr />
  <button on:click={handleClickDelete}>Delete</button>
</div>
