<script context="module">

export async function preload() {
  const resUser = await this.fetch("/api/get_user")
  const dataUser = await resUser.json()
//console.log(dataUser)
  var user_id = dataUser.id || ''
  if(user_id ==''){
    return this.redirect(302, '/login');
  }
}
</script>

<script>
export let csrf;
// console.log(csrf._token)
const  get_token = async function (){
  const res = await fetch("/api/get_token")
  const data = await res.json() 
  return data
}
async function handleClick() {
//  alert('clicked')
  await add_item()
}
async function add_item(){
  try {
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var elemToken = document.getElementById('_token');
    var item = {
      title: elemTitle.value,
      content: elemContent.value,
      created_at: new Date(),
      _token: elemToken.value,
    }
console.log(item)
    var body = JSON.stringify(item)
    const res = await fetch( '/api/tasks/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
      },
      body: body,
    });
    if (res.status != 200) {
      throw new Error(await res.text());
    }
//  console.log(response.data)
      window.location.href = '/tasks/'
    } catch (error) {
      console.error(error);
    }    
}
//console.log(posts)
</script>
<style>
  .await_area_wrap{ display:none; }
</style>

<svelte:head>
	<title>Create</title>
</svelte:head>

<!-- initialize -->
{#await get_token() }
<p>Loading get_token.</p>
{:then data}
<div class="await_area_wrap">
  {csrf = data}
  <input type="text" name="_token" id="_token" value={csrf._token} />
</div>
{/await}

<h1>Tasks-Create</h1>
<hr />
<div class="form-group">
  Title:
  <input type="text" class="form-control" name="title" id="title" />
  content:
  <input type="text" class="form-control" name="content" id="content" />
</div>
<hr />
<button on:click={handleClick}>create</button>
