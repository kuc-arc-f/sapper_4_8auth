var csrf = require('csrf');
var tokens = new csrf();
const bcrypt = require('bcrypt');
const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';

import Const from "../../../../app_config"
//
export async function post(req, res) {
  try{
    var data = req.body
    var retArr= {ret:0, user_id:0}
    const secret = req.session.secret
    if(tokens.verify(secret, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    } 
    var dbFile = Const.get_config().DB_FILE_NAME
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    var sql =`
    select * from users where email='${data.email}'
    `
    const items = await db.all(sql); 
    if(items.length > 0){
//console.log(items)
      var item = items[0] 
      if (data.email === item.email
        && bcrypt.compareSync(data.password,  item.password )){
          retArr.ret = 1
          retArr.user_id = item.id 
          item.password='' 
          //console.log(item)
          req.session.user = item;    
      }
    }    
//console.log(items)    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(retArr));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
  }  
}