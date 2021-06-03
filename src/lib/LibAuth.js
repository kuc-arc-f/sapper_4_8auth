
var csrf = require('csrf');
var tokens = new csrf();

//
export default {
  /*
  set_user:async function(req, user){
    try{
    } catch (e) {
      console.log(e);
      throw new Error('error, set_falsh');
    }
  },
  */
  get_user:async function(req){
    try{
//console.log(flash_message)
      var arr = {}
      if(typeof req.session.user == 'undefined'){
        return arr
      }
      arr = req.session.user
      return arr
    } catch (e) {
      console.log(e);
      throw new Error('error, get_user');
    }
  },  

}