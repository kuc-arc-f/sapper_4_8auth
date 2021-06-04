<script context="module">
import axios from 'axios'

export async function preload() {
  const resUser = await this.fetch("/api/get_user")
  const dataUser = await resUser.json()
//console.log(dataUser)
  var user_id = dataUser.id || ''  
  if(user_id ==''){
    return this.redirect(302, '/login');
  }  
  return {csrf: {} };
}
</script>

<script>
import Config from "../../../app_config"
export let csrf;
// console.log(Config.get_config().MY_BASE_URL )

const  get_token = async function (){
  var url = Config.get_config().MY_BASE_URL + "/api/get_token"
  const response = await axios.get(url)
  const data = await response.data
  csrf = data
console.log(csrf)
  return data
}
get_token();

async function handleClick() {
//  alert('clicked')
  await add_item()
}
async function add_item(){
  try {
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var item = {
      title: elemTitle.value,
      content: elemContent.value,
      complete: 0,
      created_at: new Date(),
      _token: csrf._token,
    }
console.log(item)
    var body = JSON.stringify(item)
    const res = await fetch( '/api/todos/create', {
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
    window.location.href = '/todos/'
  } catch (error) {
    console.error(error);
  }    
}
//console.log(posts)
</script>

<style>
</style>

<svelte:head>
	<title>Create</title>
</svelte:head>
<h1>Todos-Create</h1>
<hr />

<div class="form-group">
  Title:
  <input type="text" class="form-control" name="title" id="title" />
  content:
  <input type="text" class="form-control" name="content" id="content" />
  <br />
</div>
<hr />
<button on:click={handleClick}>create</button>
