var csrf = require('csrf');
var tokens = new csrf();
const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';

import Const from "../../../../app_config"
import LibFlash from "../../../lib/LibFlash"
//
export async function post(req, res) {
  try{
    var data = req.body
    const secret = req.session.secret
    if(tokens.verify(secret, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }     
    var dbFile = Const.get_config().DB_FILE_NAME
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
//console.log(req.body)
    var id = data.id   
    const result = await db.run(
      'UPDATE tasks SET title = ?, content =? WHERE id = ?',
      data.title,
      data.content,
      id
    )      
    var ret ={ item:data }    
//console.log(items)  
    LibFlash.set_falsh(req , {message: 'Success , update complete'} )   
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(ret));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
  }  
}