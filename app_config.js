// Const
//
export default {
  get_config: function(){
    return {
      CSRF_SECRET : 'secret1234',
      DB_FILE_NAME: "./db1.sqlite",
      MY_BASE_URL : "http://localhost:3000",
      MY_SITE_NAME: "sapper_4_8auth",
      MY_SITE_INFO: "svelte + sapper , app sample",
      COOKIE_USER_ID: "sapper_uid"
    }
  },
}
