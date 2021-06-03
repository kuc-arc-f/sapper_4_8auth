<script>

//  const msg='<p>aa1</p>'
export let user_id;
async function handleClick() {
//console.log('clicked')
  await proc_logout()
}  
async function proc_logout(){
  document.cookie = 'sapper_uid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  window.location.href = '/login'
}
</script>

<style>

</style>

<div class="login_box_wrap">
{#if user_id != ''}
  <button on:click={handleClick}>Logout</button>
  <hr />
{/if}
</div>