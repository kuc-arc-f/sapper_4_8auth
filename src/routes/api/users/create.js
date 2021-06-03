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
    const secret = req.session.secret
    if(tokens.verify(secret, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    } 
    var dbFile = Const.get_config().DB_FILE_NAME
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
//console.log(req.body)
    let hashed_password = bcrypt.hashSync(data.password, 10);
    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)',
      data.name,
      data.email,
      hashed_password,
    )    
    var ret ={ item:data }    
//console.log(items)    
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