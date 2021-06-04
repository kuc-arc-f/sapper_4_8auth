<script context="module">
import LibTodos from '../../../lib/LibTodos'
//
export async function preload({ params }) {
//console.log(params.id)
  const res = await this.fetch(`todos/${params.id}.json`);
  const data = await res.json();	
  var url ="/api/get_token";
	const resToken = await this.fetch(url)
	const dataToken = await resToken.json()
  const complete_items = LibTodos.get_complete_items()   
console.log(complete_items)
  if (res.status != 200) {
    this.error(res.status, data.message);
  }
  return {
    post: data, csfr: dataToken ,complete_items: complete_items
  };
}
</script>

<script>
export let post , csfr ,complete_items;
//console.log(flash)

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
    var item = {
      id: post.id, 
      _token: csfr._token,
    }
console.log(item)
    const res = await fetch( '/api/todos/destory', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(item),
    });
    if (res.status != 200) {
      throw new Error(await res.text());
    }
    window.location.href = '/todos/'
  } catch (error) {
    console.error(error);
  }
}
async function add_item(){
  try {
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var elemComplete = document.getElementById('complete');
    var item = {
      id: post.id,
      title: elemTitle.value,
      content: elemContent.value,
      complete: elemComplete.value,
      created_at: new Date(),
      _token: csfr._token,
    }
console.log(item)
    const res = await fetch( '/api/todos/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(item),
    });
    if (res.status != 200) {
      alert("Error , save")
      throw new Error(await res.text());
    }
console.log(await res.json())
    window.location.href = '/todos/'
  } catch (error) {
    console.error(error);
  }    
}  
</script>

<style>
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}
	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}
	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}
	.content :global(ul) {
		line-height: 1.5;
	}
	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>
<h1>Todos - Edit</h1>
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
  Complete:
  <select id="complete" name="complete"
    class="form-select mt-2" value={post.complete}>
    {#each complete_items as item}
      <option value={item.value}>{item.name}</option>
    {/each}
  </select>
  <hr />
  <button on:click={handleClick}>Save</button>
  <hr />
  <button on:click={handleClickDelete}>Delete</button>
</div>
