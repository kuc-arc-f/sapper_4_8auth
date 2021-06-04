import axios from 'axios'
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
    var id = data.id 
console.log("id=" , id)    
    var ret ={ id:1 } 
    var dbFile = Const.get_config().DB_FILE_NAME    
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    const result = await db.run(
      'delete from todos  WHERE id = ?',
      id
    ) 
    LibFlash.set_falsh(req , {message: 'Success , delete complete'} )      
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(ret));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({}));
  }  
}